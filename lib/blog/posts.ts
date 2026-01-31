import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  seo_title?: string;
  date: string;
  dateModified?: string; // Optional: when content was last updated (frontmatter: date_modified)
  excerpt: string;
  author: string;
  category: string;
  tags?: string[]; // Optional tags for cross-cutting concerns (e.g., "emergency-response", "insurance-claims")
  pillar?: string; // Links to pillar guide page (e.g., "water-damage-restoration" -> /guides/water-damage-restoration/)
  image?: string;
  content: string;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      title: data.title || '',
      seo_title: data.seo_title || '',
      date: data.date || '',
      dateModified: data.date_modified || undefined, // Parse date_modified from frontmatter
      excerpt: data.excerpt || '',
      author: data.author || '',
      category: data.category || '',
      tags: Array.isArray(data.tags) ? data.tags : undefined,
      pillar: data.pillar || '',
      image: data.image || '',
      content,
    };
  } catch (error) {
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

// Category slug mapping for URL-friendly slugs
export const categorySlugMap: Record<string, string> = {
  'water': 'Water',
  'mold': 'Mold',
  'fire': 'Fire',
  'storm': 'Storm',
  'air-quality': 'Air Quality',
};

// Reverse mapping: category name to slug
export const categoryNameToSlug: Record<string, string> = {
  'Water': 'water',
  'Mold': 'mold',
  'Fire': 'fire',
  'Storm': 'storm',
  'Air Quality': 'air-quality',
};

// Categories that have dedicated pages (subset of all categories in taxonomy)
export const categoriesWithPages = ['Water', 'Mold', 'Fire', 'Storm', 'Air Quality'];

/**
 * Get all posts in a specific category
 */
export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.category === category);
}

/**
 * Get all posts with a specific tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.tags?.includes(tag));
}

/**
 * Get all unique categories from posts
 */
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category).filter(Boolean));
  return Array.from(categories);
}

/**
 * Get all unique tags from posts
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap((post) => post.tags || []));
  return Array.from(tags);
}

/**
 * Get post counts per category
 */
export function getCategoryPostCounts(): Record<string, number> {
  const posts = getAllPosts();
  return posts.reduce((acc, post) => {
    if (post.category) {
      acc[post.category] = (acc[post.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
}

/**
 * Get post counts per tag
 */
export function getTagPostCounts(): Record<string, number> {
  const posts = getAllPosts();
  return posts.reduce((acc, post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
    }
    return acc;
  }, {} as Record<string, number>);
}
