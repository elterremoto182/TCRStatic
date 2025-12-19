/**
 * Internal Linking Module for Local SEO
 * 
 * This module provides intelligent blog-to-service/city matching
 * and generates related content links for internal linking strategy.
 */

import { getAllPosts, type BlogPost } from '@/lib/blog/posts';
import { 
  getService, 
  getCity, 
  getCausesForService, 
  getAllCities,
  getAllServices,
  type CauseConfig 
} from './data';

// Blog post relevance keywords for each service
const SERVICE_KEYWORDS: Record<string, string[]> = {
  'water-damage-restoration': [
    'water damage', 'water restoration', 'flood', 'flooding', 'leak', 'pipe', 
    'burst pipe', 'water extraction', 'drying', 'moisture', 'wet', 'plumbing',
    'dehumidifier', 'air mover', 'water removal', 'slab leak', 'roof leak',
    'ceiling damage', 'water cleanup', 'emergency water'
  ],
  'fire-damage-restoration': [
    'fire damage', 'fire restoration', 'smoke', 'soot', 'burn', 'fire cleanup',
    'smoke odor', 'thermal fog', 'fire safety', 'electrical fire', 'kitchen fire',
    'smoke damage', 'fire repair', 'fire inspection', 'charred', 'ash'
  ],
  'mold-remediation': [
    'mold', 'mildew', 'mold removal', 'mold remediation', 'black mold', 
    'mold inspection', 'mold prevention', 'humidity', 'mold growth', 'spores',
    'air quality', 'hepa', 'containment', 'mold free', 'mold test'
  ],
  'storm-damage-restoration': [
    'storm damage', 'hurricane', 'wind damage', 'storm restoration', 'tropical storm',
    'hail damage', 'storm cleanup', 'hurricane season', 'storm preparedness',
    'emergency storm', 'weather damage'
  ],
  'roof-tarping': [
    'roof tarp', 'tarping', 'emergency roof', 'roof damage', 'roof repair',
    'blue tarp', 'shrink wrap', 'roof protection', 'roof leak', 'roof cover'
  ],
  'shrink-wrapping': [
    'shrink wrap', 'shrink wrapping', 'protective wrap', 'property protection',
    'temporary cover', 'weatherproofing'
  ],
  'sewage-cleanup': [
    'sewage', 'sewage cleanup', 'biohazard', 'black water', 'toilet overflow',
    'septic', 'contaminated water', 'sanitization', 'waste water'
  ],
  'emergency-restoration': [
    'emergency', '24/7', 'emergency restoration', 'rapid response', 'disaster',
    'emergency service', 'immediate response', 'urgent'
  ],
};

// City keywords for matching
const CITY_KEYWORDS: Record<string, string[]> = {
  'miami': ['miami', 'miami-dade', 'south florida'],
  'fort-lauderdale': ['fort lauderdale', 'lauderdale', 'broward'],
  'miami-beach': ['miami beach', 'south beach'],
  'doral': ['doral'],
  'boca-raton': ['boca raton', 'boca', 'palm beach'],
  'coral-springs': ['coral springs'],
  'pembroke-pines': ['pembroke pines', 'pembroke'],
  'miramar': ['miramar'],
  'plantation': ['plantation'],
  'weston': ['weston'],
  'davie': ['davie'],
  'pompano-beach': ['pompano beach', 'pompano'],
};

export interface RelatedBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  relevanceScore: number;
}

export interface RelatedLink {
  label: string;
  href: string;
  description?: string;
  type: 'service' | 'hub' | 'city' | 'cause' | 'blog';
}

export interface InternalLinksData {
  parentService: RelatedLink;
  serviceHub: RelatedLink;
  relatedCauses: RelatedLink[];
  relatedBlogs: RelatedLink[];
  nearbyCities: RelatedLink[];
}

/**
 * Calculate relevance score for a blog post to a service
 */
function calculateServiceRelevance(post: BlogPost, serviceSlug: string): number {
  const keywords = SERVICE_KEYWORDS[serviceSlug] || [];
  if (keywords.length === 0) return 0;
  
  const searchText = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
  let score = 0;
  
  for (const keyword of keywords) {
    if (searchText.includes(keyword.toLowerCase())) {
      // Exact title match scores higher
      if (post.title.toLowerCase().includes(keyword.toLowerCase())) {
        score += 3;
      } else {
        score += 1;
      }
    }
  }
  
  return score;
}

/**
 * Calculate relevance score for a blog post to a city
 */
function calculateCityRelevance(post: BlogPost, citySlug: string): number {
  const keywords = CITY_KEYWORDS[citySlug] || [];
  const searchText = `${post.title} ${post.excerpt} ${post.content || ''}`.toLowerCase();
  let score = 0;
  
  for (const keyword of keywords) {
    if (searchText.includes(keyword.toLowerCase())) {
      score += 2;
    }
  }
  
  return score;
}

/**
 * Get related blog posts for a service/city combination
 */
export function getRelatedBlogPosts(
  serviceSlug: string,
  citySlug?: string,
  limit: number = 2
): RelatedBlogPost[] {
  const allPosts = getAllPosts();
  
  const scoredPosts = allPosts.map(post => {
    let score = calculateServiceRelevance(post, serviceSlug);
    
    // Boost score if city-specific content
    if (citySlug) {
      score += calculateCityRelevance(post, citySlug);
    }
    
    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt.slice(0, 120) + '...',
      relevanceScore: score,
    };
  });
  
  // Filter to only posts with some relevance and sort by score
  return scoredPosts
    .filter(post => post.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);
}

/**
 * Get related blog posts for a cause/problem page
 */
export function getRelatedBlogPostsForCause(
  causeSlug: string,
  parentServices: string[],
  citySlug?: string,
  limit: number = 2
): RelatedBlogPost[] {
  const allPosts = getAllPosts();
  
  // Extract keywords from cause slug
  const causeKeywords = causeSlug.split('-').filter(w => w.length > 2);
  
  const scoredPosts = allPosts.map(post => {
    const searchText = `${post.title} ${post.excerpt}`.toLowerCase();
    let score = 0;
    
    // Check cause keywords
    for (const keyword of causeKeywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        score += 2;
      }
    }
    
    // Check parent service relevance
    for (const serviceSlug of parentServices) {
      score += calculateServiceRelevance(post, serviceSlug) * 0.5;
    }
    
    // Boost for city relevance
    if (citySlug) {
      score += calculateCityRelevance(post, citySlug);
    }
    
    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt.slice(0, 120) + '...',
      relevanceScore: score,
    };
  });
  
  return scoredPosts
    .filter(post => post.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);
}

/**
 * Generate complete internal links data for a service/city page
 */
export function generateInternalLinksData(
  serviceSlug: string,
  citySlug: string,
  type: 'residential' | 'commercial'
): InternalLinksData {
  const service = getService(serviceSlug);
  const city = getCity(citySlug);
  const causes = getCausesForService(serviceSlug);
  const allCities = getAllCities();
  
  if (!service || !city) {
    return {
      parentService: { label: '', href: '', type: 'service' },
      serviceHub: { label: '', href: '', type: 'hub' },
      relatedCauses: [],
      relatedBlogs: [],
      nearbyCities: [],
    };
  }
  
  // Parent service link
  const parentService: RelatedLink = {
    label: service.name,
    href: `/${serviceSlug}`,
    description: `Learn about our ${service.name.toLowerCase()} services`,
    type: 'service',
  };
  
  // Service hub link
  const serviceHub: RelatedLink = {
    label: `${type === 'residential' ? 'Residential' : 'Commercial'} Services`,
    href: `/${serviceSlug}/${type}`,
    description: `All ${type} ${service.shortName.toLowerCase()} locations`,
    type: 'hub',
  };
  
  // Related causes (limited to 3)
  const relatedCauses: RelatedLink[] = causes.slice(0, 3).map((cause: CauseConfig) => ({
    label: `${cause.name} in ${city.name}`,
    href: `/problems/${cause.slug}/${citySlug}`,
    description: cause.description,
    type: 'cause' as const,
  }));
  
  // Related blog posts (limited to 2)
  const blogPosts = getRelatedBlogPosts(serviceSlug, citySlug, 2);
  const relatedBlogs: RelatedLink[] = blogPosts.map(post => ({
    label: post.title,
    href: `/blog/${post.slug}`,
    description: post.excerpt,
    type: 'blog' as const,
  }));
  
  // Nearby cities (limited to 3, excluding current)
  const citySlugs = Object.keys(allCities).filter(slug => slug !== citySlug);
  const nearbyCities: RelatedLink[] = citySlugs.slice(0, 3).map(slug => {
    const nearbyCity = allCities[slug];
    return {
      label: `${service.shortName} in ${nearbyCity.name}`,
      href: `/${serviceSlug}/${type}/${slug}`,
      description: `${nearbyCity.responseTime} response time`,
      type: 'city' as const,
    };
  });
  
  return {
    parentService,
    serviceHub,
    relatedCauses,
    relatedBlogs,
    nearbyCities,
  };
}

/**
 * Get blog posts that should link TO a specific service/city page
 * (For use in blog post rendering to add contextual links)
 */
export function getBlogPostsLinkingToService(
  serviceSlug: string,
  minRelevance: number = 3
): BlogPost[] {
  const allPosts = getAllPosts();
  
  return allPosts.filter(post => {
    const score = calculateServiceRelevance(post, serviceSlug);
    return score >= minRelevance;
  });
}

/**
 * Get suggested internal links for a blog post
 * Returns service/city pages that the blog post should link to
 */
export function getSuggestedLinksForBlogPost(post: BlogPost): RelatedLink[] {
  const services = getAllServices();
  const links: RelatedLink[] = [];
  
  // Find most relevant service
  let bestService: { slug: string; score: number } | null = null;
  
  for (const [slug] of Object.entries(services)) {
    const score = calculateServiceRelevance(post, slug);
    if (score > 2 && (!bestService || score > bestService.score)) {
      bestService = { slug, score };
    }
  }
  
  if (bestService) {
    const service = services[bestService.slug];
    
    // Add link to main service page
    links.push({
      label: service.name,
      href: `/${bestService.slug}`,
      description: `Professional ${service.name.toLowerCase()} services`,
      type: 'service',
    });
    
    // Check for city mentions and add city-specific link
    const allCities = getAllCities();
    for (const [citySlug, city] of Object.entries(allCities)) {
      const cityScore = calculateCityRelevance(post, citySlug);
      if (cityScore > 0) {
        links.push({
          label: `${service.name} in ${city.name}`,
          href: `/${bestService.slug}/residential/${citySlug}`,
          description: `Local ${service.name.toLowerCase()} in ${city.name}`,
          type: 'city',
        });
        break; // Only add first matching city
      }
    }
  }
  
  return links;
}

