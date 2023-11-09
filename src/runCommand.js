const { program } = require('commander');
const commandLineToArray = require('./utils/commandLineToArray').default;
const actionManager = require('./actions').default;

const runCommand = (commandLine) => {
  const commandArgs = commandLineToArray(commandLine);
  program.command('register <role> <name> <password>')
  .description('Register a new admin with name and password')
  .action(actionManager.run('register'));

  program.command('login <name> <password>')
  .description('login with name and password')
  .action(actionManager.run('login'));

  program.command('logout')
  .description('logout')
  .action(actionManager.run('logout'));

  program.command('list')
  .description('list all books')
  .action(actionManager.run('listBook'));

  program.command('search <bookName> <author>')
  .description('Search book by book name and author')
  .action(actionManager.run('searchBook'));

  program.command('borrow <bookName> <author>')
  .description('Borrow book by book name and author')
  .action(actionManager.run('borrowBook'));

  program.command('delete <bookName> <author>')
  .description('Delete book by name and author')
  .action(actionManager.run('deleteBook'));

  program.command('return <bookName> <author>')
  .description('Return book by book name and author')
  .action(actionManager.run('returnBook'));

  program.command('add  <bookName> <author> <amount>')
  .description('Add book inventory by book name and author')
  .action(actionManager.run('addBook'));

  program.parse(['', '', ...commandArgs]);
}

exports.default = runCommand;