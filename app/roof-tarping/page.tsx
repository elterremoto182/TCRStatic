import Link from 'next/link';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import OptimizedImage from '@/components/OptimizedImage';
import { generatePageMetadata, truncateMetaTitle } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider } from '@/lib/structured-data';
import { getService, getAllCities } from '@/lib/local-seo/data';
import { ServiceProcess } from '@/components/local-seo/ServiceProcess';
import { ServiceOverviewSection } from '@/components/local-seo/ServiceOverviewSection';
import { CommonCausesSection } from '@/components/local-seo/CommonCausesSection';
import { LocalFAQ } from '@/components/local-seo/LocalFAQ';
import { generateAltText } from '@/lib/seo-utils';
import { Home as HomeIcon, Building2, ArrowRight, Phone, MapPin, Shield, Camera } from 'lucide-react';

const SERVICE_SLUG = 'roof-tarping';

export async function generateMetadata() {
  return generatePageMetadata({
    title: truncateMetaTitle('Emergency Roof Tarping Services | South Florida | Total Care Restoration'),
    description: 'Professional emergency roof tarping for residential and commercial properties in South Florida. 24/7 storm response. Protect your property from further damage. Call now!',
    keywords: ['roof tarping', 'emergency roof tarp', 'storm roof protection', 'roof leak repair', 'South Florida'],
    path: `/${SERVICE_SLUG}`,
  });
}

export default function RoofTarpingPage() {
  const service = getService(SERVICE_SLUG);
  const cities = getAllCities();
  
  if (!service) {
    return null;
  }

  const cityList = Object.entries(cities).map(([slug, city]) => ({
    slug,
    name: city.name,
  }));

  const breadcrumbs = [
    { label: 'Roof Tarping', href: `/${SERVICE_SLUG}` },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Emergency Roof Tarping',
    description: 'Professional emergency roof tarping services to protect residential and commercial properties throughout South Florida from storm and water damage.',
    provider: getLocalBusinessProvider(),
    areaServed: cityList.map(city => ({
      '@type': 'City',
      name: city.name,
    })),
    serviceType: 'Roof Tarping',
  };

  return (
    <>
      <StructuredData data={serviceSchema} />
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-amber-50 via-background to-orange-50 relative overflow-hidden">
          {/* Hero Background Image */}
          {service.images?.hero && (
            <div className="absolute inset-0 z-0">
              <OptimizedImage
                src={service.images.hero}
                alt={generateAltText({ type: 'hero', serviceName: 'Roof Tarping' })}
                fill
                sizes="100vw"
                className="object-cover opacity-30"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/60 to-white/50" />
            </div>
          )}
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <Breadcrumbs items={breadcrumbs} className="mb-6" />
            
            <AnimateOnScroll animation="fade-in-up" duration={600}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Emergency Roof Tarping
              </h1>

              <p className="text-xl text-gray-600 max-w-3xl mb-8">
                Professional emergency roof tarping services to protect your property from further damage after storms, hurricanes, or roof failures. 
                Our certified technicians respond 24/7 throughout South Florida.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:7866106317"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                >
                  <Phone className="w-5 h-5" />
                  Call (786) 610-6317
                </a>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-lg border-2 border-primary hover:bg-primary/5 transition-colors"
                >
                  Get Free Assessment
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Service Type Selection */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <AnimateOnScroll animation="fade-in-up" duration={600}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                Choose Your Property Type
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                We offer specialized roof tarping services for both residential homes and commercial buildings, with equipment and techniques tailored to each property type.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Residential Card */}
              <AnimateOnScroll animation="fade-in-up" duration={600} delay={100}>
                <Link
                  href={`/${SERVICE_SLUG}/residential`}
                  className="group block p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-transparent hover:border-primary transition-all duration-200 hover:shadow-lg"
                >
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                    <HomeIcon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    Residential Services
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Protect your home and family with emergency roof tarping. We respond quickly to prevent water damage and keep your family safe until permanent repairs are completed.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      24/7 emergency response
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Heavy-duty tarp installation
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Insurance documentation
                    </li>
                  </ul>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    View Residential Services
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </AnimateOnScroll>

              {/* Commercial Card */}
              <AnimateOnScroll animation="fade-in-up" duration={600} delay={200}>
                <Link
                  href={`/${SERVICE_SLUG}/commercial`}
                  className="group block p-8 bg-gradient-to-br from-gray-50 to-amber-50 rounded-2xl border-2 border-transparent hover:border-primary transition-all duration-200 hover:shadow-lg"
                >
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                    <Building2 className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    Commercial Services
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Protect your business assets with rapid commercial roof tarping. We handle large-scale projects and can secure multiple locations simultaneously.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Large-scale capability
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Multi-location coordination
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Industrial-grade materials
                    </li>
                  </ul>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    View Commercial Services
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Service Overview Section */}
        {service.bodyContent && (
          <ServiceOverviewSection
            title="Understanding Roof Tarping"
            overview={service.bodyContent.overview}
            whyActFast={service.bodyContent.whyActFast}
            overviewImage={service.images?.overview}
          />
        )}

        {/* Common Causes Section */}
        {service.bodyContent?.commonCauses && (
          <CommonCausesSection
            title="Common Causes of Roof Damage"
            causes={service.bodyContent.commonCauses}
          />
        )}

        {/* Process Section */}
        <ServiceProcess 
          title="Our Roof Tarping Process" 
          steps={service.process} 
        />

        {/* General FAQs Section */}
        {service.mainPageContent?.generalFaqs && (
          <LocalFAQ
            title="Roof Tarping FAQs"
            faqs={service.mainPageContent.generalFaqs}
          />
        )}

        {/* Gallery Section */}
        {service.images?.gallery && service.images.gallery.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <AnimateOnScroll animation="fade-in-up" duration={600}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                  Our Work in Action
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                  See examples of our professional roof tarping services throughout South Florida.
                </p>
              </AnimateOnScroll>

              <div className={`grid gap-6 ${
                service.images.gallery.length === 1 
                  ? 'grid-cols-1 max-w-2xl mx-auto' 
                  : service.images.gallery.length === 2 
                    ? 'grid-cols-1 md:grid-cols-2' 
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {service.images.gallery.map((image, index) => (
                  <AnimateOnScroll
                    key={index}
                    animation="fade-in-up"
                    duration={600}
                    delay={index * 100}
                  >
                    <div className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <OptimizedImage
                        src={image}
                        alt={generateAltText({ type: 'gallery-item', serviceName: 'Roof Tarping', index })}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 text-gray-900 text-sm font-medium rounded-full">
                          <Camera className="w-4 h-4" />
                          Professional installation
                        </span>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Cities Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <AnimateOnScroll animation="fade-in-up" duration={600}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Service Areas
                </h2>
              </div>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                We provide emergency roof tarping services throughout South Florida, including Miami-Dade, Broward, and Palm Beach counties.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cityList.map((city, index) => (
                <AnimateOnScroll
                  key={city.slug}
                  animation="fade-in-up"
                  duration={400}
                  delay={index * 50}
                >
                  <Link
                    href={`/${SERVICE_SLUG}/residential/${city.slug}`}
                    className="group block p-4 bg-gray-50 rounded-xl hover:bg-primary/5 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                        {city.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <AnimateOnScroll animation="fade-in-up" duration={600}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Roof Damaged? Need Emergency Tarping?
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Our roof tarping team is available 24/7 throughout South Florida. Fast response prevents further water damage to your property.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:7866106317"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  Call (786) 610-6317
                </a>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-bold rounded-lg border-2 border-white/50 hover:bg-white/10 transition-colors"
                >
                  Get Free Assessment
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

