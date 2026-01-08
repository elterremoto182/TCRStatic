import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog/posts';
import { getAllPages } from '@/lib/pages/pages';
import { getAllGuides } from '@/lib/guides';
import { 
  getPhase1Services,
  getPhase2Services, 
  getAllCities, 
  getAllCauses 
} from '@/lib/local-seo/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';

  const posts = getAllPosts();
  const pages = getAllPages();
  
  // Get local SEO data
  const phase1Services = getPhase1Services();
  const phase2Services = getPhase2Services();
  const allServices = { ...phase1Services, ...phase2Services };
  const cities = getAllCities();
  const allCauses = getAllCauses();

  // Blog routes
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Guide/Pillar page routes
  const guides = getAllGuides();
  const guideRoutes = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Guides index page
  const guidesIndexRoute = {
    url: `${baseUrl}/guides/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  };

  // Static main routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy/`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    // Secondary service pages (no residential/commercial sub-routes)
    {
      url: `${baseUrl}/indoor-air-quality/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/leak-detection/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // =============================================================================
  // NEW LOCAL SEO PAGES
  // =============================================================================

  // Core service pages (highest priority for services)
  const coreServiceRoutes = Object.keys(allServices).map((serviceSlug) => ({
    url: `${baseUrl}/${serviceSlug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.95,
  }));

  // Type hub pages (residential/commercial)
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

  // Service × Type × City pages (money pages - high priority)
  const serviceCityRoutes = Object.keys(allServices).flatMap((serviceSlug) =>
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

  // Cause/Problem pages (under /problems/ prefix)
  const causeRoutes: MetadataRoute.Sitemap = [];
  for (const category of Object.values(allCauses)) {
    for (const cause of category) {
      for (const citySlug of Object.keys(cities)) {
        causeRoutes.push({
          url: `${baseUrl}/problems/${cause.slug}/${citySlug}/`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.75,
        });
      }
    }
  }

  // =============================================================================
  // OTHER MARKDOWN PAGES
  // =============================================================================

  // Other pages from markdown (excluding those handled by specific routes)
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

  return [
    ...staticRoutes,
    guidesIndexRoute,
    ...guideRoutes,
    ...coreServiceRoutes,
    ...typeHubRoutes,
    ...serviceCityRoutes,
    ...causeRoutes,
    ...otherPages,
    ...blogRoutes,
  ];
}
