/**
 * Sitemap Generation Script
 * 
 * This script generates segmented sitemaps for static export.
 * Run with: npx tsx scripts/generate-sitemaps.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { getAllPosts } from '../lib/blog/posts';
import { getAllPages } from '../lib/pages/pages';
import { getAllGuides } from '../lib/guides';
import { 
  getPhase1Services,
  getPhase2Services, 
  getAllCities, 
  getAllCauses 
} from '../lib/local-seo/data';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';
const outputDir = path.join(process.cwd(), 'public', 'sitemaps');

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// =============================================================================
// XML GENERATION HELPERS
// =============================================================================

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function generateSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${formatDate(entry.lastModified)}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function generateSitemapIndexXml(sitemaps: string[]): string {
  const entries = sitemaps
    .map(
      (sitemap) => `  <sitemap>
    <loc>${baseUrl}/sitemaps/${sitemap}</loc>
    <lastmod>${formatDate(new Date())}</lastmod>
  </sitemap>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;
}

// =============================================================================
// SITEMAP GENERATORS
// =============================================================================

function getStaticRoutes(): SitemapEntry[] {
  const pages = getAllPages();
  
  const coreRoutes: SitemapEntry[] = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/indoor-air-quality/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/leak-detection/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const otherPages = pages
    .filter((page) => {
      const normalizedSlug = page.slug.replace(/^\/+|\/+$/g, '');
      return (
        normalizedSlug !== 'home' &&
        normalizedSlug !== 'about' &&
        normalizedSlug !== 'contact' &&
        normalizedSlug !== 'blog' &&
        normalizedSlug !== 'privacy-policy'
      );
    })
    .map((page) => {
      const normalizedSlug = page.slug.replace(/^\/+|\/+$/g, '');
      return {
        url: `${baseUrl}/${normalizedSlug}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      };
    });

  return [...coreRoutes, ...otherPages];
}

function getServiceRoutes(): SitemapEntry[] {
  const phase1Services = getPhase1Services();
  const phase2Services = getPhase2Services();
  const allServices = { ...phase1Services, ...phase2Services };

  const coreServiceRoutes = Object.keys(allServices).map((serviceSlug) => ({
    url: `${baseUrl}/${serviceSlug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.95,
  }));

  const typeHubRoutes = Object.keys(allServices).flatMap((serviceSlug) => [
    {
      url: `${baseUrl}/${serviceSlug}/residential/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/${serviceSlug}/commercial/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]);

  return [...coreServiceRoutes, ...typeHubRoutes];
}

function getCityRoutes(): SitemapEntry[] {
  const phase1Services = getPhase1Services();
  const phase2Services = getPhase2Services();
  const allServices = { ...phase1Services, ...phase2Services };
  const cities = getAllCities();

  return Object.keys(allServices).flatMap((serviceSlug) =>
    Object.keys(cities).flatMap((citySlug) => [
      {
        url: `${baseUrl}/${serviceSlug}/residential/${citySlug}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.85,
      },
      {
        url: `${baseUrl}/${serviceSlug}/commercial/${citySlug}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.85,
      },
    ])
  );
}

function getProblemRoutes(): SitemapEntry[] {
  const allCauses = getAllCauses();
  const cities = getAllCities();

  const causeHubRoutes: SitemapEntry[] = [];
  for (const category of Object.values(allCauses)) {
    for (const cause of category) {
      causeHubRoutes.push({
        url: `${baseUrl}/problems/${cause.slug}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  const causeCityRoutes: SitemapEntry[] = [];
  for (const category of Object.values(allCauses)) {
    for (const cause of category) {
      for (const citySlug of Object.keys(cities)) {
        causeCityRoutes.push({
          url: `${baseUrl}/problems/${cause.slug}/${citySlug}/`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.75,
        });
      }
    }
  }

  return [...causeHubRoutes, ...causeCityRoutes];
}

function getBlogRoutes(): SitemapEntry[] {
  const posts = getAllPosts();

  return posts.map((post) => ({
    url: `${baseUrl}/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
}

function getGuideRoutes(): SitemapEntry[] {
  const guides = getAllGuides();

  const guidesIndexRoute = {
    url: `${baseUrl}/guides/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  };

  const guideRoutes = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [guidesIndexRoute, ...guideRoutes];
}

// =============================================================================
// MAIN EXECUTION
// =============================================================================

async function generateSitemaps() {
  console.log('🗺️  Generating segmented sitemaps...\n');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const sitemaps: { name: string; generator: () => SitemapEntry[] }[] = [
    { name: 'static.xml', generator: getStaticRoutes },
    { name: 'services.xml', generator: getServiceRoutes },
    { name: 'cities.xml', generator: getCityRoutes },
    { name: 'problems.xml', generator: getProblemRoutes },
    { name: 'blog.xml', generator: getBlogRoutes },
    { name: 'guides.xml', generator: getGuideRoutes },
  ];

  let totalUrls = 0;

  for (const { name, generator } of sitemaps) {
    const routes = generator();
    const xml = generateSitemapXml(routes);
    const filePath = path.join(outputDir, name);
    fs.writeFileSync(filePath, xml);
    console.log(`  ✓ ${name}: ${routes.length} URLs`);
    totalUrls += routes.length;
  }

  // Generate sitemap index
  const indexXml = generateSitemapIndexXml(sitemaps.map((s) => s.name));
  fs.writeFileSync(path.join(outputDir, 'index.xml'), indexXml);
  console.log(`  ✓ index.xml: ${sitemaps.length} sitemaps`);

  console.log(`\n📊 Total: ${totalUrls} URLs across ${sitemaps.length} sitemaps`);
  console.log(`📁 Output: ${outputDir}`);
}

generateSitemaps().catch(console.error);
