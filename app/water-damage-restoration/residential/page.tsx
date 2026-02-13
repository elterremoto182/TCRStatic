import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { generatePageMetadata, truncateMetaTitle } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider, generateBreadcrumbSchema } from '@/lib/structured-data';
import { getService, getServiceType, getCausesForService } from '@/lib/local-seo/data';
import { ServiceTypeHub } from '@/components/local-seo/ServiceTypeHub';
import { getAllTier1CityLinks } from '@/lib/local-seo/links';
import { enforceLinkBudget } from '@/lib/local-seo/link-budget';

const SERVICE_SLUG = 'water-damage-restoration';
const SERVICE_TYPE = 'residential';

export async function generateMetadata() {
  return generatePageMetadata({
    title: truncateMetaTitle('Residential Water Damage Restoration | South Florida | Total Care Restoration'),
    description: 'Residential water damage restoration services throughout South Florida. Protect your home and family with fast, professional water damage cleanup. 24/7 emergency response.',
    keywords: ['residential water damage restoration', 'home water damage', 'house flood cleanup', 'residential water extraction'],
    path: `/${SERVICE_SLUG}/${SERVICE_TYPE}`,
  });
}

export default function ResidentialWaterDamagePage() {
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
    name: 'Residential Water Damage Restoration',
    description: 'Professional residential water damage restoration services for homeowners throughout South Florida.',
    provider: getLocalBusinessProvider(),
    audience: {
      '@type': 'Audience',
      audienceType: 'Residential Homeowners',
    },
    serviceType: 'Water Damage Restoration',
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
          heroDescription="We provide professional water damage restoration services specifically designed for residential homeowners. Our compassionate team understands the stress of home water damage and works quickly to protect your family and property."
          overview={service.bodyContent?.overview || ''}
          overviewImage={service.images?.overview}
          typeSpecificOverview={service.residentialContent?.challenges}
          whyActFast={service.bodyContent?.whyActFast}
          commonCauses={service.bodyContent?.commonCauses}
          problemLinks={problemLinks}
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
