# Total Care Restoration Website

A high-performance static website for Total Care Restoration, a 24/7 emergency restoration company serving South Florida. Built with Next.js 14 and featuring comprehensive local SEO with 500+ service pages across 20 cities in Miami-Dade, Broward, and Palm Beach counties.

## Features

- **Local SEO Optimized**: 500+ pages targeting specific service × city × type combinations
- **Fast & Static**: Fully static export with image optimization and CDN-ready deployment
- **Modern Design**: Clean, professional UI with smooth animations
- **Config-Driven**: All content managed through JSON and Markdown files
- **Blog System**: Full Markdown blog with 117+ posts and category support
- **Rich Structured Data**: LocalBusiness, Service, FAQ, HowTo, and Breadcrumb schemas
- **Responsive**: Mobile-first design with breakpoints
- **Image Optimization**: Automatic WebP conversion with blur placeholders
- **301 Redirects**: Comprehensive redirect system for SEO preservation

## Tech Stack

- **Framework**: Next.js 14.2 (App Router with Static Export)
- **Language**: TypeScript 5.2
- **Styling**: Tailwind CSS 3.3 with shadcn/ui components
- **Image Optimization**: next-image-export-optimizer
- **Animations**: CSS transitions and transforms
- **Typography**: System fonts with custom styling
- **Icons**: Lucide React
- **Blog**: Markdown with gray-matter and react-markdown
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives

## Services Covered

| Service | Structure |
|---------|-----------|
| Water Damage Restoration | Core + Residential/Commercial + 20 Cities |
| Fire Damage Restoration | Core + Residential/Commercial + 20 Cities |
| Mold Remediation | Core + Residential/Commercial + 20 Cities |
| Storm Damage Restoration | Core + Residential/Commercial + 20 Cities |
| Emergency Restoration | Core + Residential/Commercial + 20 Cities |
| Sewage Cleanup | Core + Residential/Commercial + 20 Cities |
| Roof Tarping | Core + Residential/Commercial + 20 Cities |
| Shrink Wrapping | Core + Residential/Commercial + 20 Cities |
| Indoor Air Quality | Core page |
| Leak Detection | Core page |

## Cities Served

### Miami-Dade County
- Miami
- Miami Beach
- Doral (HQ - fastest response times)
- Miami Lakes
- Kendall
- Pinecrest

### Broward County
- Fort Lauderdale
- Pembroke Pines
- Davie
- Weston
- Plantation
- Miramar
- Coral Springs
- Pompano Beach
- Deerfield Beach
- Parkland
- Sunrise

### Palm Beach County
- Boca Raton
- Delray Beach
- West Palm Beach

## Problem/Cause Pages

The site includes specialized pages for specific damage causes:

### Water Damage Causes
- Burst Pipe Water Damage
- AC Leak Water Damage
- Washing Machine Overflow
- Slab Leak Water Damage
- Roof Leak Water Damage
- Toilet Overflow Cleanup
- Hurricane Flood Damage

### Mold Causes
- Mold from Roof Leak
- Mold from AC Condensation
- Bathroom Mold
- Mold After Flood

### Fire Causes
- Kitchen Fire Damage
- Electrical Fire Cleanup
- Smoke Odor Removal

### Storm Causes
- Hurricane Roof Damage
- Wind Damage Restoration
- Tree Damage Restoration

## Project Structure

```
├── app/                           # Next.js app directory
│   ├── [slug]/                   # Dynamic content pages
│   ├── water-damage-restoration/ # Service route structure
│   │   ├── page.tsx              # Core service page
│   │   ├── residential/          
│   │   │   ├── page.tsx          # Residential hub
│   │   │   └── [city]/page.tsx   # City-specific pages
│   │   └── commercial/
│   │       ├── page.tsx          # Commercial hub
│   │       └── [city]/page.tsx   # City-specific pages
│   ├── fire-damage-restoration/  # Same structure as above
│   ├── mold-remediation/         # Same structure as above
│   ├── storm-damage-restoration/ # Same structure as above
│   ├── emergency-restoration/    # Same structure as above
│   ├── sewage-cleanup/           # Same structure as above
│   ├── roof-tarping/             # Same structure as above
│   ├── shrink-wrapping/          # Same structure as above
│   ├── indoor-air-quality/       # Standalone service
│   ├── leak-detection/           # Standalone service
│   ├── problems/[cause]/[city]/  # Problem/cause pages
│   ├── blog/                     # Blog listing and posts
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── testimonials/             # Testimonials page
│   ├── service-areas/            # Service areas overview
│   ├── privacy-policy/           # Privacy policy
│   ├── layout.tsx                # Root layout with SEO
│   ├── sitemap.ts                # Dynamic sitemap generator
│   └── not-found.tsx             # Custom 404 page
├── components/
│   ├── local-seo/                # Local SEO components
│   │   ├── CityServicePage.tsx   # Full city page template
│   │   ├── CausePage.tsx         # Problem/cause page template
│   │   ├── ServiceTypeHub.tsx    # Residential/Commercial hub
│   │   ├── ServiceProcess.tsx    # Step-by-step process
│   │   ├── NeighborhoodList.tsx  # Neighborhoods + zip codes
│   │   ├── LocalFAQ.tsx          # FAQ with JSON-LD schema
│   │   ├── LocalCTA.tsx          # City-specific CTAs
│   │   ├── RelatedLinks.tsx      # Internal linking
│   │   ├── ResidentialBenefits.tsx
│   │   ├── CommercialBenefits.tsx
│   │   ├── ServiceOverview.tsx
│   │   ├── ServiceOverviewSection.tsx
│   │   ├── PreventionTips.tsx
│   │   ├── CommonCausesList.tsx
│   │   ├── CommonCausesSection.tsx
│   │   └── ServiceVideo.tsx
│   ├── sections/                 # Page sections
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Gallery.tsx
│   │   ├── Testimonials.tsx
│   │   ├── TrustBadges.tsx
│   │   ├── CTABanner.tsx
│   │   ├── Contact.tsx
│   │   ├── GoogleMap.tsx
│   │   └── Footer.tsx
│   ├── blog/                     # Blog components
│   │   ├── MarkdownRenderer.tsx
│   │   └── YouTubeHydrator.tsx
│   ├── media/                    # Media components
│   │   └── VideoPlayer.tsx
│   ├── ui/                       # shadcn/ui components
│   ├── AnimateOnScroll.tsx
│   ├── Breadcrumbs.tsx
│   ├── OptimizedImage.tsx
│   ├── ReviewBadge.tsx
│   ├── StickyCallButton.tsx
│   └── YouTubeFacade.tsx
├── config/
│   ├── site.json                 # Site metadata & navigation
│   ├── theme.json                # Theme customization
│   ├── content.json              # Page content
│   ├── services.json             # Service definitions & FAQs
│   ├── cities.json               # City data (neighborhoods, zips, coordinates)
│   ├── causes.json               # Problem/cause definitions
│   ├── faqs.json                 # FAQ content
│   └── local-seo.json            # Local SEO configuration
├── content/
│   ├── blog/                     # 117+ Markdown blog posts
│   └── pages/                    # Static page content
├── lib/
│   ├── local-seo/                # Local SEO utilities
│   │   ├── data.ts               # Data access functions
│   │   ├── templates.ts          # Content templates
│   │   ├── schema.ts             # Structured data generators
│   │   ├── links.ts              # Internal linking system
│   │   └── index.ts              # Exports
│   ├── blog/posts.ts             # Blog utilities
│   ├── pages/pages.ts            # Page utilities
│   ├── markdown.ts               # Markdown processing
│   ├── structured-data.tsx       # Schema.org generators
│   └── utils.ts                  # Utility functions
├── hooks/
│   └── useIntersectionObserver.ts
├── public/
│   ├── _redirects                # Netlify 301 redirects
│   ├── _headers                  # Custom headers
│   ├── images/                   # Optimized images
│   ├── robots.txt                # Search engine directives
│   └── llms.txt                  # LLM context file
└── next.config.js                # Next.js configuration
```

## URL Structure

```
/water-damage-restoration/                     # Core service page
/water-damage-restoration/residential/         # Residential hub
/water-damage-restoration/residential/miami/   # City page
/water-damage-restoration/commercial/          # Commercial hub
/water-damage-restoration/commercial/miami/    # City page
/problems/burst-pipe-water-damage/miami/       # Cause/problem page
/blog/water-damage-tips-miami/                 # Blog post
/indoor-air-quality/                           # Standalone service
/leak-detection/                               # Standalone service
```

## Configuration

### Site Configuration (`config/site.json`)

Contains site-wide settings:
- Business name and contact info (phone: 786-610-6317)
- Navigation menu
- Social media links
- SEO metadata
- Business hours (24/7 Emergency Service)
- Review platform ratings

### Services Configuration (`config/services.json`)

Comprehensive service definitions:
- Service metadata and templates
- Step-by-step restoration processes
- Residential and commercial content
- General FAQs for each service
- Related causes and keywords
- Image references
- Video references (YouTube)

### Service Videos

YouTube videos can be added to service pages and city pages. Videos appear after the hero section with lazy-loading for optimal performance.

#### Adding a Video to a Service

Add a `video` property to any service in `config/services.json`:

```json
{
  "mold-remediation": {
    "name": "Mold Remediation",
    "video": {
      "youtubeId": "PvoujvUxfsU",
      "title": "Mold Remediation Process"
    }
  }
}
```

The `youtubeId` is the video ID from YouTube URLs (e.g., `youtube.com/watch?v=PvoujvUxfsU`).

#### City-Specific Video Overrides

To show a different video on specific city pages, add a `video` property to that city in `config/cities.json`:

```json
{
  "miami": {
    "name": "Miami",
    "video": {
      "mold-remediation": {
        "youtubeId": "DIFFERENT_VIDEO_ID",
        "title": "Mold Remediation in Miami"
      }
    }
  }
}
```

The city video will override the service default only for that city's pages. Other cities will continue to show the service's default video.

### Cities Configuration (`config/cities.json`)

City-specific data for 20 locations:
- Neighborhoods and zip codes
- GPS coordinates
- Response times
- Local risk factors
- Residential and commercial focus points
- Extended content for key markets

### Causes Configuration (`config/causes.json`)

Problem/cause page definitions:
- Detailed overview content
- Common causes and prevention tips
- Warning signals
- Step-by-step restoration process
- FAQs specific to each cause

### Theme Configuration (`config/theme.json`)

Visual appearance:
- Color palette (HSL format for Tailwind)
- Typography
- Spacing and border radius

### Content Configuration (`config/content.json`)

Page content for:
- Hero section
- Services listing
- About section with stats
- Gallery (before/after showcase)
- Testimonials
- Trust badges
- CTA banners
- Contact form

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Build with image optimization
npm run build:optimized

# Optimize images only
npm run export-images

# Type check
npm run typecheck

# Lint
npm run lint
```

### Build Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Standard build with static export |
| `npm run build:optimized` | Full build with image optimization |
| `npm run export-images` | Run image optimization separately |
| `npm run typecheck` | TypeScript type checking |
| `npm run lint` | ESLint checking |

**Note**: Optimized images are cached and skipped if unchanged, making subsequent builds faster.

## Deployment

This site is optimized for static hosting:

### Netlify (Primary)
- Build command: `npm run build`
- Publish directory: `out`
- `netlify.toml` included for configuration
- `public/_redirects` for 301 redirects
- `public/_headers` for custom headers

### Vercel
- Push to GitHub and connect to Vercel
- Build command: `npm run build`
- Output directory: `out`
- `vercel.json` included for configuration

### Static Hosting (S3, GitHub Pages)
- Run `npm run build` locally
- Upload the `out` directory

## SEO Features

### Structured Data (JSON-LD)
- **LocalBusiness**: Company info with coordinates
- **Service**: Individual service descriptions
- **FAQPage**: Dynamic FAQs with city-specific content
- **BreadcrumbList**: Navigation hierarchy
- **HowTo**: Step-by-step restoration processes
- **WebPage**: Page metadata

### On-Page SEO
- Dynamic meta tags from config
- Open Graph support
- Twitter Cards
- Automatic sitemap.xml generation
- robots.txt for crawler control
- Semantic HTML structure
- Image alt tags
- Internal linking strategy

### Local SEO
- City-specific landing pages for 20 locations
- Neighborhood and zip code targeting
- Response time by location
- Local risk factors and climate considerations
- City-specific FAQs
- Problem/cause pages by location

## 301 Redirects

Comprehensive redirect rules in `public/_redirects`:
- Legacy service URLs → New structure
- Old city pages → New residential pages
- Generic search terms → Appropriate pages
- Trailing slash handling

## Page Count Summary

| Page Type | Count |
|-----------|-------|
| Core Service Pages | 10 |
| Type Hub Pages (Residential/Commercial) | 16 |
| City Service Pages | 320 |
| Cause/Problem Pages | ~280 |
| Blog Posts | 117 |
| Static Pages | 12 |
| **Total** | **~750+ pages** |

## Contact Form Integration

The contact form is integrated with **n8n webhooks** for serverless form submissions:

1. Create an n8n webhook workflow
2. Set `NEXT_PUBLIC_N8N_WEBHOOK_URL` environment variable
3. Form data is sent as JSON:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Your message here",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "source": "contact-form"
}
```

## Performance

- Static generation for all pages (`output: 'export'`)
- WebP image conversion with blur placeholders
- Lazy-loaded images and videos
- CSS optimization and minification
- Code splitting and tree shaking
- SWC minification for faster builds
- Console.log removal in production

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari >= 15.4
- Edge (last 2 versions)

## Business Information

- **Company**: Total Care Restoration
- **Phone**: (786) 610-6317
- **Email**: clientcare@totalcarerestoration.com
- **Address**: 7790 NW 55th St., Doral, FL 33166
- **Hours**: 24/7 Emergency Service
- **Service Area**: Miami-Dade, Broward, and Palm Beach Counties

## License

Proprietary - Total Care Restoration

## Support

For technical issues, contact the development team.
