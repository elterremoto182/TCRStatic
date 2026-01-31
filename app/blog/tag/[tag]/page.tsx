import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PostCard } from '@/components/blog/PostCard';
import { CategoryNav } from '@/components/blog/CategoryNav';
import { TagCloud } from '@/components/blog/TagCloud';
import { getPostsByTag, getTagPostCounts } from '@/lib/blog/posts';
import blogTags from '@/config/blog-tags.json';
import { StructuredData, generateCollectionPageSchema, generateBreadcrumbSchema } from '@/lib/structured-data';

interface TagConfig {
  label: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  indexable: boolean | string;
  indexNote?: string;
  icon: string;
}

interface Props {
  params: Promise<{ tag: string }>;
}

const MIN_POSTS_FOR_INDEX = blogTags.minPostsForIndex || 5;

export async function generateStaticParams() {
  return Object.keys(blogTags.tags).map((slug) => ({
    tag: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tagConfig = blogTags.tags[tagSlug as keyof typeof blogTags.tags] as TagConfig | undefined;
  
  if (!tagConfig) {
    return {};
  }

  const counts = getTagPostCounts();
  const postCount = counts[tagSlug] || 0;
  
  // Determine if page should be indexed
  const shouldIndex = tagConfig.indexable === true || 
    (tagConfig.indexable === 'conditional' && postCount >= MIN_POSTS_FOR_INDEX);
  
  return {
    title: tagConfig.seoTitle,
    description: tagConfig.seoDescription,
    robots: shouldIndex ? undefined : { index: false, follow: true },
    alternates: {
      canonical: `https://totalcarerestoration.com/blog/tag/${tagSlug}/`,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag: tagSlug } = await params;
  const tagConfig = blogTags.tags[tagSlug as keyof typeof blogTags.tags] as TagConfig | undefined;
  
  if (!tagConfig) {
    notFound();
  }
  
  const posts = getPostsByTag(tagSlug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';
  
  // Breadcrumbs: Home > Blog > Tag Name
  const breadcrumbs = [
    { label: 'Blog', href: '/blog/' },
    { label: tagConfig.label, href: `/blog/tag/${tagSlug}/` },
  ];

  const collectionPageSchema = generateCollectionPageSchema({
    name: tagConfig.label,
    description: tagConfig.description,
    url: `${baseUrl}/blog/tag/${tagSlug}/`,
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
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                Topic
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {tagConfig.label}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {tagConfig.description}
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
            <TagCloud activeTag={tagSlug} showCounts={true} />
          </div>
        </section>

        {/* All Tagged Posts */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
              </h2>
            </div>
            
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 mb-4">
                  No articles with this tag yet.
                </p>
                <Link
                  href="/blog/"
                  className="text-primary font-semibold hover:text-primary/80"
                >
                  Browse all articles
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} showCategory={true} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need Professional Help?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Our certified restoration experts are available 24/7 for emergencies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact/"
                className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Us
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
      </main>
      <Footer />
    </>
  );
}
