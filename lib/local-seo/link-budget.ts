/**
 * Link Budget System
 * 
 * Defines maximum and minimum link counts per page type to avoid
 * over-linking (which dilutes SEO value) and ensure consistent link distribution.
 */

export type PageType =
  | 'blog'
  | 'city'
  | 'city-tier-1'
  | 'city-tier-2'
  | 'city-tier-3'
  | 'problem'
  | 'segment'
  | 'service-hub'
  | 'guide'
  | 'static'
  | 'other';

export interface LinkBudget {
  min: number;
  max: number;
  hardCap: number;
}

/**
 * Link budgets for each page type
 * - min: Minimum recommended links (for guidance)
 * - max: Ideal maximum links (target range)
 * - hardCap: Absolute maximum (never exceed)
 */
export const LINK_BUDGETS: Record<PageType, LinkBudget> = {
  'blog': { min: 5, max: 7, hardCap: 8 },
  'city': { min: 5, max: 7, hardCap: 8 }, // Legacy fallback
  'city-tier-1': { min: 5, max: 8, hardCap: 10 }, // Higher authority, more outbound allowed
  'city-tier-2': { min: 5, max: 7, hardCap: 9 }, // Mid-tier
  'city-tier-3': { min: 4, max: 6, hardCap: 8 }, // Stricter budget
  'problem': { min: 5, max: 8, hardCap: 10 },
  'segment': { min: 6, max: 10, hardCap: 12 },
  'service-hub': { min: 10, max: 15, hardCap: 18 },
  'guide': { min: 5, max: 10, hardCap: 12 },
  'static': { min: 0, max: 50, hardCap: 100 },
  'other': { min: 0, max: 50, hardCap: 100 },
};

/**
 * Get link budget for a specific page type
 */
export function getLinkBudget(pageType: PageType): LinkBudget {
  return LINK_BUDGETS[pageType] || LINK_BUDGETS.other;
}

/**
 * Enforce link budget on an array of links
 * Truncates to hardCap if necessary, prioritizing first N links
 */
export function enforceLinkBudget<T extends { href: string }>(
  links: T[],
  pageType: PageType
): T[] {
  const budget = getLinkBudget(pageType);
  
  // Never exceed hardCap
  if (links.length > budget.hardCap) {
    return links.slice(0, budget.hardCap);
  }
  
  return links;
}

/**
 * Check if link count is within budget
 */
export function isWithinBudget(linkCount: number, pageType: PageType): boolean {
  const budget = getLinkBudget(pageType);
  return linkCount <= budget.hardCap;
}
