const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory and dist directory
app.use(express.static(__dirname));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// Default route - web component approach
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'use-todo-web-component.html'));
});

// Direct embed approach
app.get('/direct', (req, res) => {
  res.sendFile(path.join(__dirname, 'index-with-direct-embed.html'));
});

// Simple component approach
app.get('/simple', (req, res) => {
  res.sendFile(path.join(__dirname, 'index-simple-component.html'));
});

// Handle 404s
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('\nAvailable routes:');
  console.log(`- Web Component approach: http://localhost:${PORT}/`);
  console.log(`- Direct Embed approach: http://localhost:${PORT}/direct`);
  console.log(`- Simple Component approach: http://localhost:${PORT}/simple`);
  
  // Log available files
  console.log('\nAvailable files:');
  const files = fs.readdirSync(__dirname)
    .filter(file => !file.startsWith('.') && !fs.statSync(path.join(__dirname, file)).isDirectory());
  files.forEach(file => console.log(`- ${file}`));
  
  if (fs.existsSync(path.join(__dirname, 'dist'))) {
    console.log('\nDist folder contents:');
    const distFiles = fs.readdirSync(path.join(__dirname, 'dist'))
      .filter(file => !file.startsWith('.'));
    distFiles.forEach(file => console.log(`- dist/${file}`));
    
    // Check for _expo directory
    const expoPath = path.join(__dirname, 'dist', '_expo');
    if (fs.existsSync(expoPath)) {
      console.log('\nDist/_expo contents:');
      function listDirRecursive(dir, prefix = '') {
        const files = fs.readdirSync(dir)
          .filter(file => !file.startsWith('.'));
        
        files.forEach(file => {
          const filePath = path.join(dir, file);
          const relPath = path.relative(__dirname, filePath);
          const stat = fs.statSync(filePath);
          
          if (stat.isDirectory()) {
            console.log(`- ${relPath}/`);
            listDirRecursive(filePath, prefix + '  ');
          } else {
            console.log(`  ${prefix}${file} (${(stat.size / 1024).toFixed(1)}KB)`);
          }
        });
      }
      
      listDirRecursive(expoPath);
    }
  }
}); 