import siteConfig from '@/config/site.json';
import { getService, getCity, getServiceType, type FAQItem } from './data';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';

// Types for structured data
export interface ServiceSchemaOptions {
  serviceSlug: string;
  citySlug: string;
  type: 'residential' | 'commercial';
}

export interface FAQSchemaOptions {
  faqs: FAQItem[];
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

// Generate LocalBusiness schema with geo coordinates for city pages
export function generateLocalBusinessSchemaForCity(
  citySlug: string,
  serviceSlug: string,
  type: 'residential' | 'commercial'
) {
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  const serviceType = getServiceType(type);
  
  if (!city || !service || !serviceType) return null;
  
  const pageUrl = `${baseUrl}/${serviceSlug}/${type}/${citySlug}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'EmergencyService', 'HomeAndConstructionBusiness'],
    '@id': `${baseUrl}#LocalBusiness`,
    name: siteConfig.name,
    description: `Professional ${type} ${service.name.toLowerCase()} services in ${city.name}, ${city.state}. ${city.responseTime} response time. Licensed, bonded & insured.`,
    url: pageUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${baseUrl}${siteConfig.logo}`,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}${siteConfig.logo}`,
    },
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
      latitude: city.coordinates.lat,
      longitude: city.coordinates.lng,
    },
    areaServed: [
      {
        '@type': 'City',
        name: city.name,
        containedInPlace: {
          '@type': 'AdministrativeArea',
          name: city.county,
        },
      },
      ...city.neighborhoods.slice(0, 5).map(neighborhood => ({
        '@type': 'Neighborhood',
        name: neighborhood,
        containedInPlace: {
          '@type': 'City',
          name: city.name,
        },
      })),
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
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

// Generate Service schema with audience type
export function generateServiceSchemaWithAudience(options: ServiceSchemaOptions) {
  const { serviceSlug, citySlug, type } = options;
  
  const service = getService(serviceSlug);
  const city = getCity(citySlug);
  const serviceType = getServiceType(type);
  
  if (!service || !city || !serviceType) return null;
  
  const pageUrl = `${baseUrl}/${serviceSlug}/${type}/${citySlug}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#Service`,
    name: `${serviceType.name} ${service.name} in ${city.name}, FL`,
    description: `Professional ${type} ${service.name.toLowerCase()} services in ${city.name}. Fast response, certified technicians, insurance assistance.`,
    url: pageUrl,
    serviceType: service.serviceType,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}#LocalBusiness`,
      name: siteConfig.name,
      telephone: siteConfig.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '7790 NW 55th St.',
        addressLocality: 'Doral',
        addressRegion: 'FL',
        postalCode: '33166',
        addressCountry: 'US',
      },
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'State',
        name: 'Florida',
      },
    },
    audience: {
      '@type': 'Audience',
      audienceType: serviceType.audienceType,
      geographicArea: {
        '@type': 'City',
        name: city.name,
      },
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: pageUrl,
      servicePhone: siteConfig.phone,
      availableLanguage: ['English', 'Spanish'],
    },
    termsOfService: `${baseUrl}/privacy-policy`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      eligibleRegion: {
        '@type': 'State',
        name: 'Florida',
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} Services`,
      itemListElement: service.process.map((step, index) => ({
        '@type': 'OfferCatalogItem',
        position: index + 1,
        name: step.title,
        description: step.description,
      })),
    },
  };
}

// Generate FAQ schema
export function generateFAQSchema(options: FAQSchemaOptions) {
  const { faqs } = options;
  
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

// Generate BreadcrumbList schema
export function generateBreadcrumbSchemaForServiceCity(
  serviceSlug: string,
  citySlug: string,
  type: 'residential' | 'commercial'
) {
  const service = getService(serviceSlug);
  const city = getCity(citySlug);
  const serviceType = getServiceType(type);
  
  if (!service || !city || !serviceType) return null;
  
  const items = [
    { label: 'Home', href: '/' },
    { label: service.name, href: `/${serviceSlug}` },
    { label: serviceType.name, href: `/${serviceSlug}/${type}` },
    { label: city.name, href: `/${serviceSlug}/${type}/${citySlug}` },
  ];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const isLast = index === items.length - 1;
      const listItem: Record<string, unknown> = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
      };
      
      // Only add 'item' for non-last items
      if (!isLast) {
        listItem.item = `${baseUrl}${item.href}`;
      }
      
      return listItem;
    }),
  };
}

// Generate HowTo schema for service process
export function generateHowToSchema(serviceSlug: string) {
  const service = getService(serviceSlug);
  
  if (!service) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `${service.name} Process`,
    description: `Our professional ${service.name.toLowerCase()} process ensures thorough restoration of your property.`,
    totalTime: 'P3D', // Approximate 3 days
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: 'Varies',
    },
    step: service.process.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
      url: `${baseUrl}/${serviceSlug}#step-${step.step}`,
    })),
  };
}

// Generate WebPage schema
export function generateWebPageSchema(
  serviceSlug: string,
  citySlug: string,
  type: 'residential' | 'commercial'
) {
  const service = getService(serviceSlug);
  const city = getCity(citySlug);
  const serviceType = getServiceType(type);
  
  if (!service || !city || !serviceType) return null;
  
  const pageUrl = `${baseUrl}/${serviceSlug}/${type}/${citySlug}`;
  const pageName = `${serviceType.name} ${service.name} in ${city.name}, FL`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#WebPage`,
    url: pageUrl,
    name: pageName,
    description: `Professional ${type} ${service.name.toLowerCase()} in ${city.name}. ${city.responseTime} response. Licensed & insured.`,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}#WebSite`,
      name: siteConfig.name,
      url: baseUrl,
    },
    about: {
      '@type': 'Service',
      '@id': `${pageUrl}#Service`,
    },
    breadcrumb: {
      '@id': `${pageUrl}#BreadcrumbList`,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${baseUrl}${siteConfig.logo}`,
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    inLanguage: 'en-US',
    potentialAction: [
      {
        '@type': 'ReadAction',
        target: pageUrl,
      },
      {
        '@type': 'CommunicateAction',
        target: `tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`,
      },
    ],
  };
}

// Generate all schemas for a service city page
export function generateAllSchemasForServiceCityPage(
  serviceSlug: string,
  citySlug: string,
  type: 'residential' | 'commercial',
  faqs: FAQItem[]
) {
  const schemas: Record<string, unknown>[] = [];
  
  const localBusiness = generateLocalBusinessSchemaForCity(citySlug, serviceSlug, type);
  if (localBusiness) schemas.push(localBusiness);
  
  const service = generateServiceSchemaWithAudience({ serviceSlug, citySlug, type });
  if (service) schemas.push(service);
  
  const faqSchema = generateFAQSchema({ faqs });
  if (faqSchema) schemas.push(faqSchema);
  
  const breadcrumbs = generateBreadcrumbSchemaForServiceCity(serviceSlug, citySlug, type);
  if (breadcrumbs) schemas.push(breadcrumbs);
  
  const webPage = generateWebPageSchema(serviceSlug, citySlug, type);
  if (webPage) schemas.push(webPage);
  
  return schemas;
}

// Export individual schema as JSON-LD string
export function schemaToJsonLd(schema: Record<string, unknown>): string {
  return JSON.stringify(schema);
}

// Export all schemas as combined JSON-LD
export function schemasToJsonLd(schemas: Record<string, unknown>[]): string {
  if (schemas.length === 1) {
    return JSON.stringify(schemas[0]);
  }
  
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': schemas.map(schema => {
      // Remove @context from individual schemas when combining
      const { '@context': _, ...rest } = schema;
      return rest;
    }),
  });
}

