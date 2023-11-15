import * as readline from 'readline';
import runCommand from './runCommand';

const initApp = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.setPrompt('welcome to library management system, please input your command (input exit to exit):');

  rl.prompt();

  rl.on('line', (line: string) => {
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

export default initApp;