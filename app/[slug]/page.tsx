import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { notFound } from 'next/navigation';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';
import { RelatedLinks } from '@/components/blog/RelatedLinks';
import { getPageBySlug, getAllPages } from '@/lib/pages/pages';
import { getPostBySlug, getAllPosts } from '@/lib/blog/posts';
import { getPillarGuideInfo } from '@/lib/guides';
import { Home, Calendar, User, ArrowLeft, BookOpen, ArrowRight } from 'lucide-react';
import { generatePageMetadata, ensureTrailingSlash } from '@/lib/utils';
import { StructuredData, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/structured-data';

// Routes that have their own handlers and should not be handled by this catch-all
const reservedRoutes = [
  'about',
  'contact',
  'privacy-policy',
  'blog',
  'problems',
];

export async function generateStaticParams() {
  const pages = getAllPages();
  const posts = getAllPosts();
  
  // Filter out pages that have specific route handlers
  const catchAllPages = pages.filter((page) => {
    const normalizedSlug = page.slug.replace(/^\/+|\/+$/g, '');
    
    // Exclude reserved routes
    if (reservedRoutes.includes(normalizedSlug)) {
      return false;
    }
    
    return true;
  });
  
  // Combine pages and blog posts
  const pageParams = catchAllPages.map((page) => {
    const normalizedSlug = page.slug.replace(/^\/+|\/+$/g, '');
    return {
      slug: normalizedSlug,
    };
  });
  
  const postParams = posts.map((post) => ({
    slug: post.slug,
  }));
  
  return [...pageParams, ...postParams];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  // Handle params as either a direct object or Promise (Next.js 14.2 compatibility)
  const resolvedParams = params instanceof Promise ? await params : params;
  
  if (!resolvedParams || typeof resolvedParams !== 'object' || !resolvedParams.slug) {
    return generatePageMetadata({
      title: 'Page Not Found - Total Care Restoration',
      description: 'The page you are looking for could not be found.',
      path: '/',
    });
  }
  
  const slug = String(resolvedParams.slug || '').trim();
  
  if (!slug) {
    return generatePageMetadata({
      title: 'Page Not Found - Total Care Restoration',
      description: 'The page you are looking for could not be found.',
      path: '/',
    });
  }
  
  // Check for blog post first
  const post = getPostBySlug(slug);
  if (post) {
    // Differentiate meta title from H1 (which uses post.title)
    // Only add suffix if seo_title matches title AND there's room under 60 chars
    let metaTitle = post.seo_title || post.title;
    const titleMatchesH1 = !post.seo_title || post.seo_title === post.title;
    
    if (titleMatchesH1) {
      // Add differentiating suffix based on available space (60 char limit)
      if (post.title.length <= 52) {
        metaTitle = `${post.title} | Guide`;  // 8 chars
      } else if (post.title.length <= 55) {
        metaTitle = `${post.title} - Tips`;   // 7 chars  
      }
      // Titles > 55 chars stay as-is (rare edge cases)
    }
    
    return generatePageMetadata({
      title: metaTitle,
      description: post.excerpt || post.title,
      keywords: post.category ? [post.category, 'blog'] : ['blog'],
      path: `/${post.slug}/`,
      ogImage: post.image,
    });
  }
  
  const page = getPageBySlug(slug);
  
  if (!page) {
    return generatePageMetadata({
      title: 'Page Not Found - Total Care Restoration',
      description: 'The page you are looking for could not be found.',
      path: `/${slug}`,
    });
  }

  const urlPath = `/${slug}/`;
  
  return generatePageMetadata({
    title: page.seo_title || page.title || 'Total Care Restoration',
    description: page.seo_description || 'Professional water damage restoration, mold remediation, and fire restoration services in South Florida.',
    keywords: page.keywords,
    path: urlPath,
  });
}

export default async function DynamicPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  // Handle params as either a direct object or Promise (Next.js 14.2 compatibility)
  const resolvedParams = params instanceof Promise ? await params : params;
  
  if (!resolvedParams || typeof resolvedParams !== 'object' || !resolvedParams.slug) {
    notFound();
  }
  
  const slug = String(resolvedParams.slug || '').trim();
  
  if (!slug) {
    notFound();
  }
  
  // Check if this is a reserved route
  if (reservedRoutes.includes(slug)) {
    notFound();
  }
  
  // Check for blog post first
  const post = getPostBySlug(slug);
  if (post) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';
    const url = `${baseUrl}/${post.slug}/`;
    
    // Generate breadcrumbs
    const breadcrumbItems = [
      { label: 'Blog', href: '/blog/' },
      { label: post.title, href: `/${post.slug}/` },
    ];

    // Generate Article schema with wordCount
    // Use dateModified from frontmatter if available, otherwise fall back to publish date
    const articleSchema = generateArticleSchema({
      title: post.title,
      description: post.excerpt || post.title,
      url,
      image: post.image,
      datePublished: post.date,
      dateModified: post.dateModified || post.date,
      author: post.author,
      category: post.category,
      content: post.content,
    });

    // Generate Breadcrumb schema
    const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

    return (
      <>
        <StructuredData data={[articleSchema, breadcrumbSchema]} />
        <Header />
        <main className="min-h-screen">
          <article className="pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4">
              <Breadcrumbs items={breadcrumbItems} className="mb-8" />

              {post.category && (
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4">
                  {post.category}
                </span>
              )}

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                {post.title}
              </h1>

              <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                <span className="inline-flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                {post.author && (
                  <span className="inline-flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    {post.author}
                  </span>
                )}
              </div>

              {post.image && (
                <div className="aspect-video rounded-xl overflow-hidden mb-12 relative">
                  <OptimizedImage
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 90vw"
                  />
                </div>
              )}

              <MarkdownRenderer content={post.content} />

              {/* Pillar Guide Link Banner */}
              {(() => {
                const pillarInfo = getPillarGuideInfo(post.category);
                if (pillarInfo) {
                  return (
                    <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            Want to Learn More?
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            Read our comprehensive guide covering everything you need to know about this topic.
                          </p>
                          <Link
                            href={pillarInfo.href}
                            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                          >
                            {pillarInfo.title}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Related Links Widget */}
              {post.category && (
                <RelatedLinks category={post.category} currentSlug={post.slug} />
              )}

              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link
                  href="/blog/"
                  className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }
  
  const page = getPageBySlug(slug);
  
  if (!page) {
    notFound();
  }

  // Generate breadcrumbs for regular pages
  const normalizedSlug = page.slug.replace(/^\/+|\/+$/g, '');
  const breadcrumbItems = [
    { label: page.title, href: `/${normalizedSlug}/` },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbItems} className="mb-6" />
            <Link
              href="/"
              className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors duration-200"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-8">
            {page.title}
          </h1>

          <div className="prose prose-lg max-w-none">
            <MarkdownRenderer content={page.content} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

