import siteConfig from '@/config/site.json';
import { getService, getCity, getServiceType, type FAQItem } from './data';
import { ensureTrailingSlash } from '@/lib/utils';

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

// Generate Service schema with audience type
export function generateServiceSchemaWithAudience(options: ServiceSchemaOptions) {
  const { serviceSlug, citySlug, type } = options;
  
  const service = getService(serviceSlug);
  const city = getCity(citySlug);
  const serviceType = getServiceType(type);
  
  if (!service || !city || !serviceType) return null;
  
  const pageUrl = `${baseUrl}/${serviceSlug}/${type}/${citySlug}/`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#Service`,
    name: `${serviceType.name} ${service.name} in ${city.name}, FL`,
    description: `Professional ${type} ${service.name.toLowerCase()} services in ${city.name}. Fast response, certified technicians, insurance assistance.`,
    url: pageUrl,
    serviceType: service.serviceType,
    provider: { '@id': `${baseUrl}#LocalBusiness` },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'State',
        name: 'Florida',
      },
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
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
  
  const pageUrl = `${baseUrl}/${serviceSlug}/${type}/${citySlug}/`;
  const items = [
    { label: 'Home', href: '/' },
    { label: service.name, href: `/${serviceSlug}/` },
    { label: serviceType.name, href: `/${serviceSlug}/${type}/` },
    { label: city.name, href: `/${serviceSlug}/${type}/${citySlug}/` },
  ];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#BreadcrumbList`,
    itemListElement: items.map((item, index) => {
      const listItem: Record<string, unknown> = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: `${baseUrl}${ensureTrailingSlash(item.href)}`,
      };
      
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
      url: `${baseUrl}/${serviceSlug}/#step-${step.step}`,
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
  
  const pageUrl = `${baseUrl}/${serviceSlug}/${type}/${citySlug}/`;
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
// NOTE: LocalBusiness schema is NOT included here because the global LocalBusiness
// is already output in app/layout.tsx. Including it again would cause Google's
// "Review has multiple aggregate ratings" error since both have aggregateRating.
// The Service schema references the global LocalBusiness via @id.
export function generateAllSchemasForServiceCityPage(
  serviceSlug: string,
  citySlug: string,
  type: 'residential' | 'commercial',
  faqs: FAQItem[]
) {
  const schemas: Record<string, unknown>[] = [];
  
  // LocalBusiness schema removed - provided globally by app/layout.tsx
  // The Service schema references it via @id: "${baseUrl}#LocalBusiness"
  
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

