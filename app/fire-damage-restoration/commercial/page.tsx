import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { generatePageMetadata } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider } from '@/lib/structured-data';
import { getService, getAllCities, getServiceType } from '@/lib/local-seo/data';
import { ServiceTypeHub } from '@/components/local-seo/ServiceTypeHub';

const SERVICE_SLUG = 'fire-damage-restoration';
const SERVICE_TYPE = 'commercial';

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Commercial Fire Damage Restoration | South Florida | Total Care Restoration',
    description: 'Commercial fire damage restoration services throughout South Florida. Minimize business downtime with rapid response and professional restoration. 24/7 emergency service.',
    keywords: ['commercial fire damage restoration', 'business fire damage', 'office smoke cleanup', 'commercial fire restoration'],
    path: `/${SERVICE_SLUG}/${SERVICE_TYPE}`,
  });
}

export default function CommercialFireDamagePage() {
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
    name: 'Commercial Fire Damage Restoration',
    description: 'Professional commercial fire damage restoration services for businesses throughout South Florida.',
    provider: getLocalBusinessProvider(),
    audience: {
      '@type': 'Audience',
      audienceType: 'Commercial Property Managers',
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
          description="We provide professional fire damage restoration services designed for commercial properties. Our team understands that downtime means lost revenue, so we work quickly and provide comprehensive documentation for insurance claims."
          cities={cityList}
          focusAreas={serviceType.focusAreas}
        />
      </main>
      <Footer />
    </>
  );
}

