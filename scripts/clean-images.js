const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images');
const categories = ['hero', 'services', 'team', 'testimonials', 'badges', 'cta', 'gallery'];

console.log('🗑️  Removing all existing images...\n');

categories.forEach(category => {
  const dir = path.join(PUBLIC_DIR, category);

  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      if (file.endsWith('.jpeg') || file.endsWith('.jpg')) {
        const filepath = path.join(dir, file);
        fs.unlinkSync(filepath);
        console.log(`✅ Deleted ${category}/${file}`);
      }
    });
  }
});

console.log('\n✨ Done! All images have been removed.');
