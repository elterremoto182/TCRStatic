import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { generatePageMetadata, truncateMetaTitle } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider, generateBreadcrumbSchema } from '@/lib/structured-data';
import { getService, getServiceType, getCausesForService } from '@/lib/local-seo/data';
import { ServiceTypeHub } from '@/components/local-seo/ServiceTypeHub';
import { getAllTier1CityLinks } from '@/lib/local-seo/links';
import { enforceLinkBudget } from '@/lib/local-seo/link-budget';

const SERVICE_SLUG = 'sewage-cleanup';
const SERVICE_TYPE = 'residential';

export async function generateMetadata() {
  return generatePageMetadata({
    title: truncateMetaTitle('Residential Sewage Cleanup | South Florida | Total Care Restoration'),
    description: 'Professional residential sewage cleanup services throughout South Florida. Safe biohazard removal and sanitization. 24/7 emergency response.',
    keywords: ['residential sewage cleanup', 'home sewage backup', 'residential biohazard removal', 'sewage restoration'],
    path: `/${SERVICE_SLUG}/${SERVICE_TYPE}`,
  });
}

export default function ResidentialSewageCleanupPage() {
  const service = getService(SERVICE_SLUG);
  const serviceType = getServiceType(SERVICE_TYPE);
  
  if (!service || !serviceType) {
    return null;
  }

  // Get Tier 1 city links for service hub (max 10)
  let tier1CityLinks = getAllTier1CityLinks(SERVICE_SLUG, SERVICE_TYPE);
  tier1CityLinks = enforceLinkBudget(tier1CityLinks, 'service-hub');

  // Get problem links for this service
  const problemLinks = getCausesForService(SERVICE_SLUG).slice(0, 6).map(cause => ({
    slug: cause.slug,
    name: cause.name,
    description: cause.description,
    urgency: cause.urgency,
  }));

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Residential Sewage Cleanup',
    description: 'Professional residential sewage cleanup services for homeowners throughout South Florida.',
    provider: getLocalBusinessProvider(),
    audience: {
      '@type': 'Audience',
      audienceType: 'Residential Homeowners',
    },
    serviceType: 'Sewage Cleanup',
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: service.name, href: `/${SERVICE_SLUG}/` },
    { label: serviceType.name, href: `/${SERVICE_SLUG}/${SERVICE_TYPE}/` },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <StructuredData data={[serviceSchema, breadcrumbSchema]} />
      <Header />
      <main className="min-h-screen">
        <ServiceTypeHub
          serviceName={service.name}
          serviceSlug={SERVICE_SLUG}
          type={SERVICE_TYPE}
          heroImage={service.images?.hero}
          heroDescription="Sewage backups are dangerous and require professional cleanup. Our residential team responds 24/7 with proper equipment to safely remove contamination and restore your home to a healthy condition."
          overview={service.bodyContent?.overview || ''}
          overviewImage={service.images?.overview}
          typeSpecificOverview={service.residentialContent?.challenges}
          whyActFast={service.bodyContent?.whyActFast}
          commonCauses={service.bodyContent?.commonCauses}
          problemLinks={problemLinks}
          healthRisks={service.bodyContent?.healthRisks}
          process={service.process || []}
          galleryImages={service.images?.gallery}
          focusAreas={serviceType.focusAreas}
          challenges={service.residentialContent?.challenges}
          faqs={service.mainPageContent?.generalFaqs}
          tier1CityLinks={tier1CityLinks}
        />
      </main>
      <Footer />
    </>
  );
}
