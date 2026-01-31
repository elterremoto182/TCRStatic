import Link from 'next/link';
import { getCategoryPostCounts, categorySlugMap, categoriesWithPages, categoryNameToSlug } from '@/lib/blog/posts';

interface CategoryNavProps {
  activeCategory?: string;
}

export function CategoryNav({ activeCategory }: CategoryNavProps) {
  const counts = getCategoryPostCounts();

  return (
    <nav className="flex flex-wrap gap-2">
      <Link
        href="/blog/"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !activeCategory
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Posts
      </Link>
      {categoriesWithPages.map((categoryName) => {
        const slug = categoryNameToSlug[categoryName];
        if (!slug) return null;
        
        return (
          <Link
            key={slug}
            href={`/blog/category/${slug}/`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === categoryName
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {categoryName} ({counts[categoryName] || 0})
          </Link>
        );
      })}
    </nav>
  );
}
