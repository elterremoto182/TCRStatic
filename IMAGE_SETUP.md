# Image Setup and Optimization Guide

This project is configured with **next-image-export-optimizer** for optimal image performance in static exports.

## Current Status

The project includes:
- OptimizedImage component (`components/OptimizedImage.tsx`)
- Image optimization configured in `next.config.js`
- All components updated to use OptimizedImage
- Pre-optimized images in `public/images/`

## Image Organization

All images are located in `public/images/` with the following structure:
- `hero/` - Hero section backgrounds (1920px wide, 16:9 ratio)
- `services/` - Service images (800-1200px wide)
- `gallery/` - Before/after project photos (800-1200px wide, 4:3 ratio)
- `testimonials/` - Customer profile photos (400px square)
- `badges/` - Trust badges and certifications (200px wide)
- `cta/` - Call-to-action backgrounds (1920px wide, 21:9 ratio)
- `team/` - Team photos (1200-1920px wide, 21:9 ratio)

See `public/images/README.md` for detailed specifications.

## Adding Your Own Images

To replace images with your own:

1. Place your images in the appropriate folders under `public/images/`
2. Use the same filenames as the existing images, or update the paths in `config/content.json`
3. Follow the size and aspect ratio guidelines in `public/images/README.md`
4. Run `npm run build:optimized` to optimize the new images

## Building with Image Optimization

### Standard Build (Without Image Optimization)

```bash
npm run build
```

This builds your Next.js application without running image optimization. Use this when:
- You want a quick build for testing
- Images haven't changed since last optimization

### Optimized Build (With Image Optimization)

When you add or update images, run:

```bash
npm run build:optimized
```

This will:
1. Build your Next.js application
2. Automatically optimize all images
3. Generate WebP versions for modern browsers
4. Create responsive image sizes
5. Generate blur placeholders

## Image Optimization Features

- **Automatic WebP conversion** - Smaller file sizes with better quality
- **Responsive images** - Multiple sizes generated automatically
- **Blur placeholders** - Better loading experience
- **Static export compatible** - Works with `next build` and `output: 'export'`

## Scripts Available

- `npm run build` - Build project (without image optimization)
- `npm run build:optimized` - Build project + optimize images
- `npm run export-images` - Run image optimization manually

## Run A Complete New Optimization
- Remove public/images/next-image-export-optimizer-hashes.json
- Remove All nextImageExportOptimizer/ folders under images
- then run npm run build:optimized


## How Images Are Used

All components use the `OptimizedImage` component instead of Next.js's default `Image`:

```tsx
import OptimizedImage from '@/components/OptimizedImage';

<OptimizedImage
  src="/images/hero/hero-background.jpeg"
  alt="Hero background"
  fill
  className="object-cover"
  priority
  sizes="100vw"
/>
```

## Troubleshooting

### Build fails with "unsupported image format"

This means some images may be corrupted or in an unsupported format. Ensure all images are valid JPEG or PNG files.

### Images not loading

Make sure:
1. Images are in the correct folders under `public/images/`
2. Image paths in `config/content.json` match the actual files
3. You've run `npm run build:optimized` after adding/updating images

## Quick Start

For development:
```bash
npm run dev
```

When you're ready to optimize images and build for production:
```bash
npm run build:optimized
```
