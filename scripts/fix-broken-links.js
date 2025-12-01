const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const pagesDir = path.join(process.cwd(), 'content/pages');
const blogDir = path.join(process.cwd(), 'content/blog');

// Convert URL slug to readable link text
function slugToLinkText(url) {
  // Remove leading/trailing slashes
  let slug = url.replace(/^\/+|\/+$/g, '');
  
  // Handle special patterns
  if (slug.startsWith('services/')) {
    // /services/mold-remediation/ -> "mold remediation"
    const serviceName = slug.replace('services/', '').replace(/-/g, ' ');
    return serviceName.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
  
  if (slug.startsWith('blog/')) {
    // /blog/post-title/ -> "post title"
    const postTitle = slug.replace('blog/', '').replace(/-/g, ' ');
    return postTitle.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
  
  // Handle location-based URLs
  // /boca-raton-restoration-services/ -> "Boca Raton restoration services"
  // /fort-lauderdale-restoration-service/ -> "Fort Lauderdale restoration service"
  // Check plural first to avoid matching singular pattern in plural URLs
  if (slug.includes('-restoration-services')) {
    const location = slug.replace('-restoration-services', '').replace(/-/g, ' ');
    const words = location.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    );
    return words.join(' ') + ' restoration services';
  }
  
  if (slug.includes('-restoration-service')) {
    const location = slug.replace('-restoration-service', '').replace(/-/g, ' ');
    const words = location.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    );
    return words.join(' ') + ' restoration service';
  }
  
  // Handle common patterns
  // /water-damage-clean-up/ -> "water damage clean up"
  // /tell-mold-behind-walls/ -> "tell mold behind walls"
  // /diy-tips-preventing-mold-after-a-leak-or-flood/ -> "DIY tips preventing mold after a leak or flood"
  
  // Convert kebab-case to readable text
  const words = slug.split('-');
  
  // Capitalize first word and handle special cases
  const capitalized = words.map((word, index) => {
    // Handle acronyms and special words
    if (word === 'diy') return 'DIY';
    if (word === 'a' || word === 'an' || word === 'the' || word === 'of' || word === 'in' || word === 'on' || word === 'at' || word === 'to' || word === 'for') {
      // Keep articles/prepositions lowercase unless first word
      return index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  
  return capitalized.join(' ');
}

// Find all broken links in content
function findBrokenLinks(content) {
  // Pattern to match (url) but not ![alt](url) or [text](url)
  // We want to match (url) that's not preceded by ! or [
  const brokenLinkRegex = /(?<![![])(\([\/][^)]+\))/g;
  const matches = [];
  let match;
  
  while ((match = brokenLinkRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const url = fullMatch.slice(1, -1); // Remove parentheses
    const startIndex = match.index;
    const endIndex = startIndex + fullMatch.length;
    
    // Check if it's inside a code block (backticks)
    const beforeMatch = content.substring(0, startIndex);
    const codeBlockMatches = beforeMatch.match(/```/g);
    if (codeBlockMatches && codeBlockMatches.length % 2 === 1) {
      continue; // Inside a code block, skip
    }
    
    // Check if it's inside inline code (single backticks)
    const inlineCodeRegex = /`[^`]*`/g;
    let insideInlineCode = false;
    let codeMatch;
    while ((codeMatch = inlineCodeRegex.exec(beforeMatch)) !== null) {
      if (codeMatch.index + codeMatch[0].length > startIndex) {
        insideInlineCode = true;
        break;
      }
    }
    if (insideInlineCode) {
      continue; // Inside inline code, skip
    }
    
    matches.push({
      fullMatch,
      url,
      startIndex,
      endIndex
    });
  }
  
  return matches;
}

// Fix broken links in content
function fixBrokenLinks(content) {
  const brokenLinks = findBrokenLinks(content);
  
  if (brokenLinks.length === 0) {
    return { content, fixed: 0 };
  }
  
  // Process from end to start to maintain indices
  let fixedContent = content;
  let fixedCount = 0;
  
  for (let i = brokenLinks.length - 1; i >= 0; i--) {
    const { fullMatch, url, startIndex, endIndex } = brokenLinks[i];
    
    // Check context around the link to determine if it's in bold
    const beforeLink = fixedContent.substring(Math.max(0, startIndex - 20), startIndex);
    const afterLink = fixedContent.substring(endIndex, Math.min(fixedContent.length, endIndex + 20));
    
    // Check if link is wrapped in bold: **(/url/)**
    const isWrappedInBold = beforeLink.endsWith('**') && afterLink.startsWith('**');
    
    // Check if there's bold text before the link: **text** (/url/)
    const boldBeforeMatch = beforeLink.match(/\*\*([^*]+)\*\*\s*$/);
    const hasBoldBefore = boldBeforeMatch !== null;
    
    // Generate link text
    const linkText = slugToLinkText(url);
    
    // Determine replacement based on context
    let replacement;
    if (isWrappedInBold) {
      // Link is wrapped in bold: **(/url/)** -> [**link text**](/url/)
      replacement = `[**${linkText}**](${url})`;
      // Remove the surrounding ** markers
      fixedContent = fixedContent.substring(0, startIndex - 2) + replacement + fixedContent.substring(endIndex + 2);
    } else if (hasBoldBefore) {
      // Bold text before link: **text** (/url/) -> **text** [link text](/url/)
      replacement = `[${linkText}](${url})`;
      fixedContent = fixedContent.substring(0, startIndex) + replacement + fixedContent.substring(endIndex);
    } else {
      // Regular link: (/url/) -> [link text](/url/)
      replacement = `[${linkText}](${url})`;
      fixedContent = fixedContent.substring(0, startIndex) + replacement + fixedContent.substring(endIndex);
    }
    
    fixedCount++;
  }
  
  return { content: fixedContent, fixed: fixedCount };
}

// Process a single file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: body, fixed } = fixBrokenLinks(content);
    
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
  
  // Get pages
  if (fs.existsSync(pagesDir)) {
    const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.md'));
    for (const file of pageFiles) {
      files.push(path.join(pagesDir, file));
    }
  }
  
  // Get blog posts
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
  console.log('Scanning for broken markdown links...\n');
  
  const files = getAllMarkdownFiles();
  console.log(`Found ${files.length} markdown files to check.\n`);
  
  const results = [];
  let totalFixed = 0;
  
  for (const filePath of files) {
    const result = processFile(filePath);
    results.push(result);
    if (result.fixed > 0) {
      totalFixed += result.fixed;
      console.log(`✓ ${result.file}: Fixed ${result.fixed} link(s)`);
    }
  }
  
  console.log(`\n=== Summary ===`);
  console.log(`Total files processed: ${results.length}`);
  console.log(`Files with fixes: ${results.filter(r => r.fixed > 0).length}`);
  console.log(`Total links fixed: ${totalFixed}`);
  
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

module.exports = { fixBrokenLinks, slugToLinkText, findBrokenLinks };

