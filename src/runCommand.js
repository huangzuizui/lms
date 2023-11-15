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
var actions_1 = require("./actions");
var commandLineToArray_1 = require("./utils/commandLineToArray");
var commander_1 = require("commander");
commander_1.program.configureOutput({
    outputError: function (str) {
        throw new Error(str);
    }
});
var runCommand = function (commandLine) {
    var commandArgs = (0, commandLineToArray_1.default)(commandLine);
    try {
        commander_1.program.command('register <role> <name> <password>')
            .description('Register a new admin with name and password')
            .action(actions_1.default.run('register'));
        commander_1.program.command('login <name> <password>')
            .description('login with name and password')
            .action(actions_1.default.run('login'));
        commander_1.program.command('logout')
            .description('logout')
            .action(actions_1.default.run('logout'));
        commander_1.program.command('list')
            .description('list all books')
            .action(actions_1.default.run('listBook'));
        commander_1.program.command('search <bookName> <author>')
            .description('Search book by book name and author')
            .action(actions_1.default.run('searchBook'));
        commander_1.program.command('borrow <bookName> <author>')
            .description('Borrow book by book name and author')
            .action(actions_1.default.run('borrowBook'));
        commander_1.program.command('delete <bookName> <author>')
            .description('Delete book by name and author')
            .action(actions_1.default.run('deleteBook'));
        commander_1.program.command('return <bookName> <author>')
            .description('Return book by book name and author')
            .action(actions_1.default.run('returnBook'));
        commander_1.program.command('add  <bookName> <author> <amount>')
            .description('Add book inventory by book name and author')
            .action(actions_1.default.run('addBook'));
        commander_1.program.parse(__spreadArray(['', ''], commandArgs, true));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};
exports.default = runCommand;
