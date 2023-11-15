"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Data_1 = require("./Data");
var Books = /** @class */ (function () {
    function Books() {
        this.data = new Data_1.default();
    }
    Books.prototype.add = function (_a) {
        var bookName = _a.bookName, author = _a.author, amount = _a.amount;
        if (!bookName) {
            return new Error('bookName is required');
        }
        if (!author) {
            return new Error('author is required');
        }
        if (!Number.isInteger(amount) || amount < 0) {
            return new Error('amount is required and should be a positive integer');
        }
        var res = this.data.find({ bookName: bookName, author: author });
        if (res instanceof Error) {
            return res;
        }
        var book = res[0];
        if (!book) {
            return {
                book: this.data.add({ bookName: bookName, author: author, inventory: amount }),
                type: 'add',
            };
        }
        else {
            return {
                book: this.data.updateById(book.id, { inventory: book.inventory + amount }),
                type: 'update',
            };
        }
    };
    Books.prototype.list = function () {
        return this.data.list();
    };
    Books.prototype.search = function (_a) {
        var bookName = _a.bookName, author = _a.author;
        return this.data.find({ bookName: bookName, author: author });
    };
    Books.prototype.remove = function (_a) {
        var bookName = _a.bookName, author = _a.author;
        if (!bookName) {
            return new Error('bookName is required');
        }
        if (!author) {
            return new Error('author is required');
        }
        var res = this.data.find({ bookName: bookName, author: author });
        if (res instanceof Error) {
            return res;
        }
        var book = res[0];
        if (!book) {
            console.log("remove book failed: cannot find book ".concat(bookName, " - ").concat(author));
            return;
        }
        return this.data.removeById(book.id);
    };
    return Books;
}());
exports.default = Books;
