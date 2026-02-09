import { notFound } from 'next/navigation';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { generatePageMetadata } from '@/lib/utils';
import { StructuredData } from '@/lib/structured-data';
import { 
  getService, 
  getCity, 
  getAllCities, 
  getServiceType,
  getServiceCityBreadcrumbs,
} from '@/lib/local-seo/data';
import { generatePageContent } from '@/lib/local-seo/templates';
import { generateAllSchemasForServiceCityPage } from '@/lib/local-seo/schema';
import { CityServicePage } from '@/components/local-seo/CityServicePage';

const SERVICE_SLUG = 'sewage-cleanup';
const SERVICE_TYPE = 'residential';

export async function generateStaticParams() {
  const cities = getAllCities();
  return Object.keys(cities).map(city => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: { city: string } | Promise<{ city: string }>;
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const citySlug = resolvedParams?.city;
  
  if (!citySlug) {
    return generatePageMetadata({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
      path: `/${SERVICE_SLUG}/${SERVICE_TYPE}`,
    });
  }

  const content = generatePageContent(SERVICE_SLUG, citySlug, SERVICE_TYPE);
  
  if (!content) {
    return generatePageMetadata({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
      path: `/${SERVICE_SLUG}/${SERVICE_TYPE}/${citySlug}`,
    });
  }

  return generatePageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    keywords: content.meta.keywords,
    path: `/${SERVICE_SLUG}/${SERVICE_TYPE}/${citySlug}`,
  });
}

export default async function ResidentialSewageCleanupCityPage({
  params,
}: {
  params: { city: string } | Promise<{ city: string }>;
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const citySlug = resolvedParams?.city;

  if (!citySlug) {
    notFound();
  }

  const service = getService(SERVICE_SLUG);
  const city = getCity(citySlug);
  const serviceType = getServiceType(SERVICE_TYPE);
  const content = generatePageContent(SERVICE_SLUG, citySlug, SERVICE_TYPE);

  if (!service || !city || !serviceType || !content) {
    notFound();
  }

  const visibleFaqs = [...(content.faq.faqs || []), ...(content.localFAQs || [])];
  const breadcrumbs = getServiceCityBreadcrumbs(SERVICE_SLUG, citySlug, SERVICE_TYPE);
  const schemas = generateAllSchemasForServiceCityPage(SERVICE_SLUG, citySlug, SERVICE_TYPE, visibleFaqs);

  return (
    <>
      {schemas.map((schema, index) => (
        <StructuredData key={index} data={schema} />
      ))}
      <Header />
      <main className="min-h-screen">
        <CityServicePage
          content={content}
          serviceSlug={SERVICE_SLUG}
          citySlug={citySlug}
          type={SERVICE_TYPE}
          breadcrumbs={breadcrumbs}
        />
      </main>
      <Footer />
    </>
  );
}

