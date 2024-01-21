const fs = require('fs');
const path = require('node:path');

const bundleFilePath = path.join(__dirname, '/project-dist/bundle.css');
const bundleStream = fs.createWriteStream(bundleFilePath);
fs.readdir('./styles', { withFileTypes: true }, (error, files) => {
  const fileDirs = files
    .filter((file) => file.isFile() && file.name.endsWith('.css'))
    .map((file) => file.path + '/' + file.name);

  bundleStream.write('');
  fileDirs.forEach((fileDir) => {
    const textFileDir = path.join(__dirname, fileDir);
    const stream = fs.createReadStream(textFileDir);
    stream.on('readable', function () {
      const data = stream.read()?.toString();
      if (data) {
        bundleStream.write(data);
      }
    });
  });
});
