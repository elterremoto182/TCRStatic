import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import siteConfig from '@/config/site.json';
import { StickyCallButton } from '@/components/StickyCallButton';
import { StructuredData } from '@/lib/structured-data';
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
} from '@/lib/structured-data';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
  adjustFontFallback: true,
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  // hreflang infrastructure: individual pages can specify alternateLocales for Spanish versions
  // When Spanish content is added, create pages under /es/ and use:
  // generatePageMetadata({ ..., locale: 'es', alternateLocales: [{ locale: 'en', path: '/...' }] })
  alternates: {
    canonical: `${baseUrl}/`,
    languages: {
      'en': `${baseUrl}/`,
      'x-default': `${baseUrl}/`,
      // Spanish version placeholder - uncomment when /es/ pages are created:
      // 'es': `${baseUrl}/es/`,
    },
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.seo.title,
      },
    ],
    type: 'website',
    locale: 'en_US',
    // alternateLocale: ['es_US'], // Uncomment when Spanish content is added
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.seo.title,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faviconPath = '/favicon.ico';

  // Generate structured data schemas
  const organizationSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href={faviconPath} />
        <link rel="apple-touch-icon" href={faviconPath} />
        <StructuredData data={[organizationSchema, localBusinessSchema, webSiteSchema]} />
      </head>
      <body>
        {children}
        <StickyCallButton />
      </body>
    </html>
  );
}
