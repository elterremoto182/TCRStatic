/**
 * Curate reviews: add service/city to dataset, filter bad reviews, write config/reviews.json
 * - Adds service and city fields to each review (inferred from text, or preserves manual edits)
 * - Writes enriched data back to the original dataset file for manual editing
 * - Writes filtered (good only) reviews to config/reviews.json for the site
 * Run: node scripts/curate-reviews.js
 */
const fs = require('fs');
const path = require('path');

const inputPath = path.join(
  __dirname,
  '..',
  'dataset_Google-Maps-Reviews-Scraper_2026-02-11_13-55-02-264 (1).json'
);
const outputPath = path.join(__dirname, '..', 'config', 'reviews.json');

const raw = fs.readFileSync(inputPath, 'utf8');
const data = JSON.parse(raw);

// City display names -> slug (from config/cities.json)
const cityNameToSlug = {
  'Miami': 'miami',
  'Miami Beach': 'miami-beach',
  'Miami Dade': 'miami',
  'Fort Lauderdale': 'fort-lauderdale',
  'Doral': 'doral',
  'Boca Raton': 'boca-raton',
  'Hollywood': 'hollywood',
  'Hialeah': 'hialeah',
  'Coral Gables': 'coral-gables',
  'Pembroke Pines': 'pembroke-pines',
  'Pompano Beach': 'pompano-beach',
  'Plantation': 'plantation',
  'Miramar': 'miramar',
  'Weston': 'weston',
  'Davie': 'davie',
  'Coral Springs': 'coral-springs',
  'Sunrise': 'sunrise',
  'Deerfield Beach': 'deerfield-beach',
  'West Palm Beach': 'west-palm-beach',
  'Kendall': 'kendall',
  'Pinecrest': 'pinecrest',
  'Aventura': 'aventura',
  'Miami Lakes': 'miami-lakes',
  'Broward': 'fort-lauderdale',
  'Miami-Dade': 'miami',
};

// Service slug -> keywords that indicate that service (order matters: more specific first)
const serviceKeywords = {
  'sewage-cleanup': ['sewage', 'sewer', 'toilet overflow', 'toilet leak'],
  'mold-remediation': ['mold', 'mildew', 'mold remediation', 'mold testing'],
  'fire-damage-restoration': ['fire', 'smoke', 'soot'],
  'storm-damage-restoration': ['storm', 'hurricane', 'wind damage'],
  'roof-tarping': ['roof', 'tarp', 'tarping', 'leaky roof'],
  'shrink-wrapping': ['shrink wrap', 'shrink wrap'],
  'water-damage-restoration': ['water damage', 'water removal', 'water extraction', 'leak', 'flood', 'flooding', 'pipe', 'plumbing', 'moisture', 'dry', 'dry out', 'dried up'],
  'emergency-restoration': ['emergency', '24/7', 'immediately', 'right away'],
};

function inferService(text) {
  if (!text || typeof text !== 'string') return [];
  const t = text.toLowerCase();
  const matched = [];
  for (const [slug, keywords] of Object.entries(serviceKeywords)) {
    if (keywords.some((kw) => t.includes(kw))) matched.push(slug);
  }
  if (matched.length === 0 && /restoration|restore|restored/.test(t)) {
    matched.push('emergency-restoration');
  }
  return matched;
}

function inferCity(text) {
  if (!text || typeof text !== 'string') return [];
  const matched = [];
  for (const [name, slug] of Object.entries(cityNameToSlug)) {
    if (text.includes(name)) matched.push(slug);
  }
  return matched;
}

function getServiceValue(inferred, existing) {
  const val = existing != null
    ? (Array.isArray(existing) ? existing : [existing])
    : inferred;
  return val.length === 0 ? undefined : val.length === 1 ? val[0] : val;
}

function getCityValue(inferred, existing) {
  const val = existing != null
    ? (Array.isArray(existing) ? existing : [existing])
    : inferred;
  return val.length === 0 ? undefined : val.length === 1 ? val[0] : val;
}

// Enrich ALL reviews (including bad) with service/city - for the dataset file
const enriched = data.map((r) => {
  const inferredServices = inferService(r?.text);
  const inferredCities = inferCity(r?.text);
  const service = getServiceValue(inferredServices, r.service);
  const city = getCityValue(inferredCities, r.city);
  const out = { ...r };
  if (service != null) out.service = service;
  if (city != null) out.city = city;
  return out;
});

// Write enriched data back to the original dataset (so you can manually edit service/city)
fs.writeFileSync(inputPath, JSON.stringify(enriched, null, 2), 'utf8');
console.log(`Added service/city to ${enriched.length} reviews in dataset file`);

// Filter and write curated output for the site
const curated = enriched
  .filter((r) => {
    if (r.stars == null || r.stars < 4) return false;
    const text = r.text;
    if (text == null || typeof text !== 'string' || !text.trim()) return false;
    return true;
  })
  .map((r) => {
    const out = {
      reviewId: r.reviewId,
      text: r.text.trim(),
      reviewUrl: r.reviewUrl,
      name: r.name,
      stars: r.stars,
      publishedAtDate: r.publishedAtDate,
    };
    if (r.service != null) out.service = r.service;
    if (r.city != null) out.city = r.city;
    return out;
  });

fs.writeFileSync(outputPath, JSON.stringify(curated, null, 2), 'utf8');
console.log(`Wrote ${curated.length} good reviews to config/reviews.json`);
