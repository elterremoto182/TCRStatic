import {
  getService,
  getCity,
  getServiceType,
  getCausesForService,
  getPopulatedFAQs,
  type ServiceConfig,
  type CityConfig,
  type ServiceTypeConfig,
  type CauseConfig,
  type FAQItem,
  type ServiceImages,
} from './data';

// Content block types
export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaPhone: string;
  backgroundType: 'service' | 'city';
}

export interface IntroContent {
  title: string;
  content: string;
  extendedContent?: string;
  localChallenges?: string;
  focusPoints: string[];
}

export interface ServiceOverviewContent {
  title: string;
  overview: string;
  whyActFast: string;
  healthRisks?: string[];
}

export interface PreventionTipsContent {
  title: string;
  tips: string[];
}

export interface CommonCausesListContent {
  title: string;
  causes: string[];
}

export interface ProcessContent {
  title: string;
  steps: {
    step: number;
    title: string;
    description: string;
  }[];
}

export interface CausesContent {
  title: string;
  causes: {
    name: string;
    slug: string;
    description: string;
    urgency: string;
  }[];
}

export interface NeighborhoodsContent {
  title: string;
  neighborhoods: string[];
  zipCodes: string[];
}

export interface TrustSignalsContent {
  title: string;
  signals: {
    icon: string;
    text: string;
  }[];
}

export interface FAQContent {
  title: string;
  faqs: FAQItem[];
}

export interface CTAContent {
  headline: string;
  subheadline: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton: {
    text: string;
    href: string;
  };
}

export interface InternalLinksContent {
  title: string;
  links: {
    label: string;
    href: string;
    description?: string;
  }[];
}

export interface ImagesContent {
  hero?: string;
  overview?: string;
  process: string[];
  gallery: string[];
}

export interface PageContent {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: HeroContent;
  intro: IntroContent;
  serviceOverview: ServiceOverviewContent;
  preventionTips: PreventionTipsContent;
  commonCausesList: CommonCausesListContent;
  process: ProcessContent;
  causes: CausesContent;
  neighborhoods: NeighborhoodsContent;
  trustSignals: TrustSignalsContent;
  faq: FAQContent;
  cta: CTAContent;
  internalLinks: InternalLinksContent;
  images: ImagesContent;
}

// Template generators
export function generateHeroContent(
  service: ServiceConfig,
  city: CityConfig,
  serviceType: ServiceTypeConfig
): HeroContent {
  const typePrefix = serviceType.name;
  
  return {
    headline: `${typePrefix} ${service.name} in ${city.name}, FL`,
    subheadline: `Fast, professional ${service.shortName.toLowerCase()} restoration for ${serviceType.name.toLowerCase()} properties in ${city.name}. Available 24/7 with ${city.responseTime} response time.`,
    ctaText: serviceType.ctaText,
    ctaPhone: '(786) 610-6317',
    backgroundType: 'service',
  };
}

export function generateIntroContent(
  service: ServiceConfig,
  city: CityConfig,
  type: 'residential' | 'commercial'
): IntroContent {
  const cityContent = city[type];
  
  return {
    title: `${type === 'residential' ? 'Protecting' : 'Serving'} ${city.name} ${type === 'residential' ? 'Homes' : 'Businesses'}`,
    content: cityContent.intro,
    extendedContent: cityContent.extendedContent,
    localChallenges: cityContent.localChallenges,
    focusPoints: cityContent.focusPoints,
  };
}

export function generateServiceOverviewContent(
  service: ServiceConfig,
  city: CityConfig,
  type: 'residential' | 'commercial'
): ServiceOverviewContent {
  const bodyContent = service.bodyContent;
  const typeContent = type === 'residential' ? service.residentialContent : service.commercialContent;
  
  // Combine service overview with type-specific challenges
  const overview = bodyContent?.overview || '';
  const typeSpecific = typeContent?.challenges || '';
  const combinedOverview = overview + (typeSpecific ? `\n\n${typeSpecific}` : '');
  
  return {
    title: `Understanding ${service.name} in ${city.name}`,
    overview: combinedOverview,
    whyActFast: bodyContent?.whyActFast || `Time is critical when dealing with ${service.shortName.toLowerCase()}. Quick professional response minimizes damage and restoration costs.`,
    healthRisks: bodyContent?.healthRisks,
  };
}

export function generatePreventionTipsContent(
  service: ServiceConfig,
  type: 'residential' | 'commercial'
): PreventionTipsContent {
  const bodyContent = service.bodyContent;
  const typeContent = type === 'residential' ? service.residentialContent : service.commercialContent;
  
  // Combine general prevention tips with type-specific tips
  const generalTips = bodyContent?.preventionTips || [];
  const typeTips = typeContent?.tips || [];
  
  return {
    title: `${service.shortName} Prevention Tips`,
    tips: [...generalTips.slice(0, 4), ...typeTips.slice(0, 3)], // Limit to 7 total tips
  };
}

export function generateCommonCausesListContent(
  service: ServiceConfig,
  city: CityConfig
): CommonCausesListContent {
  const bodyContent = service.bodyContent;
  
  return {
    title: `Common Causes of ${service.shortName} in ${city.name}`,
    causes: bodyContent?.commonCauses || [],
  };
}

export function generateProcessContent(service: ServiceConfig): ProcessContent {
  return {
    title: `Our ${service.shortName} Restoration Process`,
    steps: service.process,
  };
}

export function generateCausesContent(
  service: ServiceConfig,
  city: CityConfig,
  causes: CauseConfig[]
): CausesContent {
  // Filter causes based on city characteristics
  const relevantCauses = filterCausesByCity(causes, city);
  
  return {
    title: `Common ${service.shortName} Causes in ${city.name}`,
    causes: relevantCauses.map(cause => ({
      name: cause.name,
      slug: cause.slug,
      description: cause.description,
      urgency: cause.urgency,
    })),
  };
}

export function generateNeighborhoodsContent(city: CityConfig): NeighborhoodsContent {
  return {
    title: `Serving ${city.name} Neighborhoods`,
    neighborhoods: city.neighborhoods,
    zipCodes: city.zipCodes.slice(0, 10), // Limit to first 10 zip codes
  };
}

export function generateTrustSignalsContent(
  city: CityConfig,
  type: 'residential' | 'commercial'
): TrustSignalsContent {
  const baseSignals = [
    { icon: 'Clock', text: `${city.responseTime} response time in ${city.name}` },
    { icon: 'Shield', text: 'Licensed, bonded & insured in Florida' },
    { icon: 'Award', text: 'IICRC certified technicians' },
    { icon: 'FileCheck', text: 'Direct insurance billing available' },
  ];
  
  if (type === 'commercial') {
    baseSignals.push(
      { icon: 'Building2', text: '24/7 service including nights & weekends' },
      { icon: 'Users', text: 'Dedicated commercial project managers' }
    );
  } else {
    baseSignals.push(
      { icon: 'Home', text: 'Family-owned & operated since 2015' },
      { icon: 'Heart', text: 'Serving South Florida families' }
    );
  }
  
  return {
    title: `Why ${city.name} ${type === 'residential' ? 'Homeowners' : 'Businesses'} Trust Us`,
    signals: baseSignals,
  };
}

export function generateFAQContent(
  service: ServiceConfig,
  city: CityConfig,
  faqs: FAQItem[]
): FAQContent {
  return {
    title: `${service.name} FAQs for ${city.name}`,
    faqs: faqs.slice(0, 6), // Expanded to 6 FAQs for more content
  };
}

export function generateCTAContent(
  service: ServiceConfig,
  city: CityConfig,
  type: 'residential' | 'commercial'
): CTAContent {
  const typeLabel = type === 'residential' ? 'Home' : 'Business';
  
  return {
    headline: `Need ${service.shortName} Help in ${city.name}?`,
    subheadline: `Our ${type} restoration team is ready to respond 24/7. Get your free ${typeLabel.toLowerCase()} assessment today.`,
    primaryButton: {
      text: 'Call Now - 24/7',
      href: 'tel:7866106317',
    },
    secondaryButton: {
      text: `Get Free ${typeLabel} Assessment`,
      href: '/#contact',
    },
  };
}

export function generateInternalLinksContent(
  serviceSlug: string,
  citySlug: string,
  type: 'residential' | 'commercial',
  service: ServiceConfig,
  city: CityConfig,
  causes: CauseConfig[]
): InternalLinksContent {
  const links: { label: string; href: string; description?: string }[] = [];
  
  // Link to parent service page
  links.push({
    label: service.name,
    href: `/${serviceSlug}`,
    description: `Learn more about our ${service.name.toLowerCase()} services`,
  });
  
  // Link to type hub
  links.push({
    label: `${type === 'residential' ? 'Residential' : 'Commercial'} Services`,
    href: `/${serviceSlug}/${type}`,
    description: `All ${type} ${service.shortName.toLowerCase()} services`,
  });
  
  // Links to cause pages (limit to 3)
  const relevantCauses = filterCausesByCity(causes, city).slice(0, 3);
  for (const cause of relevantCauses) {
    links.push({
      label: `${cause.name} in ${city.name}`,
      href: `/problems/${cause.slug}/${citySlug}`,
      description: cause.description,
    });
  }
  
  return {
    title: 'Related Services',
    links,
  };
}

export function generateImagesContent(service: ServiceConfig): ImagesContent {
  const serviceImages = service.images;
  
  return {
    hero: serviceImages?.hero,
    overview: serviceImages?.overview,
    process: serviceImages?.process || [],
    gallery: serviceImages?.gallery || [],
  };
}

// Helper to filter causes based on city characteristics
function filterCausesByCity(causes: CauseConfig[], city: CityConfig): CauseConfig[] {
  const cityRisks = city.localFactors.risks.map(r => r.toLowerCase());
  const cityCharacteristics = city.localFactors.characteristics.toLowerCase();
  
  // Score causes based on relevance to city
  const scoredCauses = causes.map(cause => {
    let score = 0;
    const causeName = cause.name.toLowerCase();
    const causeDesc = cause.description.toLowerCase();
    
    // Check if cause matches city risks
    for (const risk of cityRisks) {
      if (risk.includes(causeName) || causeName.includes(risk.split(' ')[0])) {
        score += 3;
      }
    }
    
    // Hurricane-related causes score higher for coastal cities
    if (
      (causeName.includes('hurricane') || causeName.includes('flood') || causeName.includes('storm')) &&
      (cityCharacteristics.includes('coastal') || cityCharacteristics.includes('waterway') || cityCharacteristics.includes('barrier'))
    ) {
      score += 2;
    }
    
    // AC-related causes score higher for humid areas
    if (causeName.includes('ac') && city.localFactors.climate.includes('humid')) {
      score += 2;
    }
    
    // Default score for relevance
    score += 1;
    
    return { cause, score };
  });
  
  // Sort by score and return causes
  return scoredCauses
    .sort((a, b) => b.score - a.score)
    .map(({ cause }) => cause);
}

// Main page content generator
export function generatePageContent(
  serviceSlug: string,
  citySlug: string,
  type: 'residential' | 'commercial'
): PageContent | null {
  const service = getService(serviceSlug);
  const city = getCity(citySlug);
  const serviceType = getServiceType(type);
  
  if (!service || !city || !serviceType) {
    return null;
  }
  
  const causes = getCausesForService(serviceSlug);
  const faqs = getPopulatedFAQs(serviceSlug, citySlug, type);
  
  // Generate meta
  const meta = {
    title: `${serviceType.name} ${service.name} in ${city.name}, FL | Total Care Restoration`,
    description: `Professional ${type} ${service.name.toLowerCase()} in ${city.name}. ${city.responseTime} response time. Licensed, insured & IICRC certified. Call 24/7.`,
    keywords: [
      // Highest volume: "[service] [city]" pattern
      ...service.keywords.map(k => `${k} ${city.name}`),
      // High volume: "[city] [service]" pattern  
      `${city.name} ${service.shortName.toLowerCase()}`,
      `${city.name} ${service.name.toLowerCase()}`,
      // With type qualifier at end for specific targeting
      ...service.keywords.slice(0, 2).map(k => `${k} ${city.name} ${type}`),
      // County-level keywords
      `${service.shortName.toLowerCase()} ${city.county}`,
    ],
  };
  
  return {
    meta,
    hero: generateHeroContent(service, city, serviceType),
    intro: generateIntroContent(service, city, type),
    serviceOverview: generateServiceOverviewContent(service, city, type),
    preventionTips: generatePreventionTipsContent(service, type),
    commonCausesList: generateCommonCausesListContent(service, city),
    process: generateProcessContent(service),
    causes: generateCausesContent(service, city, causes),
    neighborhoods: generateNeighborhoodsContent(city),
    trustSignals: generateTrustSignalsContent(city, type),
    faq: generateFAQContent(service, city, faqs),
    cta: generateCTAContent(service, city, type),
    internalLinks: generateInternalLinksContent(
      serviceSlug,
      citySlug,
      type,
      service,
      city,
      causes
    ),
    images: generateImagesContent(service),
  };
}

// Service hub page content generator
export function generateServiceHubContent(serviceSlug: string): {
  meta: { title: string; description: string };
  headline: string;
  description: string;
  residentialCTA: string;
  commercialCTA: string;
} | null {
  const service = getService(serviceSlug);
  if (!service) return null;
  
  return {
    meta: {
      title: `${service.name} Services | Total Care Restoration`,
      description: `Professional ${service.name.toLowerCase()} services for residential and commercial properties in South Florida. 24/7 emergency response. Licensed & insured.`,
    },
    headline: service.name,
    description: `Total Care Restoration provides comprehensive ${service.name.toLowerCase()} services for both residential homeowners and commercial property managers throughout South Florida.`,
    residentialCTA: 'Residential Services',
    commercialCTA: 'Commercial Services',
  };
}

// Type hub page content generator
export function generateTypeHubContent(
  serviceSlug: string,
  type: 'residential' | 'commercial'
): {
  meta: { title: string; description: string };
  headline: string;
  description: string;
  cities: { name: string; slug: string }[];
} | null {
  const service = getService(serviceSlug);
  const serviceType = getServiceType(type);
  
  if (!service || !serviceType) return null;
  
  const allCities = getAllCitiesList();
  
  return {
    meta: {
      title: `${serviceType.name} ${service.name} | South Florida | Total Care Restoration`,
      description: `${serviceType.name} ${service.name.toLowerCase()} services throughout South Florida. Serving Miami-Dade, Broward & Palm Beach counties. 24/7 emergency response.`,
    },
    headline: `${serviceType.name} ${service.name}`,
    description: `We provide professional ${service.name.toLowerCase()} services specifically designed for ${type} properties. ${serviceType.focusAreas.slice(0, 3).join('. ')}.`,
    cities: allCities,
  };
}

// Helper to get all cities as a list
function getAllCitiesList(): { name: string; slug: string }[] {
  const citiesConfig = require('@/config/cities.json');
  return Object.entries(citiesConfig).map(([slug, city]) => ({
    slug,
    name: (city as CityConfig).name,
  }));
}

