const fs = require('fs');
const path = require('node:path');

fs.readdir('./secret-folder', { withFileTypes: true }, (error, files) => {
  files
    .filter((file) => file.isFile() && !file.name.startsWith('.'))
    .forEach((file) => {
      const filePath = file.path + '/' + file.name;
      fs.stat(filePath, (err, stats) => {
        const extension = path.extname(file.name).slice(1);
        const name = file.name.split('.' + extension)[0];
        const size = stats.size;
        console.log(`${name} - ${extension} - ${size}`);
      });
    });
});
