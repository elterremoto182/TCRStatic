import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { generatePageMetadata } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider } from '@/lib/structured-data';
import { getService, getAllCities, getServiceType } from '@/lib/local-seo/data';
import { ServiceTypeHub } from '@/components/local-seo/ServiceTypeHub';

const SERVICE_SLUG = 'sewage-cleanup';
const SERVICE_TYPE = 'commercial';

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Commercial Sewage Cleanup | South Florida | Total Care Restoration',
    description: 'Commercial sewage cleanup and biohazard removal services throughout South Florida. OSHA-compliant protocols with full documentation. 24/7 emergency service.',
    keywords: ['commercial sewage cleanup', 'business biohazard removal', 'industrial sewage restoration', 'commercial sanitization'],
    path: `/${SERVICE_SLUG}/${SERVICE_TYPE}`,
  });
}

export default function CommercialSewageCleanupPage() {
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
    name: 'Commercial Sewage Cleanup',
    description: 'Professional commercial sewage cleanup and biohazard removal services for businesses throughout South Florida.',
    provider: getLocalBusinessProvider(),
    audience: {
      '@type': 'Audience',
      audienceType: 'Commercial Property Managers',
    },
    areaServed: cityList.map(city => ({
      '@type': 'City',
      name: city.name,
    })),
    serviceType: 'Sewage Cleanup',
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
          description="We provide professional sewage cleanup services for commercial properties following all health department and OSHA requirements. Our team minimizes business disruption while ensuring complete sanitization and documentation."
          cities={cityList}
          focusAreas={serviceType.focusAreas}
        />
      </main>
      <Footer />
    </>
  );
}

