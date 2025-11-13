'use client';

import siteConfig from '@/config/site.json';

interface StarRatingProps {
  rating: number;
  className?: string;
}

function StarRating({ rating, className = '' }: StarRatingProps) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3 && rating % 1 < 0.8;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 text-yellow-400 fill-current ${className}`}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${className}`}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`half-star-${i}`}>
              <stop offset="50%" stopColor="rgb(250, 204, 21)" />
              <stop offset="50%" stopColor="rgb(209, 213, 219)" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#half-star-${i})`}
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
          />
        </svg>
      );
    } else {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 text-gray-300 fill-current ${className}`}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }
  }

  return <div className="flex items-center gap-0.5">{stars}</div>;
}

function GoogleLogo() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function ReviewBadge() {
  const reviews = (siteConfig as any).reviews;

  if (!reviews || !reviews.google || !reviews.google.url) {
    return null;
  }

  const { url, rating, reviewCount } = reviews.google;

  if (!url || rating === 0) {
    return null;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 group"
      aria-label={`Google Reviews - ${rating} out of 5 stars based on ${reviewCount} reviews`}
    >
      <GoogleLogo />

      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2">
          <StarRating rating={rating} />
          <span className="text-sm font-bold text-gray-900">{rating}</span>
        </div>
        <div className="text-xs text-gray-600">
          {reviewCount ? `${reviewCount} reviews` : 'Google Reviews'}
        </div>
      </div>
    </a>
  );
}
