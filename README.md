# Total Care Restoration Website

A high-performance static website for Total Care Restoration, a 24/7 emergency restoration company serving South Florida. Built with Next.js 14 and featuring comprehensive local SEO with 690+ pages across 25+ cities in Miami-Dade, Broward, and Palm Beach counties.

## Features

- **Local SEO Optimized**: 770+ pages targeting specific service × city × type combinations
- **Fast & Static**: Fully static export with image optimization and CDN-ready deployment
- **Modern Design**: Clean, professional UI with smooth animations
- **Config-Driven**: All content managed through JSON and Markdown files
- **Blog System**: Full Markdown blog with 50+ posts and category support
- **Pillar-Cluster SEO**: Comprehensive guides linking to related blog posts
- **Rich Structured Data**: LocalBusiness, Service, FAQ, HowTo, and Breadcrumb schemas
- **Responsive**: Mobile-first design with breakpoints
- **Image Optimization**: Automatic WebP conversion with blur placeholders
- **301 Redirects**: Comprehensive redirect system for SEO preservation
- **Advanced Internal Linking**: City tier system with geographic proximity, anchor text rotation, and link budgets
- **SEO-Optimized Alt Text**: Context-aware alt text generation for all images

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

## Cities Served (25+ Locations)

Cities are organized into tiers for strategic SEO and response time optimization.

### Tier 1 - Major Markets (Linked from all service hubs)

#### Miami-Dade County
- Miami
- Miami Beach
- Coral Gables
- Hialeah

#### Broward County
- Fort Lauderdale
- Hollywood
- Pembroke Pines
- Pompano Beach
- Plantation
- Miramar

### Tier 2 - Secondary Markets (Linked from Tier 1 pages)

#### Miami-Dade County
- Doral (HQ - fastest response times)
- Kendall
- Pinecrest
- Aventura
- Miami Lakes

#### Broward County
- Weston
- Davie
- Coral Springs
- Sunrise
- Deerfield Beach

#### Palm Beach County
- Boca Raton
- West Palm Beach

### Tier 3 - Additional Markets

- Parkland
- Delray Beach
- And other South Florida communities

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

## Pillar Guides

The site implements a pillar-cluster SEO strategy with comprehensive guides:

| Guide | Slug | Related Categories |
|-------|------|-------------------|
| Water Damage Restoration | `/guides/water-damage-restoration/` | Water, Sewage |
| Fire Damage Restoration | `/guides/fire-damage-restoration/` | Fire |
| Mold Remediation | `/guides/mold-remediation/` | Mold, Air Quality |
| Storm Damage Restoration | `/guides/storm-damage-restoration/` | Storm, Tarp, Roofing |
| Roof Tarping & Shrink Wrapping | `/guides/roof-tarping-shrink-wrapping/` | Tarp, Roofing |

Each guide automatically clusters related blog posts by category and provides internal linking to service pages.

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
│   ├── guides/                   # Pillar guides
│   │   ├── page.tsx              # Guide index page
│   │   └── [slug]/page.tsx       # Individual guide pages
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
│   ├── local-seo/                # Local SEO components (18 components)
│   │   ├── CityServicePage.tsx   # Full city page template
│   │   ├── CausePage.tsx         # Problem/cause page template
│   │   ├── ServiceTypeHub.tsx    # Residential/Commercial hub
│   │   ├── ServiceProcess.tsx    # Step-by-step process
│   │   ├── NeighborhoodList.tsx  # Neighborhoods + zip codes
│   │   ├── LocalFAQ.tsx          # FAQ with JSON-LD schema
│   │   ├── LocalCTA.tsx          # City-specific CTAs
│   │   ├── RelatedLinks.tsx      # Internal linking with anchor rotation
│   │   ├── RelatedProblems.tsx   # Problem page links
│   │   ├── ResidentialBenefits.tsx
│   │   ├── CommercialBenefits.tsx
│   │   ├── ServiceOverview.tsx
│   │   ├── ServiceOverviewSection.tsx
│   │   ├── PreventionTips.tsx
│   │   ├── CommonCausesList.tsx
│   │   ├── CommonCausesSection.tsx
│   │   ├── ServiceVideo.tsx
│   │   └── index.ts              # Barrel exports
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
│   │   ├── RelatedLinks.tsx      # Service & pillar guide links
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
│   ├── local-seo.json            # Local SEO configuration
│   └── blog-taxonomy.json        # Blog category to service/guide mapping
├── content/
│   ├── blog/                     # 50+ Markdown blog posts
│   ├── guides/                   # Pillar guide Markdown files
│   └── pages/                    # Static page content
├── lib/
│   ├── local-seo/                # Local SEO utilities
│   │   ├── data.ts               # Data access functions
│   │   ├── templates.ts          # Content templates
│   │   ├── schema.ts             # Structured data generators
│   │   ├── links.ts              # Internal linking system
│   │   ├── anchor-text.ts        # 70/20/10 anchor text rotation
│   │   ├── city-tiers.ts         # 3-tier city hierarchy system
│   │   ├── link-budget.ts        # Link budget enforcement
│   │   └── index.ts              # Exports
│   ├── seo-utils.ts              # SEO alt text generation
│   ├── guides/                   # Pillar guide utilities
│   │   ├── guides.ts             # Guide data access & clustering
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
│   ├── images/
│   │   ├── hero/                 # Hero background images
│   │   ├── gallery/              # Before/after project photos
│   │   ├── branding/             # Company branding assets
│   │   └── services/
│   │       ├── fire-damage-photos/      # Fire restoration gallery
│   │       └── mold-remediation-photos/ # Mold remediation gallery
│   ├── sitemaps/                 # Split XML sitemaps
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
/guides/                                       # Pillar guides index
/guides/water-damage-restoration/              # Individual pillar guide
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
- Image references (hero, overview, process, gallery)
- Video references (YouTube)
- Body content (overview, health risks, prevention tips, common causes)

### Service Photo Galleries

Service-specific photo galleries are stored in `public/images/services/`:

```
public/images/services/
├── fire-damage-photos/           # Fire restoration project photos
├── mold-remediation-photos/      # Mold remediation project photos
│   ├── mold-before.jpeg
│   ├── mold-behind-wall.jpeg
│   ├── mold-remediation-*.jpg
│   └── nextImageExportOptimizer/ # Optimized versions
└── [service]-hero.jpg            # Service hero images
```

Images are automatically optimized to WebP format at multiple sizes.

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

City-specific data for 25+ locations:
- Neighborhoods and zip codes
- GPS coordinates for geographic proximity linking
- Response times by location
- Local risk factors and climate considerations
- Residential and commercial focus points
- Extended content for key markets
- City-specific FAQs (localFAQs)
- Seasonal triggers and insurance notes
- Property type characteristics

Cities are automatically organized into tiers (see `lib/local-seo/city-tiers.ts`) for strategic internal linking.

### Causes Configuration (`config/causes.json`)

Problem/cause page definitions:
- Detailed overview content
- Common causes and prevention tips
- Warning signals
- Step-by-step restoration process
- FAQs specific to each cause

### Blog Taxonomy (`config/blog-taxonomy.json`)

Maps blog post categories to services and pillar guides:
- Category to service page mapping
- Pillar guide associations
- Related pillar posts for internal linking
- Default fallback configuration

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

### Guides Content (`content/guides/`)

Pillar guides are written in Markdown with frontmatter:

```yaml
---
title: "The Complete Guide to Water Damage Restoration in South Florida"
seo_title: "Water Damage Restoration Guide | South Florida Homeowners"
seo_description: "Complete guide to water damage restoration..."
excerpt: "Everything you need to know about water damage..."
service_page: "/water-damage-restoration/"
category: "Water"
icon: "Droplet"
keywords: ["water damage restoration", "water damage guide"]
---
```

**Frontmatter Fields:**
- `title` - Guide headline
- `seo_title` / `seo_description` - SEO metadata
- `excerpt` - Short description for cards/previews
- `service_page` - Link to conversion service page
- `category` - Primary category for clustering
- `icon` - Lucide icon name
- `keywords` - SEO keywords array

The guide system automatically clusters related blog posts by matching post categories to pillar categories defined in `blog-taxonomy.json`.

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

### Sitemap Generation

Sitemaps are split by content type for better search engine crawling:

```
public/sitemaps/
├── index.xml      # Sitemap index referencing all sub-sitemaps
├── blog.xml       # Blog post URLs
├── cities.xml     # City service page URLs
├── services.xml   # Core service and hub page URLs
├── guides.xml     # Pillar guide URLs
├── problems.xml   # Problem/cause page URLs
└── static.xml     # Static pages (about, contact, etc.)
```

Generate sitemaps with: `npx ts-node scripts/generate-sitemaps.ts`

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
- Split XML sitemaps for better indexing (blog, cities, services, guides, problems, static)
- robots.txt for crawler control
- Semantic HTML structure
- SEO-optimized image alt tags (auto-generated from context)
- Sophisticated internal linking with tier-based distribution

### Local SEO
- City-specific landing pages for 20+ locations
- Neighborhood and zip code targeting
- Response time by location
- Local risk factors and climate considerations
- City-specific FAQs
- Problem/cause pages by location

### Advanced Internal Linking

The site implements a sophisticated internal linking system to optimize link equity distribution:

#### City Tier System
Cities are organized into 3 tiers for strategic link distribution:
- **Tier 1**: Major metros (Miami, Fort Lauderdale, Hollywood, etc.) - linked from all service hubs
- **Tier 2**: Secondary markets + Palm Beach majors - linked from Tier 1 city pages
- **Tier 3**: Remaining cities - linked from Tier 2 pages + `/service-areas/` safety net

#### Anchor Text Rotation
Implements 70/20/10 distribution to avoid over-optimization penalties:
- **70% Partial Match**: "professional water damage restoration in Miami"
- **20% Branded**: "Total Care Restoration", "our licensed technicians"
- **10% Exact Match**: "water damage restoration in Miami"

Uses seeded random generation for consistency (same page always gets same anchors).

#### Link Budget System
Defines maximum link counts per page type to avoid diluting SEO value:

| Page Type | Min | Max | Hard Cap |
|-----------|-----|-----|----------|
| Blog | 5 | 7 | 8 |
| City Tier 1 | 5 | 8 | 10 |
| City Tier 2 | 5 | 7 | 9 |
| City Tier 3 | 4 | 6 | 8 |
| Service Hub | 10 | 15 | 18 |
| Guide | 5 | 10 | 12 |

### SEO-Optimized Alt Text

The `lib/seo-utils.ts` module provides context-aware alt text generation:

```typescript
import { generateAltText } from '@/lib/seo-utils';

// Generate alt text based on context
const alt = generateAltText({
  type: 'service',
  serviceName: 'Water Damage Restoration',
  cityName: 'Miami'
});
// Output: "Water Damage Restoration services in Miami - Total Care Restoration"
```

Supported types: `hero`, `cta`, `gallery`, `service`, `team`, `testimonial`, `badge`, `overview`, `process`, `gallery-item`

### Content Strategy (Pillar-Cluster)
- 5 comprehensive pillar guides (long-form content)
- Blog posts clustered by category to pillar guides
- Automatic internal linking between related content
- Service page CTAs from guides and blog posts
- Category-based content organization

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
| Pillar Guides | 5 |
| Blog Posts | 50+ |
| Static Pages | 12 |
| **Total** | **~690+ pages** |

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
