import { notFound } from 'next/navigation';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { generatePageMetadata, truncateMetaTitle } from '@/lib/utils';
import { StructuredData } from '@/lib/structured-data';
import { 
  getCauseBySlug, 
  getCity, 
  getAllCities,
  getAllCauses,
  getService,
} from '@/lib/local-seo/data';
import { getRelatedBlogPostsForCause } from '@/lib/local-seo/links';
import { CausePage } from '@/components/local-seo';

// Generate static params for all cause/city combinations
export async function generateStaticParams() {
  const allCauses = getAllCauses();
  const cities = getAllCities();
  
  const params: { cause: string; city: string }[] = [];
  
  for (const category of Object.values(allCauses)) {
    for (const cause of category) {
      for (const citySlug of Object.keys(cities)) {
        params.push({
          cause: cause.slug,
          city: citySlug,
        });
      }
    }
  }
  
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { cause: string; city: string } | Promise<{ cause: string; city: string }>;
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { cause: causeSlug, city: citySlug } = resolvedParams || {};
  
  if (!causeSlug || !citySlug) {
    return generatePageMetadata({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
      path: '/',
    });
  }

  const cause = getCauseBySlug(causeSlug);
  const city = getCity(citySlug);
  
  if (!cause || !city) {
    return generatePageMetadata({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
      path: `/problems/${causeSlug}/${citySlug}`,
    });
  }

  // Build keyword list from cause and city
  const keywords = [
    cause.name.toLowerCase(),
    `${cause.name.toLowerCase()} ${city.name}`,
    `${cause.name.toLowerCase()} restoration`,
    `${cause.name.toLowerCase()} cleanup`,
    `${cause.name.toLowerCase()} repair ${city.name}`,
    'emergency restoration',
    `water damage ${city.name}`,
    city.name,
    city.county,
  ];

  // Meta title differs from H1 by omitting ", FL" and using different suffix
  // H1 is: "{cause.name} in {city.name}, FL"
  return generatePageMetadata({
    title: truncateMetaTitle(`${cause.name} in ${city.name} | Pro Restoration`),
    description: `${cause.description} in ${city.name}. ${city.responseTime} response time. Professional cleanup, restoration, and prevention. Licensed & insured. Call 24/7!`,
    keywords,
    path: `/problems/${causeSlug}/${citySlug}`,
  });
}

export default async function CauseCityPage({
  params,
}: {
  params: { cause: string; city: string } | Promise<{ cause: string; city: string }>;
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { cause: causeSlug, city: citySlug } = resolvedParams || {};

  if (!causeSlug || !citySlug) {
    notFound();
  }

  const cause = getCauseBySlug(causeSlug);
  const city = getCity(citySlug);

  if (!cause || !city) {
    notFound();
  }

  // Get parent services for linking
  const parentServices = cause.parentServices
    .map(serviceSlug => {
      const service = getService(serviceSlug);
      return service ? { slug: serviceSlug, name: service.name } : null;
    })
    .filter(Boolean) as { slug: string; name: string }[];

  // Get related blog posts
  const relatedBlogPosts = getRelatedBlogPostsForCause(
    causeSlug,
    cause.parentServices,
    citySlug,
    4 // Get more blog posts for richer content
  );

  const breadcrumbs = [
    { label: 'Problems', href: '/problems' },
    { label: cause.name, href: `/problems/${causeSlug}/${citySlug}` },
  ];

  // Generate comprehensive schema
  const schemas = [];

  // Service schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${cause.name} Restoration in ${city.name}`,
    description: `${cause.description} Professional restoration services in ${city.name}, FL.`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Total Care Restoration',
      telephone: '(786) 610-6317',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '7790 NW 55th St.',
        addressLocality: 'Doral',
        addressRegion: 'FL',
        postalCode: '33166',
        addressCountry: 'US',
      },
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'State',
        name: 'Florida',
      },
    },
    serviceType: cause.name,
  });

  // FAQ schema if we have FAQs
  if (cause.bodyContent?.faqs && cause.bodyContent.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: cause.bodyContent.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  // HowTo schema for the process
  if (cause.bodyContent?.process && cause.bodyContent.process.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `${cause.name} Restoration Process`,
      description: `Professional ${cause.name.toLowerCase()} restoration process in ${city.name}, FL`,
      step: cause.bodyContent.process.map(step => ({
        '@type': 'HowToStep',
        name: step.title,
        text: step.description,
        position: step.step,
      })),
    });
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <StructuredData key={index} data={schema} />
      ))}
      <Header />
      <main className="min-h-screen">
        <CausePage
          cause={cause}
          city={city}
          citySlug={citySlug}
          parentServices={parentServices}
          relatedBlogPosts={relatedBlogPosts.map(post => ({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
          }))}
          breadcrumbs={breadcrumbs}
        />
      </main>
      <Footer />
    </>
  );
}
