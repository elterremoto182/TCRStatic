'use client';

import { useState } from 'react';

interface YouTubeFacadeProps {
  videoId: string;
  title?: string;
  className?: string;
}

/**
 * A lightweight YouTube embed that shows a thumbnail + play button initially,
 * only loading the actual iframe when clicked. This improves LCP and TBT by
 * avoiding the ~800KB+ of resources YouTube iframes load on page load.
 */
export function YouTubeFacade({ videoId, title = 'YouTube video', className = '' }: YouTubeFacadeProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  // Use hqdefault as default since it's more reliable (maxresdefault returns 404 placeholder for many videos)
  const [thumbnailUrl, setThumbnailUrl] = useState(
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  );

  // Fallback to mqdefault if hqdefault doesn't exist
  const handleThumbnailError = () => {
    if (thumbnailUrl.includes('hqdefault')) {
      setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`);
    }
  };

  if (isLoaded) {
    return (
      <div className={`relative w-full aspect-video ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          className="absolute inset-0 w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`relative w-full aspect-video cursor-pointer group ${className}`}
      onClick={() => setIsLoaded(true)}
      aria-label={`Play ${title}`}
    >
      {/* Thumbnail */}
      <img
        src={thumbnailUrl}
        alt={`YouTube video thumbnail: ${title}`}
        className="absolute inset-0 w-full h-full object-cover rounded-lg"
        loading="lazy"
        onError={handleThumbnailError}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors rounded-lg" />
      
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-red-700 group-hover:scale-110 transition-all">
          <svg
            className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}

/**
 * Extracts YouTube video ID from various URL formats
 */
export function extractYouTubeId(url: string): string | null {
  // Handle various YouTube URL formats:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  // - https://www.youtube-nocookie.com/embed/VIDEO_ID
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube-nocookie\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

