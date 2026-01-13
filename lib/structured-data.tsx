import siteConfig from '@/config/site.json';
import { ensureTrailingSlash } from './utils';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';

/**
 * Get the standard LocalBusiness provider object with address
 * Use this in service schemas to ensure the address field is always included
 */
export function getLocalBusinessProvider() {
  return {
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address,
      addressLocality: 'Doral',
      addressRegion: 'FL',
      postalCode: '33166',
      addressCountry: 'US',
    },
  };
}

export interface StructuredDataOptions {
  type: 'Organization' | 'LocalBusiness' | 'WebSite' | 'Article' | 'Service' | 'BreadcrumbList' | 'Review' | 'AggregateRating';
  data?: Record<string, any>;
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}#Organization`,
    name: siteConfig.name,
    url: baseUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}${siteConfig.logo}`,
    },
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7790 NW 55th St.',
      addressLocality: 'Doral',
      addressRegion: 'FL',
      postalCode: '33166',
      addressCountry: 'US',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.phone,
        contactType: 'Customer Service',
        areaServed: 'US',
        availableLanguage: ['English', 'Spanish'],
        contactOption: 'TollFree',
      },
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.phone,
        contactType: 'Emergency',
        areaServed: 'US',
        availableLanguage: ['English', 'Spanish'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
      },
    ],
    sameAs: Object.values(siteConfig.social).filter(Boolean) as string[],
  };
}

/**
 * Generate LocalBusiness schema
 * Uses multiple types for better categorization: LocalBusiness, EmergencyService, HomeAndConstructionBusiness
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'EmergencyService', 'HomeAndConstructionBusiness'],
    '@id': `${baseUrl}#LocalBusiness`,
    name: siteConfig.name,
    image: `${baseUrl}${siteConfig.logo}`,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}${siteConfig.logo}`,
    },
    description: siteConfig.description,
    url: baseUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7790 NW 55th St.',
      addressLocality: 'Doral',
      addressRegion: 'FL',
      postalCode: '33166',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '25.8195',
      longitude: '-80.3553',
    },
    // 24/7 Emergency Service availability
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    areaServed: [
      {
        '@type': 'State',
        name: 'Florida',
      },
      {
        '@type': 'City',
        name: 'Miami',
      },
      {
        '@type': 'City',
        name: 'Doral',
      },
      {
        '@type': 'City',
        name: 'Fort Lauderdale',
      },
    ],
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Insurance'],
    currenciesAccepted: 'USD',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteConfig.reviews.google.rating.toString(),
      reviewCount: siteConfig.reviews.google.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: Object.values(siteConfig.social).filter(Boolean) as string[],
  };
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Article schema for blog posts
 * Uses BlogPosting for better specificity
 */
export function generateArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
  category,
  wordCount,
  content,
}: {
  title: string;
  description?: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  category?: string;
  wordCount?: number;
  content?: string;
}) {
  // Calculate word count if content provided but no explicit wordCount
  const calculatedWordCount = wordCount || (content ? content.split(/\s+/).length : undefined);
  
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#Article`,
    headline: title,
    description: description || title,
    image: image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}${siteConfig.seo.ogImage}`,
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || datePublished || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      '@id': `${baseUrl}#Organization`,
      name: author || siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}#Organization`,
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}${siteConfig.logo}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: category,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}#WebSite`,
      name: siteConfig.name,
      url: baseUrl,
    },
  };

  // Add wordCount if available
  if (calculatedWordCount) {
    schema.wordCount = calculatedWordCount;
  }

  // Add about property to strengthen topical relevance
  if (category) {
    schema.about = {
      '@type': 'Thing',
      name: category,
    };
  }

  return schema;
}

/**
 * Generate Service schema for service pages
 */
export function generateServiceSchema({
  name,
  description,
  url,
  serviceType,
  areaServed,
  provider,
}: {
  name: string;
  description?: string;
  url: string;
  serviceType?: string;
  areaServed?: string[];
  provider?: {
    name: string;
    telephone: string;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description: description || name,
    url,
    serviceType: serviceType || 'Restoration Service',
    provider: provider || {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      telephone: siteConfig.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address,
        addressLocality: 'Doral',
        addressRegion: 'FL',
        postalCode: '33166',
        addressCountry: 'US',
      },
    },
    areaServed: areaServed || [
      {
        '@type': 'City',
        name: 'Miami',
      },
      {
        '@type': 'City',
        name: 'Doral',
      },
      {
        '@type': 'State',
        name: 'Florida',
      },
    ],
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
    },
  };
}

/**
 * Generate BreadcrumbList schema
 * Google now recommends including the item URL for all items including the last one
 */
export function generateBreadcrumbSchema(items: Array<{ label: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${baseUrl}${ensureTrailingSlash(item.href)}`,
    })),
  };
}

/**
 * Generate AggregateRating schema
 */
export function generateAggregateRatingSchema() {
  const ratings = [
    {
      '@type': 'AggregateRating',
      ratingValue: siteConfig.reviews.google.rating.toString(),
      reviewCount: siteConfig.reviews.google.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
  ];

  return ratings;
}

/**
 * Generate FAQPage schema for pages with FAQ sections
 */
export function generateFAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate VideoObject schema for YouTube embeds
 */
export function generateVideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
}: {
  name: string;
  description?: string;
  thumbnailUrl?: string;
  uploadDate?: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description: description || name,
    thumbnailUrl: thumbnailUrl || `${baseUrl}${siteConfig.seo.ogImage}`,
    uploadDate: uploadDate || new Date().toISOString(),
    duration: duration,
    contentUrl: contentUrl,
    embedUrl: embedUrl,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}${siteConfig.logo}`,
      },
    },
  };
}

/**
 * Generate YouTube VideoObject schema from video ID
 */
export function generateYouTubeVideoSchema({
  videoId,
  title,
  description,
}: {
  videoId: string;
  title: string;
  description?: string;
}) {
  return generateVideoSchema({
    name: title,
    description: description || `${title} - Professional restoration services by ${siteConfig.name}`,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
  });
}

/**
 * Generate CollectionPage schema for blog listing, guides listing, etc.
 */
export function generateCollectionPageSchema({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description?: string;
  url: string;
  items?: Array<{ name: string; url: string }>;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description: description || name,
    url,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}#WebSite`,
      name: siteConfig.name,
      url: baseUrl,
    },
  };

  if (items && items.length > 0) {
    schema.mainEntity = {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    };
  }

  return schema;
}

/**
 * Generate AboutPage schema
 */
export function generateAboutPageSchema({
  url,
  name,
  description,
}: {
  url: string;
  name?: string;
  description?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: name || `About ${siteConfig.name}`,
    description: description || siteConfig.description,
    url,
    mainEntity: {
      '@type': 'Organization',
      '@id': `${baseUrl}#Organization`,
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}#WebSite`,
      name: siteConfig.name,
      url: baseUrl,
    },
  };
}

/**
 * Generate ContactPage schema
 */
export function generateContactPageSchema({
  url,
  name,
  description,
}: {
  url: string;
  name?: string;
  description?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: name || `Contact ${siteConfig.name}`,
    description: description || `Get in touch with ${siteConfig.name} for emergency restoration services.`,
    url,
    mainEntity: {
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}#LocalBusiness`,
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}#WebSite`,
      name: siteConfig.name,
      url: baseUrl,
    },
  };
}

/**
 * Generate WebPage schema for generic pages
 */
export function generateWebPageSchema({
  url,
  name,
  description,
  datePublished,
  dateModified,
}: {
  url: string;
  name: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#WebPage`,
    name,
    description: description || name,
    url,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}#WebSite`,
      name: siteConfig.name,
      url: baseUrl,
    },
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    inLanguage: 'en-US',
  };
}

/**
 * Generate individual Review schema
 */
export function generateReviewSchema({
  author,
  reviewBody,
  rating,
  datePublished,
}: {
  author: string;
  reviewBody: string;
  rating: number;
  datePublished?: string;
}) {
  return {
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: author,
    },
    reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    datePublished: datePublished || new Date().toISOString(),
    itemReviewed: {
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}#LocalBusiness`,
    },
  };
}

/**
 * Generate Reviews page schema with AggregateRating and individual Reviews
 * For use on the testimonials page
 */
export function generateReviewsPageSchema(
  testimonials: Array<{
    name: string;
    content: string;
    rating: number;
    role?: string;
  }>
) {
  if (!testimonials || testimonials.length === 0) return null;

  // Calculate aggregate rating
  const totalRating = testimonials.reduce((sum, t) => sum + t.rating, 0);
  const averageRating = (totalRating / testimonials.length).toFixed(1);

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}#LocalBusiness`,
    name: siteConfig.name,
    image: `${baseUrl}${siteConfig.logo}`,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7790 NW 55th St.',
      addressLocality: 'Doral',
      addressRegion: 'FL',
      postalCode: '33166',
      addressCountry: 'US',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating,
      reviewCount: testimonials.length,
      bestRating: '5',
      worstRating: '1',
    },
    review: testimonials.map((testimonial) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: testimonial.name,
      },
      reviewBody: testimonial.content,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: testimonial.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
    })),
  };
}

/**
 * Render structured data as JSON-LD script tag
 */
export function StructuredData({ data }: { data: Record<string, any> | Record<string, any>[] }) {
  const jsonData = Array.isArray(data) ? data : [data];
  
  return (
    <>
      {jsonData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

