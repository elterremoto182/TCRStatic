import Link from 'next/link';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getAllGuides, getPostsByPillar } from '@/lib/guides';
import { generatePageMetadata } from '@/lib/utils';
import { 
  BookOpen, 
  ArrowRight, 
  Droplet, 
  Flame, 
  AlertTriangle, 
  CloudLightning,
  Home 
} from 'lucide-react';

// Map guide slugs to icons
const iconMap: Record<string, React.ReactNode> = {
  'water-damage-restoration': <Droplet className="w-8 h-8" />,
  'fire-damage-restoration': <Flame className="w-8 h-8" />,
  'mold-remediation': <AlertTriangle className="w-8 h-8" />,
  'storm-damage-restoration': <CloudLightning className="w-8 h-8" />,
  'roof-tarping-shrink-wrapping': <Home className="w-8 h-8" />,
};

// Map guide slugs to colors
const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  'water-damage-restoration': { 
    bg: 'bg-blue-50', 
    text: 'text-blue-600', 
    border: 'border-blue-200 hover:border-blue-400' 
  },
  'fire-damage-restoration': { 
    bg: 'bg-orange-50', 
    text: 'text-orange-600', 
    border: 'border-orange-200 hover:border-orange-400' 
  },
  'mold-remediation': { 
    bg: 'bg-green-50', 
    text: 'text-green-600', 
    border: 'border-green-200 hover:border-green-400' 
  },
  'storm-damage-restoration': { 
    bg: 'bg-purple-50', 
    text: 'text-purple-600', 
    border: 'border-purple-200 hover:border-purple-400' 
  },
  'roof-tarping-shrink-wrapping': { 
    bg: 'bg-amber-50', 
    text: 'text-amber-600', 
    border: 'border-amber-200 hover:border-amber-400' 
  },
};

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Restoration Guides | Total Care Restoration',
    description: 'Comprehensive guides for water damage, fire damage, mold remediation, and storm damage restoration. Expert tips and resources for South Florida homeowners.',
    keywords: ['restoration guides', 'water damage guide', 'fire damage guide', 'mold remediation guide', 'storm damage guide'],
    path: '/guides/',
  });
}

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  // Get post counts for each guide
  const guidesWithCounts = guides.map((guide) => ({
    ...guide,
    postCount: getPostsByPillar(guide.slug).length,
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="max-w-6xl mx-auto px-4">
            <Breadcrumbs items={[{ label: 'Guides', href: '/guides/' }]} className="mb-6" />
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6">
                <BookOpen className="w-10 h-10 text-primary" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Property Restoration Guides
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                Comprehensive, in-depth guides covering everything you need to know about property restoration. 
                Written by our IICRC-certified technicians with decades of combined experience in South Florida.
              </p>
              
              <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                Property damage can be overwhelming, but knowledge is power. Our restoration guides walk you through each type of damage—from the initial emergency response to complete restoration. Learn what to expect during the restoration process, understand industry terminology, discover prevention strategies, and know your rights when filing insurance claims. Whether you&apos;re facing water damage from a burst pipe, smoke damage from a fire, mold growth from humidity, or storm damage from a hurricane, these guides provide the expert insights you need to make informed decisions and protect your property.
              </p>
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4">
            {guidesWithCounts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  Guides coming soon! Check back later.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {guidesWithCounts.map((guide) => {
                  const icon = iconMap[guide.slug] || <BookOpen className="w-8 h-8" />;
                  const colors = colorMap[guide.slug] || { 
                    bg: 'bg-gray-50', 
                    text: 'text-gray-600', 
                    border: 'border-gray-200 hover:border-gray-400' 
                  };

                  return (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}/`}
                      className={`group block p-8 ${colors.bg} rounded-2xl border-2 ${colors.border} transition-all duration-200 hover:shadow-lg`}
                    >
                      <div className={`w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow ${colors.text}`}>
                        {icon}
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                        {guide.title}
                      </h2>
                      
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {guide.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {guide.postCount} related articles
                        </span>
                        <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                          Read Guide
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Need Immediate Help?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Our restoration experts are available 24/7 for emergencies. 
              Don&apos;t wait—contact us now for a free assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:7866106317"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
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
      </main>
      <Footer />
    </>
  );
}
