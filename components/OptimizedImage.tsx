import ExportedImage from 'next-image-export-optimizer';
import { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  src: string;
  alt: string;
  fetchPriority?: 'high' | 'low' | 'auto';
}

export default function OptimizedImage({ src, alt, fetchPriority, ...props }: OptimizedImageProps) {
  return <ExportedImage src={src} alt={alt} fetchPriority={fetchPriority} {...props} />;
}
