import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { generatePageMetadata, truncateMetaTitle } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider } from '@/lib/structured-data';
import { getService, getAllCities, getServiceType } from '@/lib/local-seo/data';
import { ServiceTypeHub } from '@/components/local-seo/ServiceTypeHub';

const SERVICE_SLUG = 'roof-tarping';
const SERVICE_TYPE = 'commercial';

export async function generateMetadata() {
  return generatePageMetadata({
    title: truncateMetaTitle('Commercial Roof Tarping | South Florida | Total Care Restoration'),
    description: 'Commercial emergency roof tarping services throughout South Florida. Protect your business from water damage with rapid response and professional installation. 24/7 service.',
    keywords: ['commercial roof tarping', 'business roof tarp', 'industrial roof protection', 'commercial roof emergency'],
    path: `/${SERVICE_SLUG}/${SERVICE_TYPE}`,
  });
}

export default function CommercialRoofTarpingPage() {
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
    name: 'Commercial Roof Tarping',
    description: 'Professional commercial emergency roof tarping services for businesses throughout South Florida.',
    provider: getLocalBusinessProvider(),
    audience: {
      '@type': 'Audience',
      audienceType: 'Commercial Property Managers',
    },
    areaServed: cityList.map(city => ({
      '@type': 'City',
      name: city.name,
    })),
    serviceType: 'Roof Tarping',
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
          description="We provide professional emergency roof tarping services designed for commercial properties. Our team has the equipment and expertise to tarp large commercial roofs, warehouses, and multi-story buildings quickly and safely."
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

