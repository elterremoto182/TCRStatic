import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { generatePageMetadata } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider } from '@/lib/structured-data';
import { getService, getAllCities, getServiceType } from '@/lib/local-seo/data';
import { ServiceTypeHub } from '@/components/local-seo/ServiceTypeHub';

const SERVICE_SLUG = 'emergency-restoration';
const SERVICE_TYPE = 'residential';

export async function generateMetadata() {
  return generatePageMetadata({
    title: '24/7 Residential Emergency Restoration | South Florida | Total Care Restoration',
    description: '24/7 residential emergency restoration services throughout South Florida. Rapid response for water, fire, and storm damage to your home. Call now!',
    keywords: ['residential emergency restoration', 'home emergency cleanup', '24/7 home restoration', 'residential disaster response'],
    path: `/${SERVICE_SLUG}/${SERVICE_TYPE}`,
  });
}

export default function ResidentialEmergencyRestorationPage() {
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
    '@type': ['Service', 'EmergencyService'],
    name: '24/7 Residential Emergency Restoration',
    description: 'Professional 24/7 residential emergency restoration services for homeowners throughout South Florida.',
    provider: getLocalBusinessProvider(),
    audience: {
      '@type': 'Audience',
      audienceType: 'Residential Homeowners',
    },
    serviceType: 'Emergency Restoration',
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
          description="When disaster strikes your home, our 24/7 emergency restoration team responds fast. We understand the stress of home emergencies and provide compassionate, professional service to protect your family and property."
          cities={cityList}
          focusAreas={serviceType.focusAreas}
        />
      </main>
      <Footer />
    </>
  );
}

