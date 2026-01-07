import siteConfig from '@/config/site.json';

const COMPANY_NAME = siteConfig.name;
const LOCATION = 'South Florida';

export type AltTextType = 
  | 'hero' 
  | 'cta' 
  | 'gallery' 
  | 'service' 
  | 'team' 
  | 'testimonial' 
  | 'badge' 
  | 'overview'
  | 'process'
  | 'gallery-item';

export interface AltTextOptions {
  type: AltTextType;
  serviceName?: string;
  cityName?: string;
  projectTitle?: string;
  projectDescription?: string;
  category?: string;
  index?: number;
  beforeAfter?: 'before' | 'after';
  badgeName?: string;
  personName?: string;
  personRole?: string;
  stepTitle?: string;
}

/**
 * Generate SEO-optimized alt text based on context.
 * Alt text should describe the image content and include relevant keywords naturally.
 * Keeps alt text under 125 characters where possible.
 */
export function generateAltText(options: AltTextOptions): string {
  const { type } = options;

  switch (type) {
    case 'hero':
      return `${COMPANY_NAME} - 24/7 emergency water and fire damage restoration services in ${LOCATION}`;

    case 'cta':
      return `Contact ${COMPANY_NAME} for professional restoration services - Free estimates available`;

    case 'gallery':
      return generateGalleryAlt(options);

    case 'gallery-item':
      return generateGalleryItemAlt(options);

    case 'service':
      return generateServiceAlt(options);

    case 'team':
      return `${COMPANY_NAME} professional restoration team - Licensed and insured technicians`;

    case 'testimonial':
      return generateTestimonialAlt(options);

    case 'badge':
      return generateBadgeAlt(options);

    case 'overview':
      return generateOverviewAlt(options);

    case 'process':
      return generateProcessAlt(options);

    default:
      return `${COMPANY_NAME} - Professional restoration services`;
  }
}

function generateGalleryAlt(options: AltTextOptions): string {
  const { projectTitle, category, beforeAfter } = options;
  
  if (projectTitle && beforeAfter) {
    const state = beforeAfter === 'before' ? 'Before' : 'After';
    return `${state} ${projectTitle.toLowerCase()} - Professional ${category || 'restoration'} work by ${COMPANY_NAME}`;
  }
  
  if (projectTitle) {
    return `${projectTitle} - Professional ${category || 'restoration'} completed by ${COMPANY_NAME}`;
  }
  
  return `Professional restoration project gallery - ${COMPANY_NAME}`;
}

function generateGalleryItemAlt(options: AltTextOptions): string {
  const { serviceName, cityName, index } = options;
  
  if (serviceName && cityName) {
    const num = index !== undefined ? ` - Project ${index + 1}` : '';
    return `${serviceName} restoration in ${cityName}${num} - ${COMPANY_NAME}`;
  }
  
  if (serviceName) {
    const num = index !== undefined ? ` - Example ${index + 1}` : '';
    return `Professional ${serviceName.toLowerCase()} restoration${num} - ${COMPANY_NAME}`;
  }
  
  return `Professional restoration project by ${COMPANY_NAME}`;
}

function generateServiceAlt(options: AltTextOptions): string {
  const { serviceName, cityName } = options;
  
  if (serviceName && cityName) {
    return `${serviceName} services in ${cityName} - ${COMPANY_NAME}`;
  }
  
  if (serviceName) {
    return `${serviceName} services - ${COMPANY_NAME} ${LOCATION}`;
  }
  
  return `Professional restoration services - ${COMPANY_NAME}`;
}

function generateTestimonialAlt(options: AltTextOptions): string {
  const { personName, personRole } = options;
  
  if (personName && personRole) {
    return `${personName}, ${personRole} - ${COMPANY_NAME} customer testimonial`;
  }
  
  if (personName) {
    return `${personName} - Satisfied ${COMPANY_NAME} customer`;
  }
  
  return `${COMPANY_NAME} customer testimonial`;
}

function generateBadgeAlt(options: AltTextOptions): string {
  const { badgeName } = options;
  
  if (badgeName) {
    return `${badgeName} certification - ${COMPANY_NAME} credentials`;
  }
  
  return `${COMPANY_NAME} industry certification badge`;
}

function generateOverviewAlt(options: AltTextOptions): string {
  const { serviceName, cityName } = options;
  
  if (serviceName && cityName) {
    return `${serviceName} overview - Professional restoration in ${cityName} by ${COMPANY_NAME}`;
  }
  
  if (serviceName) {
    return `${serviceName} - Professional restoration overview by ${COMPANY_NAME}`;
  }
  
  return `Professional restoration service overview - ${COMPANY_NAME}`;
}

function generateProcessAlt(options: AltTextOptions): string {
  const { serviceName, stepTitle, index } = options;
  
  if (serviceName && stepTitle) {
    return `${serviceName} process - ${stepTitle} by ${COMPANY_NAME}`;
  }
  
  if (serviceName && index !== undefined) {
    return `${serviceName} restoration process step ${index + 1} - ${COMPANY_NAME}`;
  }
  
  return `Professional restoration process - ${COMPANY_NAME}`;
}

/**
 * Generate a title attribute for tooltips and additional SEO context.
 */
export function generateImageTitle(options: AltTextOptions): string {
  const { type, serviceName, projectTitle, badgeName } = options;

  switch (type) {
    case 'gallery':
      return projectTitle 
        ? `View ${projectTitle} restoration details`
        : 'View restoration project details';

    case 'service':
      return serviceName 
        ? `Learn more about our ${serviceName.toLowerCase()} services`
        : 'Learn more about our services';

    case 'badge':
      return badgeName 
        ? `${badgeName} - Click to learn more`
        : 'View certification details';

    default:
      return '';
  }
}

