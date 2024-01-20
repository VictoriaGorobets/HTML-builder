const fs = require('fs');
const path = require('node:path');

const textFileDir = path.join(__dirname, 'text.txt');

const stream = fs.createReadStream(textFileDir);

stream.on('readable', function () {
  const data = stream.read();
  console.log(data?.toString());
});
