const fs = require('fs');
const path = require('path');

const nextDir = path.join(process.cwd(), '.next');

if (fs.existsSync(nextDir)) {
  // 1. Delete the cache directory
  const cacheDir = path.join(nextDir, 'cache');
  if (fs.existsSync(cacheDir)) {
    fs.rmSync(cacheDir, { recursive: true, force: true });
    console.log('Successfully deleted .next/cache');
  }

  // 2. Delete all .map files recursively
  function deleteMapFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        deleteMapFiles(fullPath);
      } else if (fullPath.endsWith('.map')) {
        fs.unlinkSync(fullPath);
      }
    }
  }
  
  deleteMapFiles(nextDir);
  console.log('Successfully deleted all .map files in .next');
}
