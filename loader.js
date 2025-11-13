// Loader for next-image-export-optimizer
// This loader is used by Next.js Image component in static export mode
export default function loader({ src, width, quality }) {
  // Remove leading slash if present
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
  
  // For next-image-export-optimizer, return the optimized image path
  // The library handles the path resolution during build
  return `/${cleanSrc}`;
}
