import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { getGuideBySlug, getAllGuides, getGuideWithPosts } from '@/lib/guides';
import { generatePageMetadata } from '@/lib/utils';
import { StructuredData, generateBreadcrumbSchema, generateArticleSchema, generateYouTubeVideoSchema } from '@/lib/structured-data';
import { 
  Phone, 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  Droplet, 
  Flame, 
  AlertTriangle, 
  CloudLightning,
  ChevronRight,
  Play
} from 'lucide-react';
import { YouTubeFacade } from '@/components/YouTubeFacade';

// Map guide slugs to icons
const iconMap: Record<string, React.ReactNode> = {
  'water-damage-restoration': <Droplet className="w-8 h-8" />,
  'fire-damage-restoration': <Flame className="w-8 h-8" />,
  'mold-remediation': <AlertTriangle className="w-8 h-8" />,
  'storm-damage-restoration': <CloudLightning className="w-8 h-8" />,
};

// Map guide slugs to video IDs
const videoMap: Record<string, { youtubeId: string; title: string }> = {
  'storm-damage-restoration': {
    youtubeId: 'Lsp6hleZ-Qk',
    title: 'Professional Roof Tarping & Storm Protection'
  },
};

// Map guide slugs to gradient colors
const gradientMap: Record<string, string> = {
  'water-damage-restoration': 'from-blue-50 via-background to-cyan-50',
  'fire-damage-restoration': 'from-orange-50 via-background to-red-50',
  'mold-remediation': 'from-green-50 via-background to-emerald-50',
  'storm-damage-restoration': 'from-slate-50 via-background to-purple-50',
};

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const slug = resolvedParams?.slug;
  
  if (!slug) {
    return generatePageMetadata({
      title: 'Guide Not Found',
      description: 'The guide you are looking for could not be found.',
      path: '/guides/',
    });
  }

  const guide = getGuideBySlug(slug);

  if (!guide) {
    return generatePageMetadata({
      title: 'Guide Not Found',
      description: 'The guide you are looking for could not be found.',
      path: `/guides/${slug}/`,
    });
  }

  return generatePageMetadata({
    title: guide.seo_title || guide.title,
    description: guide.seo_description || guide.excerpt,
    keywords: guide.keywords,
    path: `/guides/${slug}/`,
  });
}

export default async function GuidePage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const guideWithPosts = getGuideWithPosts(slug);

  if (!guideWithPosts) {
    notFound();
  }

  const { clusterPosts, ...guide } = guideWithPosts;
  const icon = iconMap[slug] || <BookOpen className="w-8 h-8" />;
  const gradient = gradientMap[slug] || 'from-primary/10 via-background to-accent/10';
  const video = videoMap[slug];

  // Generate structured data
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';
  
  const breadcrumbs = [
    { label: 'Guides', href: '/guides/' },
    { label: guide.title, href: `/guides/${slug}/` },
  ];

  // Use the proper article schema generator with wordCount
  const guideSchema = generateArticleSchema({
    title: guide.title,
    description: guide.excerpt,
    url: `${baseUrl}/guides/${slug}/`,
    category: 'Guide',
    content: guide.content,
  });

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  // Generate video schema if video exists
  const videoSchema = video ? generateYouTubeVideoSchema({
    videoId: video.youtubeId,
    title: video.title,
    description: `${video.title} - Learn about our professional restoration process.`,
  }) : null;

  // Combine all schemas
  const schemas = [guideSchema, breadcrumbSchema, videoSchema].filter(Boolean);

  return (
    <>
      <StructuredData data={schemas} />
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className={`pt-32 pb-16 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <Breadcrumbs items={breadcrumbs} className="mb-6" />
            
            <AnimateOnScroll animation="fade-in-up" duration={600}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  {icon}
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                  Complete Guide
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {guide.title}
              </h1>

              <p className="text-xl text-gray-600 max-w-3xl mb-8">
                {guide.excerpt}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Comprehensive Guide
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                {clusterPosts.length > 0 && (
                  <span className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    {clusterPosts.length} Related Articles
                  </span>
                )}
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* CTA Banner - Link to Service Page */}
        <section className="py-6 bg-primary">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-white text-center sm:text-left">
                <p className="font-semibold">Ready for Professional Help?</p>
                <p className="text-sm text-white/80">Our team is available 24/7 for emergencies</p>
              </div>
              <div className="flex gap-3">
                <a
                  href="tel:7866106317"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
                <Link
                  href={guide.service_page}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-bold rounded-lg border border-white/30 hover:bg-white/20 transition-colors"
                >
                  Our Services
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            {/* Guide Content */}
            <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-h2:text-3xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:font-semibold prose-h3:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600">
              <MarkdownRenderer content={guide.content} />
            </div>

            {/* Video Section */}
            {video && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Play className="w-6 h-6 text-primary" />
                  Watch: {video.title}
                </h3>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <YouTubeFacade videoId={video.youtubeId} title={video.title} />
                </div>
              </div>
            )}

            {/* Service CTA in Content */}
            <div className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Need Professional Assistance?
              </h3>
              <p className="text-gray-600 mb-6">
                Our certified technicians are available 24/7 to help with your restoration needs. 
                Get a free assessment and expert guidance for your specific situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:7866106317"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call (786) 610-6317
                </a>
                <Link
                  href={guide.service_page}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg border-2 border-primary hover:bg-primary/5 transition-colors"
                >
                  View Our Services
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Blog Posts - Cluster Content */}
        {clusterPosts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <AnimateOnScroll animation="fade-in-up" duration={600}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                  Related Articles & Resources
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                  Explore our in-depth articles covering specific topics, tips, and solutions related to this guide.
                </p>
              </AnimateOnScroll>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clusterPosts.slice(0, 12).map((post, index) => (
                  <AnimateOnScroll
                    key={post.slug}
                    animation="fade-in-up"
                    duration={400}
                    delay={index * 50}
                  >
                    <Link
                      href={`/${post.slug}/`}
                      className="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                      </div>
                    </Link>
                  </AnimateOnScroll>
                ))}
              </div>

              {clusterPosts.length > 12 && (
                <div className="text-center mt-10">
                  <Link
                    href="/blog/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary/5 transition-colors"
                  >
                    View All {clusterPosts.length} Articles
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <AnimateOnScroll animation="fade-in-up" duration={600}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Our experienced team is available 24/7 to help with your restoration needs. 
                Contact us for a free assessment.
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
            </AnimateOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

