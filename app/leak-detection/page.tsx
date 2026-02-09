import Link from 'next/link';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { generatePageMetadata, truncateMetaTitle } from '@/lib/utils';
import { StructuredData, getLocalBusinessProvider, generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/structured-data';
import { 
  Search, 
  Phone, 
  CheckCircle2, 
  Droplet, 
  ArrowRight,
  Shield,
  Eye,
  Waves,
  Home,
  Building2,
  Gauge,
  Camera
} from 'lucide-react';

export async function generateMetadata() {
  return generatePageMetadata({
    title: truncateMetaTitle('Leak Detection Services | South Florida | Total Care Restoration'),
    description: 'Professional leak detection services in South Florida. Find hidden water leaks, slab leaks, and pipe damage with advanced technology. 24/7 emergency service available.',
    keywords: ['leak detection', 'water leak detection', 'slab leak', 'pipe leak', 'video inspection', 'South Florida'],
    path: '/leak-detection',
  });
}

export default function LeakDetectionPage() {
  const breadcrumbs = [
    { label: 'Leak Detection', href: '/leak-detection' },
  ];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}/leak-detection/#Service`,
    name: 'Leak Detection Services',
    description: 'Professional leak detection services using advanced technology to locate hidden water leaks, slab leaks, and pipe damage in residential and commercial properties.',
    url: `${baseUrl}/leak-detection/`,
    provider: getLocalBusinessProvider(),
    areaServed: {
      '@type': 'State',
      name: 'Florida',
    },
    serviceType: 'Leak Detection',
  };

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  // Generate WebPage schema
  const webPageSchema = generateWebPageSchema({
    url: `${baseUrl}/leak-detection/`,
    name: 'Leak Detection Services | South Florida | Total Care Restoration',
    description: 'Professional leak detection services in South Florida. Find hidden water leaks, slab leaks, and pipe damage with advanced technology. 24/7 emergency service available.',
  });

  // Combine all schemas
  const schemas = [serviceSchema, breadcrumbSchema, webPageSchema];

  const services = [
    {
      icon: Gauge,
      title: 'Electronic Leak Detection',
      description: 'State-of-the-art electronic equipment to detect leaks behind walls, under floors, and in hard-to-reach areas without invasive testing.',
    },
    {
      icon: Camera,
      title: 'Video Pipe Inspection',
      description: 'High-resolution camera inspection of your plumbing system to identify cracks, blockages, root intrusion, and pipe damage.',
    },
    {
      icon: Waves,
      title: 'Slab Leak Detection',
      description: 'Specialized detection for leaks beneath concrete slabs using acoustic and thermal imaging technology.',
    },
    {
      icon: Eye,
      title: 'Thermal Imaging',
      description: 'Infrared cameras reveal temperature differences caused by hidden moisture, pinpointing leak locations accurately.',
    },
  ];

  const signs = [
    'Unexplained increase in water bills',
    'Sound of running water when fixtures are off',
    'Warm spots on floors (possible slab leak)',
    'Mold or mildew growth without obvious cause',
    'Decreased water pressure',
    'Cracks in foundation or walls',
    'Damp or discolored spots on walls or ceilings',
    'Musty odors in certain areas',
  ];

  const benefits = [
    {
      title: 'Non-Invasive Detection',
      description: 'Advanced technology locates leaks without tearing up walls or floors.',
    },
    {
      title: 'Accurate Results',
      description: 'Pinpoint leak locations to minimize repair costs and time.',
    },
    {
      title: 'Prevent Water Damage',
      description: 'Early detection prevents costly water damage and mold growth.',
    },
    {
      title: '24/7 Emergency Service',
      description: 'Available around the clock for urgent leak situations.',
    },
  ];

  return (
    <>
      <StructuredData data={schemas} />
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-background to-cyan-50">
          <div className="max-w-6xl mx-auto px-4">
            <Breadcrumbs items={breadcrumbs} className="mb-6" />
            
            
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Search className="w-8 h-8 text-blue-700" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Find Hidden Leaks Before They Cause Damage
              </h1>

              <p className="text-xl text-gray-600 max-w-3xl mb-8">
                Professional leak detection using advanced technology to find hidden water leaks 
                before they cause major damage. Our non-invasive methods locate leaks in walls, 
                slabs, and plumbing systems with pinpoint accuracy.
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
                  Get Free Estimate
                </Link>
              </div>
            
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                Our Detection Methods
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                We use multiple advanced technologies to locate leaks accurately without causing 
                unnecessary damage to your property.
              </p>
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                
                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>
                
              ))}
            </div>
          </div>
        </section>

        {/* Warning Signs Section */}
        <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Signs You May Have a Leak
                </h2>
                <p className="text-gray-600 mb-6">
                  Hidden leaks can cause extensive damage before becoming visible. Watch for these 
                  warning signs that indicate you may need professional leak detection:
                </p>
                <ul className="space-y-3">
                  {signs.map((sign, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{sign}</span>
                    </li>
                  ))}
                </ul>
              

              
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Why Choose Professional Detection?
                  </h3>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Shield className="w-5 h-5 text-blue-700" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{benefit.title}</p>
                          <p className="text-sm text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              
            </div>
          </div>
        </section>

        {/* Property Types Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                We Serve All Property Types
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                Our leak detection services are available for both residential and commercial properties 
                throughout South Florida.
              </p>
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
                <div className="p-8 bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                    <Home className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Residential
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Protect your home from hidden water damage. We detect leaks in plumbing, 
                    foundations, pools, and irrigation systems.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Single-family homes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Condos & townhomes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Multi-family units
                    </li>
                  </ul>
                </div>
              

              
                <div className="p-8 bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                    <Building2 className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Commercial
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Minimize business disruption with fast, accurate leak detection. 
                    We work around your schedule to protect your property.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Office buildings
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Retail spaces
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Industrial facilities
                    </li>
                  </ul>
                </div>
              
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                Complete Restoration Services
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                Found a leak? We provide complete water damage restoration services to repair 
                and restore your property.
              </p>
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
                <Link
                  href="/water-damage-restoration"
                  className="group block p-8 bg-white rounded-2xl border-2 border-transparent hover:border-primary transition-all duration-200 hover:shadow-lg"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                    <Droplet className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    Water Damage Restoration
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Complete water extraction, drying, and restoration services to repair 
                    damage caused by leaks and flooding.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              

              
                <Link
                  href="/sewage-cleanup"
                  className="group block p-8 bg-white rounded-2xl border-2 border-transparent hover:border-primary transition-all duration-200 hover:shadow-lg"
                >
                  <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                    <Waves className="w-7 h-7 text-amber-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    Sewage Cleanup
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Professional sewage and wastewater cleanup with proper sanitization 
                    and decontamination services.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 text-center">
            
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Suspect a Hidden Leak?
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Don&apos;t wait for visible water damage. Our advanced detection technology 
                finds leaks fast, saving you money on repairs and preventing extensive damage.
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
                  Schedule Detection
                </Link>
              </div>
            
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

