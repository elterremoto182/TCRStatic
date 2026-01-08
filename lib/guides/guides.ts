import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getAllPosts, BlogPost } from '@/lib/blog/posts';

const guidesDirectory = path.join(process.cwd(), 'content/guides');

export interface Guide {
  slug: string;
  title: string;
  seo_title?: string;
  seo_description?: string;
  excerpt: string;
  service_page: string; // Link to conversion page (e.g., /water-damage-restoration/)
  category: string; // Maps to blog post categories for clustering
  icon?: string;
  keywords?: string[];
  content: string;
}

export interface GuideWithPosts extends Guide {
  clusterPosts: BlogPost[];
}

// Mapping from pillar slug to blog categories
const pillarToCategoryMap: Record<string, string[]> = {
  'water-damage-restoration': ['Water'],
  'fire-damage-restoration': ['Fire'],
  'mold-remediation': ['Mold', 'Air Quality'],
  'storm-damage-restoration': ['Storm'],
  'roof-tarping-shrink-wrapping': ['Tarp'],
};

/**
 * Get all guide slugs
 */
export function getGuideSlugs(): string[] {
  if (!fs.existsSync(guidesDirectory)) {
    return [];
  }
  return fs.readdirSync(guidesDirectory).filter((file) => file.endsWith('.md'));
}

/**
 * Get a guide by its slug
 */
export function getGuideBySlug(slug: string): Guide | null {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(guidesDirectory, `${realSlug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      title: data.title || '',
      seo_title: data.seo_title,
      seo_description: data.seo_description,
      excerpt: data.excerpt || '',
      service_page: data.service_page || `/${realSlug}/`,
      category: data.category || '',
      icon: data.icon,
      keywords: data.keywords,
      content,
    };
  } catch (error) {
    console.error('Error reading guide:', error);
    return null;
  }
}

/**
 * Get all guides
 */
export function getAllGuides(): Guide[] {
  const slugs = getGuideSlugs();
  const guides = slugs
    .map((slug) => getGuideBySlug(slug.replace(/\.md$/, '')))
    .filter((guide): guide is Guide => guide !== null);
  return guides;
}

/**
 * Get a guide with its cluster posts
 */
export function getGuideWithPosts(slug: string): GuideWithPosts | null {
  const guide = getGuideBySlug(slug);
  
  if (!guide) {
    return null;
  }

  // Get all blog posts
  const allPosts = getAllPosts();
  
  // Get categories that belong to this pillar
  const categories = pillarToCategoryMap[slug] || [guide.category];
  
  // Filter posts that belong to this cluster
  const clusterPosts = allPosts.filter((post) => {
    // Check if post's category matches any of the pillar's categories
    if (categories.includes(post.category)) {
      return true;
    }
    // Also check if post has explicit pillar field matching this guide
    if ('pillar' in post && (post as BlogPost & { pillar?: string }).pillar === slug) {
      return true;
    }
    return false;
  });

  return {
    ...guide,
    clusterPosts,
  };
}

/**
 * Get posts for a specific pillar/cluster
 */
export function getPostsByPillar(pillarSlug: string): BlogPost[] {
  const allPosts = getAllPosts();
  const categories = pillarToCategoryMap[pillarSlug] || [];
  
  return allPosts.filter((post) => {
    // Check category match
    if (categories.includes(post.category)) {
      return true;
    }
    // Check explicit pillar field
    if ('pillar' in post && (post as BlogPost & { pillar?: string }).pillar === pillarSlug) {
      return true;
    }
    return false;
  });
}

/**
 * Get the pillar guide for a given blog post category
 */
export function getPillarForCategory(category: string): string | null {
  for (const [pillar, categories] of Object.entries(pillarToCategoryMap)) {
    if (categories.includes(category)) {
      return pillar;
    }
  }
  return null;
}

/**
 * Get guide info for displaying pillar links on blog posts
 */
export function getPillarGuideInfo(category: string): { slug: string; title: string; href: string } | null {
  const pillarSlug = getPillarForCategory(category);
  
  if (!pillarSlug) {
    return null;
  }
  
  const guide = getGuideBySlug(pillarSlug);
  
  if (!guide) {
    return null;
  }
  
  return {
    slug: pillarSlug,
    title: guide.title,
    href: `/guides/${pillarSlug}/`,
  };
}

