import Link from 'next/link';
import { Star, ExternalLink } from 'lucide-react';
import type { ReviewForDisplay } from '@/lib/local-seo/reviews';
import { GBP_REVIEWS_URL } from '@/lib/local-seo/reviews';

const MAX_QUOTE_LENGTH = 280;

interface ReviewsSectionProps {
  reviews: ReviewForDisplay[];
  cityName: string;
  serviceName: string;
  showGbpLink: boolean;
  className?: string;
}

function ReviewCard({ review }: { review: ReviewForDisplay }) {
  const truncated = review.text.length > MAX_QUOTE_LENGTH;
  const displayText = truncated ? review.text.slice(0, MAX_QUOTE_LENGTH).trim() + '…' : review.text;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className="flex items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].slice(0, review.stars).map((i) => (
          <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" aria-hidden />
        ))}
      </div>
      <blockquote className="text-gray-700 flex-grow mb-4">
        &ldquo;{displayText}&rdquo;
        {truncated && (
          <>
            {' '}
            <Link
              href={review.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Read more
            </Link>
          </>
        )}
      </blockquote>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
        <span className="font-medium text-gray-900">{review.name}</span>
        {review.isSpanish && (
          <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">Spanish</span>
        )}
        <Link
          href={review.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
        >
          View on Google
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export function ReviewsSection({
  reviews,
  cityName,
  serviceName,
  showGbpLink,
  className = '',
}: ReviewsSectionProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className={`py-16 bg-gray-50 ${className}`} id="reviews">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          What customers say about our {serviceName} services in {cityName}
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Real feedback from customers who used our restoration services.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={`${review.reviewUrl}-${index}`} review={review} />
          ))}
        </div>

        {showGbpLink && (
          <div className="mt-10 text-center">
            <Link
              href={GBP_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Read more reviews on Google
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
