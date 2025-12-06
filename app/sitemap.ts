import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog/posts';
import { getAllPages } from '@/lib/pages/pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://totalcarerestoration.com';

  const posts = getAllPosts();
  const pages = getAllPages();

  // Blog routes - add trailing slash to match Next.js trailingSlash: true config
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Static main routes - add trailing slash except for base URL
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
      url: `${baseUrl}/services/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
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
  ];

  // Service pages - add trailing slash
  const servicePages = pages
    .filter((page) => {
      const normalizedSlug = page.slug.replace(/^\/+|\/+$/g, '');
      return normalizedSlug.startsWith('services/');
    })
    .map((page) => {
      const normalizedSlug = page.slug.replace(/^\/+|\/+$/g, '');
      return {
        url: `${baseUrl}/${normalizedSlug}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      };
    });

  // Location pages and other static pages (excluding services which are handled above)
  // Add trailing slash to match Next.js config
  const otherPages = pages
    .filter((page) => {
      const normalizedSlug = page.slug.replace(/^\/+|\/+$/g, '');
      return (
        !normalizedSlug.startsWith('services/') &&
        normalizedSlug !== 'home' &&
        normalizedSlug !== 'about' &&
        normalizedSlug !== 'contact' &&
        normalizedSlug !== 'blog' &&
        normalizedSlug !== 'privacy-policy'
      );
    })
    .map((page) => {
      const normalizedSlug = page.slug.replace(/^\/+|\/+$/g, '');
      // Determine priority based on page type
      let priority = 0.7;
      let changeFrequency: 'weekly' | 'monthly' | 'yearly' = 'monthly';
      
      // Location pages get higher priority
      if (
        normalizedSlug.includes('leak-detection') ||
        normalizedSlug.includes('mold-testing')
      ) {
        priority = 0.8;
        changeFrequency = 'monthly';
      }

      return {
        url: `${baseUrl}/${normalizedSlug}/`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      };
    });

  return [...staticRoutes, ...servicePages, ...otherPages, ...blogRoutes];
}
