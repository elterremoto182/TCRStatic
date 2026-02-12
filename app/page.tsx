import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { About } from '@/components/sections/About';
import { Gallery } from '@/components/sections/Gallery';
import { Testimonials } from '@/components/sections/Testimonials';
import { TrustBadges } from '@/components/sections/TrustBadges';
import { CTABanner } from '@/components/sections/CTABanner';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { getPageBySlug } from '@/lib/pages/pages';
import { generatePageMetadata } from '@/lib/utils';
import { StructuredData, generateWebPageSchema } from '@/lib/structured-data';

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
