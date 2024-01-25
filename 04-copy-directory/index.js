const fs = require('fs');
const path = require('path');

(function copyDir() {
  fs.readdir(
    path.join(__dirname, 'files'),
    { withFileTypes: true },
    (error, files) => {
      files
        .filter((file) => file.isFile() && !file.name.startsWith('.'))
        .forEach((file) => {
          const filePath = file.path + '/' + file.name;
          const distFilePath = './files-copy/' + file.name;
          fs.copyFile(filePath, distFilePath, (err) => console.error(err));
        });
    },
  );
})();
