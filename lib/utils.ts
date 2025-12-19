import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Metadata } from 'next';
import siteConfig from '@/config/site.json';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Truncates meta titles to fit within the recommended 70 character limit.
 * Removes branding suffixes in order of priority:
 * 1. " | Total Care Restoration"
 * 2. " | South Florida"
 * If still too long, truncates at the last pipe separator.
 */
export function truncateMetaTitle(title: string, maxLength: number = 70): string {
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

export function generatePageMetadata({
  title,
  description,
  keywords,
  path = '',
  ogImage,
}: {
  title: string;
  description?: string;
  keywords?: string | string[];
  path?: string;
  ogImage?: string;
}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';
  const url = `${baseUrl}${path}`;
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

  return {
    title,
    description: finalDescription,
    keywords: keywordsArray.length > 0 ? keywordsArray.join(', ') : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: finalDescription,
      url,
      siteName: siteConfig.name,
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
