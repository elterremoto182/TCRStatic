const fs = require('fs');
const path = require('path');
const { slugToLinkText } = require('./fix-broken-links.js');

const pagesDir = path.join(process.cwd(), 'content/pages');
const blogDir = path.join(process.cwd(), 'content/blog');

// Fix link text in already-fixed links
function fixLinkText(content) {
  // Match markdown links: [text](url) or [**text**](url)
  const linkRegex = /\[(\*\*)?([^\]]+?)(\*\*)?\]\(([^)]+)\)/g;
  let fixedContent = content;
  let fixedCount = 0;
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const boldStart = match[1];
    const linkText = match[2];
    const boldEnd = match[3];
    const url = match[4];
    
    // Skip external links, images, and tel: links
    if (url.startsWith('http') || url.startsWith('tel:') || url.startsWith('mailto:') || url.startsWith('#') || url.startsWith('/wp-content')) {
      continue;
    }
    
    // Generate correct link text
    const correctText = slugToLinkText(url);
    
    // Remove parentheses from current link text if present
    const cleanedLinkText = linkText.replace(/^\(|\)$/g, '').trim();
    
    // Skip if text is already correct and has no parentheses
    const normalizedCorrect = correctText.trim();
    if (cleanedLinkText === normalizedCorrect && !linkText.startsWith('(') && !linkText.endsWith(')')) {
      continue;
    }
    
    // Always use correct text without parentheses
    const finalLinkText = normalizedCorrect;
    
    // Create replacement
    let replacement;
    if (boldStart && boldEnd) {
      replacement = `[**${finalLinkText}**](${url})`;
    } else if (boldStart) {
      replacement = `[**${finalLinkText}**](${url})`;
    } else {
      // Regular link without parentheses
      replacement = `[${finalLinkText}](${url})`;
    }
    
    fixedContent = fixedContent.replace(fullMatch, replacement);
    fixedCount++;
  }
  
  return { content: fixedContent, fixed: fixedCount };
}

// Process a single file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: body, fixed } = fixLinkText(content);
    
    if (fixed > 0) {
      fs.writeFileSync(filePath, body, 'utf8');
      return { file: path.basename(filePath), fixed, success: true };
    }
    
    return { file: path.basename(filePath), fixed: 0, success: true };
  } catch (error) {
    return { file: path.basename(filePath), error: error.message, success: false };
  }
}

// Get all markdown files
function getAllMarkdownFiles() {
  const files = [];
  
  if (fs.existsSync(pagesDir)) {
    const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.md'));
    for (const file of pageFiles) {
      files.push(path.join(pagesDir, file));
    }
  }
  
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
    for (const file of blogFiles) {
      files.push(path.join(blogDir, file));
    }
  }
  
  return files;
}

// Main function
function main() {
  console.log('Fixing link text in markdown files...\n');
  
  const files = getAllMarkdownFiles();
  console.log(`Found ${files.length} markdown files to check.\n`);
  
  const results = [];
  let totalFixed = 0;
  
  for (const filePath of files) {
    const result = processFile(filePath);
    results.push(result);
    if (result.fixed > 0) {
      totalFixed += result.fixed;
      console.log(`✓ ${result.file}: Fixed ${result.fixed} link text(s)`);
    }
  }
  
  console.log(`\n=== Summary ===`);
  console.log(`Total files processed: ${results.length}`);
  console.log(`Files with fixes: ${results.filter(r => r.fixed > 0).length}`);
  console.log(`Total link texts fixed: ${totalFixed}`);
  
  const errors = results.filter(r => !r.success);
  if (errors.length > 0) {
    console.log(`\nErrors:`);
    errors.forEach(r => console.log(`  - ${r.file}: ${r.error}`));
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { fixLinkText };

