import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { generatePageMetadata, truncateMetaTitle } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider } from '@/lib/structured-data';
import { getService, getAllCities, getServiceType } from '@/lib/local-seo/data';
import { ServiceTypeHub } from '@/components/local-seo/ServiceTypeHub';

const SERVICE_SLUG = 'mold-remediation';
const SERVICE_TYPE = 'commercial';

export async function generateMetadata() {
  return generatePageMetadata({
    title: truncateMetaTitle('Commercial Mold Remediation | South Florida | Total Care Restoration'),
    description: 'Commercial mold remediation services throughout South Florida. OSHA-compliant mold removal with minimal business disruption. 24/7 emergency service.',
    keywords: ['commercial mold remediation', 'business mold removal', 'office mold inspection', 'commercial mold cleanup'],
    path: `/${SERVICE_SLUG}/${SERVICE_TYPE}`,
  });
}

export default function CommercialMoldRemediationPage() {
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
    name: 'Commercial Mold Remediation',
    description: 'Professional commercial mold remediation services for businesses throughout South Florida.',
    provider: getLocalBusinessProvider(),
    audience: {
      '@type': 'Audience',
      audienceType: 'Commercial Property Managers',
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
          description="We provide professional mold remediation services designed for commercial properties. Our team ensures OSHA compliance, minimizes business disruption, and provides documentation for liability protection."
          cities={cityList}
          focusAreas={serviceType.focusAreas}
        />
      </main>
      <Footer />
    </>
  );
}

