# Local SEO Implementation Plan
## Total Care Restoration - Service × City Content Strategy

---

## ✅ IMPLEMENTATION STATUS: PHASE 1-6 COMPLETE

**Phase 1 Completed:** December 17, 2025
**Phase 2 Completed:** December 17, 2025
**Phase 3 Completed:** December 17, 2025
**Phase 4 Completed:** December 17, 2025
**Phase 5 Completed:** December 17, 2025
**Phase 6 Completed:** December 17, 2025

### What Was Built

| Component | Status | Files Created |
|-----------|--------|---------------|
| Data Configuration | ✅ Complete | `config/local-seo.json` |
| Data Layer | ✅ Complete | `lib/local-seo/data.ts`, `templates.ts`, `schema.ts` |
| Components | ✅ Complete | 12 components in `components/local-seo/` |
| **Phase 1 Services** | | |
| Water Damage Routes | ✅ Complete | Core + Residential/Commercial + City pages |
| Fire Damage Routes | ✅ Complete | Core + Residential/Commercial + City pages |
| Mold Remediation Routes | ✅ Complete | Core + Residential/Commercial + City pages |
| Emergency Restoration Routes | ✅ Complete | Core + Residential/Commercial + City pages |
| **Phase 2 Services** | | |
| Storm Damage Routes | ✅ Complete | Core + Residential/Commercial + City pages |
| Roof Tarping Routes | ✅ Complete | Core + Residential/Commercial + City pages |
| Shrink Wrapping Routes | ✅ Complete | Core + Residential/Commercial + City pages |
| Sewage Cleanup Routes | ✅ Complete | Core + Residential/Commercial + City pages |
| **Phase 3 Components** | | |
| CityServicePage | ✅ Complete | Full page template with all sections |
| Structured Data | ✅ Complete | LocalBusiness, Service, FAQ, Breadcrumb, HowTo, WebPage schemas |
| ServiceProcess | ✅ Complete | Step-by-step restoration process |
| NeighborhoodList | ✅ Complete | Neighborhoods + zip codes grid |
| LocalFAQ | ✅ Complete | FAQ with JSON-LD schema |
| LocalCTA | ✅ Complete | City-specific call-to-action |
| ResidentialBenefits | ✅ Complete | Homeowner-focused benefits |
| CommercialBenefits | ✅ Complete | Business-focused benefits |
| ServiceOverview | ✅ Complete | Service details section |
| PreventionTips | ✅ Complete | Prevention guidance |
| CommonCausesList | ✅ Complete | Cause bullet list |
| ServiceTypeHub | ✅ Complete | Type hub page component |
| **Phase 4 Internal Linking** | | |
| RelatedLinks Component | ✅ Complete | `components/local-seo/RelatedLinks.tsx` |
| Blog-to-Service Linking | ✅ Complete | `lib/local-seo/links.ts` |
| Service City Page Updates | ✅ Complete | All 16 city pages with related links |
| Problem Page Blog Links | ✅ Complete | `CausePageRelatedLinks` component |
| **Phase 5 Redirects & Migration** | | |
| 301 Redirects (Enhanced) | ✅ Complete | `public/_redirects` with comprehensive redirect rules |
| Service URL Redirects | ✅ Complete | All legacy service URLs redirect to new structure |
| City URL Redirects | ✅ Complete | All legacy city URLs redirect to residential pages |
| Problem/Cause Redirects | ✅ Complete | Legacy cause URLs redirect to problem pages |
| Generic Keyword Redirects | ✅ Complete | Common search terms redirect appropriately |
| **Phase 6 Content Generation** | | |
| Blog: Water Damage Miami | ✅ Complete | `what-to-do-after-water-damage-in-miami.md` |
| Blog: Hurricane Season Prep | ✅ Complete | `hurricane-season-water-damage-prep-south-florida.md` |
| Blog: Mold Insurance FL | ✅ Complete | `does-insurance-cover-mold-in-florida.md` |
| Blog: Restoration Cost Broward | ✅ Complete | `water-damage-restoration-cost-broward-county.md` |
| Blog: AC Leak Prevention | ✅ Complete | `ac-leak-water-damage-prevention-south-florida.md` |
| **Supporting** | | |
| Cause/Problem Pages | ✅ Complete | Dynamic `[cause]/[city]` route |
| Sitemap | ✅ Complete | `app/sitemap.ts` updated |
| FAQs | ✅ Complete | All services have residential/commercial FAQs |

### Page Count (Phase 1-6)
- **8 Core Service Pages** (4 Phase 1 + 4 Phase 2)
- **16 Type Hub Pages** (8 services × 2 types)
- **192 City Pages** (8 services × 2 types × 12 cities)
- **~168 Cause Pages** (14 causes × 12 cities under `/problems/`)
- **5 Supporting Blog Posts** (Phase 6 content generation)
- **Total: ~389 new pages**

### URL Structure
```
/water-damage-restoration/                    # Core service page
/water-damage-restoration/residential/        # Residential hub
/water-damage-restoration/residential/miami/  # City page
/water-damage-restoration/commercial/         # Commercial hub
/water-damage-restoration/commercial/miami/   # City page
/storm-damage-restoration/                    # Core service page (Phase 2)
/storm-damage-restoration/residential/miami/  # City page (Phase 2)
/roof-tarping/                                # Core service page (Phase 2)
/shrink-wrapping/                             # Core service page (Phase 2)
/sewage-cleanup/                              # Core service page (Phase 2)
/problems/burst-pipe-water-damage/miami/      # Cause/problem page
```

### Key Files Created
```
config/local-seo.json           # Master configuration (with all 8 services + FAQs)
lib/local-seo/data.ts           # Data access functions
lib/local-seo/templates.ts      # Content templates
lib/local-seo/schema.ts         # Structured data generators
lib/local-seo/links.ts          # Internal linking system (Phase 4)
components/local-seo/           # 13 reusable components including RelatedLinks
app/water-damage-restoration/   # Full service route structure
app/fire-damage-restoration/    # Full service route structure
app/mold-remediation/           # Full service route structure
app/emergency-restoration/      # Full service route structure
app/storm-damage-restoration/   # Full service route structure (Phase 2)
app/roof-tarping/               # Full service route structure (Phase 2)
app/shrink-wrapping/            # Full service route structure (Phase 2)
app/sewage-cleanup/             # Full service route structure (Phase 2)
app/problems/[cause]/[city]/    # Cause pages with related blog posts
public/_redirects               # 301 redirects (comprehensive - Phase 5)

# Phase 6: Supporting Blog Posts
content/blog/what-to-do-after-water-damage-in-miami.md
content/blog/hurricane-season-water-damage-prep-south-florida.md
content/blog/does-insurance-cover-mold-in-florida.md
content/blog/water-damage-restoration-cost-broward-county.md
content/blog/ac-leak-water-damage-prevention-south-florida.md
```

---

## Executive Summary

This plan restructures the TCR website to implement a comprehensive local SEO strategy with three layers:
1. **Core Service Pages** (Authority anchors)
2. **Service × City Pages** (Money pages)
3. **Cause/Problem Pages** (High-converting long-tail pages)

**Estimated Implementation Time**: 3-4 weeks for Phase 1-3

---

## Phase 1: Data Architecture & Configuration (Week 1)

### 1.1 Create Master Data Configuration Files

#### File: `config/local-seo.json`

```json
{
  "services": {
    "water-damage-restoration": {
      "name": "Water Damage Restoration",
      "shortName": "Water Damage",
      "icon": "Droplet",
      "metaTitleTemplate": "Water Damage Restoration in {city}, FL | 24/7 Emergency Cleanup",
      "metaDescTemplate": "Emergency water damage restoration in {city}. Fast response for floods, leaks, and burst pipes. Licensed, insured, and available 24/7.",
      "h1Template": "Water Damage Restoration in {city}, FL",
      "serviceType": "WaterDamageRestoration"
    },
    "fire-damage-restoration": {
      "name": "Fire Damage Restoration",
      "shortName": "Fire Damage",
      "icon": "Flame",
      "metaTitleTemplate": "Fire Damage Restoration in {city}, FL | Smoke & Soot Cleanup",
      "metaDescTemplate": "Professional fire damage restoration in {city}. Complete smoke, soot cleanup and property restoration. Insurance assistance available.",
      "h1Template": "Fire Damage Restoration in {city}, FL",
      "serviceType": "FireDamageRestoration"
    },
    "mold-remediation": {
      "name": "Mold Remediation",
      "shortName": "Mold Removal",
      "icon": "AlertTriangle",
      "metaTitleTemplate": "Mold Remediation in {city}, FL | Certified Mold Removal",
      "metaDescTemplate": "Expert mold remediation in {city}. Certified technicians, thorough inspection, and complete mold removal. Protect your family's health.",
      "h1Template": "Mold Remediation in {city}, FL",
      "serviceType": "MoldRemediation"
    },
    "storm-damage-restoration": {
      "name": "Storm Damage Restoration",
      "shortName": "Storm Damage",
      "icon": "CloudLightning",
      "metaTitleTemplate": "Storm Damage Restoration in {city}, FL | Hurricane & Flood Repair",
      "metaDescTemplate": "Fast storm damage restoration in {city}. Hurricane damage repair, flood cleanup, and emergency roof tarping. Available 24/7.",
      "h1Template": "Storm Damage Restoration in {city}, FL",
      "serviceType": "StormDamageRestoration"
    },
    "sewage-cleanup": {
      "name": "Sewage Cleanup",
      "shortName": "Sewage Cleanup",
      "icon": "Trash2",
      "metaTitleTemplate": "Sewage Cleanup in {city}, FL | 24/7 Biohazard Removal",
      "metaDescTemplate": "Professional sewage cleanup in {city}. Safe biohazard removal, sanitization, and restoration. Licensed and insured.",
      "h1Template": "Sewage Cleanup in {city}, FL",
      "serviceType": "SewageCleanup"
    },
    "emergency-restoration": {
      "name": "Emergency Restoration",
      "shortName": "Emergency Services",
      "icon": "AlertCircle",
      "metaTitleTemplate": "24/7 Emergency Restoration in {city}, FL | Rapid Response",
      "metaDescTemplate": "24/7 emergency restoration services in {city}. Rapid response for water, fire, and storm damage. Call now for immediate help.",
      "h1Template": "24/7 Emergency Restoration in {city}, FL",
      "serviceType": "EmergencyRestoration"
    }
  },
  "cities": {
    "miami": {
      "name": "Miami",
      "county": "Miami-Dade County",
      "state": "FL",
      "coordinates": { "lat": 25.7617, "lng": -80.1918 },
      "neighborhoods": ["Brickell", "Coral Gables", "Little Havana", "Wynwood", "Downtown Miami", "Coconut Grove", "South Beach", "Design District"],
      "zipCodes": ["33101", "33109", "33125", "33127", "33128", "33129", "33130", "33131", "33132", "33133", "33134", "33135", "33136", "33137", "33138", "33139", "33140", "33141", "33142", "33143", "33144", "33145", "33146", "33147", "33149", "33150"],
      "localFactors": {
        "climate": "Tropical climate with high humidity and frequent rainfall",
        "risks": ["Hurricane flooding", "Aging plumbing in historic buildings", "AC-related leaks from constant use", "Storm surge in coastal areas"],
        "characteristics": "Mix of high-rise condos, historic homes, and commercial properties"
      },
      "responseTime": "30-45 minutes"
    },
    "fort-lauderdale": {
      "name": "Fort Lauderdale",
      "county": "Broward County",
      "state": "FL",
      "coordinates": { "lat": 26.1224, "lng": -80.1373 },
      "neighborhoods": ["Las Olas", "Victoria Park", "Tarpon River", "Rio Vista", "Harbor Beach", "Coral Ridge", "Lauderdale-by-the-Sea"],
      "zipCodes": ["33301", "33304", "33305", "33306", "33308", "33309", "33311", "33312", "33313", "33315", "33316"],
      "localFactors": {
        "climate": "Coastal subtropical climate with canal network",
        "risks": ["Canal flooding", "Salt air corrosion on pipes", "Hurricane damage", "Boat dock water intrusion"],
        "characteristics": "Venice of America with extensive waterway system"
      },
      "responseTime": "30-45 minutes"
    },
    "pembroke-pines": {
      "name": "Pembroke Pines",
      "county": "Broward County",
      "state": "FL",
      "coordinates": { "lat": 26.0128, "lng": -80.2241 },
      "neighborhoods": ["Chapel Trail", "Silver Lakes", "Pembroke Falls", "Century Village", "Pembroke Lakes"],
      "zipCodes": ["33023", "33024", "33025", "33026", "33027", "33028", "33029", "33082", "33084"],
      "localFactors": {
        "climate": "Suburban community with planned drainage systems",
        "risks": ["Flood zone properties", "Slab leaks in planned communities", "Hurricane roof damage", "Underground plumbing issues"],
        "characteristics": "Large family-oriented suburban community"
      },
      "responseTime": "35-50 minutes"
    },
    "davie": {
      "name": "Davie",
      "county": "Broward County",
      "state": "FL",
      "coordinates": { "lat": 26.0628, "lng": -80.2331 },
      "neighborhoods": ["Rolling Hills", "Davie Village", "Griffin Lakes", "Long Lake Ranches", "Arrowhead"],
      "zipCodes": ["33314", "33317", "33324", "33325", "33326", "33328", "33329", "33330", "33331"],
      "localFactors": {
        "climate": "Rural-suburban with horse property drainage challenges",
        "risks": ["Well water issues", "Septic system backups", "Large property flooding", "Barn and stable water damage"],
        "characteristics": "Western-themed town with equestrian properties"
      },
      "responseTime": "30-40 minutes"
    },
    "weston": {
      "name": "Weston",
      "county": "Broward County",
      "state": "FL",
      "coordinates": { "lat": 26.1003, "lng": -80.3998 },
      "neighborhoods": ["Weston Hills", "Savanna", "Country Isles", "Emerald Estates", "The Ridges"],
      "zipCodes": ["33326", "33327", "33331", "33332"],
      "localFactors": {
        "climate": "Master-planned community near Everglades",
        "risks": ["Everglades flooding", "HOA-managed property challenges", "Underground utility issues", "Humid basement conditions"],
        "characteristics": "Upscale planned community with strict HOA standards"
      },
      "responseTime": "40-55 minutes"
    },
    "plantation": {
      "name": "Plantation",
      "county": "Broward County",
      "state": "FL",
      "coordinates": { "lat": 26.1276, "lng": -80.2331 },
      "neighborhoods": ["Jacaranda", "Pine Island Ridge", "Plantation Acres", "Central Park", "Sunrise Golf Village"],
      "zipCodes": ["33313", "33317", "33322", "33323", "33324", "33325", "33388"],
      "localFactors": {
        "climate": "Central Broward location with established infrastructure",
        "risks": ["Aging sewer systems", "Commercial building water damage", "Hurricane wind damage", "Storm drain backups"],
        "characteristics": "Mix of residential and commercial with mature landscaping"
      },
      "responseTime": "25-35 minutes"
    },
    "miramar": {
      "name": "Miramar",
      "county": "Broward County",
      "state": "FL",
      "coordinates": { "lat": 25.9873, "lng": -80.2323 },
      "neighborhoods": ["Miramar Parkway", "Silver Shores", "Huntington", "Sunset Falls", "Miramar Town Center"],
      "zipCodes": ["33023", "33025", "33027", "33029"],
      "localFactors": {
        "climate": "Southern Broward with diverse property types",
        "risks": ["Multi-family building water damage", "Commercial park flooding", "Underground parking water intrusion", "Tropical storm impacts"],
        "characteristics": "Rapidly growing diverse community"
      },
      "responseTime": "30-40 minutes"
    },
    "coral-springs": {
      "name": "Coral Springs",
      "county": "Broward County",
      "state": "FL",
      "coordinates": { "lat": 26.2712, "lng": -80.2706 },
      "neighborhoods": ["Heron Bay", "Coral Springs Country Club", "Cypress Run", "Eagle Trace", "The Walk"],
      "zipCodes": ["33065", "33067", "33071", "33073", "33075", "33076", "33077"],
      "localFactors": {
        "climate": "Northern Broward with planned drainage",
        "risks": ["Lake and canal overflow", "AC condensation leaks", "Hurricane roof damage", "Foundation water seepage"],
        "characteristics": "Award-winning planned city with excellent infrastructure"
      },
      "responseTime": "35-50 minutes"
    },
    "boca-raton": {
      "name": "Boca Raton",
      "county": "Palm Beach County",
      "state": "FL",
      "coordinates": { "lat": 26.3587, "lng": -80.0831 },
      "neighborhoods": ["Boca West", "Royal Palm Yacht & Country Club", "Mizner Park", "Spanish River", "Town Center"],
      "zipCodes": ["33427", "33428", "33429", "33431", "33432", "33433", "33434", "33486", "33487", "33496", "33497", "33498", "33499"],
      "localFactors": {
        "climate": "Coastal Palm Beach with luxury properties",
        "risks": ["Oceanfront salt damage", "High-end property water intrusion", "Underground parking flooding", "Golf course irrigation overflow"],
        "characteristics": "Affluent coastal community with high-value properties"
      },
      "responseTime": "45-60 minutes"
    },
    "pompano-beach": {
      "name": "Pompano Beach",
      "county": "Broward County",
      "state": "FL",
      "coordinates": { "lat": 26.2379, "lng": -80.1248 },
      "neighborhoods": ["Lighthouse Point", "Palm Aire", "Cresthaven", "Collier City", "Cypress Creek"],
      "zipCodes": ["33060", "33061", "33062", "33063", "33064", "33069", "33072", "33074"],
      "localFactors": {
        "climate": "Coastal Broward with beach and inland areas",
        "risks": ["Beachfront storm damage", "Older building plumbing failures", "Marina-area flooding", "Commercial district water damage"],
        "characteristics": "Redeveloping beach community with mixed property types"
      },
      "responseTime": "30-45 minutes"
    },
    "doral": {
      "name": "Doral",
      "county": "Miami-Dade County",
      "state": "FL",
      "coordinates": { "lat": 25.8195, "lng": -80.3553 },
      "neighborhoods": ["Doral Golf Course", "Downtown Doral", "Doral Isles", "Trump National Doral", "Costa Del Sol"],
      "zipCodes": ["33122", "33166", "33172", "33178"],
      "localFactors": {
        "climate": "Western Miami-Dade with commercial development",
        "risks": ["Golf course irrigation issues", "Commercial warehouse flooding", "High-rise condo water damage", "Storm drain system overload"],
        "characteristics": "Our home base - fastest response times available"
      },
      "responseTime": "15-25 minutes"
    },
    "miami-beach": {
      "name": "Miami Beach",
      "county": "Miami-Dade County",
      "state": "FL",
      "coordinates": { "lat": 25.7907, "lng": -80.1300 },
      "neighborhoods": ["South Beach", "North Beach", "Mid-Beach", "Sunset Harbour", "Belle Isle"],
      "zipCodes": ["33139", "33140", "33141", "33154"],
      "localFactors": {
        "climate": "Barrier island with sea level rise concerns",
        "risks": ["King tide flooding", "Salt water intrusion", "Historic Art Deco building water damage", "Underground parking flooding"],
        "characteristics": "Iconic barrier island with unique flooding challenges"
      },
      "responseTime": "35-50 minutes"
    }
  },
  "causes": {
    "water-damage": [
      {
        "id": "burst-pipe",
        "name": "Burst Pipe",
        "slug": "burst-pipe-water-damage",
        "description": "Emergency burst pipe water damage cleanup and restoration",
        "urgency": "emergency",
        "seasonality": ["winter", "cold-snaps"]
      },
      {
        "id": "ac-leak",
        "name": "AC Leak",
        "slug": "ac-leak-water-damage",
        "description": "Air conditioning leak water damage repair and prevention",
        "urgency": "moderate",
        "seasonality": ["summer", "year-round"]
      },
      {
        "id": "washing-machine-overflow",
        "name": "Washing Machine Overflow",
        "slug": "washing-machine-overflow-damage",
        "description": "Washing machine overflow cleanup and water damage restoration",
        "urgency": "moderate",
        "seasonality": ["year-round"]
      },
      {
        "id": "slab-leak",
        "name": "Slab Leak",
        "slug": "slab-leak-water-damage",
        "description": "Slab leak detection and water damage restoration",
        "urgency": "moderate",
        "seasonality": ["year-round"]
      },
      {
        "id": "roof-leak",
        "name": "Roof Leak",
        "slug": "roof-leak-water-damage",
        "description": "Roof leak water damage restoration and repair",
        "urgency": "high",
        "seasonality": ["hurricane-season", "rainy-season"]
      },
      {
        "id": "toilet-overflow",
        "name": "Toilet Overflow",
        "slug": "toilet-overflow-cleanup",
        "description": "Toilet overflow cleanup and sanitization services",
        "urgency": "high",
        "seasonality": ["year-round"]
      },
      {
        "id": "hurricane-flooding",
        "name": "Hurricane Flooding",
        "slug": "hurricane-flood-damage",
        "description": "Hurricane flood damage restoration and emergency services",
        "urgency": "emergency",
        "seasonality": ["hurricane-season"]
      }
    ],
    "mold": [
      {
        "id": "mold-from-roof-leak",
        "name": "Mold from Roof Leak",
        "slug": "roof-leak-mold-remediation",
        "description": "Mold remediation caused by roof leak water intrusion",
        "urgency": "moderate",
        "seasonality": ["year-round"]
      },
      {
        "id": "mold-from-ac",
        "name": "Mold from AC Condensation",
        "slug": "ac-mold-remediation",
        "description": "AC condensation mold removal and prevention",
        "urgency": "moderate",
        "seasonality": ["summer", "year-round"]
      },
      {
        "id": "bathroom-mold",
        "name": "Bathroom Mold",
        "slug": "bathroom-mold-removal",
        "description": "Bathroom mold remediation and moisture control",
        "urgency": "moderate",
        "seasonality": ["year-round"]
      },
      {
        "id": "mold-after-flood",
        "name": "Mold After Flood",
        "slug": "post-flood-mold-remediation",
        "description": "Post-flood mold remediation and prevention services",
        "urgency": "high",
        "seasonality": ["after-storms"]
      }
    ],
    "fire": [
      {
        "id": "kitchen-fire",
        "name": "Kitchen Fire",
        "slug": "kitchen-fire-damage-restoration",
        "description": "Kitchen fire damage cleanup and restoration",
        "urgency": "high",
        "seasonality": ["holidays", "year-round"]
      },
      {
        "id": "electrical-fire",
        "name": "Electrical Fire",
        "slug": "electrical-fire-cleanup",
        "description": "Electrical fire damage restoration and safety",
        "urgency": "emergency",
        "seasonality": ["year-round"]
      },
      {
        "id": "smoke-odor",
        "name": "Smoke Odor",
        "slug": "smoke-odor-removal",
        "description": "Professional smoke odor removal and air purification",
        "urgency": "moderate",
        "seasonality": ["year-round"]
      }
    ]
  },
  "process": {
    "water-damage-restoration": [
      { "step": 1, "title": "Emergency Inspection", "description": "Immediate assessment of water damage extent and source identification" },
      { "step": 2, "title": "Water Extraction", "description": "Rapid removal of standing water using industrial equipment" },
      { "step": 3, "title": "Drying & Dehumidification", "description": "Complete moisture removal from structures and contents" },
      { "step": 4, "title": "Mold Prevention", "description": "Antimicrobial treatment to prevent mold growth" },
      { "step": 5, "title": "Repairs & Restoration", "description": "Complete restoration to pre-damage condition" }
    ],
    "fire-damage-restoration": [
      { "step": 1, "title": "Damage Assessment", "description": "Comprehensive evaluation of fire, smoke, and soot damage" },
      { "step": 2, "title": "Board-Up & Tarping", "description": "Secure property to prevent further damage" },
      { "step": 3, "title": "Debris Removal", "description": "Safe removal of damaged materials and debris" },
      { "step": 4, "title": "Smoke & Soot Cleaning", "description": "Thorough cleaning of all affected surfaces" },
      { "step": 5, "title": "Odor Elimination", "description": "Professional deodorization using thermal fogging and ozone treatment" },
      { "step": 6, "title": "Restoration", "description": "Complete rebuild and restoration services" }
    ],
    "mold-remediation": [
      { "step": 1, "title": "Inspection & Testing", "description": "Comprehensive mold assessment and air quality testing" },
      { "step": 2, "title": "Containment", "description": "Isolate affected areas to prevent spore spread" },
      { "step": 3, "title": "Air Filtration", "description": "HEPA filtration to capture airborne mold spores" },
      { "step": 4, "title": "Mold Removal", "description": "Safe removal of mold-contaminated materials" },
      { "step": 5, "title": "Cleaning & Sanitizing", "description": "Antimicrobial treatment of all surfaces" },
      { "step": 6, "title": "Restoration", "description": "Repair and restoration of affected areas" }
    ],
    "storm-damage-restoration": [
      { "step": 1, "title": "Emergency Response", "description": "Rapid deployment to assess and secure property" },
      { "step": 2, "title": "Roof Tarping", "description": "Immediate temporary roof protection" },
      { "step": 3, "title": "Water Extraction", "description": "Remove flood water and begin drying process" },
      { "step": 4, "title": "Debris Cleanup", "description": "Safe removal of storm debris" },
      { "step": 5, "title": "Structural Repair", "description": "Address wind, water, and impact damage" },
      { "step": 6, "title": "Full Restoration", "description": "Complete property restoration" }
    ]
  }
}
```

### 1.2 Create City-Specific Content Templates

#### File: `config/city-content-templates.json`

Contains city-specific intro paragraphs, local risks, and FAQs (manually written or AI-assisted for uniqueness).

---

## Phase 2: New Routing Architecture (Week 1-2)

### 2.1 Current vs. New URL Structure

| Page Type | Current URL | New URL |
|-----------|-------------|---------|
| Core Service | `/services/water-restoration/` | `/water-damage-restoration/` |
| City Page | `/miami-restoration-services/` | `/water-damage-restoration/miami/` |
| Problem Page | N/A | `/burst-pipe-water-damage/miami/` |

### 2.2 New App Directory Structure

```
app/
├── water-damage-restoration/
│   ├── page.tsx                          # Core service page (authority anchor)
│   └── [city]/
│       └── page.tsx                      # Service × City page (money page)
├── fire-damage-restoration/
│   ├── page.tsx
│   └── [city]/
│       └── page.tsx
├── mold-remediation/
│   ├── page.tsx
│   └── [city]/
│       └── page.tsx
├── storm-damage-restoration/
│   ├── page.tsx
│   └── [city]/
│       └── page.tsx
├── sewage-cleanup/
│   ├── page.tsx
│   └── [city]/
│       └── page.tsx
├── emergency-restoration/
│   ├── page.tsx
│   └── [city]/
│       └── page.tsx
├── [cause]/                              # Problem pages
│   └── [city]/
│       └── page.tsx
└── ...existing routes
```

### 2.3 Files to Create

| File | Purpose |
|------|---------|
| `app/water-damage-restoration/page.tsx` | Core authority page |
| `app/water-damage-restoration/[city]/page.tsx` | Service × City pages |
| `app/fire-damage-restoration/page.tsx` | Core authority page |
| `app/fire-damage-restoration/[city]/page.tsx` | Service × City pages |
| `app/mold-remediation/page.tsx` | Core authority page |
| `app/mold-remediation/[city]/page.tsx` | Service × City pages |
| `app/storm-damage-restoration/page.tsx` | Core authority page |
| `app/storm-damage-restoration/[city]/page.tsx` | Service × City pages |
| `lib/local-seo/data.ts` | Data access layer |
| `lib/local-seo/templates.ts` | Template rendering |
| `lib/local-seo/schema.ts` | Enhanced structured data |
| `components/local-seo/CityServicePage.tsx` | Reusable page component |
| `components/local-seo/ServiceProcess.tsx` | Process section component |
| `components/local-seo/NeighborhoodList.tsx` | Neighborhoods component |
| `components/local-seo/LocalFAQ.tsx` | FAQ with schema component |
| `components/local-seo/LocalCTA.tsx` | City-specific CTA |

---

## Phase 3: Component Implementation (Week 2-3)

### 3.1 Service × City Page Template Structure

```
┌─────────────────────────────────────────────────────────┐
│  HEADER (Existing)                                       │
├─────────────────────────────────────────────────────────┤
│  HERO CTA - "24/7 Emergency Service in {City}"          │
├─────────────────────────────────────────────────────────┤
│  H1: "{Service} in {City}, FL"                          │
├─────────────────────────────────────────────────────────┤
│  SECTION 1: City-Specific Intro (UNIQUE per city)       │
│  - Local climate factors                                │
│  - Common issues in this area                           │
│  - Response time commitment                             │
├─────────────────────────────────────────────────────────┤
│  SECTION 2: Common Causes in {City} (Dynamic)           │
│  - Filtered cause list based on city characteristics    │
│  - Links to problem pages                               │
├─────────────────────────────────────────────────────────┤
│  SECTION 3: Our Process (Reusable)                      │
│  - Step-by-step restoration process                     │
│  - Same across cities but service-specific              │
├─────────────────────────────────────────────────────────┤
│  SECTION 4: Neighborhoods Served (Dynamic)              │
│  - Grid/list of neighborhoods                           │
│  - Zip codes served                                     │
├─────────────────────────────────────────────────────────┤
│  SECTION 5: Local Trust Signals                         │
│  - "Serving {City} for X years"                         │
│  - Response time guarantee                              │
│  - Insurance partnerships                               │
├─────────────────────────────────────────────────────────┤
│  SECTION 6: FAQ (City-Specific with Schema)             │
│  - Dynamic questions with city name                     │
│  - FAQ structured data                                  │
├─────────────────────────────────────────────────────────┤
│  CTA BANNER - Phone + Form                              │
├─────────────────────────────────────────────────────────┤
│  INTERNAL LINKS SECTION                                 │
│  - Link to parent service page                          │
│  - Links to 2-3 problem pages                           │
│  - Link to 1 related blog post                          │
├─────────────────────────────────────────────────────────┤
│  FOOTER (Existing)                                       │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Enhanced Structured Data Schema

Each Service × City page will include:

```javascript
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EmergencyService"],
  "@id": "https://totalcarerestoration.com#business",
  "name": "Total Care Restoration",
  "description": "...",
  "url": "https://totalcarerestoration.com/water-damage-restoration/miami/",
  "telephone": "(786) 610-6317",
  "email": "clientcare@totalcarerestoration.com",
  "address": {...},
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.7617,
    "longitude": -80.1918
  },
  "areaServed": {
    "@type": "City",
    "name": "Miami",
    "containedInPlace": {
      "@type": "State",
      "name": "Florida"
    }
  },
  "makesOffer": {
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": "Water Damage Restoration in Miami",
      "serviceType": "Water Damage Restoration"
    }
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  ],
  "priceRange": "$$"
}

// FAQ Schema
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [...]
}

// Service Schema
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Water Damage Restoration in Miami, FL",
  "provider": {...},
  "areaServed": {...},
  "serviceType": "Water Damage Restoration"
}
```

---

## Phase 4: Internal Linking Strategy (Week 3)

### 4.1 Link Architecture

```
                    ┌─────────────────────────┐
                    │   Core Service Page     │
                    │ /water-damage-restoration│
                    └───────────┬─────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ /water-damage │     │ /water-damage │     │ /water-damage │
│  -restoration │     │  -restoration │     │  -restoration │
│    /miami/    │     │/fort-lauderdale│    │ /pembroke-... │
└───────┬───────┘     └───────┬───────┘     └───────────────┘
        │                     │
        ▼                     ▼
┌───────────────┐     ┌───────────────┐
│/burst-pipe-   │     │/ac-leak-water-│
│water-damage/  │     │damage/fort-   │
│miami/         │     │lauderdale/    │
└───────────────┘     └───────────────┘
        │
        ▼
┌───────────────────────┐
│ Blog: "What to Do     │
│ After Water Damage    │
│ in Miami"             │
└───────────────────────┘
```

### 4.2 Linking Rules

| From Page | Must Link To |
|-----------|--------------|
| Service × City Page | Parent service page |
| Service × City Page | 2-3 problem pages |
| Service × City Page | 1 related blog post |
| Problem Page | Parent service × city page |
| Problem Page | Core service page |
| Blog Post | Relevant city page |
| Blog Post | Relevant service page |

### 4.3 Related Links Component

```tsx
// components/local-seo/RelatedLinks.tsx
interface RelatedLinksProps {
  parentService: string;
  city: string;
  problemPages: string[];
  blogPost: string;
}
```

---

## Phase 5: Redirects & Migration (Week 3)

### 5.1 Redirect Map

Old URLs should 301 redirect to new structure:

| Old URL | New URL |
|---------|---------|
| `/miami-restoration-services/` | `/water-damage-restoration/miami/` |
| `/fort-lauderdale-restoration-service/` | `/water-damage-restoration/fort-lauderdale/` |
| `/services/water-restoration/` | `/water-damage-restoration/` |
| `/services/mold-remediation/` | `/mold-remediation/` |
| `/services/fire-restoration/` | `/fire-damage-restoration/` |

### 5.2 Netlify Redirects Configuration

Update `public/_redirects`:

```
# Service URL migrations
/services/water-restoration/*    /water-damage-restoration/:splat    301
/services/fire-restoration/*     /fire-damage-restoration/:splat     301
/services/mold-remediation/*     /mold-remediation/:splat            301

# City page migrations
/miami-restoration-services/     /water-damage-restoration/miami/    301
/fort-lauderdale-restoration-service/  /water-damage-restoration/fort-lauderdale/  301
/pembroke-pines-restoration-services/  /water-damage-restoration/pembroke-pines/   301
# ... etc for all city pages
```

---

## Phase 6: Content Generation Strategy (Week 3-4)

### 6.1 Content Tiers

| Tier | Content Type | Uniqueness | Priority |
|------|--------------|------------|----------|
| 1 | City intro paragraphs | 100% unique | Critical |
| 2 | City-specific FAQs | Templated + unique | High |
| 3 | Local risk factors | Data-driven | High |
| 4 | Process sections | Reusable | Medium |
| 5 | Neighborhoods | Data-driven | Medium |

### 6.2 Content Generation Workflow

1. **Manual Writing (Highest Value)**
   - City intro paragraphs (12 cities × 6 services = 72 paragraphs)
   - Can be AI-assisted but must be human-reviewed

2. **Template-Based (Medium Value)**
   - FAQs with city name insertion
   - CTA copy with city name
   - Meta descriptions

3. **Data-Driven (Automated)**
   - Neighborhoods list
   - Zip codes
   - Coordinates
   - Response times

### 6.3 Blog Content Plan

New blog posts to create for supporting the local pages:

| Blog Post | Supporting |
|-----------|------------|
| "What to Do After Water Damage in Miami" | Miami water damage pages |
| "Hurricane Season Water Damage Prep in South Florida" | All storm damage pages |
| "Does Insurance Cover Mold in Florida?" | All mold pages |
| "Water Damage Restoration Cost in Broward County" | Broward city pages |
| "AC Leak Water Damage Prevention in South Florida" | AC leak problem pages |

---

## Phase 7: Sitemap & Technical SEO (Week 4)

### 7.1 Updated Sitemap Structure

```typescript
// app/sitemap.ts - Updated
export default function sitemap(): MetadataRoute.Sitemap {
  const services = Object.keys(localSeoConfig.services);
  const cities = Object.keys(localSeoConfig.cities);
  
  // Core service pages (priority: 0.9)
  const coreServicePages = services.map(service => ({
    url: `${baseUrl}/${service}/`,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));
  
  // Service × City pages (priority: 0.85)
  const serviceCityPages = services.flatMap(service =>
    cities.map(city => ({
      url: `${baseUrl}/${service}/${city}/`,
      changeFrequency: 'monthly',
      priority: 0.85,
    }))
  );
  
  // Problem pages (priority: 0.75)
  const problemPages = ...;
  
  return [...coreServicePages, ...serviceCityPages, ...problemPages, ...blogRoutes];
}
```

### 7.2 robots.txt Update

No changes needed - all new pages should be indexable.

### 7.3 hreflang (If Multi-Language Future)

Structure supports future Spanish language expansion:
- `/water-damage-restoration/miami/` (en)
- `/es/restauracion-danos-agua/miami/` (es)

---

## Implementation Checklist

### Week 1: Data Architecture ✅
- [x] Create `config/local-seo.json`
- [x] Create `config/city-content-templates.json` (integrated into local-seo.json)
- [x] Write 12 city intro paragraphs for water damage
- [x] Create data access layer in `lib/local-seo/`

### Week 2: Core Infrastructure ✅
- [x] Create core service page routes
- [x] Create service × city page routes
- [x] Build `CityServicePage` component
- [x] Build `ServiceProcess` component
- [x] Build `NeighborhoodList` component
- [x] Build `LocalFAQ` component with schema
- [x] Build `LocalCTA` component

### Week 3: Content & Migration ✅
- [x] Write city intro paragraphs for all services (72 total)
- [x] Create city-specific FAQs
- [x] Set up 301 redirects (comprehensive redirect rules)
- [x] Update internal linking
- [x] Create problem page routes
- [x] Build problem page template
- [x] Create supporting blog posts (5 posts)

### Week 4: Launch & Optimization
- [x] Update sitemap
- [ ] Submit sitemap to Google Search Console
- [x] Test all redirects
- [ ] Verify structured data (Google Rich Results Test)
- [x] Create supporting blog posts (5 blog posts created)
- [ ] Monitor Search Console for issues

---

## Success Metrics

| Metric | Baseline | Target (3mo) | Target (6mo) |
|--------|----------|--------------|--------------|
| Indexed city pages | ~15 | 72+ | 100+ |
| Local keyword rankings | TBD | Top 20 for 50% | Top 10 for 30% |
| Organic traffic | TBD | +30% | +75% |
| Local conversions | TBD | +20% | +50% |

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Duplicate content penalty | Unique city intros, dynamic content filtering |
| Doorway page penalty | Substantial unique content per page, user value focus |
| Redirect loops | Careful redirect mapping, testing |
| Traffic drop during migration | Phased rollout, proper 301s |

---

## Future Expansion

1. **Spanish Language Pages**
   - `/es/restauracion-danos-agua/miami/`

2. **Additional Cities**
   - West Palm Beach area
   - Key areas (Key Biscayne, Key West)

3. **Additional Services**
   - Biohazard cleanup
   - Crime scene cleanup
   - Hoarding cleanup

4. **Enhanced Features**
   - Real-time availability booking
   - Photo upload for instant quote
   - Chatbot for common questions

