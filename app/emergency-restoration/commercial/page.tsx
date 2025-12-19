import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { generatePageMetadata } from '@/lib/utils';
import { StructuredData } from '@/lib/structured-data';
import { getService, getAllCities, getServiceType } from '@/lib/local-seo/data';
import { ServiceTypeHub } from '@/components/local-seo/ServiceTypeHub';

const SERVICE_SLUG = 'emergency-restoration';
const SERVICE_TYPE = 'commercial';

export async function generateMetadata() {
  return generatePageMetadata({
    title: '24/7 Commercial Emergency Restoration | South Florida | Total Care Restoration',
    description: '24/7 commercial emergency restoration services throughout South Florida. Rapid response to minimize business downtime. Call now!',
    keywords: ['commercial emergency restoration', 'business emergency cleanup', '24/7 commercial restoration', 'commercial disaster response'],
    path: `/${SERVICE_SLUG}/${SERVICE_TYPE}`,
  });
}

export default function CommercialEmergencyRestorationPage() {
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
    name: '24/7 Commercial Emergency Restoration',
    description: 'Professional 24/7 commercial emergency restoration services for businesses throughout South Florida.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Total Care Restoration',
      telephone: '(786) 610-6317',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Commercial Property Managers',
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
          description="Business emergencies can't wait. Our 24/7 commercial emergency restoration team is equipped to handle large-scale disasters and works around the clock to minimize your downtime and revenue loss."
          cities={cityList}
          focusAreas={serviceType.focusAreas}
        />
      </main>
      <Footer />
    </>
  );
}

