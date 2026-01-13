import Link from 'next/link';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { generatePageMetadata, truncateMetaTitle } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider, generateBreadcrumbSchema } from '@/lib/structured-data';
import { 
  Wind, 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  Droplet, 
  ArrowRight,
  Shield,
  ClipboardCheck,
  Thermometer,
  Home
} from 'lucide-react';

export async function generateMetadata() {
  return generatePageMetadata({
    title: truncateMetaTitle('Indoor Air Quality Testing & Inspections | South Florida | Total Care Restoration'),
    description: 'Professional indoor air quality testing and inspections in South Florida. Identify mold spores, allergens, and pollutants. Certified IAQ assessments for homes and businesses.',
    keywords: ['indoor air quality', 'air quality testing', 'air quality inspection', 'IAQ assessment', 'mold spores', 'South Florida'],
    path: '/indoor-air-quality',
  });
}

export default function IndoorAirQualityPage() {
  const breadcrumbs = [
    { label: 'Indoor Air Quality', href: '/indoor-air-quality' },
  ];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}/indoor-air-quality/#Service`,
    name: 'Indoor Air Quality Testing & Inspections',
    description: 'Professional indoor air quality testing and inspection services to identify mold spores, allergens, VOCs, and other pollutants in residential and commercial properties.',
    url: `${baseUrl}/indoor-air-quality/`,
    provider: getLocalBusinessProvider(),
    areaServed: {
      '@type': 'State',
      name: 'Florida',
    },
    serviceType: 'Indoor Air Quality Testing',
  };

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  // Combine all schemas
  const schemas = [serviceSchema, breadcrumbSchema];

  const services = [
    {
      icon: ClipboardCheck,
      title: 'Air Quality Testing',
      description: 'Comprehensive testing for mold spores, allergens, VOCs, and other airborne contaminants using professional-grade equipment.',
    },
    {
      icon: Thermometer,
      title: 'HVAC Inspection',
      description: 'Thorough inspection of your HVAC system for contamination, dust buildup, and potential sources of poor air quality.',
    },
    {
      icon: AlertTriangle,
      title: 'Mold Spore Analysis',
      description: 'Laboratory analysis of air samples to identify mold types and concentrations, helping determine remediation needs.',
    },
    {
      icon: Shield,
      title: 'Remediation Recommendations',
      description: 'Detailed reports with actionable recommendations to improve your indoor air quality and protect your health.',
    },
  ];

  const symptoms = [
    'Persistent allergies or respiratory issues',
    'Musty or unusual odors in your property',
    'Visible mold growth or water stains',
    'Recent water damage or flooding',
    'Dust accumulation despite regular cleaning',
    'Headaches or fatigue when indoors',
  ];

  return (
    <>
      <StructuredData data={schemas} />
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-sky-50 via-background to-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            <Breadcrumbs items={breadcrumbs} className="mb-6" />
            
            <AnimateOnScroll animation="fade-in-up" duration={600}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center">
                  <Wind className="w-8 h-8 text-sky-700" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Indoor Air Quality Testing
              </h1>

              <p className="text-xl text-gray-600 max-w-3xl mb-8">
                Professional air quality inspections to identify hidden contaminants affecting your health. 
                Our certified technicians use advanced testing methods to detect mold spores, allergens, 
                VOCs, and other pollutants in your home or business.
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

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <AnimateOnScroll animation="fade-in-up" duration={600}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                Our Air Quality Services
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                Comprehensive indoor air quality assessments to protect your health and property.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <AnimateOnScroll
                  key={service.title}
                  animation="fade-in-up"
                  duration={600}
                  delay={index * 100}
                >
                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-sky-700" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Warning Signs Section */}
        <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimateOnScroll animation="fade-in-up" duration={600}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Signs You Need Air Quality Testing
                </h2>
                <p className="text-gray-600 mb-6">
                  Poor indoor air quality can affect your health without obvious visible signs. 
                  If you&apos;re experiencing any of these symptoms, it may be time for professional testing:
                </p>
                <ul className="space-y-3">
                  {symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-in-up" duration={600} delay={200}>
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Why Test Your Air Quality?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Indoor air can be 2-5 times more polluted than outdoor air. Professional testing 
                    identifies hidden contaminants that affect your family&apos;s health and helps determine 
                    the right remediation approach.
                  </p>
                  <div className="flex items-center gap-4 p-4 bg-sky-50 rounded-xl">
                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-sky-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Certified Inspectors</p>
                      <p className="text-sm text-gray-600">Licensed and insured professionals</p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <AnimateOnScroll animation="fade-in-up" duration={600}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                Related Services
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                Air quality issues are often connected to water damage or mold growth. 
                We offer comprehensive restoration services to address the root cause.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <AnimateOnScroll animation="fade-in-up" duration={600} delay={100}>
                <Link
                  href="/mold-remediation"
                  className="group block p-8 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl border-2 border-transparent hover:border-primary transition-all duration-200 hover:shadow-lg"
                >
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                    <AlertTriangle className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    Mold Remediation
                  </h3>
                  <p className="text-gray-600 mb-4">
                    If air quality testing reveals elevated mold spore levels, our certified team 
                    provides professional mold removal and remediation services.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-in-up" duration={600} delay={200}>
                <Link
                  href="/water-damage-restoration"
                  className="group block p-8 bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl border-2 border-transparent hover:border-primary transition-all duration-200 hover:shadow-lg"
                >
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                    <Droplet className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    Water Damage Restoration
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Water damage is a leading cause of poor air quality. We provide complete 
                    water extraction, drying, and restoration to prevent mold growth.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
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
                Concerned About Your Air Quality?
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Don&apos;t let poor air quality affect your health. Our certified inspectors 
                provide thorough testing and actionable recommendations to improve your indoor environment.
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
                  Schedule Inspection
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

