export function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-xl w-full h-full"></div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="aspect-video bg-gray-200 animate-pulse"></div>
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        </div>
        <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
      </div>
    </div>
  );
}

export function ImageSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gray-200 animate-pulse ${className}`}>
      <div className="w-full h-full flex items-center justify-center">
        <svg
          className="w-10 h-10 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
