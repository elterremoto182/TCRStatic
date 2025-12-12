import { notFound } from 'next/navigation';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';
import { getPageBySlug, getAllPages } from '@/lib/pages/pages';
import { generatePageMetadata } from '@/lib/utils';
import { StructuredData } from '@/lib/structured-data';
import { generateServiceSchema } from '@/lib/structured-data';
import OptimizedImage from '@/components/OptimizedImage';
import content from '@/config/content.json';

// Map service slugs to service IDs for image lookup
const serviceSlugToIdMap: Record<string, string> = {
  'air-quality-inspections': 'air-quality',
  'fire-restoration': 'fire',
  'water-restoration': 'water',
  'mold-remediation': 'mold',
  'commercial': 'commercial',
  'roof-tarping': 'roof-tarping',
  'shrink-wrapping': 'shrink-wrapping',
};

// Helper function to get service image from content.json
function getServiceImageFromContent(slug: string): string | null {
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, '').replace(/^services\//, '').replace(/\/$/, '');
  const serviceId = serviceSlugToIdMap[normalizedSlug];
  
  if (!serviceId) {
    return null;
  }
  
  const service = content.services.find((s) => s.id === serviceId);
  return service?.image || null;
}

export async function generateStaticParams() {
  try {
    const pages = getAllPages();
    // Filter only service pages
    const servicePages = pages.filter((page) => {
      const normalizedSlug = page.slug.replace(/^\/+|\/+$/g, '');
      return normalizedSlug.startsWith('services/');
    });
    
    const params = servicePages.map((page) => {
      // Extract the slug part after 'services/'
      // Normalize by removing leading/trailing slashes first
      const normalizedSlug = page.slug.replace(/^\/+|\/+$/g, '');
      const slugPart = normalizedSlug.replace(/^services\//, '').replace(/\/$/, '');
      return {
        slug: slugPart,
      };
    });
    
    return params;
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
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
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
      path: '/services',
    });
  }
  
  const slug = String(resolvedParams.slug || '').trim();
  
  if (!slug) {
    return generatePageMetadata({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
      path: '/services',
    });
  }
  
  // Normalize the slug to match the format in markdown files
  const fullSlug = `services/${slug}`;
  const page = getPageBySlug(fullSlug);
  
  if (!page) {
    return generatePageMetadata({
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
      path: `/services/${slug}`,
    });
  }

  // Normalize slug for URL path
  const normalizedSlug = page.slug.replace(/^\/+|\/+$/g, '');
  const urlPath = `/${normalizedSlug}`;

  return generatePageMetadata({
    title: page.seo_title || page.title || 'Service - Total Leak Detection',
    description: page.seo_description || page.title || 'Professional leak detection and plumbing services.',
    keywords: page.keywords || (page.seo_title ? [page.seo_title] : undefined),
    path: urlPath,
  });
}

export default async function ServicePage({
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
  
  // Normalize the slug to match the format in markdown files
  // Try with and without trailing slash
  let fullSlug = `services/${slug}`;
  let page = getPageBySlug(fullSlug);
  
  // If not found, try with trailing slash
  if (!page) {
    fullSlug = `services/${slug}/`;
    page = getPageBySlug(fullSlug);
  }
  
  // If still not found, try the other way
  if (!page && fullSlug.endsWith('/')) {
    fullSlug = fullSlug.slice(0, -1);
    page = getPageBySlug(fullSlug);
  }

  if (!page) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';
  const normalizedSlug = page.slug.replace(/^\/+|\/+$/g, '');
  const url = `${baseUrl}/${normalizedSlug}`;
  
  // Generate service schema
  const serviceSchema = generateServiceSchema({
    name: page.seo_title || page.title,
    description: page.seo_description || page.title,
    url,
    serviceType: page.title,
  });

  // Generate breadcrumbs
  const breadcrumbItems = [
    { label: 'Services', href: '/services' },
    { label: page.title, href: `/${normalizedSlug}` },
  ];

  // Get feature image - use page feature_image if available, otherwise fallback to service card image
  const featureImage = page.feature_image || getServiceImageFromContent(page.slug);

  return (
    <>
      <StructuredData data={serviceSchema} />
      <Header />
      <main className="min-h-screen pt-20">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbItems} className="mb-6" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            {page.title}
          </h1>

          {featureImage && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <div className="relative w-full aspect-video">
                <OptimizedImage
                  src={featureImage}
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

