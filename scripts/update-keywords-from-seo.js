const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const seoJsonPath = path.join(__dirname, '../config/seo.json');
const blogDir = path.join(__dirname, '../content/blog');
const pagesDir = path.join(__dirname, '../content/pages');

// Parse seo.json
function parseSeoJson() {
  const content = fs.readFileSync(seoJsonPath, 'utf8');
  const json = JSON.parse(content);
  
  // Find the data array
  const dataEntry = json.find(entry => entry.type === 'table' && entry.data);
  if (!dataEntry || !dataEntry.data) {
    throw new Error('Could not find data array in seo.json');
  }
  
  return dataEntry.data;
}

// Normalize strings for comparison
function normalize(str) {
  return str.toLowerCase().trim();
}

// Match and update files
function updateFiles(seoEntries) {
  let updatedCount = 0;
  
  // Process blog posts
  const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  for (const file of blogFiles) {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: body } = matter(content);
    
    const slug = file.replace(/\.md$/, '');
    const title = data.title || '';
    
    // Try to match by slug first, then by title
    // Handle both "post" and "blog" post types
    let matched = seoEntries.find(entry => 
      (entry.post_type === 'post' || entry.post_type === 'blog') && (
        normalize(entry.slug) === normalize(slug) ||
        normalize(entry.post_title) === normalize(title)
      )
    );
    
    if (matched && matched.focus_keyword) {
      // Update or add keywords field
      data.keywords = [matched.focus_keyword];
      
      // Reconstruct frontmatter
      let updatedContent = matter.stringify(body, data);
      
      // Convert YAML array format to inline array format for keywords
      // Handle both quoted and unquoted values
      updatedContent = updatedContent.replace(
        /^keywords:\s*\n\s*-\s*(.+)$/m,
        (match, keyword) => {
          const trimmed = keyword.trim();
          // Remove existing quotes if present
          const unquoted = trimmed.replace(/^["']|["']$/g, '');
          // Escape quotes in the keyword
          const escaped = unquoted.replace(/"/g, '\\"');
          return `keywords: ["${escaped}"]`;
        }
      );
      
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`Updated blog: ${file} -> "${matched.focus_keyword}"`);
      updatedCount++;
    }
  }
  
  // Process pages
  const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.md'));
  for (const file of pageFiles) {
    const filePath = path.join(pagesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: body } = matter(content);
    
    const slug = data.slug || '';
    const title = data.title || '';
    
    // Try to match by slug first, then by title
    let matched = seoEntries.find(entry => 
      entry.post_type === 'page' && (
        normalize(entry.slug) === normalize(slug) ||
        normalize(entry.post_title) === normalize(title)
      )
    );
    
    if (matched && matched.focus_keyword) {
      // Update or add keywords field
      data.keywords = [matched.focus_keyword];
      
      // Reconstruct frontmatter
      let updatedContent = matter.stringify(body, data);
      
      // Convert YAML array format to inline array format for keywords
      // Handle both quoted and unquoted values
      updatedContent = updatedContent.replace(
        /^keywords:\s*\n\s*-\s*(.+)$/m,
        (match, keyword) => {
          const trimmed = keyword.trim();
          // Remove existing quotes if present
          const unquoted = trimmed.replace(/^["']|["']$/g, '');
          // Escape quotes in the keyword
          const escaped = unquoted.replace(/"/g, '\\"');
          return `keywords: ["${escaped}"]`;
        }
      );
      
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`Updated page: ${file} -> "${matched.focus_keyword}"`);
      updatedCount++;
    }
  }
  
  return updatedCount;
}

// Main execution
try {
  console.log('Parsing seo.json...');
  const seoEntries = parseSeoJson();
  console.log(`Found ${seoEntries.length} entries in seo.json`);
  
  console.log('Updating files with keywords from seo.json...');
  const updatedCount = updateFiles(seoEntries);
  
  console.log(`\nDone! Updated ${updatedCount} files.`);
} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}

