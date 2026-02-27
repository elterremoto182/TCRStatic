import { notFound } from 'next/navigation';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';
import { getPageBySlug } from '@/lib/pages/pages';
import { generatePageMetadata } from '@/lib/utils';
import { StructuredData, generateAboutPageSchema, generateBreadcrumbSchema } from '@/lib/structured-data';
import OptimizedImage from '@/components/OptimizedImage';

export async function generateMetadata() {
  const page = getPageBySlug('about');
  
  if (!page) {
    return generatePageMetadata({
      title: 'About Us - Total Care Restoration',
      description: 'Learn about Total Care Restoration, South Florida\'s trusted water damage, mold remediation, and fire restoration experts. Licensed, certified & locally owned since 2015.',
      path: '/about',
    });
  }

  return generatePageMetadata({
    title: page.seo_title || page.title || 'About Us - Total Care Restoration',
    description: page.seo_description || 'Learn about Total Care Restoration, South Florida\'s trusted water damage, mold remediation, and fire restoration experts. Licensed, certified & locally owned since 2015.',
    keywords: page.keywords || (page.seo_title ? ['about', 'leak detection', 'Miami'] : undefined),
    path: '/about',
  });
}

export default async function AboutPage() {
  const page = getPageBySlug('about');

  if (!page) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';
  
  const breadcrumbs = [{ label: 'About', href: '/about/' }];
  
  // Generate schemas
  const aboutPageSchema = generateAboutPageSchema({
    url: `${baseUrl}/about/`,
    name: page.title,
    description: page.seo_description,
  });
  
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <StructuredData data={[aboutPageSchema, breadcrumbSchema]} />
      <Header />
      <main className="min-h-screen pt-20">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            {page.title}
          </h1>

          {page.feature_image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <div className="relative w-full aspect-video">
                <OptimizedImage
                  src={page.feature_image}
                  alt={page.feature_image_alt || `Featured image for ${page.title} - Total Care Restoration`}
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

