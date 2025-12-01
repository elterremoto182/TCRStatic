const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const pagesDir = path.join(process.cwd(), 'content/pages');
const blogDir = path.join(process.cwd(), 'content/blog');

// Get all pages
function getAllPages() {
  const pages = [];
  if (!fs.existsSync(pagesDir)) return pages;
  
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.md'));
  
  for (const file of files) {
    try {
      const fullPath = path.join(pagesDir, file);
      const content = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(content);
      const slug = (data.slug || '').replace(/^\/+|\/+$/g, '');
      if (slug) {
        pages.push({
          file,
          slug,
          title: data.title || '',
          fullPath,
          type: 'page'
        });
      }
    } catch (error) {
      console.error(`Error reading page ${file}:`, error.message);
    }
  }
  
  return pages;
}

// Get all blog posts
function getAllPosts() {
  const posts = [];
  if (!fs.existsSync(blogDir)) return posts;
  
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  
  for (const file of files) {
    try {
      const fullPath = path.join(blogDir, file);
      const content = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(content);
      const slug = file.replace('.md', '');
      posts.push({
        file,
        slug,
        title: data.title || '',
        fullPath,
        type: 'post'
      });
    } catch (error) {
      console.error(`Error reading post ${file}:`, error.message);
    }
  }
  
  return posts;
}

// Find all links in markdown content
function findLinks(content) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [];
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[2];
    // Only internal links (not starting with http, https, tel:, mailto:, #, or /wp-content)
    if (!href.match(/^(https?:\/\/|tel:|mailto:|#|\/wp-content)/)) {
      // Normalize the link - remove leading/trailing slashes
      let normalized = href.replace(/^\/+|\/+$/g, '');
      // Handle links that might have query params or anchors
      normalized = normalized.split('?')[0].split('#')[0];
      links.push(normalized);
    }
  }
  
  return links;
}

// Check if a slug is linked anywhere
function isLinked(slug, allContent) {
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, '');
  
  for (const { content, file } of allContent) {
    const links = findLinks(content);
    // Check for exact match or if the link ends with the slug
    if (links.some(link => {
      const linkNormalized = link.replace(/^\/+|\/+$/g, '');
      return linkNormalized === normalizedSlug || 
             linkNormalized.endsWith('/' + normalizedSlug) ||
             normalizedSlug.endsWith('/' + linkNormalized);
    })) {
      return true;
    }
  }
  
  return false;
}

// Add a link to a page/post content
function addLinkToContent(content, targetSlug, targetTitle) {
  // Check if content already has a link to this slug
  const links = findLinks(content);
  const normalizedSlug = targetSlug.replace(/^\/+|\/+$/g, '');
  
  if (links.some(link => link === normalizedSlug || link.endsWith('/' + normalizedSlug))) {
    return content; // Already linked
  }
  
  // Find a good place to add the link - try to add at the end before any existing links section
  // Or add a "Related Links" section at the end
  
  // Check if there's already a "Related Links" or similar section
  const relatedSectionRegex = /(?:^|\n)(?:##?\s+)?(?:Related|See Also|Links|More Information)[^\n]*\n/i;
  const hasRelatedSection = relatedSectionRegex.test(content);
  
  if (hasRelatedSection) {
    // Add to existing section
    const match = content.match(relatedSectionRegex);
    if (match) {
      const insertPos = match.index + match[0].length;
      const linkText = `- [${targetTitle}](/${normalizedSlug})`;
      return content.slice(0, insertPos) + linkText + '\n' + content.slice(insertPos);
    }
  }
  
  // Add a new "Related Links" section at the end
  const linkText = `\n\n## Related Links\n\n- [${targetTitle}](/${normalizedSlug})`;
  return content + linkText;
}

// Main function
function main() {
  console.log('Analyzing pages and posts for internal links...\n');
  
  const pages = getAllPages();
  const posts = getAllPosts();
  const allItems = [...pages, ...posts];
  
  console.log(`Found ${pages.length} pages and ${posts.length} posts\n`);
  
  // Read all content
  const allContent = [];
  
  for (const page of pages) {
    try {
      const content = fs.readFileSync(page.fullPath, 'utf8');
      const { content: body } = matter(content);
      allContent.push({ 
        content: body, 
        file: page.file, 
        slug: page.slug, 
        type: 'page',
        fullPath: page.fullPath
      });
    } catch (error) {
      console.error(`Error reading ${page.file}:`, error.message);
    }
  }
  
  for (const post of posts) {
    try {
      const content = fs.readFileSync(post.fullPath, 'utf8');
      const { content: body } = matter(content);
      allContent.push({ 
        content: body, 
        file: post.file, 
        slug: post.slug, 
        type: 'post',
        fullPath: post.fullPath
      });
    } catch (error) {
      console.error(`Error reading ${post.file}:`, error.message);
    }
  }
  
  // Find items without links
  const itemsWithoutLinks = [];
  
  for (const item of allItems) {
    // Skip home page and reserved routes
    const normalizedSlug = item.slug.replace(/^\/+|\/+$/g, '');
    if (normalizedSlug === 'home' || normalizedSlug === 'landing-page-preview') {
      continue;
    }
    
    if (!isLinked(normalizedSlug, allContent)) {
      itemsWithoutLinks.push(item);
    }
  }
  
  console.log(`Found ${itemsWithoutLinks.length} items without internal links:\n`);
  itemsWithoutLinks.forEach(item => {
    console.log(`  - ${item.type}: ${item.title} (${item.slug})`);
  });
  
  if (itemsWithoutLinks.length === 0) {
    console.log('\n✓ All pages and posts have internal links!');
    return;
  }
  
  // Add links to items that don't have them
  // We'll add links FROM other pages/posts TO the unlinked items
  console.log('\nAdding internal links...\n');
  
  let addedCount = 0;
  // Track how many links we've added to each candidate to avoid overloading
  const candidateLinkCounts = new Map();
  const MAX_LINKS_PER_PAGE = 5; // Limit links per page to avoid making pages too long
  
  // Helper to check if a file is too large to process
  function isFileTooLarge(fullPath) {
    try {
      const stats = fs.statSync(fullPath);
      return stats.size > 1024 * 1024; // 1MB limit
    } catch {
      return true;
    }
  }
  
  // Helper to get candidates with rotation
  function getCandidates(unlinkedItem, allContent) {
    const candidates = [];
    const MAX_FILE_SIZE = 1024 * 1024; // 1MB
    
    if (unlinkedItem.slug.includes('restoration-services')) {
      // Location pages - prefer service pages
      candidates.push(...allContent.filter(c => 
        c.slug !== unlinkedItem.slug &&
        c.type === 'page' && 
        c.slug.startsWith('services/') &&
        !isFileTooLarge(c.fullPath)
      ));
      // Then about, then home
      const about = allContent.find(c => c.slug === 'about' && !isFileTooLarge(c.fullPath));
      if (about) candidates.push(about);
      const home = allContent.find(c => c.slug === 'home' && !isFileTooLarge(c.fullPath));
      if (home) candidates.push(home);
    } else if (unlinkedItem.slug.startsWith('services/')) {
      // Service pages - prefer other service pages, then about, then home
      candidates.push(...allContent.filter(c => 
        c.slug !== unlinkedItem.slug &&
        c.type === 'page' && 
        c.slug.startsWith('services/') &&
        !isFileTooLarge(c.fullPath)
      ));
      const about = allContent.find(c => c.slug === 'about' && !isFileTooLarge(c.fullPath));
      if (about) candidates.push(about);
      const home = allContent.find(c => c.slug === 'home' && !isFileTooLarge(c.fullPath));
      if (home) candidates.push(home);
    } else if (unlinkedItem.type === 'post') {
      // Blog posts - prefer other blog posts, then about, then home
      candidates.push(...allContent.filter(c => 
        c.slug !== unlinkedItem.slug &&
        c.type === 'post' &&
        !isFileTooLarge(c.fullPath)
      ));
      const about = allContent.find(c => c.slug === 'about' && !isFileTooLarge(c.fullPath));
      if (about) candidates.push(about);
      const home = allContent.find(c => c.slug === 'home' && !isFileTooLarge(c.fullPath));
      if (home) candidates.push(home);
    } else {
      // Other pages - prefer about, then home, then service pages
      const about = allContent.find(c => c.slug === 'about' && !isFileTooLarge(c.fullPath));
      if (about) candidates.push(about);
      const home = allContent.find(c => c.slug === 'home' && !isFileTooLarge(c.fullPath));
      if (home) candidates.push(home);
      candidates.push(...allContent.filter(c => 
        c.slug !== unlinkedItem.slug &&
        c.type === 'page' && 
        c.slug.startsWith('services/') &&
        !isFileTooLarge(c.fullPath)
      ));
    }
    
    return candidates;
  }
  
  for (const unlinkedItem of itemsWithoutLinks) {
    const candidates = getCandidates(unlinkedItem, allContent);
    
    // Find a candidate that hasn't reached the link limit
    let bestCandidate = candidates.find(c => {
      const count = candidateLinkCounts.get(c.slug) || 0;
      return count < MAX_LINKS_PER_PAGE;
    });
    
    // If all candidates are at limit, use the one with the fewest links
    if (!bestCandidate && candidates.length > 0) {
      bestCandidate = candidates.reduce((best, current) => {
        const bestCount = candidateLinkCounts.get(best.slug) || 0;
        const currentCount = candidateLinkCounts.get(current.slug) || 0;
        return currentCount < bestCount ? current : best;
      });
    }
    
    if (bestCandidate) {
      try {
        const candidateFullPath = bestCandidate.fullPath;
        
        if (!candidateFullPath || !fs.existsSync(candidateFullPath)) {
          console.log(`⚠ Could not find file for candidate ${bestCandidate.slug}`);
          continue;
        }
        
        const fileContent = fs.readFileSync(candidateFullPath, 'utf8');
        const { data, content: body } = matter(fileContent);
        
        const updatedContent = addLinkToContent(body, unlinkedItem.slug, unlinkedItem.title);
        
        // Reconstruct the file - preserve original frontmatter format
        // Use string concatenation instead of replace to avoid "Invalid string length" errors
        const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---\n/);
        if (frontmatterMatch) {
          const frontmatter = `---\n${frontmatterMatch[1]}\n---\n\n`;
          const newFileContent = frontmatter + updatedContent;
          fs.writeFileSync(candidateFullPath, newFileContent, 'utf8');
        } else {
          // Fallback: reconstruct frontmatter
          const frontmatter = `---\n${Object.entries(data).map(([key, value]) => {
            if (Array.isArray(value)) {
              return `${key}: ${JSON.stringify(value)}`;
            } else if (typeof value === 'string' && value.includes('\n')) {
              return `${key}: |\n${value.split('\n').map(line => '  ' + line).join('\n')}`;
            } else if (typeof value === 'string') {
              return `${key}: "${value.replace(/"/g, '\\"')}"`;
            }
            return `${key}: ${value}`;
          }).join('\n')}\n---\n\n`;
          const newFileContent = frontmatter + updatedContent;
          fs.writeFileSync(candidateFullPath, newFileContent, 'utf8');
        }
        
        // Update link count
        const currentCount = candidateLinkCounts.get(bestCandidate.slug) || 0;
        candidateLinkCounts.set(bestCandidate.slug, currentCount + 1);
        
        console.log(`✓ Added link to ${unlinkedItem.title} (/${unlinkedItem.slug}) from ${bestCandidate.file}`);
        addedCount++;
      } catch (error) {
        console.error(`✗ Error adding link to ${unlinkedItem.title} from ${bestCandidate.file}:`, error.message);
      }
    } else {
      console.log(`⚠ Could not find a good candidate to link to ${unlinkedItem.title}`);
    }
  }
  
  console.log(`\n✓ Added ${addedCount} internal links`);
}

main();

