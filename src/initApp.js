const readline = require('readline');
const runCommand = require('./runCommand').default;

const initApp = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.setPrompt('welcome to library management system, please input your command (input exit to exit):');

  rl.prompt();

  rl.on('line', (line) => {
    if (line.toLowerCase() === 'exit') {
      rl.close();
    } else {
      runCommand(line);
      rl.prompt();
    }
  }).on('close', () => {
    console.log('see you next time!');
    process.exit(0);
  });
}

exports.default = initApp;