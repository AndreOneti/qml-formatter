"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Regex = void 0;
var vscode = require("vscode");
var stringFormatter_1 = require("./stringFormatter");
var activeTextEditor = vscode.window.activeTextEditor;
var editor = Number(activeTextEditor.options.tabSize);
var IsImport = /^\s{0,}import/;
var IsBegingComponent = /^\s{0,}[A-Za-z.]{1,}\s{0,}:{0,1}\s{0,}\{$/;
var IsEndComponent = /^\s{0,}\}$/;
var IsBrackts = /^\s{0,}\{/;
var IsLogicalOperator = /^\s{0,}&&/;
var IsFunction = /^\s{0,}function [A-Za-z]{1,}/;
// const IsIf = /^\s{0,}if\s{0,}\(\s{0,}[A-Za-z]{1,}/;
// const IsElse = /^\s{0,}\}{0,1}\s{0,}else\s{0,}\{{0,1}/;
var IsFunctionArgsBegin = /\($/;
var IsFunctionArgsEnd = /^\s{0,}\)/;
var IsNewJson = /^\s{0,}[A-Za-z0-9]{1,}\s{0,}[A-Za-z0-9]{0,}\s{0,}={0,}\s{0,}\{/;
var currentTabSize = 0;
// TODO: Adjust on if/else esteatement
function Regex(line, isfirstLine) {
    if (isfirstLine === void 0) { isfirstLine = false; }
    if (currentTabSize < 0)
        currentTabSize = 0;
    if (isfirstLine)
        currentTabSize = 0;
    if (IsImport.test(line)) {
        currentTabSize = 0;
        return stringFormatter_1.whiteSpaceRemove(line, 0);
    }
    if (IsBegingComponent.test(line)) {
        var data = stringFormatter_1.whiteSpaceRemove(line, currentTabSize);
        currentTabSize += editor;
        return data;
    }
    if (IsEndComponent.test(line)) {
        currentTabSize -= editor;
        return stringFormatter_1.whiteSpaceRemove(line, currentTabSize);
    }
    if (IsFunction.test(line)) {
        var data = stringFormatter_1.whiteSpaceRemove(line, currentTabSize);
        if (data.lastIndexOf("{"))
            data = data.replace(/\s{0,}\{/, "\n" + stringFormatter_1.whiteSpaceRemove("{", currentTabSize));
        currentTabSize += editor;
        return data;
    }
    // if (IsIf.test(line)) {
    //   let data = whiteSpaceRemove(line, currentTabSize);
    //   if (data.lastIndexOf("{") > 0)
    //     data = data.replace(
    //       /\s{0,}\{/,
    //       `\n${whiteSpaceRemove("{", currentTabSize)}`
    //     );
    //   currentTabSize += editor;
    //   return data;
    // }
    // if (IsElse.test(line)) {
    //   let data = whiteSpaceRemove(line, currentTabSize);
    //   if (data.lastIndexOf("{") > 0) {
    //     data = data.replace(
    //       /\s{0,}\{/,
    //       `\n${whiteSpaceRemove("{", currentTabSize)}`
    //     );
    //   }
    //   if (data.trim().startsWith("}")) {
    //     data = data.replace(
    //       /\s{0,}\}/,
    //       `${whiteSpaceRemove("}", currentTabSize)}\n`
    //     );
    //   }
    //   currentTabSize += editor;
    //   return data;
    // }
    if (IsBrackts.test(line)) {
        return stringFormatter_1.whiteSpaceRemove(line, currentTabSize - editor);
    }
    if (IsLogicalOperator.test(line)) {
        return stringFormatter_1.whiteSpaceRemove(line, currentTabSize + editor);
    }
    if (IsFunctionArgsBegin.test(line)) {
        var data = stringFormatter_1.whiteSpaceRemove(line, currentTabSize);
        currentTabSize += editor;
        return data;
    }
    if (IsFunctionArgsEnd.test(line)) {
        currentTabSize -= editor;
        return stringFormatter_1.whiteSpaceRemove(line, currentTabSize);
    }
    if (IsNewJson.test(line)) {
        var data = stringFormatter_1.whiteSpaceRemove(line, currentTabSize);
        currentTabSize += editor;
        return data;
    }
    // currentTabSize += editor;
    var newLine = stringFormatter_1.whiteSpaceRemove(line, currentTabSize);
    return newLine;
}
exports.Regex = Regex;
//# sourceMappingURL=regex.js.map