import Link from 'next/link';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import OptimizedImage from '@/components/OptimizedImage';
import { generatePageMetadata, truncateMetaTitle } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider, generateBreadcrumbSchema, generateFAQPageSchema, generateYouTubeVideoSchema } from '@/lib/structured-data';
import { getService, getAllCities } from '@/lib/local-seo/data';
import { ServiceProcess } from '@/components/local-seo/ServiceProcess';
import { ServiceOverviewSection } from '@/components/local-seo/ServiceOverviewSection';
import { CommonCausesSection } from '@/components/local-seo/CommonCausesSection';
import { LocalFAQ } from '@/components/local-seo/LocalFAQ';
import { ServiceVideo } from '@/components/local-seo/ServiceVideo';
import { generateAltText } from '@/lib/seo-utils';
import { Package, Home, Building2, ArrowRight, Phone, MapPin, Camera, Clock } from 'lucide-react';

const SERVICE_SLUG = 'shrink-wrapping';

export async function generateMetadata() {
  return generatePageMetadata({
    title: truncateMetaTitle('Shrink Wrapping Services | South Florida | Total Care Restoration'),
    description: 'Professional shrink wrapping for roofs and properties in South Florida. Superior long-term protection for storm-damaged buildings. Licensed & insured. Call now!',
    keywords: ['shrink wrapping', 'roof shrink wrap', 'construction shrink wrap', 'property protection', 'South Florida'],
    path: `/${SERVICE_SLUG}`,
  });
}

export default function ShrinkWrappingPage() {
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
    { label: 'Shrink Wrapping', href: `/${SERVICE_SLUG}` },
  ];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';
  const video = service.video;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}/${SERVICE_SLUG}/#Service`,
    name: 'Shrink Wrapping Services',
    description: 'Professional shrink wrapping services for roofs and properties throughout South Florida, providing superior long-term protection for storm-damaged structures.',
    url: `${baseUrl}/${SERVICE_SLUG}/`,
    provider: getLocalBusinessProvider(),
    areaServed: cityList.map(city => ({
      '@type': 'City',
      name: city.name,
    })),
    serviceType: 'Shrink Wrapping',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Shrink Wrapping Services',
      itemListElement: service.process.map((step) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: step.title,
          description: step.description,
        },
      })),
    },
  };

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  // Generate FAQ schema if FAQs exist
  const faqSchema = service.mainPageContent?.generalFaqs 
    ? generateFAQPageSchema(service.mainPageContent.generalFaqs)
    : null;

  // Generate video schema if video exists
  const videoSchema = video 
    ? generateYouTubeVideoSchema({
        videoId: video.youtubeId,
        title: video.title,
        description: `Learn about our professional shrink wrapping process. Long-term property protection services by Total Care Restoration.`,
      })
    : null;

  // Combine all schemas
  const schemas = [serviceSchema, breadcrumbSchema, faqSchema, videoSchema].filter(Boolean);

  return (
    <>
      <StructuredData data={schemas} />
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Image */}
          {service.images?.hero && (
            <div className="absolute inset-0 z-0">
              <OptimizedImage
                src={service.images.hero}
                alt={generateAltText({ type: 'hero', serviceName: 'Shrink Wrapping' })}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50" />
            </div>
          )}
          
          {/* Fallback gradient if no image */}
          {!service.images?.hero && (
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-violet-50 via-background to-purple-50" />
          )}

          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <Breadcrumbs 
              items={breadcrumbs} 
              className={`mb-6 ${service.images?.hero ? '[&_a]:text-white/80 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/60' : ''}`} 
            />
            
            
              <div className="max-w-3xl">
                {/* Service badges */}
                <div className="flex items-center gap-3 mb-6">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                    service.images?.hero 
                      ? 'bg-white/20 text-white backdrop-blur-sm' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    <Package className="w-4 h-4" />
                    Shrink Wrapping
                  </span>
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                    service.images?.hero 
                      ? 'bg-green-500/20 text-green-100 backdrop-blur-sm' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    <Clock className="w-4 h-4" />
                    24/7 Emergency
                  </span>
                </div>

                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
                  service.images?.hero ? 'text-white' : 'text-gray-900'
                }`}>
                  Shrink Wrapping Services
                </h1>

                <p className={`text-xl md:text-2xl mb-8 leading-relaxed ${
                  service.images?.hero ? 'text-gray-100' : 'text-gray-600'
                }`}>
                  Professional shrink wrapping for superior long-term property protection. Our industrial-grade shrink wrap provides watertight coverage 
                  for 6-12 months, ideal when permanent repairs will take time.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:7866106317"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6200] text-white font-bold rounded-lg hover:bg-[#E55A00] transition-colors shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    Call (786) 610-6317
                  </a>
                  <Link
                    href="/#contact"
                    className={`inline-flex items-center justify-center px-8 py-4 font-bold rounded-lg transition-colors ${
                      service.images?.hero 
                        ? 'bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 backdrop-blur-sm'
                        : 'bg-white text-primary border-2 border-primary hover:bg-primary/5'
                    }`}
                  >
                    Get Free Assessment
                  </Link>
                </div>
              </div>
            
          </div>
        </section>

        {/* Service Type Selection */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                Choose Your Property Type
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                We offer specialized shrink wrapping services for residential homes and commercial buildings, providing long-term weather protection during extended repair periods.
              </p>
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Residential Card */}
              
                <Link
                  href={`/${SERVICE_SLUG}/residential`}
                  className="group block p-8 bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border-2 border-transparent hover:border-primary transition-all duration-200 hover:shadow-lg"
                >
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                    <Home className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    Residential Services
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Protect your home with professional shrink wrapping when long-term coverage is needed. Perfect for complex roof shapes or extended repair timelines.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      6-12 month protection
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Watertight seal
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
              

              {/* Commercial Card */}
              
                <Link
                  href={`/${SERVICE_SLUG}/commercial`}
                  className="group block p-8 bg-gradient-to-br from-gray-50 to-violet-50 rounded-2xl border-2 border-transparent hover:border-primary transition-all duration-200 hover:shadow-lg"
                >
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                    <Building2 className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    Commercial Services
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Industrial-grade shrink wrapping for commercial buildings, construction sites, and large-scale projects requiring extended weather protection.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Large building capability
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Construction site protection
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      High-wind resistance
                    </li>
                  </ul>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    View Commercial Services
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              
            </div>
          </div>
        </section>

        {/* Service Overview Section */}
        {service.bodyContent && (
          <ServiceOverviewSection
            title="Understanding Shrink Wrapping"
            overview={service.bodyContent.overview}
            whyActFast={service.bodyContent.whyActFast}
            overviewImage={service.images?.overview}
          />
        )}

        {/* Common Causes Section */}
        {service.bodyContent?.commonCauses && (
          <CommonCausesSection
            title="When You Need Shrink Wrapping"
            causes={service.bodyContent.commonCauses}
          />
        )}

        {/* Process Section */}
        <ServiceProcess 
          title="Our Shrink Wrapping Process" 
          steps={service.process} 
        />

        {/* Service Video */}
        {service.video && (
          <ServiceVideo videoId={service.video.youtubeId} title={service.video.title} />
        )}

        {/* General FAQs Section */}
        {service.mainPageContent?.generalFaqs && (
          <LocalFAQ
            title="Shrink Wrapping FAQs"
            faqs={service.mainPageContent.generalFaqs}
          />
        )}

        {/* Gallery Section */}
        {service.images?.gallery && service.images.gallery.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                  Our Work in Action
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                  See examples of our professional shrink wrapping services throughout South Florida.
                </p>
              

              <div className={`grid gap-6 ${
                service.images.gallery.length === 1 
                  ? 'grid-cols-1 max-w-2xl mx-auto' 
                  : service.images.gallery.length === 2 
                    ? 'grid-cols-1 md:grid-cols-2' 
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {service.images.gallery.map((image, index) => (
                  
                    <div className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <OptimizedImage
                        src={image}
                        alt={generateAltText({ type: 'gallery-item', serviceName: 'Shrink Wrapping', index })}
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
                  
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Cities Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            
              <div className="flex items-center justify-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Service Areas
                </h2>
              </div>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                We provide shrink wrapping services throughout South Florida, including Miami-Dade, Broward, and Palm Beach counties.
              </p>
            

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cityList.map((city, index) => (
                
                  <div className="block p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="font-medium text-gray-900">
                      {city.name}
                    </span>
                  </div>
                
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 text-center">
            
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Need Long-Term Roof Protection?
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Shrink wrapping provides superior protection compared to tarps. Contact us to discuss if shrink wrapping is right for your property.
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
            
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

