import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { generatePageMetadata, truncateMetaTitle } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider } from '@/lib/structured-data';
import { getService, getAllCities, getServiceType } from '@/lib/local-seo/data';
import { ServiceTypeHub } from '@/components/local-seo/ServiceTypeHub';

const SERVICE_SLUG = 'shrink-wrapping';
const SERVICE_TYPE = 'residential';

export async function generateMetadata() {
  return generatePageMetadata({
    title: truncateMetaTitle('Residential Shrink Wrapping | South Florida | Total Care Restoration'),
    description: 'Residential shrink wrapping services throughout South Florida. Protect your home with long-lasting, watertight roof and property protection. Professional installation.',
    keywords: ['residential shrink wrapping', 'home shrink wrap', 'roof shrink wrap protection', 'house weather protection'],
    path: `/${SERVICE_SLUG}/${SERVICE_TYPE}`,
  });
}

export default function ResidentialShrinkWrappingPage() {
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
    name: 'Residential Shrink Wrapping',
    description: 'Professional residential shrink wrapping services for homeowners throughout South Florida requiring long-term roof and property protection.',
    provider: getLocalBusinessProvider(),
    audience: {
      '@type': 'Audience',
      audienceType: 'Residential Homeowners',
    },
    areaServed: cityList.map(city => ({
      '@type': 'City',
      name: city.name,
    })),
    serviceType: 'Shrink Wrapping',
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
          description="We provide professional shrink wrapping services for residential homeowners who need long-term protection. Shrink wrap offers superior weather resistance compared to tarps and is ideal when permanent repairs will take months."
          cities={cityList}
          focusAreas={serviceType.focusAreas}
        />
      </main>
      <Footer />
    </>
  );
}

