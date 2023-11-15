"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commandLineToArray = function (commandLine) {
    // `aa "bb cc" 'dd' ee` => ['aa', 'bb cc', 'dd', 'ee']
    var regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
    var result = [];
    var match;
    while ((match = regex.exec(commandLine))) {
        result.push(match[1] || match[2] || match[0]);
    }
    return result;
};
exports.default = commandLineToArray;
