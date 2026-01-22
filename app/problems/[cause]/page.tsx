import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { generatePageMetadata, truncateMetaTitle, truncateMetaDescription } from '@/lib/utils';
import { StructuredData } from '@/lib/structured-data';
import { 
  getCauseBySlug, 
  getAllCauses,
  getService,
  getTopCities,
} from '@/lib/local-seo/data';
import { AlertTriangle, Clock, MapPin, ArrowRight, CheckCircle, Shield, Phone } from 'lucide-react';

// Generate static params for all causes (hub pages)
export async function generateStaticParams() {
  const allCauses = getAllCauses();
  const params: { cause: string }[] = [];
  
  for (const category of Object.values(allCauses)) {
    for (const cause of category) {
      params.push({
        cause: cause.slug,
      });
    }
  }
  
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { cause: string } | Promise<{ cause: string }>;
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { cause: causeSlug } = resolvedParams || {};
  
  if (!causeSlug) {
    return generatePageMetadata({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
      path: '/',
    });
  }

  const cause = getCauseBySlug(causeSlug);
  
  if (!cause) {
    return generatePageMetadata({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
      path: `/problems/${causeSlug}`,
    });
  }

  // Build keyword list from cause
  const keywords = [
    cause.name.toLowerCase(),
    `${cause.name.toLowerCase()} restoration`,
    `${cause.name.toLowerCase()} cleanup`,
    `${cause.name.toLowerCase()} repair`,
    'emergency restoration',
    'South Florida',
    'Miami',
    'Fort Lauderdale',
  ];

  return generatePageMetadata({
    title: truncateMetaTitle(`${cause.name} Restoration | South Florida | Total Care`),
    description: truncateMetaDescription(
      `Professional ${cause.name.toLowerCase()} restoration services across South Florida. 24/7 emergency response. ${cause.description}`
    ),
    keywords,
    path: `/problems/${causeSlug}`,
  });
}

export default async function CauseHubPage({
  params,
}: {
  params: { cause: string } | Promise<{ cause: string }>;
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { cause: causeSlug } = resolvedParams || {};

  if (!causeSlug) {
    notFound();
  }

  const cause = getCauseBySlug(causeSlug);

  if (!cause) {
    notFound();
  }

  // Get top cities for the city selection grid
  const topCities = getTopCities();

  // Get parent services for linking
  const parentServices = cause.parentServices
    .map(serviceSlug => {
      const service = getService(serviceSlug);
      return service ? { slug: serviceSlug, name: service.name } : null;
    })
    .filter(Boolean) as { slug: string; name: string }[];

  const breadcrumbs = [
    { label: 'Problems', href: '/problems' },
    { label: cause.name, href: `/problems/${causeSlug}` },
  ];

  // Urgency badge colors
  const urgencyConfig = {
    emergency: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Emergency', icon: AlertTriangle },
    high: { color: 'bg-orange-100 text-orange-800 border-orange-200', label: 'High Priority', icon: Clock },
    moderate: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Moderate', icon: Clock },
  };

  const urgency = urgencyConfig[cause.urgency] || urgencyConfig.moderate;
  const UrgencyIcon = urgency.icon;

  // Generate schema for the hub page
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${cause.name} Restoration`,
    description: cause.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Total Care Restoration',
      telephone: '+1-786-610-6317',
      areaServed: {
        '@type': 'State',
        name: 'Florida',
      },
    },
    serviceType: cause.name,
  };

  return (
    <>
      <StructuredData data={schema} />
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <Breadcrumbs 
              items={breadcrumbs} 
              className="mb-8 text-white/70"
            />
            <AnimateOnScroll animation="fade-in-up" duration={600}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${urgency.color}`}>
                  <UrgencyIcon className="w-4 h-4" />
                  {urgency.label}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {cause.name}
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mb-8">
                {cause.description}
              </p>
              
              {/* Related Services */}
              {parentServices.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {parentServices.map(service => (
                    <Link
                      key={service.slug}
                      href={`/${service.slug}/`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </AnimateOnScroll>
          </div>
        </section>

        {/* Overview Section */}
        {cause.bodyContent?.overview && (
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <AnimateOnScroll animation="fade-in-up" duration={600}>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Understanding {cause.name}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600">
                  {cause.bodyContent.overview.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </AnimateOnScroll>
            </div>
          </section>
        )}

        {/* Why Act Fast Section */}
        {cause.bodyContent?.whyActFast && (
          <section className="py-16 bg-red-50 border-y border-red-100">
            <div className="max-w-4xl mx-auto px-4">
              <AnimateOnScroll animation="fade-in-up" duration={600}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Why You Need to Act Fast
                  </h2>
                </div>
                <p className="text-lg text-gray-700">
                  {cause.bodyContent.whyActFast}
                </p>
              </AnimateOnScroll>
            </div>
          </section>
        )}

        {/* Common Causes Section */}
        {cause.bodyContent?.commonCauses && cause.bodyContent.commonCauses.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <AnimateOnScroll animation="fade-in-up" duration={600}>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
                  Common Causes of {cause.name}
                </h2>
                <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                  {cause.bodyContent.commonCauses.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200"
                    >
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </AnimateOnScroll>
            </div>
          </section>
        )}

        {/* City Selection Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <AnimateOnScroll animation="fade-in-up" duration={600}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Select Your City
                </h2>
              </div>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                Get location-specific {cause.name.toLowerCase()} information and services for your area.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {topCities.map((city, index) => (
                <AnimateOnScroll
                  key={city.slug}
                  animation="fade-in-up"
                  duration={400}
                  delay={index * 50}
                >
                  <Link
                    href={`/problems/${causeSlug}/${city.slug}/`}
                    className="group block p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {city.name}
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {cause.name} services
                    </p>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>

            <AnimateOnScroll animation="fade-in-up" duration={600} delay={400}>
              <div className="text-center mt-8">
                <Link
                  href="/service-areas/"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                >
                  View all service areas
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Prevention Tips Section */}
        {cause.bodyContent?.preventionTips && cause.bodyContent.preventionTips.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <AnimateOnScroll animation="fade-in-up" duration={600}>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
                  Prevention Tips
                </h2>
                <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                  {cause.bodyContent.preventionTips.slice(0, 6).map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200"
                    >
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-semibold text-green-700">{index + 1}</span>
                      </div>
                      <span className="text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </AnimateOnScroll>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <AnimateOnScroll animation="fade-in-up" duration={600}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Dealing with {cause.name}?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Don&apos;t wait – damage gets worse with time. Our emergency response team is available 24/7 across South Florida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:7866106317"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call (786) 610-6317
                </a>
                <Link
                  href="/contact/"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-bold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-colors"
                >
                  Request Free Estimate
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
