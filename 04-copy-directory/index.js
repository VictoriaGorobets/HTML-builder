const fs = require('fs');
const path = require('path');

(function copyDir() {
  const sourceDir = path.join(__dirname, 'files');
  const destDir = path.join(__dirname, 'files-copy');
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
  }
  fs.mkdirSync(destDir);
  fs.readdir(sourceDir, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.error(error);
      return;
    }
    files
      .filter((file) => file.isFile() && !file.name.startsWith('.'))
      .forEach((file) => {
        const sourceFilePath = path.join(sourceDir, file.name);
        const destFilePath = path.join(destDir, file.name);
        fs.copyFile(sourceFilePath, destFilePath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
  });
})();
