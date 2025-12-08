#!/usr/bin/env node
/**
 * Script to fix malformed markdown links that create empty anchor text
 * 
 * Fixes these patterns:
 * 1. ![alt][(broken path)](/real-path) -> ![alt](/real-path)
 * 2. [Text][Reference](/url) -> [Text](/url)
 * 3. [](/url) -> removes or flags empty links
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const CONTENT_DIR = path.join(__dirname, '..', 'content');
const DRY_RUN = process.argv.includes('--dry-run');

// Statistics
let totalFilesModified = 0;
let totalFixesApplied = 0;
const fixesByType = {
  imageWithBrokenPath: 0,
  textRefLink: 0,
  emptyLink: 0
};

/**
 * Fix malformed markdown links in content
 */
function fixMarkdownLinks(content, filePath) {
  let modified = content;
  let fixes = 0;
  
  // Pattern 1: ![alt][(broken path)](/real-path) -> ![alt](/real-path)
  // This pattern has an image alt followed by [(garbage)](/actual-url)
  const imagePattern = /!\[([^\]]*)\]\[\([^\)]+\)\]\(([^\)]+)\)/g;
  modified = modified.replace(imagePattern, (match, alt, url) => {
    console.log(`  [IMAGE FIX] ${match.substring(0, 60)}... -> ![${alt}](${url})`);
    fixes++;
    fixesByType.imageWithBrokenPath++;
    return `![${alt}](${url})`;
  });
  
  // Pattern 1b: [Image: text][(broken path)](/real-path) -> ![text](/real-path)
  // Similar but with "[Image: text]" format
  const imageTextPattern = /\[Image:\s*([^\]]+)\]\[\([^\)]+\)\]\(([^\)]+)\)/g;
  modified = modified.replace(imageTextPattern, (match, alt, url) => {
    console.log(`  [IMAGE TEXT FIX] ${match.substring(0, 60)}... -> ![${alt}](${url})`);
    fixes++;
    fixesByType.imageWithBrokenPath++;
    return `![${alt}](${url})`;
  });
  
  // Pattern 2: [Text][Reference](/url) -> [Text](/url)
  // This catches links like [Learn More →][About](/about/)
  // Be careful not to match actual reference-style links
  const refLinkPattern = /\[([^\]]+)\]\[([^\]]+)\]\(([^\)]+)\)/g;
  modified = modified.replace(refLinkPattern, (match, text, ref, url) => {
    console.log(`  [REF LINK FIX] ${match.substring(0, 60)}... -> [${text}](${url})`);
    fixes++;
    fixesByType.textRefLink++;
    return `[${text}](${url})`;
  });
  
  // Pattern 3: [](/url) -> Remove empty links or add descriptive text
  // These should be flagged for manual review, but we can try to add context
  const emptyLinkPattern = /\[\]\(([^\)]+)\)/g;
  modified = modified.replace(emptyLinkPattern, (match, url) => {
    // Try to derive text from URL
    let linkText = 'Home';
    if (url === '/') {
      linkText = 'Home';
    } else if (url.includes('services/')) {
      linkText = url.split('/').filter(Boolean).pop().replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    } else if (url.includes('contact')) {
      linkText = 'Contact Us';
    } else if (url.includes('about')) {
      linkText = 'About Us';
    } else {
      // Generic: use last path segment
      const segments = url.split('/').filter(Boolean);
      linkText = segments.length > 0 
        ? segments[segments.length - 1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : 'Click Here';
    }
    console.log(`  [EMPTY LINK FIX] [](${url}) -> [${linkText}](${url})`);
    fixes++;
    fixesByType.emptyLink++;
    return `[${linkText}](${url})`;
  });
  
  return { content: modified, fixes };
}

/**
 * Process all markdown files
 */
function processFiles() {
  const files = glob.sync(path.join(CONTENT_DIR, '**/*.md'));
  
  console.log(`\nScanning ${files.length} markdown files for empty anchor text issues...\n`);
  console.log(DRY_RUN ? '=== DRY RUN MODE - No files will be modified ===' : '=== APPLYING FIXES ===');
  console.log('');
  
  for (const filePath of files) {
    const relativePath = path.relative(process.cwd(), filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const { content: fixedContent, fixes } = fixMarkdownLinks(content, filePath);
    
    if (fixes > 0) {
      console.log(`\n📄 ${relativePath} - ${fixes} fix(es)`);
      totalFilesModified++;
      totalFixesApplied += fixes;
      
      if (!DRY_RUN) {
        fs.writeFileSync(filePath, fixedContent, 'utf-8');
      }
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Files modified: ${totalFilesModified}`);
  console.log(`Total fixes applied: ${totalFixesApplied}`);
  console.log(`  - Image with broken path: ${fixesByType.imageWithBrokenPath}`);
  console.log(`  - Text reference links: ${fixesByType.textRefLink}`);
  console.log(`  - Empty links: ${fixesByType.emptyLink}`);
  
  if (DRY_RUN) {
    console.log('\n⚠️  DRY RUN - Run without --dry-run flag to apply fixes');
  } else {
    console.log('\n✅ All fixes have been applied!');
  }
}

// Run the script
processFiles();

