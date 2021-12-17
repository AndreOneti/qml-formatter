"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Regex = void 0;
var stringFormatter_1 = require("./stringFormatter");
var IsImport = /^\s{0,}import/;
var IsBegingComponent = /^\s{0,}[A-Za-z0-9.]{1,}\s{0,}:{0,1}\s{0,}(\{|\[)/;
var IsEndComponent = /^\s{0,}\}\s{0,},{0,1}\s{0,}|^\s{0,}\]\s{0,}$/;
var IsBrackts = /^\s{0,}\{/;
var IsLogicalOperator = /^\s{0,}&&/;
var IsFunction = /^\s{0,}function [A-Za-z]{1,}/;
var IsIf = /^\s{0,}if\s{0,}\(\s{0,}[A-Za-z]{1,}/;
var IsElse = /^\s{0,}\}{0,1}\s{0,}else\s{0,}\{{0,1}/;
var IsFunctionArgsBegin = /\($/;
var IsFunctionArgsEnd = /^\s{0,}\)/;
var IsNewJson = /^\s{0,}[A-Za-z0-9]{1,}\s{0,}[A-Za-z0-9]{0,}\s{0,}={0,}\s{0,}\{/;
var currentTabSize = 0;
function Regex(line, isfirstLine, editor) {
    if (isfirstLine === void 0) { isfirstLine = false; }
    if (editor === void 0) { editor = 2; }
    if (currentTabSize < 0)
        currentTabSize = 0;
    if (isfirstLine)
        currentTabSize = 0;
    if (IsImport.test(line)) {
        currentTabSize = 0;
        return stringFormatter_1.whiteSpaceRemove(line.replace(/\s{0,}:\s{0,}/g, ":"), 0);
    }
    if (IsBegingComponent.test(line)) {
        var data = stringFormatter_1.whiteSpaceRemove(line, currentTabSize);
        if (!data.endsWith("}"))
            currentTabSize += editor;
        if (data.endsWith("}")) {
            data = data.replace(/\{\}/, "{ }");
            if (data.indexOf("{") < data.indexOf("}") - 2) {
                data = data
                    .replace(/\{\s{0,}/, "{\n" + " ".repeat(currentTabSize + editor))
                    .replace(/\s{0,}\}/, "\n" + " ".repeat(currentTabSize) + "}");
            }
        }
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
    if (IsIf.test(line)) {
        var data = stringFormatter_1.whiteSpaceRemove(line, currentTabSize);
        if (data.lastIndexOf("{") > 0) {
            data = data.replace(/\s{0,}\{/, "\n" + stringFormatter_1.whiteSpaceRemove("{", currentTabSize));
        }
        if (data.includes("}")) {
            data = data.replace("{", "{\n" + " ".repeat(currentTabSize + editor));
            data = data.replace("}", "\n" + stringFormatter_1.whiteSpaceRemove("}", currentTabSize));
        }
        if (data.indexOf(")") >= data.length - 1) {
            currentTabSize += editor;
        }
        return data;
    }
    if (IsElse.test(line)) {
        var data = stringFormatter_1.whiteSpaceRemove(line, currentTabSize);
        if (data.trim().endsWith("{")) {
            data = data
                .trim()
                .replace("{", "\n" + stringFormatter_1.whiteSpaceRemove("{", currentTabSize - editor));
        }
        if (data.trim().startsWith("}")) {
            data = data.replace("}", stringFormatter_1.whiteSpaceRemove("}", currentTabSize - editor) + "\n");
            data = data.replace("else", "" + stringFormatter_1.whiteSpaceRemove("else", currentTabSize - editor));
        }
        currentTabSize += editor;
        return data;
    }
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
    var newLine = stringFormatter_1.whiteSpaceRemove(line, currentTabSize);
    return newLine;
}
exports.Regex = Regex;
//# sourceMappingURL=regex.js.map