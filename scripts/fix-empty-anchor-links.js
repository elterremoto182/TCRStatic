const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '..', 'totalcarerestoration.com_links_with_no_anchor_text_20251208.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV
const lines = csvContent.trim().split('\n').slice(1); // Skip header
const entries = lines.filter(line => line.trim()).map(line => {
  const [pageUrl, linkUrl] = line.split(',').map(s => s.trim());
  return { pageUrl, linkUrl };
});

// Function to derive anchor text from URL
function getAnchorText(url) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace('www.', '');
    const pathname = urlObj.pathname;

    // Common mappings for well-known sites
    const domainMappings = {
      'epa.gov': 'EPA',
      'osha.gov': 'OSHA',
      'cdc.gov': 'CDC',
      'fda.gov': 'FDA',
      'bbb.org': 'Better Business Bureau',
      'iicrc.org': 'IICRC',
      'nfpa.org': 'NFPA',
      'ashrae.org': 'ASHRAE',
      'astm.org': 'ASTM',
      'iccsafe.org': 'ICC',
      'who.int': 'World Health Organization',
      'yelp.com': 'Yelp',
      'facebook.com': 'Facebook',
      'youtube.com': 'YouTube',
      '3m.com': '3M',
      'homedepot.com': 'Home Depot',
      'energystar.gov': 'ENERGY STAR',
      'floridahealth.gov': 'Florida Department of Health',
      'cpsc.gov': 'Consumer Product Safety Commission',
      'esfi.org': 'Electrical Safety Foundation International',
      'ul.com': 'UL',
      'redcross.org': 'American Red Cross',
      'usgbc.org': 'U.S. Green Building Council',
      'acac.org': 'ACAC',
      'iaqa.org': 'IAQA',
      'ccohs.ca': 'CCOHS',
      'csagroup.org': 'CSA Group',
      'hcd.ca.gov': 'California HCD',
      'lafd.org': 'Los Angeles Fire Department',
      'miamidade.gov': 'Miami-Dade County',
      'miamiherald.com': 'Miami Herald',
      'consumerreports.org': 'Consumer Reports',
      'webmd.com': 'WebMD',
      'dupont.com': 'DuPont',
      'flir.com': 'FLIR',
      'intertek.com': 'Intertek',
      'iqair.com': 'IQAir',
      'levoit.com': 'Levoit',
      'timberland.com': 'Timberland PRO',
      'wolverine.com': 'Wolverine',
      'austinair.com': 'Austin Air',
      'benefect.com': 'Benefect',
      'legendbrands.com': 'Legend Brands',
      'injectidry.com': 'Injectidry',
      'safetyculture.com': 'SafetyCulture',
      'sitemate.com': 'Sitemate',
      'aafa.org': 'Asthma and Allergy Foundation of America',
      'noaa.gov': 'NOAA',
      'coast.noaa.gov': 'NOAA',
      'nssl.noaa.gov': 'NOAA',
      'neefusa.org': 'NEEF',
      'cnet.com': 'CNET',
      'wlrn.org': 'WLRN',
      'cbslocal.com': 'CBS Local',
      'randrmagonline.com': 'R&R Magazine',
      'angieslist.com': "Angie's List",
      'howmuch.net': 'HowMuch',
      'extension.okstate.edu': 'Oklahoma State University Extension',
      'aia.org': 'American Institute of Architects',
      'conservation-us.org': 'American Institute for Conservation',
    };

    // Check for exact domain match
    for (const [domain, name] of Object.entries(domainMappings)) {
      if (hostname === domain || hostname.endsWith('.' + domain)) {
        return name;
      }
    }

    // Wikipedia - extract article name
    if (hostname.includes('wikipedia.org')) {
      const wikiMatch = pathname.match(/\/wiki\/(.+)/);
      if (wikiMatch) {
        return wikiMatch[1].replace(/_/g, ' ').replace(/%20/g, ' ');
      }
    }

    // Google user content images
    if (hostname.includes('googleusercontent.com')) {
      return 'Image';
    }

    // Path-based extraction for specific sites
    if (pathname && pathname !== '/' && pathname !== '/home' && pathname !== '/en') {
      // Extract meaningful text from path
      const pathParts = pathname.split('/').filter(p => p && p !== 'en' && p !== 'home' && p !== 'products' && p !== 'services');
      if (pathParts.length > 0) {
        const lastPart = pathParts[pathParts.length - 1];
        // Clean up the path segment
        let text = lastPart
          .replace(/[-_]/g, ' ')
          .replace(/\.html?$/i, '')
          .replace(/\?.+$/, '')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        
        // If text is too long or looks like an ID, use domain name instead
        if (text.length > 60 || /^[a-f0-9]{20,}$/i.test(lastPart)) {
          return formatDomainName(hostname);
        }
        return text;
      }
    }

    // Fall back to formatted domain name
    return formatDomainName(hostname);
  } catch (e) {
    console.error(`Error parsing URL: ${url}`, e);
    return 'Link';
  }
}

function formatDomainName(hostname) {
  // Remove common prefixes and suffixes
  let name = hostname
    .replace(/^www\./, '')
    .replace(/\.(com|org|net|gov|edu|io|co|info)$/, '')
    .replace(/\.(com|org|net|gov|edu|io|co|info)\.[a-z]{2}$/, '');
  
  // Split by dots and capitalize
  return name.split('.')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

// Convert page URL to file path
function pageUrlToFilePath(pageUrl) {
  try {
    const urlObj = new URL(pageUrl);
    let slug = urlObj.pathname.replace(/^\//, '').replace(/\/$/, '');
    
    // Check if it's a blog post or a page
    const blogPath = path.join(__dirname, '..', 'content', 'blog', `${slug}.md`);
    const pagePath = path.join(__dirname, '..', 'content', 'pages', `${slug}.md`);
    
    if (fs.existsSync(blogPath)) {
      return blogPath;
    } else if (fs.existsSync(pagePath)) {
      return pagePath;
    }
    
    // Try with services- prefix for service pages
    const serviceSlug = `services-${slug.replace('services/', '')}`;
    const servicePath = path.join(__dirname, '..', 'content', 'pages', `${serviceSlug}.md`);
    if (fs.existsSync(servicePath)) {
      return servicePath;
    }
    
    return null;
  } catch (e) {
    console.error(`Error converting URL to path: ${pageUrl}`, e);
    return null;
  }
}

// Group entries by page URL
const entriesByPage = {};
for (const entry of entries) {
  if (!entriesByPage[entry.pageUrl]) {
    entriesByPage[entry.pageUrl] = [];
  }
  entriesByPage[entry.pageUrl].push(entry.linkUrl);
}

// Process each page
let totalFixed = 0;
let filesModified = 0;
const notFound = [];
const couldNotFix = [];

for (const [pageUrl, linkUrls] of Object.entries(entriesByPage)) {
  const filePath = pageUrlToFilePath(pageUrl);
  
  if (!filePath) {
    notFound.push(pageUrl);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  for (const linkUrl of linkUrls) {
    // Pattern 1: Standalone URL in parentheses (not a markdown link)
    // This matches (https://...) but not [text](https://...)
    const escapedUrl = linkUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Match patterns like:
    // - `(URL)` at start of line or after space/table cell
    // - `(URL)` not preceded by `]`
    const patterns = [
      // Standalone (URL) not preceded by ]
      new RegExp(`(?<!\\])\\(${escapedUrl}\\)`, 'g'),
      // In table cells: | (URL) or |(URL)
      new RegExp(`(\\|\\s*)\\(${escapedUrl}\\)`, 'g'),
    ];
    
    const anchorText = getAnchorText(linkUrl);
    
    for (const pattern of patterns) {
      const matches = content.match(pattern);
      if (matches) {
        // For the table cell pattern, preserve the table structure
        if (pattern.source.includes('\\|')) {
          content = content.replace(pattern, `$1[${anchorText}](${linkUrl})`);
        } else {
          content = content.replace(pattern, `[${anchorText}](${linkUrl})`);
        }
        modified = true;
        totalFixed++;
        console.log(`Fixed: ${anchorText} -> ${linkUrl} in ${path.basename(filePath)}`);
      }
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    filesModified++;
  }
}

console.log('\n=== Summary ===');
console.log(`Total links fixed: ${totalFixed}`);
console.log(`Files modified: ${filesModified}`);

if (notFound.length > 0) {
  console.log(`\nCould not find files for ${notFound.length} pages:`);
  notFound.forEach(url => console.log(`  - ${url}`));
}

