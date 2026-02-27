import Link from 'next/link';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import OptimizedImage from '@/components/OptimizedImage';
import { generatePageMetadata, truncateMetaTitle } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider, generateBreadcrumbSchema, generateFAQPageSchema, generateYouTubeVideoSchema } from '@/lib/structured-data';
import { getService, getAllCities, getServiceVideo, getCausesForService } from '@/lib/local-seo/data';
import { ServiceProcess } from '@/components/local-seo/ServiceProcess';
import { ServiceVideo } from '@/components/local-seo/ServiceVideo';
import { ServiceOverviewSection } from '@/components/local-seo/ServiceOverviewSection';
import { CommonCausesSection } from '@/components/local-seo/CommonCausesSection';
import { RelatedProblems } from '@/components/local-seo/RelatedProblems';
import { LocalFAQ } from '@/components/local-seo/LocalFAQ';
import { generateAltText } from '@/lib/seo-utils';
import { AlertTriangle, Home, Building2, ArrowRight, Phone, MapPin, Camera, Clock, CheckCircle } from 'lucide-react';

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
  const video = getServiceVideo(SERVICE_SLUG);
  const causes = getCausesForService(SERVICE_SLUG);
  const defaultCity = Object.keys(cities)[0] || 'miami';
  
  if (!service) {
    return null;
  }

  const cityList = Object.entries(cities).map(([slug, city]) => ({
    slug,
    name: city.name,
  }));

  const breadcrumbs = [
    { label: 'Mold Remediation', href: `/${SERVICE_SLUG}/` },
  ];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}/${SERVICE_SLUG}/#Service`,
    name: 'Mold Remediation',
    description: 'Professional mold remediation services for residential and commercial properties throughout South Florida.',
    url: `${baseUrl}/${SERVICE_SLUG}/`,
    provider: getLocalBusinessProvider(),
    areaServed: {
      '@type': 'State',
      name: 'Florida',
    },
    serviceType: 'Mold Remediation',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mold Remediation Services',
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
        description: `Learn about our professional mold remediation process. ${service.name} services by Total Care Restoration.`,
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
                alt={generateAltText({ type: 'hero', serviceName: 'Mold Remediation' })}
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
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-green-50 via-background to-teal-50" />
          )}

          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <Breadcrumbs 
              items={breadcrumbs} 
              className={`mb-6 ${service.images?.hero ? '[&_a]:text-white/80 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/60' : ''}`} 
            />
            
            
              <div className="max-w-3xl">
                {/* Service badges */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                    service.images?.hero 
                      ? 'bg-white/20 text-white backdrop-blur-sm' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    <AlertTriangle className="w-4 h-4" />
                    Mold Remediation
                  </span>
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                    service.images?.hero 
                      ? 'bg-green-500/20 text-green-100 backdrop-blur-sm' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    <Clock className="w-4 h-4" />
                    24/7 Emergency
                  </span>
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                    service.images?.hero 
                      ? 'bg-white/15 text-white/95 backdrop-blur-sm' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <CheckCircle className="w-4 h-4" />
                    Florida Licensed Mold Remediator (MRSR2596)
                  </span>
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                    service.images?.hero 
                      ? 'bg-white/15 text-white/95 backdrop-blur-sm' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <CheckCircle className="w-4 h-4" />
                    IICRC Certified Firm (#219076)
                  </span>
                </div>

                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
                  service.images?.hero ? 'text-white' : 'text-gray-900'
                }`}>
                  Mold Remediation
                </h1>

                <p className={`text-xl md:text-2xl mb-8 leading-relaxed ${
                  service.images?.hero ? 'text-gray-100' : 'text-gray-600'
                }`}>
                  Professional mold remediation services for homes and businesses throughout South Florida. 
                  Our certified technicians safely remove mold and prevent its return to protect your health.
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
                We offer specialized mold remediation services tailored to the unique needs of residential homeowners and commercial property managers.
              </p>
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Residential Card */}
              
                <Link
                  href={`/${SERVICE_SLUG}/residential/`}
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
              

              {/* Commercial Card */}
              
                <Link
                  href={`/${SERVICE_SLUG}/commercial/`}
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

        {/* Related Problems - Clickable cards linking to problem pages */}
        {causes.length > 0 && (
          <RelatedProblems
            title="Common Mold Problems We Solve"
            causes={causes}
            defaultCity={defaultCity}
          />
        )}

        {/* Process Section */}
        <ServiceProcess 
          title="Our Mold Remediation Process" 
          steps={service.process} 
        />

        {/* Service Video - Watch our process in action */}
        {video && (
          <ServiceVideo videoId={video.youtubeId} title={video.title} />
        )}

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
              
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                  Our Work in Action
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                  See examples of our professional mold remediation services throughout South Florida.
                </p>
              

              <div className={`grid gap-6 ${
                service.images.gallery.length === 1 
                  ? 'grid-cols-1 max-w-2xl mx-auto' 
                  : service.images.gallery.length === 2 
                    ? 'grid-cols-1 md:grid-cols-2' 
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {service.images.gallery.map((image, index) => (
                  <div key={index} className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <OptimizedImage
                      src={image.src}
                      alt={image.caption || generateAltText({ type: 'gallery-item', serviceName: 'Mold Remediation', index })}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 text-gray-900 text-sm font-medium rounded-full">
                        <Camera className="w-4 h-4" />
                        {image.caption}
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
                We provide mold remediation services throughout South Florida.
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

        {/* Pillar Guide Banner */}
        <section className="py-12 bg-green-50">
          <div className="max-w-4xl mx-auto px-4">
            
              <Link
                href="/guides/mold-remediation/"
                className="group flex flex-col md:flex-row items-center gap-6 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-green-100"
              >
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    The Complete Guide to Mold Remediation in Florida
                  </h3>
                  <p className="text-gray-600">
                    Learn everything about mold types, health risks, the remediation process, prevention tips, and insurance coverage in our comprehensive guide.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg group-hover:bg-primary/90 transition-colors whitespace-nowrap">
                  Read Guide
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            
          </div>
        </section>

        {/* Related Resources Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                Mold Resources & Guides
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                Learn more about mold detection, prevention, and our remediation process.
              </p>
            
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
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
              
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 text-center">
            
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
            
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

