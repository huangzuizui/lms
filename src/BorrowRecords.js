"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Data_1 = require("./Data");
var BorrowRecords = /** @class */ (function () {
    function BorrowRecords() {
        this.data = new Data_1.default();
    }
    BorrowRecords.prototype.add = function (_a) {
        var userId = _a.userId, bookName = _a.bookName, author = _a.author;
        if (userId === undefined || !bookName || !author) {
            return new Error("Please input userId, bookName and author.");
        }
        return this.data.add({ userId: userId, bookName: bookName, author: author });
    };
    BorrowRecords.prototype.remove = function (_a) {
        var userId = _a.userId, bookName = _a.bookName, author = _a.author;
        if (userId === undefined || !bookName || !author) {
            return new Error("Please input userId, bookName and author.");
        }
        var records = this.data.find({ userId: userId, bookName: bookName, author: author });
        if (records instanceof Error) {
            return records;
        }
        if (!records || records.length === 0) {
            console.log("Cannot find borrow record.");
            return;
        }
        return this.data.removeById(records[0].id);
    };
    return BorrowRecords;
}());
exports.default = BorrowRecords;
