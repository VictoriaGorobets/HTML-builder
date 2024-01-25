const fs = require('fs');
const path = require('node:path');

const distDir = path.join(__dirname, 'project-dist');
!fs.existsSync(distDir) ? fs.mkdirSync(distDir) : false;
const bundleFilePath = path.join(distDir, 'bundle.css');
const bundleStream = fs.createWriteStream(bundleFilePath);
fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  (error, files) => {
    if (error) {
      console.error(error);
      return;
    }
    const fileDirs = files
      .filter((file) => file.isFile() && file.name.endsWith('.css'))
      .map((file) => path.join(__dirname, 'styles', file.name));
    fileDirs.forEach((fileDir) => {
      const stream = fs.createReadStream(fileDir);
      stream.on('readable', function () {
        const data = stream.read()?.toString();
        if (data) {
          bundleStream.write(data);
        }
      });
    });
  },
);
