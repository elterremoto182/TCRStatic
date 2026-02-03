import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PostCard } from '@/components/blog/PostCard';
import { CategoryNav } from '@/components/blog/CategoryNav';
import { TagCloud } from '@/components/blog/TagCloud';
import { getAllPosts } from '@/lib/blog/posts';
import { getPageBySlug } from '@/lib/pages/pages';
import { generatePageMetadata } from '@/lib/utils';
import { StructuredData, generateCollectionPageSchema, generateBreadcrumbSchema } from '@/lib/structured-data';

export async function generateMetadata() {
  const page = getPageBySlug('blog');
  
  return generatePageMetadata({
    title: page?.seo_title || page?.title || 'Restoration Blog - Total Care Restoration',
    description: page?.seo_description || 'Expert water damage, mold remediation, and fire restoration tips for South Florida homeowners. Learn how to protect your property and handle emergencies.',
    keywords: page?.seo_title ? ['restoration blog', 'water damage tips', 'mold prevention', 'fire restoration', 'South Florida'] : undefined,
    path: '/blog/',
  });
}

export default function BlogPage() {
  const posts = getAllPosts();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';
  
  const breadcrumbs = [{ label: 'Blog', href: '/blog/' }];
  
  // Generate CollectionPage schema with blog post items
  const collectionPageSchema = generateCollectionPageSchema({
    name: 'Blog',
    description: 'Expert tips, guides, and insights for maintaining your home plumbing and leak detection.',
    url: `${baseUrl}/blog/`,
    items: posts.slice(0, 50).map(post => ({
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
        <section className="pt-32 pb-20 md:pb-28 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-8">
              <Breadcrumbs items={breadcrumbs} />
            </div>
            <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Restoration & Home Care Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Expert guides, actionable tips, and industry insights from South Florida&apos;s trusted restoration professionals. Whether you&apos;re dealing with water damage, mold concerns, fire restoration, or storm preparation, our certified technicians share their knowledge to help you protect your property.
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              From emergency response procedures to preventive maintenance strategies, our blog covers the topics that matter most to homeowners and property managers throughout Miami-Dade, Broward, and Palm Beach counties. Learn how to identify early warning signs, understand the restoration process, and make informed decisions about your property&apos;s care.
            </p>
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="py-6 bg-white border-b">
          <div className="max-w-6xl mx-auto px-4">
            <CategoryNav />
          </div>
        </section>

        {/* Tag Navigation */}
        <section className="py-6 bg-gray-50 border-b">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Browse by Topic</h2>
            <TagCloud showCounts={true} />
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-4">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  No blog posts available yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
