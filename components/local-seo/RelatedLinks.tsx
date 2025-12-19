'use client';

import Link from 'next/link';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { 
  ArrowRight, 
  BookOpen, 
  Building2, 
  Home, 
  MapPin, 
  AlertCircle,
  Layers 
} from 'lucide-react';
import type { InternalLinksData, RelatedLink } from '@/lib/local-seo/links';

interface RelatedLinksProps {
  data: InternalLinksData;
  title?: string;
  showBlogs?: boolean;
  showCauses?: boolean;
  showNearbyCities?: boolean;
  variant?: 'default' | 'compact' | 'cards';
}

// Icon mapping for link types
const linkTypeIcons: Record<RelatedLink['type'], React.ElementType> = {
  service: Layers,
  hub: Building2,
  city: MapPin,
  cause: AlertCircle,
  blog: BookOpen,
};

const linkTypeColors: Record<RelatedLink['type'], string> = {
  service: 'bg-blue-50 border-blue-200 hover:border-blue-400',
  hub: 'bg-purple-50 border-purple-200 hover:border-purple-400',
  city: 'bg-green-50 border-green-200 hover:border-green-400',
  cause: 'bg-orange-50 border-orange-200 hover:border-orange-400',
  blog: 'bg-amber-50 border-amber-200 hover:border-amber-400',
};

const linkTypeIconColors: Record<RelatedLink['type'], string> = {
  service: 'text-blue-600 bg-blue-100',
  hub: 'text-purple-600 bg-purple-100',
  city: 'text-green-600 bg-green-100',
  cause: 'text-orange-600 bg-orange-100',
  blog: 'text-amber-600 bg-amber-100',
};

function LinkCard({ link, delay = 0 }: { link: RelatedLink; delay?: number }) {
  const Icon = linkTypeIcons[link.type];
  const colorClass = linkTypeColors[link.type];
  const iconColorClass = linkTypeIconColors[link.type];

  return (
    <AnimateOnScroll animation="fade-in-up" duration={400} delay={delay}>
      <Link
        href={link.href}
        className={`group block p-4 bg-white rounded-xl border-2 ${colorClass} transition-all duration-200 hover:shadow-md`}
      >
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColorClass}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors truncate">
                {link.label}
              </h4>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
            {link.description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {link.description}
              </p>
            )}
          </div>
        </div>
      </Link>
    </AnimateOnScroll>
  );
}

function CompactLink({ link }: { link: RelatedLink }) {
  const Icon = linkTypeIcons[link.type];

  return (
    <Link
      href={link.href}
      className="group flex items-center gap-2 py-2 text-gray-700 hover:text-primary transition-colors"
    >
      <Icon className="w-4 h-4 text-gray-400 group-hover:text-primary" />
      <span className="font-medium">{link.label}</span>
      <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all ml-auto" />
    </Link>
  );
}

export function RelatedLinks({
  data,
  title = 'Related Resources',
  showBlogs = true,
  showCauses = true,
  showNearbyCities = true,
  variant = 'default',
}: RelatedLinksProps) {
  const hasContent = 
    data.parentService.href || 
    data.serviceHub.href || 
    (showCauses && data.relatedCauses.length > 0) || 
    (showBlogs && data.relatedBlogs.length > 0) ||
    (showNearbyCities && data.nearbyCities.length > 0);

  if (!hasContent) return null;

  // Compact variant - simple list
  if (variant === 'compact') {
    return (
      <div className="py-8 border-t border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
        <div className="space-y-1">
          {data.parentService.href && <CompactLink link={data.parentService} />}
          {data.serviceHub.href && <CompactLink link={data.serviceHub} />}
          {showCauses && data.relatedCauses.map((link, i) => (
            <CompactLink key={`cause-${i}`} link={link} />
          ))}
          {showBlogs && data.relatedBlogs.map((link, i) => (
            <CompactLink key={`blog-${i}`} link={link} />
          ))}
        </div>
      </div>
    );
  }

  // Cards variant - full card layout
  if (variant === 'cards') {
    return (
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <AnimateOnScroll animation="fade-in-up" duration={600}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
              {title}
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Service & Hub Links */}
            {data.parentService.href && (
              <LinkCard link={data.parentService} delay={0} />
            )}
            {data.serviceHub.href && (
              <LinkCard link={data.serviceHub} delay={50} />
            )}
            
            {/* Cause Links */}
            {showCauses && data.relatedCauses.map((link, i) => (
              <LinkCard key={`cause-${i}`} link={link} delay={100 + i * 50} />
            ))}
            
            {/* Blog Links */}
            {showBlogs && data.relatedBlogs.map((link, i) => (
              <LinkCard key={`blog-${i}`} link={link} delay={200 + i * 50} />
            ))}
            
            {/* Nearby Cities */}
            {showNearbyCities && data.nearbyCities.map((link, i) => (
              <LinkCard key={`city-${i}`} link={link} delay={300 + i * 50} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default variant - organized sections
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll animation="fade-in-up" duration={600}>
          <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
        </AnimateOnScroll>

        <div className="space-y-8">
          {/* Primary Navigation */}
          {(data.parentService.href || data.serviceHub.href) && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Service Navigation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.parentService.href && <LinkCard link={data.parentService} />}
                {data.serviceHub.href && <LinkCard link={data.serviceHub} />}
              </div>
            </div>
          )}

          {/* Related Problems */}
          {showCauses && data.relatedCauses.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Related Problems
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.relatedCauses.map((link, i) => (
                  <LinkCard key={`cause-${i}`} link={link} delay={i * 50} />
                ))}
              </div>
            </div>
          )}

          {/* Helpful Articles */}
          {showBlogs && data.relatedBlogs.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Helpful Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.relatedBlogs.map((link, i) => (
                  <LinkCard key={`blog-${i}`} link={link} delay={i * 50} />
                ))}
              </div>
            </div>
          )}

          {/* Nearby Service Areas */}
          {showNearbyCities && data.nearbyCities.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Nearby Service Areas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {data.nearbyCities.map((link, i) => (
                  <LinkCard key={`city-${i}`} link={link} delay={i * 50} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Simplified version for problem pages
interface SimplifiedRelatedLinksProps {
  parentServices: { slug: string; name: string }[];
  citySlug: string;
  cityName: string;
  blogPosts?: { slug: string; title: string; excerpt: string }[];
}

export function CausePageRelatedLinks({
  parentServices,
  citySlug,
  cityName,
  blogPosts = [],
}: SimplifiedRelatedLinksProps) {
  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Related Resources
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Related Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Our Services in {cityName}
            </h3>
            <div className="space-y-2">
              {parentServices.map((service, i) => (
                <Link
                  key={i}
                  href={`/${service.slug}/residential/${citySlug}`}
                  className="group flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <Home className="w-5 h-5 text-primary" />
                  <span className="font-medium text-gray-900 group-hover:text-primary">
                    {service.name} in {cityName}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary ml-auto" />
                </Link>
              ))}
            </div>
          </div>

          {/* Related Blog Posts */}
          {blogPosts.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Helpful Articles
              </h3>
              <div className="space-y-2">
                {blogPosts.map((post, i) => (
                  <Link
                    key={i}
                    href={`/${post.slug}/`}
                    className="group block p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-900 group-hover:text-amber-700 line-clamp-1">
                          {post.title}
                        </span>
                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

