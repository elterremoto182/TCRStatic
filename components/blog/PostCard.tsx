import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { BlogPost, categoryNameToSlug, categoriesWithPages } from '@/lib/blog/posts';

interface PostCardProps {
  post: BlogPost;
  showCategory?: boolean;
}

export function PostCard({ post, showCategory = true }: PostCardProps) {
  const categorySlug = post.category ? categoryNameToSlug[post.category] : null;
  const categoryHasPage = post.category && categoriesWithPages.includes(post.category);

  return (
    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
      {post.image && (
        <div className="aspect-video relative">
          <OptimizedImage
            src={post.image}
            alt={post.image_alt || `Featured image for ${post.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="inline-flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          {post.author && (
            <span className="inline-flex items-center">
              <User className="w-4 h-4 mr-1" />
              {post.author}
            </span>
          )}
        </div>

        {showCategory && post.category && (
          categoryHasPage && categorySlug ? (
            <Link
              href={`/blog/category/${categorySlug}/`}
              className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3 hover:bg-primary/20 transition-colors"
            >
              {post.category}
            </Link>
          ) : (
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
              {post.category}
            </span>
          )
        )}

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {post.title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <Link
          href={`/${post.slug}/`}
          className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors duration-200"
        >
          Read More
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </article>
  );
}
