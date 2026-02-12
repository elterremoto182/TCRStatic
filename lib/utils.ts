import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Metadata } from 'next';
import siteConfig from '@/config/site.json';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Ensures a path has a trailing slash, except for root path
 * @param path - The path to normalize
 * @returns Path with trailing slash (except root)
 */
export function ensureTrailingSlash(path: string): string {
  // Root path should never have trailing slash
  if (path === '' || path === '/') {
    return '/';
  }
  // Add trailing slash if not present
  return path.endsWith('/') ? path : `${path}/`;
}

/**
 * Truncates meta descriptions to fit within Google's ~155-160 character display limit.
 * Tries to break at sentence boundaries or word boundaries.
 */
export function truncateMetaDescription(description: string, maxLength: number = 155): string {
  if (description.length <= maxLength) {
    return description;
  }

  // Try to find a sentence break before maxLength
  const sentenceBreak = description.lastIndexOf('. ', maxLength - 3);
  if (sentenceBreak > maxLength * 0.6) {
    return description.substring(0, sentenceBreak + 1);
  }

  // Otherwise, break at the last word before maxLength
  const truncated = description.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > maxLength * 0.7) {
    return truncated.substring(0, lastSpace) + '...';
  }

  // Fallback: hard truncate
  return truncated + '...';
}

/**
 * Truncates meta titles to fit within Google's ~60 character display limit.
 * Removes branding suffixes in order of priority:
 * 1. " | Total Care Restoration"
 * 2. " | South Florida"
 * If still too long, truncates at the last pipe separator.
 */
export function truncateMetaTitle(title: string, maxLength: number = 60): string {
  if (title.length <= maxLength) {
    return title;
  }

  // First, try removing " | Total Care Restoration"
  let truncated = title.replace(/ \| Total Care Restoration$/, '');
  if (truncated.length <= maxLength) {
    return truncated;
  }

  // Next, try removing " | South Florida"
  truncated = truncated.replace(/ \| South Florida$/, '');
  if (truncated.length <= maxLength) {
    return truncated;
  }

  // If still too long, find the last pipe and truncate there
  const lastPipeIndex = truncated.lastIndexOf(' | ');
  if (lastPipeIndex > 0 && lastPipeIndex <= maxLength) {
    return truncated.substring(0, lastPipeIndex);
  }

  // Final fallback: hard truncate (shouldn't normally reach here)
  return truncated.substring(0, maxLength);
}

/**
 * Supported locales for hreflang tags
 * When Spanish content is added, pages should specify locale: 'es' and the
 * corresponding English page path in alternateLocalePaths
 */
export type SupportedLocale = 'en' | 'es';

export interface LocaleAlternate {
  locale: SupportedLocale;
  path: string;
}

export function generatePageMetadata({
  title,
  description,
  keywords,
  path = '',
  ogImage,
  locale = 'en',
  alternateLocales,
}: {
  title: string;
  description?: string;
  keywords?: string | string[];
  path?: string;
  ogImage?: string;
  /** Current page locale (default: 'en') */
  locale?: SupportedLocale;
  /** Alternate locale versions of this page for hreflang tags */
  alternateLocales?: LocaleAlternate[];
}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';
  // Root path: no trailing slash; all other paths: trailing slash
  const url = (path === '' || path === '/')
    ? baseUrl
    : `${baseUrl}${ensureTrailingSlash(path)}`;
  const finalDescription = description || siteConfig.seo.description;
  const finalOgImage = ogImage || siteConfig.seo.ogImage;
  const ogImageUrl = finalOgImage.startsWith('http') 
    ? finalOgImage 
    : `${baseUrl}${finalOgImage}`;
  
  const keywordsArray = Array.isArray(keywords) 
    ? keywords 
    : keywords 
      ? [keywords] 
      : siteConfig.seo.keywords 
        ? [siteConfig.seo.keywords] 
        : [];

  // Build language alternates for hreflang tags
  // Only output hreflang when there are actual alternate language versions
  // Structure: { 'en': url, 'es': url, 'x-default': url }
  let languages: Record<string, string> | undefined = undefined;
  
  // Only build hreflang tags if alternate locales are provided
  if (alternateLocales && alternateLocales.length > 0) {
    languages = {};
    
    // Add current page as its locale (self-referencing hreflang)
    languages[locale] = url;
    
    // Add x-default pointing to the English version (or current if English)
    if (locale === 'en') {
      languages['x-default'] = url;
    }
    
    // Add alternate locale versions
    for (const alt of alternateLocales) {
      const altPath = ensureTrailingSlash(alt.path);
      const altUrl = `${baseUrl}${altPath}`;
      languages[alt.locale] = altUrl;
      
      // If this alternate is English, use it as x-default
      if (alt.locale === 'en') {
        languages['x-default'] = altUrl;
      }
    }
  }

  return {
    title,
    description: finalDescription,
    keywords: keywordsArray.length > 0 ? keywordsArray.join(', ') : undefined,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description: finalDescription,
      url,
      siteName: siteConfig.name,
      locale: locale === 'es' ? 'es_US' : 'en_US',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: finalDescription,
      images: [ogImageUrl],
    },
  };
}
