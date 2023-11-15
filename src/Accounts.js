"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Data_1 = require("./Data");
var Accounts = /** @class */ (function () {
    function Accounts() {
        this.data = new Data_1.default();
    }
    Accounts.prototype.register = function (_a) {
        var role = _a.role, name = _a.name, password = _a.password;
        if (!role || !name || !password) {
            return new Error('Invalid account information');
        }
        var res = this.data.find({ name: name });
        if (res instanceof Error) {
            return res;
        }
        if (res.length > 0) {
            return new Error("Account ".concat(name, " already exists"));
        }
        if (role !== 'admin' && role !== 'user') {
            return new Error('Invalid account role');
        }
        return this.data.add({ role: role, name: name, password: password });
    };
    Accounts.prototype.login = function (_a) {
        var name = _a.name, password = _a.password;
        if (!name || !password) {
            return new Error('Invalid account information');
        }
        var res = this.data.find({ name: name, password: password });
        if (res instanceof Error) {
            return res;
        }
        var account = res[0];
        if (!account) {
            return new Error('Account not exists');
        }
        return account;
    };
    return Accounts;
}());
exports.default = Accounts;
