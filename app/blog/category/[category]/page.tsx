import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PostCard } from '@/components/blog/PostCard';
import { CategoryNav } from '@/components/blog/CategoryNav';
import { TagCloud } from '@/components/blog/TagCloud';
import { 
  getAllPosts, 
  getPostsByCategory, 
  categorySlugMap,
  categoryNameToSlug,
  categoriesWithPages 
} from '@/lib/blog/posts';
import blogTaxonomy from '@/config/blog-taxonomy.json';
import { StructuredData, generateCollectionPageSchema, generateBreadcrumbSchema } from '@/lib/structured-data';
import { ArrowRight } from 'lucide-react';

// SEO-optimized category metadata
const categoryMeta: Record<string, { title: string; description: string; h1: string }> = {
  'Water': {
    title: 'Water Damage Restoration Articles | Total Care Restoration',
    description: 'Expert guides on water damage restoration, flood cleanup, and moisture control for South Florida homes and businesses.',
    h1: 'Water Damage Restoration Articles',
  },
  'Mold': {
    title: 'Mold Remediation Tips & Guides | Total Care Restoration',
    description: 'Learn about mold prevention, detection, and professional remediation techniques for Florida properties.',
    h1: 'Mold Remediation Articles',
  },
  'Fire': {
    title: 'Fire Damage Restoration Resources | Total Care Restoration',
    description: 'Professional advice on fire damage restoration, smoke cleanup, and soot removal for homeowners.',
    h1: 'Fire Damage Restoration Articles',
  },
  'Storm': {
    title: 'Storm Damage Restoration Guides | Total Care Restoration',
    description: 'Hurricane preparation and storm damage restoration tips for South Florida property owners.',
    h1: 'Storm Damage Restoration Articles',
  },
  'Air Quality': {
    title: 'Indoor Air Quality Guides | Total Care Restoration',
    description: 'Expert information on air quality testing, air scrubbers, and improving indoor air after disasters.',
    h1: 'Indoor Air Quality Articles',
  },
};

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return Object.keys(categorySlugMap).map((slug) => ({
    category: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const categoryName = categorySlugMap[categorySlug];
  
  if (!categoryName || !categoriesWithPages.includes(categoryName)) {
    return {};
  }
  
  const meta = categoryMeta[categoryName] || {
    title: `${categoryName} Articles | Total Care Restoration`,
    description: `Browse our ${categoryName.toLowerCase()} related articles and guides.`,
  };
  
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://totalcarerestoration.com/blog/category/${categorySlug}/`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const categoryName = categorySlugMap[categorySlug];
  
  // Only allow categories that have dedicated pages
  if (!categoryName || !categoriesWithPages.includes(categoryName)) {
    notFound();
  }
  
  const allPosts = getAllPosts();
  const posts = getPostsByCategory(categoryName);
  const taxonomy = blogTaxonomy.categoryToService[categoryName as keyof typeof blogTaxonomy.categoryToService];
  const meta = categoryMeta[categoryName];
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';
  
  // Breadcrumbs show logical taxonomy: Home > Blog > Mold (not Home > Blog > Category > Mold)
  const breadcrumbs = [
    { label: 'Blog', href: '/blog/' },
    { label: categoryName, href: `/blog/category/${categorySlug}/` },
  ];

  // Get pillar posts that exist
  const pillarPosts = taxonomy?.pillarPosts
    ?.map((slug: string) => {
      const cleanSlug = slug.replace(/^\/|\/$/g, '');
      return allPosts.find((p) => p.slug === cleanSlug);
    })
    .filter(Boolean)
    .slice(0, 3) || [];

  const collectionPageSchema = generateCollectionPageSchema({
    name: meta?.h1 || `${categoryName} Articles`,
    description: meta?.description || `${categoryName} related articles and guides.`,
    url: `${baseUrl}/blog/category/${categorySlug}/`,
    items: posts.map((post) => ({
      name: post.title,
      url: `${baseUrl}/${post.slug}/`,
    })),
  });
  
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <StructuredData data={[collectionPageSchema, breadcrumbSchema]} />
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-8">
              <Breadcrumbs items={breadcrumbs} />
            </div>
            
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {meta?.h1 || `${categoryName} Articles`}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
                {meta?.description}
              </p>
              
              {/* Link to related service page */}
              {taxonomy && (
                <Link
                  href={taxonomy.service}
                  className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  View our {taxonomy.serviceName} services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="py-6 bg-white border-b">
          <div className="max-w-6xl mx-auto px-4">
            <CategoryNav activeCategory={categoryName} />
          </div>
        </section>

        {/* Featured/Pillar Posts Section */}
        {pillarPosts.length > 0 && (
          <section className="py-12 bg-white border-b">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Essential Reading
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pillarPosts.map((post: any) => (
                  <Link
                    key={post.slug}
                    href={`/${post.slug}/`}
                    className="p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      Featured
                    </span>
                    <h3 className="font-semibold text-gray-900 mt-1 line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Category Posts */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                All {categoryName} Articles ({posts.length})
              </h2>
            </div>
            
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  No articles in this category yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} showCategory={false} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Browse by Tag */}
        <section className="py-12 bg-white border-t">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by Topic</h2>
            <TagCloud showCounts={true} />
          </div>
        </section>

        {/* Related Service CTA */}
        {taxonomy && (
          <section className="py-16 bg-primary text-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Need {taxonomy.serviceName}?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Our certified technicians are available 24/7 for emergencies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={taxonomy.service}
                  className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Learn About Our Services
                </Link>
                <a
                  href="tel:+17866069934"
                  className="px-8 py-3 border-2 border-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Call (786) 606-9934
                </a>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
