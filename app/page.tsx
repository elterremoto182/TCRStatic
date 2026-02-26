import dynamic from 'next/dynamic';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { About } from '@/components/sections/About';
import { getPageBySlug } from '@/lib/pages/pages';
import { generatePageMetadata } from '@/lib/utils';
import { StructuredData, generateWebPageSchema } from '@/lib/structured-data';

const Gallery = dynamic(
  () => import('@/components/sections/Gallery').then(mod => ({ default: mod.Gallery })),
  { ssr: true }
);
const Testimonials = dynamic(
  () => import('@/components/sections/Testimonials').then(mod => ({ default: mod.Testimonials })),
  { ssr: true }
);
const TrustBadges = dynamic(
  () => import('@/components/sections/TrustBadges').then(mod => ({ default: mod.TrustBadges })),
  { ssr: true }
);
const CTABanner = dynamic(
  () => import('@/components/sections/CTABanner').then(mod => ({ default: mod.CTABanner })),
  { ssr: true }
);
const Contact = dynamic(
  () => import('@/components/sections/Contact').then(mod => ({ default: mod.Contact })),
  { ssr: true }
);
const Footer = dynamic(
  () => import('@/components/sections/Footer').then(mod => ({ default: mod.Footer })),
  { ssr: true }
);

export async function generateMetadata() {
  const page = getPageBySlug('home');
  
  return generatePageMetadata({
    title: page?.seo_title || page?.title || 'Total Care Restoration | Water, Fire & Mold Restoration Services',
    description: page?.seo_description || '24/7 water, fire, and mold restoration for homes and businesses. Licensed, insured, and trusted since 2015. Direct insurance billing available.',
    keywords: page?.seo_title ? ['water leak detection'] : undefined,
    path: '/',
  });
}

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';
  
  // Generate WebPage schema for homepage
  const webPageSchema = generateWebPageSchema({
    url: `${baseUrl}/`,
    name: 'Total Care Restoration | Water, Fire & Mold Restoration Services',
    description: '24/7 water, fire, and mold restoration for homes and businesses. Licensed, insured, and trusted since 2015. Direct insurance billing available.',
  });

  return (
    <>
      <StructuredData data={webPageSchema} />
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Testimonials />
        <TrustBadges />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
