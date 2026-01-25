/**
 * City Tier System for Internal Linking
 * 
 * Implements a 3-tier hierarchy for distributing link equity:
 * - Tier 1: Major metros in Miami-Dade & Broward (linked from ALL service hubs)
 * - Tier 2: Secondary cities + Palm Beach majors (linked from Tier 1 city pages)
 * - Tier 3: Remaining cities (linked from Tier 2 city pages + /areas/ safety net)
 */

// Tier 1: Major metros - Miami-Dade & Broward ONLY (10 cities total)
// All Tier 1 cities receive inbound links from every service hub
export const TIER_1_CITIES = [
  // Miami-Dade
  'miami', 'miami-beach', 'coral-gables', 'hialeah',
  // Broward
  'fort-lauderdale', 'hollywood', 'pembroke-pines', 'pompano-beach',
  'plantation', 'miramar'
] as const;

// Tier 2: Secondary markets + Palm Beach majors (12 cities)
// Linked from Tier 1 city pages
export const TIER_2_CITIES = [
  // Miami-Dade secondary
  'doral', 'kendall', 'pinecrest', 'aventura', 'miami-lakes',
  // Broward secondary
  'weston', 'davie', 'coral-springs', 'sunrise', 'deerfield-beach',
  // Palm Beach majors
  'boca-raton', 'west-palm-beach'
] as const;

// Tier 3: All remaining cities (11 cities)
// Linked from Tier 2 city pages and /service-areas/ safety net
// This will be calculated dynamically from all cities minus Tier 1 and Tier 2

import { getAllCities, type CityConfig } from './data';

/**
 * Get the tier number for a given city slug
 */
export function getCityTier(citySlug: string): 1 | 2 | 3 | null {
  if (TIER_1_CITIES.includes(citySlug as typeof TIER_1_CITIES[number])) {
    return 1;
  }
  if (TIER_2_CITIES.includes(citySlug as typeof TIER_2_CITIES[number])) {
    return 2;
  }
  
  // Check if city exists - if so, it's Tier 3
  const allCities = getAllCities();
  if (allCities[citySlug]) {
    return 3;
  }
  
  return null;
}

/**
 * Get all cities in a specific tier
 */
export function getCitiesInTier(tier: 1 | 2 | 3): string[] {
  if (tier === 1) {
    return [...TIER_1_CITIES];
  }
  if (tier === 2) {
    return [...TIER_2_CITIES];
  }
  
  // Tier 3: all cities not in Tier 1 or Tier 2
  const allCities = getAllCities();
  const tier1Set = new Set(TIER_1_CITIES);
  const tier2Set = new Set(TIER_2_CITIES);
  
  return Object.keys(allCities).filter(
    slug => !tier1Set.has(slug as typeof TIER_1_CITIES[number]) &&
            !tier2Set.has(slug as typeof TIER_2_CITIES[number])
  );
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Get geographically nearby cities from a target tier
 * Returns the N nearest cities from the specified tier
 */
export function getGeographicallyNearbyFromTier(
  citySlug: string,
  targetTier: readonly string[],
  limit: number
): string[] {
  const allCities = getAllCities();
  const sourceCity = allCities[citySlug];
  
  if (!sourceCity || !sourceCity.coordinates) {
    return [];
  }
  
  const { lat: sourceLat, lng: sourceLng } = sourceCity.coordinates;
  
  // Calculate distances to all cities in target tier
  const distances: Array<{ slug: string; distance: number }> = [];
  
  for (const targetSlug of targetTier) {
    // Skip the source city itself
    if (targetSlug === citySlug) continue;
    
    const targetCity = allCities[targetSlug];
    if (!targetCity || !targetCity.coordinates) continue;
    
    const { lat: targetLat, lng: targetLng } = targetCity.coordinates;
    const distance = calculateDistance(sourceLat, sourceLng, targetLat, targetLng);
    
    distances.push({ slug: targetSlug, distance });
  }
  
  // Sort by distance and return top N
  return distances
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map(item => item.slug);
}

/**
 * Get city slugs from the tier below the current city's tier
 * For Tier 1 → returns Tier 2 cities
 * For Tier 2 → returns Tier 3 cities
 * For Tier 3 → returns other Tier 3 cities (mesh network)
 */
export function getTierCitySlugs(
  citySlug: string,
  limit: number = 3
): string[] {
  const tier = getCityTier(citySlug);
  
  if (!tier) {
    return [];
  }
  
  if (tier === 1) {
    // Tier 1 links to Tier 2
    return getGeographicallyNearbyFromTier(citySlug, TIER_2_CITIES, limit);
  }
  
  if (tier === 2) {
    // Tier 2 links to Tier 3
    const tier3Cities = getCitiesInTier(3);
    return getGeographicallyNearbyFromTier(citySlug, tier3Cities, limit);
  }
  
  // Tier 3 links to other Tier 3 cities (mesh network)
  const tier3Cities = getCitiesInTier(3);
  return getGeographicallyNearbyFromTier(citySlug, tier3Cities, limit);
}
