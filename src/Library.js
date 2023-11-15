"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Accounts_1 = require("./Accounts");
var Books_1 = require("./Books");
var BorrowRecords_1 = require("./BorrowRecords");
var Library = /** @class */ (function () {
    function Library() {
        this.accounts = new Accounts_1.default();
        this.books = new Books_1.default();
        this.borrowRecords = new BorrowRecords_1.default();
    }
    Library.prototype.borrowBook = function (_a) {
        var userId = _a.userId, bookName = _a.bookName, author = _a.author;
        if (userId === undefined || !bookName || !author) {
            return new Error("Cannot borrow book, missing arguments");
        }
        var accountsRes = this.accounts.data.find({ id: userId });
        if (accountsRes instanceof Error) {
            return accountsRes;
        }
        if (accountsRes.length === 0) {
            return new Error("Cannot find user ".concat(userId));
        }
        var booksRes = this.books.search({ bookName: bookName, author: author });
        if (booksRes instanceof Error) {
            return booksRes;
        }
        var book = booksRes[0];
        if (!book) {
            return new Error("Cannot find book ".concat(bookName, " - ").concat(author));
        }
        if (book.inventory === 0) {
            return new Error("No book ".concat(bookName, " - ").concat(author, " left"));
        }
        this.books.data.updateById(book.id, { inventory: book.inventory - 1 });
        return this.borrowRecords.add({ userId: userId, bookName: bookName, author: author });
    };
    Library.prototype.returnBook = function (_a) {
        var userId = _a.userId, bookName = _a.bookName, author = _a.author;
        if (userId === undefined || !bookName || !author) {
            return new Error("Cannot borrow book, missing arguments");
        }
        var accountsRes = this.accounts.data.find({ id: userId });
        if (accountsRes instanceof Error) {
            return accountsRes;
        }
        if (accountsRes.length === 0) {
            return new Error("Cannot find user ".concat(userId));
        }
        var booksRes = this.books.search({ bookName: bookName, author: author });
        if (booksRes instanceof Error) {
            return booksRes;
        }
        var book = booksRes[0];
        if (!book) {
            return new Error("Cannot find book ".concat(bookName, " - ").concat(author));
        }
        this.books.data.updateById(book.id, { inventory: book.inventory + 1 });
        return this.borrowRecords.remove({ userId: userId, bookName: bookName, author: author });
    };
    Library.prototype.deleteBook = function (_a) {
        var bookName = _a.bookName, author = _a.author, userId = _a.userId;
        if (userId === undefined || !bookName || !author) {
            return new Error("Cannot delete book, missing arguments");
        }
        var accountsRes = this.accounts.data.find({ id: userId });
        if (accountsRes instanceof Error) {
            return accountsRes;
        }
        var account = accountsRes[0];
        if (!account) {
            return new Error("Cannot find userId ".concat(userId));
        }
        if (account.role !== 'admin') {
            return new Error("Only admin can delete book");
        }
        var booksRes = this.books.data.find({ bookName: bookName, author: author });
        if (booksRes instanceof Error) {
            return booksRes;
        }
        var book = booksRes[0];
        if (!book) {
            return new Error("Cannot find book ".concat(bookName, " - ").concat(author));
        }
        var records = this.borrowRecords.data.find({ bookName: bookName, author: author });
        if (records instanceof Error) {
            return records;
        }
        if (records && records.length > 0) {
            return new Error("Cannot delete book ".concat(bookName, " - ").concat(author, " because it is currently borrowed."));
        }
        return this.books.remove({ bookName: bookName, author: author });
    };
    return Library;
}());
exports.default = Library;
