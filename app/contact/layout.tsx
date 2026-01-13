import { getPageBySlug } from '@/lib/pages/pages';
import { generatePageMetadata } from '@/lib/utils';
import { StructuredData, generateContactPageSchema, generateBreadcrumbSchema } from '@/lib/structured-data';

export async function generateMetadata() {
  const page = getPageBySlug('contact');
  
  return generatePageMetadata({
    title: page?.seo_title || page?.title || 'Contact Us - Total Leak Detection',
    description: page?.seo_description || 'Get in touch with Total Leak Detection. Schedule an estimate or receive more information on our leak detection services in Miami, FL.',
    keywords: page?.seo_title ? ['contact', 'leak detection', 'Miami'] : undefined,
    path: '/contact',
  });
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';
  const page = getPageBySlug('contact');
  
  const breadcrumbs = [{ label: 'Contact', href: '/contact' }];
  
  const contactPageSchema = generateContactPageSchema({
    url: `${baseUrl}/contact/`,
    name: page?.title,
    description: page?.seo_description,
  });
  
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  
  return (
    <>
      <StructuredData data={[contactPageSchema, breadcrumbSchema]} />
      {children}
    </>
  );
}

