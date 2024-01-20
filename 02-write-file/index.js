const fs = require('fs');
const path = require('node:path');
const readline = require('readline');

const textFileDir = path.join(__dirname, 'text.txt');
const txtStream = fs.createWriteStream(textFileDir);

function closeAction() {
  console.log('Buy!');
  txtStream.close();
  process.exit(0);
}
function readFromConsole() {
  const readlineStream = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readlineStream.setPrompt('Enter good movie: ');
  readlineStream.prompt();

  readlineStream
    .on('line', function (movie) {
      if (movie === 'exit') {
        readlineStream.close();
      }
      txtStream.write(movie + '\n');
      readlineStream.prompt();
    })
    .on('close', closeAction);
}

process.on('SIGINT', closeAction);

readFromConsole();
