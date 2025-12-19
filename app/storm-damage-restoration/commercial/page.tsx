import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { generatePageMetadata, truncateMetaTitle } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider } from '@/lib/structured-data';
import { getService, getAllCities, getServiceType } from '@/lib/local-seo/data';
import { ServiceTypeHub } from '@/components/local-seo/ServiceTypeHub';

const SERVICE_SLUG = 'storm-damage-restoration';
const SERVICE_TYPE = 'commercial';

export async function generateMetadata() {
  return generatePageMetadata({
    title: truncateMetaTitle('Commercial Storm Damage Restoration | South Florida | Total Care Restoration'),
    description: 'Commercial storm and hurricane damage restoration services throughout South Florida. Minimize business downtime with rapid response and professional restoration. 24/7 emergency service.',
    keywords: ['commercial storm damage restoration', 'business hurricane damage', 'office storm cleanup', 'commercial flood repair'],
    path: `/${SERVICE_SLUG}/${SERVICE_TYPE}`,
  });
}

export default function CommercialStormDamagePage() {
  const service = getService(SERVICE_SLUG);
  const serviceType = getServiceType(SERVICE_TYPE);
  const cities = getAllCities();
  
  if (!service || !serviceType) {
    return null;
  }

  const cityList = Object.entries(cities).map(([slug, city]) => ({
    slug,
    name: city.name,
  }));

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Commercial Storm Damage Restoration',
    description: 'Professional commercial storm and hurricane damage restoration services for businesses throughout South Florida.',
    provider: getLocalBusinessProvider(),
    audience: {
      '@type': 'Audience',
      audienceType: 'Commercial Property Managers',
    },
    areaServed: cityList.map(city => ({
      '@type': 'City',
      name: city.name,
    })),
    serviceType: 'Storm Damage Restoration',
  };

  return (
    <>
      <StructuredData data={serviceSchema} />
      <Header />
      <main className="min-h-screen">
        <ServiceTypeHub
          serviceName={service.name}
          serviceSlug={SERVICE_SLUG}
          type={SERVICE_TYPE}
          description="We provide professional storm damage restoration services designed for commercial properties. Our team understands that downtime means lost revenue, so we work quickly and can coordinate multi-location restoration projects."
          cities={cityList}
          focusAreas={serviceType.focusAreas}
          challenges={service.commercialContent?.challenges}
          tips={service.commercialContent?.tips}
        />
      </main>
      <Footer />
    </>
  );
}

