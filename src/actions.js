const ActionManager = require('./ActionManager').default;
const Library = require('./Library').default;

const actionManager = new ActionManager({
  library: new Library()
});

// access control
actionManager.addAction((ctx, next) => {
  const userActions = ['listBook', 'borrowBook', 'returnBook'];
  const adminOnlyActions = ['addBook', 'removeBook'];
  if ([...userActions, ...adminOnlyActions].includes(ctx.actionType) && !ctx.currentUser) {
    console.log('Please login first');
    return;
  }
  if (adminOnlyActions.includes(ctx.actionType) && ctx.currentUser.role !== 'admin') {
    console.log('Permission denied');
    return;
  }
  next();
});

// register account action
actionManager.addAction((ctx, next) => {
  if (ctx.actionType !== 'register') {
    return next();
  }
  const [role, name, password] = ctx.args;
  const res = ctx.currentUser = ctx.library.accounts.register({ role, name, password });
  if (res instanceof Error) {
    console.log(res.message);
    return;
  }
  console.log(`${res.role} ${res.name} successfully registered.`);
});

// login account action
actionManager.addAction((ctx, next) => {
  if (ctx.actionType !== 'login') {
    return next();
  }
  const [name, password] = ctx.args;
  const res = ctx.library.accounts.login({ name, password });
  if (res instanceof Error) {
    console.log(res.message);
    return;
  }
  ctx.currentUser = res;
  console.log(`${res.role} ${res.name} successfully logged in.`);
});

// logout account action
actionManager.addAction((ctx, next) => {
  if (ctx.actionType !== 'logout') {
    return next();
  }
  if (!ctx.currentUser) {
    console.log(`No account logged in yet.`);
    return;
  }
  const logoutAccount = ctx.currentUser;
  ctx.currentUser = undefined;
  console.log(`${logoutAccount.role} ${logoutAccount.name} successfully logged out.`);
});

// list book action
actionManager.addAction((ctx, next) => {
  if (ctx.actionType !== 'listBook') {
    return next();
  }
  const books = ctx.library.books.list();
  if (books.length === 0) {
    console.log(`No book in library`);
    return;
  }
  console.log('Book List:');
  books.forEach(book => {
    console.log(`${book.bookName} - ${book.author} - Inventory: ${book.inventory}`);
  });
});

// search book action
actionManager.addAction((ctx, next) => {
  if (ctx.actionType !== 'searchBook') {
    return next();
  }
  const [bookName, author] = ctx.args;
  const books = ctx.library.books.search({ bookName, author });
  if (!books || books.length === 0) {
    console.log(`Cannot find book "${bookName}" by ${author}`);
    return;
  }
  books.forEach(book => {
    console.log(`${book.bookName} - ${book.author} - Inventory: ${book.inventory}`);
  });
});

// borrow book action
actionManager.addAction((ctx, next) => {
  if (ctx.actionType !== 'borrowBook') {
    return next();
  }
  const [bookName, author] = ctx.args;
  const res = ctx.library.borrowBook({ userId: ctx.currentUser.id, bookName, author });
  if (res instanceof Error) {
    console.log(res.message);
    return;
  }
  console.log(`Book "${res.bookName}" successfully borrowed.`);
});

// return book action
actionManager.addAction((ctx, next) => {
  if (ctx.actionType !== 'returnBook') {
    return next();
  }
  const [bookName, author] = ctx.args;
  const res = ctx.library.returnBook({ userId: ctx.currentUser.id, bookName, author });
  if (res instanceof Error) {
    console.log(res.message);
    return;
  }
  console.log(`Book "${res.bookName}" successfully returned.`);
});

// delete book action
actionManager.addAction((ctx, next) => {
  if (ctx.actionType !== 'deleteBook') {
    return next();
  }
  const [bookName, author] = ctx.args;
  const res = ctx.library.deleteBook({ userId: ctx.currentUser.id, bookName, author });
  if (res instanceof Error) {
    console.log(res.message);
    return;
  }
  console.log(`Book "${res.bookName}" successfully deleted.`);
});

// add book action
actionManager.addAction((ctx, next) => {
  if (ctx.actionType !== 'addBook') {
    return next();
  }
  const [bookName, author, amount] = ctx.args;
  const res = ctx.library.books.add({ bookName, author, amount: Number(amount) });
  if (res instanceof Error) {
    console.log(res.message);
    return;
  }
  if (res.type === 'add') {
    console.log(`Book "${res.book.bookName}" by ${res.book.author} added successfully, inventory: ${res.book.inventory}.`);
  } else {
    console.log(`Book "${res.book.bookName}" inventory successfully updated, new inventory:${res.book.inventory}`);
  }
});


exports.default = actionManager;