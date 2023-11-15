"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var ActionManager_1 = require("./ActionManager");
var Library_1 = require("./Library");
var actionManager = new ActionManager_1.default({
    library: new Library_1.default()
});
// access control
actionManager.addAction(function (ctx, next) {
    var userActions = ['listBook', 'borrowBook', 'returnBook'];
    var adminOnlyActions = ['addBook', 'removeBook'];
    if (ctx.actionType && __spreadArray(__spreadArray([], userActions, true), adminOnlyActions, true).includes(ctx.actionType) && !ctx.currentUser) {
        console.log('Please login first');
        return;
    }
    if (ctx.actionType && adminOnlyActions.includes(ctx.actionType) && ctx.currentUser.role !== 'admin') {
        console.log('Permission denied');
        return;
    }
    return next();
});
// register account action
actionManager.addAction(function (ctx, next) {
    if (ctx.actionType !== 'register') {
        return next();
    }
    var _a = ctx.args, role = _a[0], name = _a[1], password = _a[2];
    var res = ctx.currentUser = ctx.library.accounts.register({ role: role, name: name, password: password });
    if (res instanceof Error) {
        console.log(res.message);
        return;
    }
    console.log("".concat(res.role, " ").concat(res.name, " successfully registered."));
});
// login account action
actionManager.addAction(function (ctx, next) {
    if (ctx.actionType !== 'login') {
        return next();
    }
    var _a = ctx.args, name = _a[0], password = _a[1];
    var res = ctx.library.accounts.login({ name: name, password: password });
    if (res instanceof Error) {
        console.log(res.message);
        return;
    }
    ctx.currentUser = res;
    console.log("".concat(res.role, " ").concat(res.name, " successfully logged in."));
});
// logout account action
actionManager.addAction(function (ctx, next) {
    if (ctx.actionType !== 'logout') {
        return next();
    }
    if (!ctx.currentUser) {
        console.log("No account logged in yet.");
        return;
    }
    var logoutAccount = ctx.currentUser;
    ctx.currentUser = undefined;
    console.log("".concat(logoutAccount.role, " ").concat(logoutAccount.name, " successfully logged out."));
});
// list book action
actionManager.addAction(function (ctx, next) {
    if (ctx.actionType !== 'listBook') {
        return next();
    }
    var books = ctx.library.books.list();
    if (books.length === 0) {
        console.log("No book in library!");
        return;
    }
    console.log('Book List:');
    books.forEach(function (book) {
        console.log("".concat(book.bookName, " - ").concat(book.author, " - Inventory: ").concat(book.inventory));
    });
});
// search book action
actionManager.addAction(function (ctx, next) {
    if (ctx.actionType !== 'searchBook') {
        return next();
    }
    var _a = ctx.args, bookName = _a[0], author = _a[1];
    var books = ctx.library.books.search({ bookName: bookName, author: author });
    if (!books || books.length === 0) {
        console.log("Cannot find book \"".concat(bookName, "\" by ").concat(author));
        return;
    }
    books.forEach(function (book) {
        console.log("".concat(book.bookName, " - ").concat(book.author, " - Inventory: ").concat(book.inventory));
    });
});
// borrow book action
actionManager.addAction(function (ctx, next) {
    if (ctx.actionType !== 'borrowBook') {
        return next();
    }
    var _a = ctx.args, bookName = _a[0], author = _a[1];
    var res = ctx.library.borrowBook({ userId: ctx.currentUser.id, bookName: bookName, author: author });
    if (res instanceof Error) {
        console.log(res.message);
        return;
    }
    console.log("Book \"".concat(res.bookName, "\" successfully borrowed."));
});
// return book action
actionManager.addAction(function (ctx, next) {
    if (ctx.actionType !== 'returnBook') {
        return next();
    }
    var _a = ctx.args, bookName = _a[0], author = _a[1];
    var borrowRecord = ctx.library.borrowRecords.data.find({ userId: ctx.currentUser.id, bookName: bookName, author: author })[0];
    if (!borrowRecord) {
        console.log("Cannot find book \"".concat(bookName, "\" by ").concat(author, " in your borrow record"));
        return;
    }
    var res = ctx.library.returnBook({ userId: ctx.currentUser.id, bookName: bookName, author: author });
    if (res instanceof Error) {
        console.log(res.message);
        return;
    }
    console.log("Book \"".concat(res.bookName, "\" successfully returned."));
});
// delete book action
actionManager.addAction(function (ctx, next) {
    if (ctx.actionType !== 'deleteBook') {
        return next();
    }
    var _a = ctx.args, bookName = _a[0], author = _a[1];
    var res = ctx.library.deleteBook({ userId: ctx.currentUser.id, bookName: bookName, author: author });
    if (res instanceof Error) {
        console.log(res.message);
        return;
    }
    console.log("Book \"".concat(res.bookName, "\" successfully deleted."));
});
// add book action
actionManager.addAction(function (ctx, next) {
    if (ctx.actionType !== 'addBook') {
        return next();
    }
    var _a = ctx.args, bookName = _a[0], author = _a[1], amount = _a[2];
    var res = ctx.library.books.add({ bookName: bookName, author: author, amount: Number(amount) });
    if (res instanceof Error) {
        console.log(res.message);
        return;
    }
    if (res.type === 'add') {
        console.log("Book \"".concat(res.book.bookName, "\" by ").concat(res.book.author, " added successfully, inventory: ").concat(res.book.inventory, "."));
    }
    else {
        console.log("Book \"".concat(res.book.bookName, "\" inventory successfully updated, new inventory:").concat(res.book.inventory));
    }
});
exports.default = actionManager;
