import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { generatePageMetadata, truncateMetaTitle } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider, generateBreadcrumbSchema } from '@/lib/structured-data';
import { getService, getServiceType, getCausesForService } from '@/lib/local-seo/data';
import { ServiceTypeHub } from '@/components/local-seo/ServiceTypeHub';
import { getAllTier1CityLinks } from '@/lib/local-seo/links';
import { enforceLinkBudget } from '@/lib/local-seo/link-budget';

const SERVICE_SLUG = 'storm-damage-restoration';
const SERVICE_TYPE = 'commercial';

export async function generateMetadata() {
  return generatePageMetadata({
    title: truncateMetaTitle('Commercial Storm Damage Restoration | South Florida | Total Care Restoration'),
    description: 'Commercial storm damage restoration services throughout South Florida. Hurricane damage repair, flood cleanup for businesses. Minimize downtime.',
    keywords: ['commercial storm damage restoration', 'business hurricane damage', 'commercial storm cleanup', 'commercial flood restoration'],
    path: `/${SERVICE_SLUG}/${SERVICE_TYPE}`,
  });
}

export default function CommercialStormDamagePage() {
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
    name: 'Commercial Storm Damage Restoration',
    description: 'Professional commercial storm damage restoration services for businesses throughout South Florida.',
    provider: getLocalBusinessProvider(),
    audience: {
      '@type': 'Audience',
      audienceType: 'Commercial Property Managers',
    },
    serviceType: 'Storm Damage Restoration',
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
          heroDescription="When hurricanes and storms damage your business, every hour counts. Our commercial storm damage team responds rapidly to protect your assets and get your operations back online."
          overview={service.bodyContent?.overview || ''}
          overviewImage={service.images?.overview}
          typeSpecificOverview={service.commercialContent?.challenges}
          whyActFast={service.bodyContent?.whyActFast}
          commonCauses={service.bodyContent?.commonCauses}
          problemLinks={problemLinks}
          process={service.process || []}
          galleryImages={service.images?.gallery}
          focusAreas={serviceType.focusAreas}
          challenges={service.commercialContent?.challenges}
          faqs={service.mainPageContent?.generalFaqs}
          tier1CityLinks={tier1CityLinks}
        />
      </main>
      <Footer />
    </>
  );
}
