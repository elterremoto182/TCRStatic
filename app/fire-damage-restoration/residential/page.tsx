import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { generatePageMetadata, truncateMetaTitle } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider, generateBreadcrumbSchema } from '@/lib/structured-data';
import { getService, getServiceType, getCausesForService } from '@/lib/local-seo/data';
import { ServiceTypeHub } from '@/components/local-seo/ServiceTypeHub';
import { getAllTier1CityLinks } from '@/lib/local-seo/links';
import { enforceLinkBudget } from '@/lib/local-seo/link-budget';

const SERVICE_SLUG = 'fire-damage-restoration';
const SERVICE_TYPE = 'residential';

export async function generateMetadata() {
  return generatePageMetadata({
    title: truncateMetaTitle('Residential Fire Damage Restoration | South Florida | Total Care Restoration'),
    description: 'Residential fire damage restoration services throughout South Florida. Complete smoke, soot cleanup and property restoration for homeowners. 24/7 emergency response.',
    keywords: ['residential fire damage restoration', 'home fire damage', 'house smoke cleanup', 'residential fire restoration'],
    path: `/${SERVICE_SLUG}/${SERVICE_TYPE}`,
  });
}

export default function ResidentialFireDamagePage() {
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
    name: 'Residential Fire Damage Restoration',
    description: 'Professional residential fire damage restoration services for homeowners throughout South Florida.',
    provider: getLocalBusinessProvider(),
    audience: {
      '@type': 'Audience',
      audienceType: 'Residential Homeowners',
    },
    serviceType: 'Fire Damage Restoration',
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: service.name, href: `/${SERVICE_SLUG}/` },
    { label: serviceType.name, href: `/${SERVICE_SLUG}/${SERVICE_TYPE}` },
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
          heroDescription="We provide comprehensive fire damage restoration services for residential homeowners. Our team handles everything from emergency board-up to complete restoration, helping families recover from the trauma of a fire."
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
