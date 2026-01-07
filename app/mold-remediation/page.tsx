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
import { AlertTriangle, Home, Building2, ArrowRight, Phone, MapPin, Camera } from 'lucide-react';

const SERVICE_SLUG = 'mold-remediation';

export async function generateMetadata() {
  return generatePageMetadata({
    title: truncateMetaTitle('Mold Remediation Services | South Florida | Total Care Restoration'),
    description: 'Professional mold remediation for residential and commercial properties in South Florida. Certified mold removal, inspection & prevention. Call 24/7!',
    keywords: ['mold remediation', 'mold removal', 'mold inspection', 'black mold removal', 'South Florida'],
    path: `/${SERVICE_SLUG}`,
  });
}

export default function MoldRemediationPage() {
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
    { label: 'Mold Remediation', href: `/${SERVICE_SLUG}` },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mold Remediation',
    description: 'Professional mold remediation services for residential and commercial properties throughout South Florida.',
    provider: getLocalBusinessProvider(),
    areaServed: cityList.map(city => ({
      '@type': 'City',
      name: city.name,
    })),
    serviceType: 'Mold Remediation',
  };

  return (
    <>
      <StructuredData data={serviceSchema} />
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-green-50 via-background to-teal-50 relative overflow-hidden">
          {/* Hero Background Image */}
          {service.images?.hero && (
            <div className="absolute inset-0 z-0">
              <OptimizedImage
                src={service.images.hero}
                alt={generateAltText({ type: 'hero', serviceName: 'Mold Remediation' })}
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
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-green-700" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Mold Remediation
              </h1>

              <p className="text-xl text-gray-600 max-w-3xl mb-8">
                Professional mold remediation services for homes and businesses throughout South Florida. 
                Our certified technicians safely remove mold and prevent its return to protect your health.
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
                We offer specialized mold remediation services tailored to the unique needs of residential homeowners and commercial property managers.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Residential Card */}
              <AnimateOnScroll animation="fade-in-up" duration={600} delay={100}>
                <Link
                  href={`/${SERVICE_SLUG}/residential`}
                  className="group block p-8 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl border-2 border-transparent hover:border-primary transition-all duration-200 hover:shadow-lg"
                >
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                    <Home className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    Residential Services
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Protect your family's health with professional residential mold remediation. We identify moisture sources, remove mold safely, and prevent future growth.
                  </p>
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
                  className="group block p-8 bg-gradient-to-br from-slate-50 to-green-50 rounded-2xl border-2 border-transparent hover:border-primary transition-all duration-200 hover:shadow-lg"
                >
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                    <Building2 className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    Commercial Services
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Keep your employees and customers safe with commercial mold remediation. We ensure OSHA compliance and minimize business disruption.
                  </p>
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
            title="Understanding Mold Remediation"
            overview={service.bodyContent.overview}
            whyActFast={service.bodyContent.whyActFast}
            healthRisks={service.bodyContent.healthRisks}
            overviewImage={service.images?.overview}
          />
        )}

        {/* Common Causes Section */}
        {service.bodyContent?.commonCauses && (
          <CommonCausesSection
            title="Common Causes of Mold Growth"
            causes={service.bodyContent.commonCauses}
          />
        )}

        {/* Process Section */}
        <ServiceProcess 
          title="Our Mold Remediation Process" 
          steps={service.process} 
        />

        {/* General FAQs Section */}
        {service.mainPageContent?.generalFaqs && (
          <LocalFAQ
            title="Mold Remediation FAQs"
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
                  See examples of our professional mold remediation services throughout South Florida.
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
                        alt={generateAltText({ type: 'gallery-item', serviceName: 'Mold Remediation', index })}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 text-gray-900 text-sm font-medium rounded-full">
                          <Camera className="w-4 h-4" />
                          Professional remediation
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
                We provide mold remediation services throughout South Florida.
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

        {/* Related Resources Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <AnimateOnScroll animation="fade-in-up" duration={600}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                Mold Resources & Guides
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                Learn more about mold detection, prevention, and our remediation process.
              </p>
            </AnimateOnScroll>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimateOnScroll animation="fade-in-up" duration={600} delay={100}>
                <Link
                  href="/mold-inspection/"
                  className="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    Mold Inspection Process
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Learn how we test for mold in walls, what inspectors look for, and how inspection fits into remediation.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-in-up" duration={600} delay={200}>
                <Link
                  href="/tell-mold-behind-walls/"
                  className="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    Signs of Mold Behind Walls
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Discover how to tell if mold is hiding behind your drywall and what warning signs to watch for.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-in-up" duration={600} delay={300}>
                <Link
                  href="/health-risks-associated-with-mold-in-your-home/"
                  className="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    Health Risks of Mold
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Understand the health hazards of mold exposure and why quick remediation is essential.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <AnimateOnScroll animation="fade-in-up" duration={600}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Concerned About Mold?
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Don't let mold compromise your health or property. Our certified team provides thorough mold inspection and remediation throughout South Florida.
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

