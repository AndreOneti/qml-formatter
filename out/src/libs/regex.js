"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Regex = void 0;
var vscode = require("vscode");
var stringFormatter_1 = require("./stringFormatter");
var activeTextEditor = vscode.window.activeTextEditor;
var editor = Number(activeTextEditor.options.tabSize);
var IsImport = /^\s{0,}import/;
var currentTabSize = 0;
function Regex(line) {
    if (currentTabSize < 0)
        currentTabSize = 0;
    if (IsImport.test(line))
        return stringFormatter_1.whiteSpaceRemove(line, currentTabSize);
    // currentTabSize += editor;
    // let newLine = whiteSpaceRemove(line, currentTabSize);
    // return newLine;
    return line;
}
exports.Regex = Regex;
//# sourceMappingURL=regex.js.map