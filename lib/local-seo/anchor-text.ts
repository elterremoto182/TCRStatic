/**
 * Anchor Text Rotation System
 * 
 * Implements 70/20/10 distribution to avoid over-optimization penalties:
 * - 70% partial match: "professional emergency plumbing", "leak detection services"
 * - 20% branded: "Total Care Restoration", "our licensed technicians"
 * - 10% exact match: "emergency plumbing in Miami"
 * 
 * Uses seeded random generator for consistency (same page always gets same anchors).
 */

import type { RelatedLink } from './links';

/**
 * Simple seeded random number generator
 * Same seed always produces same sequence
 */
function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  let value = Math.abs(hash) / 2147483647; // Normalize to 0-1
  
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

/**
 * Generate anchor text variation based on 70/20/10 distribution
 * 
 * @param link - The link object (contains label, href, etc.)
 * @param serviceName - Full service name (e.g., "Water Damage Restoration")
 * @param cityName - City name (e.g., "Miami")
 * @param seed - Seed for deterministic randomization (typically page URL or city+service)
 */
export function generateAnchorTextVariation(
  link: RelatedLink,
  serviceName: string,
  cityName: string,
  seed: string
): string {
  const random = seededRandom(seed + link.href);
  const rand = random();
  
  const serviceLower = serviceName.toLowerCase();
  const serviceShort = serviceName.replace(/Restoration|Remediation|Cleanup|Services?/gi, '').trim();
  
  // 70% partial match
  if (rand < 0.7) {
    const variations = [
      `professional ${serviceLower} in ${cityName}`,
      `${serviceLower} services in ${cityName}`,
      `expert ${serviceLower} in ${cityName}`,
      `${serviceShort.toLowerCase()} in ${cityName}`,
      `licensed ${serviceLower} in ${cityName}`,
      `${serviceLower} company in ${cityName}`,
      `trusted ${serviceLower} in ${cityName}`,
      `${serviceLower} specialists in ${cityName}`,
    ];
    return variations[Math.floor(random() * variations.length)];
  }
  
  // 20% branded
  if (rand < 0.9) {
    const variations = [
      `Total Care Restoration in ${cityName}`,
      `our ${serviceLower} team`,
      `our licensed technicians`,
      `Total Care Restoration`,
      `our ${serviceLower} experts`,
      `our restoration specialists`,
    ];
    return variations[Math.floor(random() * variations.length)];
  }
  
  // 10% exact match
  return `${serviceName} in ${cityName}`;
}

/**
 * Apply anchor text rotation to an array of links
 */
export function applyAnchorTextRotation(
  links: RelatedLink[],
  serviceName: string,
  cityName: string,
  seed: string
): RelatedLink[] {
  return links.map(link => ({
    ...link,
    label: generateAnchorTextVariation(link, serviceName, cityName, seed),
  }));
}
