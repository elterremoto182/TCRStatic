import Link from 'next/link';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { generatePageMetadata } from '@/lib/utils';
import { getAllCauses, getAllCities, CauseConfig } from '@/lib/local-seo/data';
import { AlertTriangle, Droplets, Flame, Wind, Bug, Zap } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Common Water & Property Damage Problems | Total Care Restoration',
  description: 'Learn about common causes of water damage, mold, fire damage, and other property emergencies. Get professional restoration help 24/7 in South Florida.',
  keywords: ['water damage causes', 'mold problems', 'fire damage', 'storm damage', 'property damage restoration', 'South Florida'],
  path: '/problems',
});

// Map category names to icons
const categoryIcons: Record<string, React.ElementType> = {
  'Water Damage': Droplets,
  'Mold': Bug,
  'Fire & Smoke': Flame,
  'Storm': Wind,
  'Sewage': AlertTriangle,
  'Default': Zap,
};

// Human-readable category names
const categoryDisplayNames: Record<string, string> = {
  'water-damage': 'Water Damage',
  'mold': 'Mold Problems',
  'fire': 'Fire & Smoke Damage',
  'storm': 'Storm Damage',
};

// Urgency badge colors
const urgencyColors: Record<string, string> = {
  emergency: 'bg-red-100 text-red-800',
  high: 'bg-orange-100 text-orange-800',
  moderate: 'bg-yellow-100 text-yellow-800',
};

export default function ProblemsPage() {
  const allCauses = getAllCauses();
  const cities = getAllCities();
  
  // Get the first city for default links (typically Miami or the primary service area)
  const defaultCity = Object.keys(cities)[0] || 'miami';

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <Breadcrumbs 
              items={[{ label: 'Problems', href: '/problems' }]} 
              className="mb-8 text-white/70"
            />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Common Property Damage Problems
            </h1>
            <p className="text-xl text-white/80 max-w-3xl">
              Understanding the cause of your property damage is the first step to effective restoration. 
              Explore common issues we address across South Florida and learn why quick action matters.
            </p>
          </div>
        </section>

        {/* Problems by Category */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            {Object.entries(allCauses).map(([category, causes]) => {
              const displayName = categoryDisplayNames[category] || category;
              const IconComponent = categoryIcons[displayName.split(' ')[0]] || categoryIcons['Default'];
              
              return (
                <div key={category} className="mb-16 last:mb-0">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {displayName}
                    </h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {causes.map((cause: CauseConfig) => (
                      <Link
                        key={cause.slug}
                        href={`/problems/${cause.slug}/${defaultCity}`}
                        className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                            {cause.name}
                          </h3>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${urgencyColors[cause.urgency]}`}>
                            {cause.urgency === 'emergency' ? 'Emergency' : cause.urgency === 'high' ? 'High Priority' : 'Moderate'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {cause.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {cause.seasonality.slice(0, 3).map((season) => (
                            <span 
                              key={season}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            >
                              {season}
                            </span>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Experiencing Property Damage?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Don&apos;t wait – water damage, mold, and fire damage get worse with time. 
              Our emergency response team is available 24/7 across South Florida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:7866106317"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Call (786) 610-6317
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                Request Free Estimate
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

