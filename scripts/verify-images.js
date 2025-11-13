#!/usr/bin/env node

/**
 * Script to verify that all image references in content files
 * have corresponding files in the public directory
 */

const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../content');
const publicDir = path.join(__dirname, '../public');

// Find all markdown files
function findMarkdownFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Extract image paths from markdown content
function extractImagePaths(content) {
  const imageRegex = /!\[.*?\]\(([^)]+)\)/g;
  const paths = [];
  let match;
  
  while ((match = imageRegex.exec(content)) !== null) {
    const imagePath = match[1];
    // Skip external URLs
    if (!imagePath.startsWith('http')) {
      paths.push(imagePath);
    }
  }
  
  return paths;
}

// Check if image file exists
function imageExists(imagePath) {
  // Remove leading slash for path joining
  const relativePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  const fullPath = path.join(publicDir, relativePath);
  return fs.existsSync(fullPath);
}

// Main verification
console.log('🔍 Verifying image references...\n');

const markdownFiles = findMarkdownFiles(contentDir);
let totalImages = 0;
let missingImages = 0;
const missing = [];

for (const file of markdownFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const imagePaths = extractImagePaths(content);
  
  for (const imagePath of imagePaths) {
    totalImages++;
    if (!imageExists(imagePath)) {
      missingImages++;
      const relativeFile = path.relative(contentDir, file);
      missing.push({
        file: relativeFile,
        image: imagePath
      });
    }
  }
}

// Report results
console.log(`📊 Summary:`);
console.log(`   Total images referenced: ${totalImages}`);
console.log(`   Missing images: ${missingImages}`);
console.log(`   ✅ Found images: ${totalImages - missingImages}\n`);

if (missing.length > 0) {
  console.log('❌ Missing images:\n');
  missing.forEach(({ file, image }) => {
    console.log(`   ${file}`);
    console.log(`   → ${image}\n`);
  });
  process.exit(1);
} else {
  console.log('✅ All image references have corresponding files!\n');
  console.log('📝 Note: External URLs (http/https) are skipped from verification.\n');
  process.exit(0);
}

