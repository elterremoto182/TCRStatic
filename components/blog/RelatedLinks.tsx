import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import blogTaxonomy from '@/config/blog-taxonomy.json';

interface CategoryConfig {
  service: string;
  serviceName: string;
  pillarPosts: string[];
}

interface RelatedLinksProps {
  category: string;
  currentSlug: string;
}

/**
 * RelatedLinks component renders a section at the bottom of blog posts
 * with links to the related service page and other relevant articles.
 */
export function RelatedLinks({ category, currentSlug }: RelatedLinksProps) {
  // Look up category configuration from taxonomy
  const categoryConfig = (blogTaxonomy.categoryToService as Record<string, CategoryConfig>)[category] 
    || blogTaxonomy.defaultService;
  
  if (!categoryConfig) {
    return null;
  }

  // Filter out the current post from pillar posts and limit to 4
  const relatedPosts = categoryConfig.pillarPosts
    .filter(post => !post.includes(currentSlug))
    .slice(0, 4);

  // Helper to get display title from slug
  const getDisplayTitle = (slug: string): string => {
    return slug
      .replace(/^\/|\/$/g, '') // Remove leading/trailing slashes
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <section className="mt-12 pt-8 border-t-2 border-primary/20">
      {/* Service CTA */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Need Professional Help?
        </h3>
        <p className="text-gray-600 mb-4">
          Our expert team is ready to assist with your {categoryConfig.serviceName.toLowerCase()} needs.
        </p>
        <Link
          href={categoryConfig.service}
          className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          View {categoryConfig.serviceName} Services
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Related Articles
          </h3>
          <ul className="space-y-3">
            {relatedPosts.map((postSlug) => (
              <li key={postSlug}>
                <Link
                  href={postSlug}
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                >
                  <ArrowRight className="w-4 h-4 mr-2 flex-shrink-0" />
                  {getDisplayTitle(postSlug)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Service Link */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <Link
          href={categoryConfig.service}
          className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
        >
          ← Back to {categoryConfig.serviceName}
        </Link>
      </div>
    </section>
  );
}

