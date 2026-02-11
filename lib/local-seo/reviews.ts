import reviewsConfig from '@/config/reviews.json';
import siteConfig from '@/config/site.json';

const googlePlaceId = (siteConfig as { reviews?: { google?: { placeId?: string } } }).reviews?.google?.placeId || 'ChIJnQf8wci72YgRVY2t4MTnaYE';

/** URL for "Read more reviews" (GBP place page) */
export const GBP_REVIEWS_URL = `https://www.google.com/maps/place/?q=place_id:${googlePlaceId}`;

export interface CuratedReviewItem {
  reviewId: string;
  text: string;
  reviewUrl: string;
  name: string;
  stars: number;
  publishedAtDate: string;
  service?: string | string[];
  city?: string | string[];
}

export interface ReviewForDisplay {
  text: string;
  reviewUrl: string;
  name: string;
  stars: number;
  isSpanish?: boolean;
}

export interface GetReviewsResult {
  reviews: ReviewForDisplay[];
  showGbpLink: boolean;
}

const SPANISH_INDICATORS = [
  'gracias',
  'excelente',
  'recomiendo',
  'recomendado',
  'muy ',
  'muy.',
  'muy,',
  'trabajo',
  'equipo',
  'profesionales',
  'contento',
  'satisfech',
  'atención',
  'buenas',
  'buenos',
  'felicito',
  'mil gracias',
  'los recomiendo',
  'muchas gracias',
  'quedé',
  'quede',
  'recomendados',
  'impecable',
  'respetuoso',
  'puntual',
];

function isSpanishText(text: string): boolean {
  if (!text || typeof text !== 'string') return false;
  const lower = text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  return SPANISH_INDICATORS.some((w) => lower.includes(w));
}

/** Stable numeric hash for (serviceSlug + citySlug) for deterministic rotation */
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h = (h << 5) - h + c;
    h = h & h;
  }
  return Math.abs(h);
}

function reviewMatchesService(r: CuratedReviewItem, serviceSlug: string): boolean {
  if (!r.service) return false;
  const services = Array.isArray(r.service) ? r.service : [r.service];
  return services.includes(serviceSlug);
}

function reviewMatchesCity(r: CuratedReviewItem, citySlug: string): boolean {
  if (!r.city) return false;
  const cities = Array.isArray(r.city) ? r.city : [r.city];
  return cities.includes(citySlug);
}

const allReviews: CuratedReviewItem[] = reviewsConfig as CuratedReviewItem[];

/**
 * Build pool for a service+city page: reviews that match the service (via tag).
 * Sorted with city-matching reviews first, then by reviewId within each group.
 * This ensures Miami pages get Miami-tagged reviews when available.
 */
function getPoolForServiceCity(serviceSlug: string, citySlug: string): CuratedReviewItem[] {
  const pool = allReviews.filter((r) => reviewMatchesService(r, serviceSlug));
  return [...pool].sort((a, b) => {
    const aCityMatch = reviewMatchesCity(a, citySlug) ? 1 : 0;
    const bCityMatch = reviewMatchesCity(b, citySlug) ? 1 : 0;
    if (bCityMatch !== aCityMatch) return bCityMatch - aCityMatch;
    return a.reviewId < b.reviewId ? -1 : a.reviewId > b.reviewId ? 1 : 0;
  });
}

/**
 * Get 2 or 3 reviews for a city page with deterministic rotation so different cities get different slices.
 * Tier 1: 3 reviews + showGbpLink. Tier 2/3: 2 reviews, no GBP block.
 */
export function getReviewsForCityPage(
  citySlug: string,
  cityName: string,
  serviceSlug: string,
  tier: 1 | 2 | 3 | null
): GetReviewsResult {
  const count = tier === 1 ? 3 : 2;
  const showGbpLink = tier === 1;

  let pool = getPoolForServiceCity(serviceSlug, citySlug);
  if (pool.length === 0) {
    pool = [...allReviews].sort((a, b) => (a.reviewId < b.reviewId ? -1 : a.reviewId > b.reviewId ? 1 : 0));
  }

  const L = pool.length;
  if (L === 0) {
    return { reviews: [], showGbpLink };
  }

  const startIndex = hashString(serviceSlug + citySlug) % L;
  const seen = new Set<string>();
  const picked: CuratedReviewItem[] = [];
  for (let i = 0; i < count; i++) {
    const idx = (startIndex + i) % L;
    const r = pool[idx];
    if (!seen.has(r.reviewId)) {
      seen.add(r.reviewId);
      picked.push(r);
    }
  }

  const spanishInPool = pool.filter((r) => isSpanishText(r.text));
  const spanishInPicked = picked.filter((r) => isSpanishText(r.text));
  let result = picked.map((r) => ({
    text: r.text,
    reviewUrl: r.reviewUrl,
    name: r.name,
    stars: r.stars,
    isSpanish: isSpanishText(r.text),
  }));

  if (spanishInPool.length > 0 && spanishInPicked.length === 0) {
    const firstSpanish = spanishInPool[0];
    const alreadyPickedIds = new Set(picked.map((p) => p.reviewId));
    if (!alreadyPickedIds.has(firstSpanish.reviewId)) {
      result = [
        { text: firstSpanish.text, reviewUrl: firstSpanish.reviewUrl, name: firstSpanish.name, stars: firstSpanish.stars, isSpanish: true },
        ...result.slice(0, count - 1),
      ];
    } else {
      const idx = picked.findIndex((p) => p.reviewId === firstSpanish.reviewId);
      if (idx >= 0) result[idx] = { ...result[idx], isSpanish: true };
    }
  }

  return { reviews: result, showGbpLink };
}
