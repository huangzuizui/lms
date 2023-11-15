"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var runCommand_1 = require("./runCommand");
var initApp = function () {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.setPrompt('welcome to library management system, please input your command (input exit to exit):');
    rl.prompt();
    rl.on('line', function (line) {
        if (line.toLowerCase() === 'exit') {
            rl.close();
        }
        else {
            (0, runCommand_1.default)(line);
            rl.prompt();
        }
    }).on('close', function () {
        console.log('see you next time!');
        process.exit(0);
    });
};
exports.default = initApp;
