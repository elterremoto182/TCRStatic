import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { generatePageMetadata, truncateMetaTitle } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider } from '@/lib/structured-data';
import { getService, getAllCities, getServiceType } from '@/lib/local-seo/data';
import { ServiceTypeHub } from '@/components/local-seo/ServiceTypeHub';

const SERVICE_SLUG = 'fire-damage-restoration';
const SERVICE_TYPE = 'residential';

export async function generateMetadata() {
  return generatePageMetadata({
    title: truncateMetaTitle('Residential Fire Damage Restoration | South Florida | Total Care Restoration'),
    description: 'Residential fire damage restoration services throughout South Florida. Protect your home and family with professional smoke and soot cleanup. 24/7 emergency response.',
    keywords: ['residential fire damage restoration', 'home fire damage', 'house smoke cleanup', 'residential soot removal'],
    path: `/${SERVICE_SLUG}/${SERVICE_TYPE}`,
  });
}

export default function ResidentialFireDamagePage() {
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
    name: 'Residential Fire Damage Restoration',
    description: 'Professional residential fire damage restoration services for homeowners throughout South Florida.',
    provider: getLocalBusinessProvider(),
    audience: {
      '@type': 'Audience',
      audienceType: 'Residential Homeowners',
    },
    serviceType: 'Fire Damage Restoration',
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
          description="We provide professional fire damage restoration services specifically designed for residential homeowners. Our compassionate team helps you recover from fire, smoke, and soot damage while handling insurance claims."
          cities={cityList}
          focusAreas={serviceType.focusAreas}
        />
      </main>
      <Footer />
    </>
  );
}

