import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { generatePageMetadata, truncateMetaTitle } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider } from '@/lib/structured-data';
import { getService, getAllCities, getServiceType } from '@/lib/local-seo/data';
import { ServiceTypeHub } from '@/components/local-seo/ServiceTypeHub';

const SERVICE_SLUG = 'shrink-wrapping';
const SERVICE_TYPE = 'commercial';

export async function generateMetadata() {
  return generatePageMetadata({
    title: truncateMetaTitle('Commercial Shrink Wrapping | South Florida | Total Care Restoration'),
    description: 'Commercial shrink wrapping services throughout South Florida. Industrial-grade protection for buildings, construction sites, and large-scale projects. Professional installation.',
    keywords: ['commercial shrink wrapping', 'industrial shrink wrap', 'construction site protection', 'commercial weather protection'],
    path: `/${SERVICE_SLUG}/${SERVICE_TYPE}`,
  });
}

export default function CommercialShrinkWrappingPage() {
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
    name: 'Commercial Shrink Wrapping',
    description: 'Professional commercial shrink wrapping services for businesses, construction sites, and industrial facilities throughout South Florida.',
    provider: getLocalBusinessProvider(),
    audience: {
      '@type': 'Audience',
      audienceType: 'Commercial Property Managers',
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
          description="We provide industrial-grade shrink wrapping services for commercial buildings, construction sites, and large-scale projects. Our team has the equipment and expertise to wrap structures of any size with long-lasting weather protection."
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

