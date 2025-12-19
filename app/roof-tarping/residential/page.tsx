import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { generatePageMetadata, truncateMetaTitle } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider } from '@/lib/structured-data';
import { getService, getAllCities, getServiceType } from '@/lib/local-seo/data';
import { ServiceTypeHub } from '@/components/local-seo/ServiceTypeHub';

const SERVICE_SLUG = 'roof-tarping';
const SERVICE_TYPE = 'residential';

export async function generateMetadata() {
  return generatePageMetadata({
    title: truncateMetaTitle('Residential Roof Tarping | South Florida | Total Care Restoration'),
    description: 'Residential emergency roof tarping services throughout South Florida. Protect your home from water damage with fast, professional roof tarping. 24/7 emergency response.',
    keywords: ['residential roof tarping', 'home roof tarp', 'emergency roof protection', 'house roof leak repair'],
    path: `/${SERVICE_SLUG}/${SERVICE_TYPE}`,
  });
}

export default function ResidentialRoofTarpingPage() {
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
    name: 'Residential Roof Tarping',
    description: 'Professional residential emergency roof tarping services for homeowners throughout South Florida.',
    provider: getLocalBusinessProvider(),
    audience: {
      '@type': 'Audience',
      audienceType: 'Residential Homeowners',
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
          description="We provide professional emergency roof tarping services specifically designed for residential homeowners. Our team responds quickly to protect your home from further water damage while you arrange permanent roof repairs."
          cities={cityList}
          focusAreas={serviceType.focusAreas}
          challenges={service.residentialContent?.challenges}
          tips={service.residentialContent?.tips}
        />
      </main>
      <Footer />
    </>
  );
}

