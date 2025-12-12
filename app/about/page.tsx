import { notFound } from 'next/navigation';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';
import { getPageBySlug } from '@/lib/pages/pages';
import { generatePageMetadata } from '@/lib/utils';
import OptimizedImage from '@/components/OptimizedImage';

export async function generateMetadata() {
  const page = getPageBySlug('about');
  
  if (!page) {
    return generatePageMetadata({
      title: 'About - Total Leak Detection',
      description: 'Learn about Total Leak Detection and our expertise in leak detection services.',
      path: '/about',
    });
  }

  return generatePageMetadata({
    title: page.seo_title || page.title || 'About - Total Leak Detection',
    description: page.seo_description || 'Learn about Total Leak Detection and our expertise in leak detection services.',
    keywords: page.keywords || (page.seo_title ? ['about', 'leak detection', 'Miami'] : undefined),
    path: '/about',
  });
}

export default async function AboutPage() {
  const page = getPageBySlug('about');

  if (!page) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8">
            <Breadcrumbs items={[{ label: 'About', href: '/about' }]} />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            {page.title}
          </h1>

          {page.feature_image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <div className="relative w-full aspect-video">
                <OptimizedImage
                  src={page.feature_image}
                  alt={page.title}
                  fill
                  className="object-cover"
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 896px"
                />
              </div>
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <MarkdownRenderer content={page.content} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

