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

// Match files to seo entries
function matchFiles(seoEntries) {
  const matches = [];
  const unmatchedFiles = [];
  
  // Process blog posts
  const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  for (const file of blogFiles) {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    
    const slug = file.replace(/\.md$/, '');
    const title = data.title || '';
    
    // Try to match by slug first, then by title
    let matched = seoEntries.find(entry => 
      entry.post_type === 'post' && (
        normalize(entry.slug) === normalize(slug) ||
        normalize(entry.post_title) === normalize(title)
      )
    );
    
    if (matched) {
      matches.push({
        filePath,
        file,
        type: 'blog',
        slug,
        title,
        focusKeyword: matched.focus_keyword,
        seoEntry: matched
      });
    } else {
      unmatchedFiles.push({
        filePath,
        file,
        type: 'blog',
        slug,
        title,
        keywords: data.keywords || []
      });
    }
  }
  
  // Process pages
  const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.md'));
  for (const file of pageFiles) {
    const filePath = path.join(pagesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    
    const slug = data.slug || '';
    const title = data.title || '';
    
    // Try to match by slug first, then by title
    let matched = seoEntries.find(entry => 
      entry.post_type === 'page' && (
        normalize(entry.slug) === normalize(slug) ||
        normalize(entry.post_title) === normalize(title)
      )
    );
    
    if (matched) {
      matches.push({
        filePath,
        file,
        type: 'page',
        slug,
        title,
        focusKeyword: matched.focus_keyword,
        seoEntry: matched
      });
    } else {
      unmatchedFiles.push({
        filePath,
        file,
        type: 'page',
        slug,
        title,
        keywords: data.keywords || []
      });
    }
  }
  
  return { matches, unmatchedFiles };
}

// Update matched files
function updateMatchedFiles(matches) {
  for (const match of matches) {
    const content = fs.readFileSync(match.filePath, 'utf8');
    const { data, content: body } = matter(content);
    
    // Update or add keywords field
    data.keywords = [match.focusKeyword];
    
    // Reconstruct frontmatter
    const updatedContent = matter.stringify(body, data);
    fs.writeFileSync(match.filePath, updatedContent, 'utf8');
    console.log(`Updated: ${match.file}`);
  }
}

// Update seo.json with unmatched files
function updateSeoJson(seoEntries, unmatchedFiles) {
  const content = fs.readFileSync(seoJsonPath, 'utf8');
  const json = JSON.parse(content);
  
  // Find the data array
  const dataEntry = json.find(entry => entry.type === 'table' && entry.data);
  
  // Create new entries for unmatched files
  const newEntries = unmatchedFiles.map(file => {
    const focusKeyword = file.keywords && file.keywords.length > 0 
      ? file.keywords[0] 
      : file.title;
    
    const permalink = `https://totalleakdetection.com/${file.slug}/`;
    
    return {
      ID: `NEW-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      post_title: file.title,
      post_type: file.type,
      post_status: 'publish',
      slug: file.slug,
      permalink: permalink,
      focus_keyword: focusKeyword
    };
  });
  
  // Add new entries to data array
  dataEntry.data = [...dataEntry.data, ...newEntries];
  
  // Write back to file
  fs.writeFileSync(seoJsonPath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Added ${newEntries.length} unmatched entries to seo.json`);
}

// Main execution
try {
  console.log('Parsing seo.json...');
  const seoEntries = parseSeoJson();
  console.log(`Found ${seoEntries.length} entries in seo.json`);
  
  console.log('Matching files...');
  const { matches, unmatchedFiles } = matchFiles(seoEntries);
  console.log(`Matched ${matches.length} files`);
  console.log(`Found ${unmatchedFiles.length} unmatched files`);
  
  console.log('Updating matched files...');
  updateMatchedFiles(matches);
  
  if (unmatchedFiles.length > 0) {
    console.log('Adding unmatched files to seo.json...');
    updateSeoJson(seoEntries, unmatchedFiles);
  }
  
  console.log('Done!');
} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}

