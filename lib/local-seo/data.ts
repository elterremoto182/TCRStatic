import servicesConfig from '@/config/services.json';
import citiesConfig from '@/config/cities.json';
import causesConfig from '@/config/causes.json';
import faqsConfig from '@/config/faqs.json';
import localSeoConfig from '@/config/local-seo.json';

// Types
export interface BodyContent {
  overview: string;
  commonCauses: string[];
  preventionTips: string[];
  whyActFast: string;
  healthRisks?: string[];
}

export interface TypeSpecificContent {
  challenges: string;
  tips: string[];
}

export interface ServiceImages {
  hero: string;
  overview: string;
  process: string[];
  gallery: string[];
}

export interface MainPageFAQ {
  question: string;
  answer: string;
}

export interface MainPageContent {
  generalFaqs: MainPageFAQ[];
}

export interface ServiceVideo {
  youtubeId: string;
  title: string;
}

export interface ServiceConfig {
  name: string;
  shortName: string;
  icon: string;
  phase: number;
  metaTitleTemplate: string;
  metaDescTemplate: string;
  h1Template: string;
  serviceType: string;
  keywords: string[];
  process: ProcessStep[];
  causes: string[];
  bodyContent?: BodyContent;
  residentialContent?: TypeSpecificContent;
  commercialContent?: TypeSpecificContent;
  images?: ServiceImages;
  video?: ServiceVideo;
  mainPageContent?: MainPageContent;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface CityTypeContent {
  intro: string;
  extendedContent?: string;
  localChallenges?: string;
  focusPoints: string[];
}

export interface CityConfig {
  name: string;
  county: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  neighborhoods: string[];
  zipCodes: string[];
  responseTime: string;
  localFactors: {
    climate: string;
    risks: string[];
    characteristics: string;
  };
  residential: CityTypeContent;
  commercial: CityTypeContent;
  video?: Record<string, ServiceVideo>; // Optional city-specific video overrides by service slug
}

export interface CauseBodyContent {
  overview: string;
  whyActFast: string;
  commonCauses: string[];
  preventionTips: string[];
  warningSignals: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface CauseConfig {
  id: string;
  name: string;
  slug: string;
  description: string;
  urgency: 'emergency' | 'high' | 'moderate';
  seasonality: string[];
  parentServices: string[];
  bodyContent?: CauseBodyContent;
}

export interface ServiceTypeConfig {
  name: string;
  slug: string;
  audienceType: string;
  focusAreas: string[];
  metaPrefix: string;
  ctaText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// Data access functions
export function getAllServices(): Record<string, ServiceConfig> {
  return servicesConfig as Record<string, ServiceConfig>;
}

export function getService(serviceSlug: string): ServiceConfig | null {
  const services = getAllServices();
  return services[serviceSlug] || null;
}

/**
 * Get video configuration for a service, optionally with city-specific override
 * @param serviceSlug - The service slug (e.g., 'mold-remediation')
 * @param citySlug - Optional city slug for city-specific video override
 * @returns ServiceVideo configuration or null if no video configured
 */
export function getServiceVideo(serviceSlug: string, citySlug?: string): ServiceVideo | null {
  // Check for city-specific video override first
  if (citySlug) {
    const city = getCity(citySlug);
    if (city?.video?.[serviceSlug]) {
      return city.video[serviceSlug];
    }
  }
  
  // Fall back to service default video
  const service = getService(serviceSlug);
  return service?.video || null;
}

export function getPhase1Services(): Record<string, ServiceConfig> {
  const services = getAllServices();
  return Object.fromEntries(
    Object.entries(services).filter(([, service]) => service.phase === 1)
  );
}

export function getPhase2Services(): Record<string, ServiceConfig> {
  const services = getAllServices();
  return Object.fromEntries(
    Object.entries(services).filter(([, service]) => service.phase === 2)
  );
}

export function getAllCities(): Record<string, CityConfig> {
  return citiesConfig as Record<string, CityConfig>;
}

export function getCity(citySlug: string): CityConfig | null {
  const cities = getAllCities();
  return cities[citySlug] || null;
}

export function getCityByName(cityName: string): { slug: string; config: CityConfig } | null {
  const cities = getAllCities();
  for (const [slug, config] of Object.entries(cities)) {
    if (config.name.toLowerCase() === cityName.toLowerCase()) {
      return { slug, config };
    }
  }
  return null;
}

export function getAllCauses(): Record<string, CauseConfig[]> {
  return causesConfig as Record<string, CauseConfig[]>;
}

export function getCausesByCategory(category: string): CauseConfig[] {
  const causes = getAllCauses();
  return causes[category] || [];
}

export function getCauseBySlug(slug: string): CauseConfig | null {
  const allCauses = getAllCauses();
  for (const category of Object.values(allCauses)) {
    const cause = category.find(c => c.slug === slug);
    if (cause) return cause;
  }
  return null;
}

export function getCausesForService(serviceSlug: string): CauseConfig[] {
  const allCauses = getAllCauses();
  const causes: CauseConfig[] = [];
  
  for (const category of Object.values(allCauses)) {
    for (const cause of category) {
      if (cause.parentServices.includes(serviceSlug)) {
        causes.push(cause);
      }
    }
  }
  
  return causes;
}

export function getServiceTypes(): Record<string, ServiceTypeConfig> {
  return localSeoConfig.serviceTypes as Record<string, ServiceTypeConfig>;
}

export function getServiceType(typeSlug: string): ServiceTypeConfig | null {
  const types = getServiceTypes();
  return types[typeSlug] || null;
}

export function getFAQs(serviceSlug: string, type: 'residential' | 'commercial'): FAQItem[] {
  const faqs = faqsConfig as Record<string, Record<string, FAQItem[]>>;
  return faqs[serviceSlug]?.[type] || [];
}

// Template rendering helpers
export function renderTemplate(template: string, variables: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return result;
}

export function getServiceCityMeta(
  serviceSlug: string,
  citySlug: string,
  type: 'residential' | 'commercial'
): { title: string; description: string; h1: string } | null {
  const service = getService(serviceSlug);
  const city = getCity(citySlug);
  const serviceType = getServiceType(type);
  
  if (!service || !city || !serviceType) return null;
  
  const variables = {
    type: serviceType.name,
    type_lower: serviceType.name.toLowerCase(),
    city: city.name,
    county: city.county,
    responseTime: city.responseTime,
  };
  
  return {
    title: renderTemplate(service.metaTitleTemplate, variables),
    description: renderTemplate(service.metaDescTemplate, variables),
    h1: renderTemplate(service.h1Template, variables),
  };
}

export function getCityIntro(
  citySlug: string,
  type: 'residential' | 'commercial'
): string | null {
  const city = getCity(citySlug);
  if (!city) return null;
  return city[type].intro;
}

export function getCityFocusPoints(
  citySlug: string,
  type: 'residential' | 'commercial'
): string[] {
  const city = getCity(citySlug);
  if (!city) return [];
  return city[type].focusPoints;
}

export function getPopulatedFAQs(
  serviceSlug: string,
  citySlug: string,
  type: 'residential' | 'commercial'
): FAQItem[] {
  const faqs = getFAQs(serviceSlug, type);
  const city = getCity(citySlug);
  
  if (!city) return [];
  
  return faqs.map(faq => ({
    question: renderTemplate(faq.question, { 
      city: city.name,
      responseTime: city.responseTime,
    }),
    answer: renderTemplate(faq.answer, { 
      city: city.name,
      responseTime: city.responseTime,
    }),
  }));
}

// Static params generators for Next.js
export function generateServiceCityParams(): { service: string; type: string; city: string }[] {
  const services = getPhase1Services();
  const cities = getAllCities();
  const types = ['residential', 'commercial'];
  
  const params: { service: string; type: string; city: string }[] = [];
  
  for (const serviceSlug of Object.keys(services)) {
    for (const type of types) {
      for (const citySlug of Object.keys(cities)) {
        params.push({
          service: serviceSlug,
          type,
          city: citySlug,
        });
      }
    }
  }
  
  return params;
}

export function generateCausePageParams(): { cause: string; city: string }[] {
  const causes = getAllCauses();
  const cities = getAllCities();
  
  const params: { cause: string; city: string }[] = [];
  
  for (const category of Object.values(causes)) {
    for (const cause of category) {
      for (const citySlug of Object.keys(cities)) {
        params.push({
          cause: cause.slug,
          city: citySlug,
        });
      }
    }
  }
  
  return params;
}

// Internal linking helpers
export function getRelatedCityPages(
  currentService: string,
  currentCity: string,
  currentType: 'residential' | 'commercial',
  limit: number = 3
): { service: string; city: string; type: string; name: string }[] {
  const services = getPhase1Services();
  const city = getCity(currentCity);
  
  if (!city) return [];
  
  const related: { service: string; city: string; type: string; name: string }[] = [];
  
  // Get other services in the same city
  for (const [serviceSlug, service] of Object.entries(services)) {
    if (serviceSlug !== currentService) {
      related.push({
        service: serviceSlug,
        city: currentCity,
        type: currentType,
        name: `${service.name} in ${city.name}`,
      });
    }
    if (related.length >= limit) break;
  }
  
  return related;
}

export function getRelatedCausePages(
  serviceSlug: string,
  citySlug: string,
  limit: number = 3
): { cause: CauseConfig; cityName: string }[] {
  const causes = getCausesForService(serviceSlug);
  const city = getCity(citySlug);
  
  if (!city) return [];
  
  return causes.slice(0, limit).map(cause => ({
    cause,
    cityName: city.name,
  }));
}

// Breadcrumb helpers
export function getServiceCityBreadcrumbs(
  serviceSlug: string,
  citySlug: string,
  type: 'residential' | 'commercial'
): { label: string; href: string }[] {
  const service = getService(serviceSlug);
  const city = getCity(citySlug);
  const serviceType = getServiceType(type);
  
  if (!service || !city || !serviceType) return [];
  
  return [
    { label: service.name, href: `/${serviceSlug}` },
    { label: serviceType.name, href: `/${serviceSlug}/${type}` },
    { label: city.name, href: `/${serviceSlug}/${type}/${citySlug}` },
  ];
}
