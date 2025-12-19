import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { generatePageMetadata } from '@/lib/utils';
import { StructuredData } from '@/lib/structured-data';
import { getService, getAllCities, getServiceType } from '@/lib/local-seo/data';
import { ServiceTypeHub } from '@/components/local-seo/ServiceTypeHub';

const SERVICE_SLUG = 'mold-remediation';
const SERVICE_TYPE = 'residential';

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Residential Mold Remediation | South Florida | Total Care Restoration',
    description: 'Residential mold remediation services throughout South Florida. Protect your family with professional mold inspection and removal. 24/7 emergency response.',
    keywords: ['residential mold remediation', 'home mold removal', 'house mold inspection', 'residential mold cleanup'],
    path: `/${SERVICE_SLUG}/${SERVICE_TYPE}`,
  });
}

export default function ResidentialMoldRemediationPage() {
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
    name: 'Residential Mold Remediation',
    description: 'Professional residential mold remediation services for homeowners throughout South Florida.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Total Care Restoration',
      telephone: '(786) 610-6317',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Residential Homeowners',
    },
    serviceType: 'Mold Remediation',
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
          description="We provide professional mold remediation services specifically designed for residential homeowners. Our certified team safely removes mold, identifies moisture sources, and prevents future growth to protect your family's health."
          cities={cityList}
          focusAreas={serviceType.focusAreas}
        />
      </main>
      <Footer />
    </>
  );
}

