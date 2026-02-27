import Link from 'next/link';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { generatePageMetadata, truncateMetaTitle } from '@/lib/utils';
import { StructuredData } from '@/lib/structured-data';
import { getAllCities, getPhase1Services } from '@/lib/local-seo/data';
import { MapPin, Phone, Clock, ArrowRight, Home, Building2 } from 'lucide-react';

export async function generateMetadata() {
  return generatePageMetadata({
    title: truncateMetaTitle('Service Areas | South Florida Restoration Services | Total Care Restoration'),
    description: 'Total Care Restoration provides 24/7 water, fire & mold damage restoration services throughout South Florida. Serving Miami-Dade, Broward & Palm Beach Counties.',
    keywords: ['South Florida restoration services', 'Miami restoration', 'Broward County restoration', 'Palm Beach restoration', 'water damage', 'fire damage', 'mold remediation'],
    path: '/service-areas',
  });
}

// Group cities by county
function getCitiesByCounty() {
  const cities = getAllCities();
  const grouped: Record<string, { slug: string; name: string; county: string; responseTime: string }[]> = {
    'Broward County': [],
    'Miami-Dade County': [],
    'Palm Beach County': [],
  };

  Object.entries(cities).forEach(([slug, city]) => {
    const countyKey = city.county;
    if (grouped[countyKey]) {
      grouped[countyKey].push({
        slug,
        name: city.name,
        county: city.county,
        responseTime: city.responseTime,
      });
    }
  });

  // Sort cities alphabetically within each county
  Object.keys(grouped).forEach((county) => {
    grouped[county].sort((a, b) => a.name.localeCompare(b.name));
  });

  return grouped;
}

export default function ServiceAreasPage() {
  const citiesByCounty = getCitiesByCounty();
  const services = getPhase1Services();
  const allCities = getAllCities();

  // Get primary service for default links (water damage is most common)
  const primaryService = 'water-damage-restoration';

  // Service schema describing the areas served
  // References the global LocalBusiness via @id instead of creating a duplicate
  // This avoids schema conflicts with the global LocalBusiness from layout.tsx
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';
  
  const areaServedSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Restoration Services in South Florida',
    description: 'Professional water damage, fire damage, mold remediation, and storm damage restoration services across South Florida.',
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}#LocalBusiness`,
    },
    areaServed: Object.values(allCities).map((city) => ({
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'State',
        name: 'Florida',
      },
    })),
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 26.0,
        longitude: -80.2,
      },
      geoRadius: '100 miles',
    },
  };

  const breadcrumbs = [{ label: 'Service Areas', href: '/service-areas/' }];

  return (
    <>
      <StructuredData data={areaServedSchema} />
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-emerald-50 via-background to-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            <Breadcrumbs items={breadcrumbs} className="mb-6" outputSchema />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Communities We Serve Across South Florida
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mb-4">
              Total Care Restoration proudly serves communities throughout{' '}
              <strong>Miami-Dade County, Broward County, and Palm Beach County</strong>. Our
              certified restoration experts provide{' '}
              <strong>24/7 emergency response</strong> for water damage, fire damage, and mold
              remediation.
            </p>
            <p className="text-gray-600 max-w-3xl mb-8">
              <Link href="/reviews/" className="text-primary font-medium hover:underline">See what our customers say</Link> or check out <Link href="/promotions/" className="text-primary font-medium hover:underline">current promotions</Link> on restoration services.
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
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-lg border-2 border-primary hover:bg-primary/5 transition-colors"
              >
                Get Free Assessment
              </Link>
            </div>
          </div>
        </section>

        {/* Counties Grid */}
        {Object.entries(citiesByCounty).map(([county, cities], countyIndex) => (
          <section
            key={county}
            className={`py-16 ${countyIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{county}</h2>
              <p className="text-gray-600 mb-10">
                {cities.length} cities served with 24/7 emergency restoration services
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cities.map((city) => (
                  <div
                    key={city.slug}
                    className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{city.responseTime}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">
                      Professional restoration services for homes and businesses in {city.name},{' '}
                      FL.
                    </p>

                    {/* Service Type Links */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <Link
                        href={`/${primaryService}/residential/${city.slug}/`}
                        className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Home className="w-4 h-4" />
                        Residential
                      </Link>
                      <Link
                        href={`/${primaryService}/commercial/${city.slug}/`}
                        className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Building2 className="w-4 h-4" />
                        Commercial
                      </Link>
                    </div>

                    {/* Popular Services */}
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Popular Services
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(services)
                          .slice(0, 3)
                          .map(([serviceSlug, service]) => (
                            <Link
                              key={serviceSlug}
                              href={`/${serviceSlug}/residential/${city.slug}/`}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                              {service.shortName}
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* All Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              Our Restoration Services
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
              No matter which service area you&apos;re in, we offer the same comprehensive
              restoration services with 24/7 emergency response.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(services).map(([serviceSlug, service]) => (
                <Link
                  key={serviceSlug}
                  href={`/${serviceSlug}/`}
                  className="group flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-primary/5 hover:shadow-md transition-all duration-200"
                >
                  <span className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                    {service.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Don&apos;t See Your City Listed?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              We likely still serve your area! Contact us to confirm coverage in your location.
              Our team is available 24/7 for emergencies throughout South Florida.
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
