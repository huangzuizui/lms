const { program } = require('commander');
const commandLineToArray = require('./utils/commandLineToArray').default;

const runCommand = (commandLine) => {
  const commandArgs = commandLineToArray(commandLine);
  program.command('register <role> <name> <password>')
  .description('Register a new admin with name and password')
  .action((role, name, password) => {
    // todo: register
    console.log(`${role} ${name} successfully registered.`);
  });

  program.command('login <name> <password>')
  .description('login with name and password')
  .action((name, password) => {
    // todo: login
    const role = 'Admin';
    console.log(`${role} ${name} successfully logged in.`);
  });

  program.command('list')
  .description('list all books')
  .action(() => {
    // todo: list all books
    console.log(`Book List:`);
    console.log(`Clean Code - Robert C. Martin - Inventory: 5`);
  });


  program.command('search <bookName> <author>')
  .description('Search book by book name and author')
  .action((bookName, author) => {
    // todo: search book
    const inventory = 5;
    console.log(`${bookName} - ${author} - Inventory: ${inventory}`);
  });

  program.command('borrow <bookName> <author>')
  .description('Borrow book by book name and author')
  .action((bookName, author) => {
    console.log(`Book "${bookName}" successfully borrowed.`);
  });

  program.command('delete <bookName> <author>')
  .description('Delete book by name and author')
  .action(() => {
    // todo: delete book
    console.log(`Cannot delete book "Clean Code" because it is currently borrowed.`);
  });

  program.command('return <bookName> <author>')
  .description('Return book by book name and author')
  .action((bookName, author) => {
    // todo: return book
    console.log(`Book "${bookName}" successfully returned.`);
  });

  program.command('add  <bookName> <author> <amount>')
  .description('Add book inventory by book name and author')
  .action((bookName, author, amount) => {
    // todo: add inventory
    const inventory = 8 + parseInt(amount);
    console.log(`Book "${bookName}" inventory successfully updated, new inventory:${inventory}`);
  });

  program.parse(['','', ...commandArgs]);
}

exports.default = runCommand;