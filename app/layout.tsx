import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Suspense } from 'react';
import siteConfig from '@/config/site.json';
import dynamic from 'next/dynamic';
import { GoogleAnalyticsRouteTracker } from '@/components/GoogleAnalytics';
import { StructuredData } from '@/lib/structured-data';

const StickyCallButton = dynamic(
  () => import('@/components/StickyCallButton').then((m) => ({ default: m.StickyCallButton })),
  { ssr: false }
);
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
    canonical: baseUrl,
    // hreflang tags removed - only needed when multi-language content exists
    // Uncomment and configure when Spanish pages are created:
    // languages: {
    //   'en': `${baseUrl}/`,
    //   'x-default': `${baseUrl}/`,
    //   'es': `${baseUrl}/es/`,
    // },
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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Generate structured data schemas
  const organizationSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="icon" href={faviconPath} />
        <link rel="apple-touch-icon" href={faviconPath} />
        {/* Preload LCP hero image - faster LCP on mobile */}
        <link
          rel="preload"
          as="image"
          href="/images/hero/nextImageExportOptimizer/hero-background-opt-640.WEBP"
          imageSrcSet="/images/hero/nextImageExportOptimizer/hero-background-opt-640.WEBP 640w, /images/hero/nextImageExportOptimizer/hero-background-opt-1080.WEBP 1080w, /images/hero/nextImageExportOptimizer/hero-background-opt-1920.WEBP 1920w"
          imageSizes="100vw"
          fetchPriority="high"
        />
        <StructuredData data={[organizationSchema, localBusinessSchema, webSiteSchema]} />
      </head>
      <body>
        {children}
        <StickyCallButton />
        {gaId && (
          <Suspense fallback={null}>
            <GoogleAnalyticsRouteTracker />
          </Suspense>
        )}
        {/* GA loads after window load (lazyOnload) to avoid gtag.js forced reflows affecting Page Speed / LCP */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
