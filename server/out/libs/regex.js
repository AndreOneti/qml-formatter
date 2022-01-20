"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Regex = void 0;
const stringFormatter_1 = require("./stringFormatter");
const IsImport = /^\s{0,}import/;
const IsBegingComponent = /^\s{0,}[A-Za-z0-9.]{1,}\s{0,}:{0,1}\s{0,}(\{|\[)/;
const IsEndComponent = /^\s{0,}\}\s{0,},{0,1}\s{0,}|^\s{0,}\]\s{0,}$/;
const IsBrackts = /^\s{0,}\{/;
const IsLogicalOperator = /^\s{0,}&&/;
const IsFunction = /^\s{0,}function [A-Za-z]{1,}/;
const IsIf = /^\s{0,}if\s{0,}\(\s{0,}[A-Za-z]{1,}/;
const IsElse = /^\s{0,}\}{0,1}\s{0,}else\s{0,}\{{0,1}/;
const IsFunctionArgsBegin = /\($/;
const IsFunctionArgsEnd = /^\s{0,}\)/;
const IsNewJson = /^\s{0,}[A-Za-z0-9]{1,}\s{0,}[A-Za-z0-9]{0,}\s{0,}={0,}\s{0,}\{/;
let currentTabSize = 0;
function Regex(line, isfirstLine = false, identation = "  ") {
    if (currentTabSize < 0)
        currentTabSize = 0;
    if (isfirstLine)
        currentTabSize = 0;
    if (IsImport.test(line)) {
        currentTabSize = 0;
        return (0, stringFormatter_1.whiteSpaceRemove)(line.replace(/\s{0,}:\s{0,}/g, ":"), currentTabSize, identation);
    }
    if (IsBegingComponent.test(line)) {
        let data = (0, stringFormatter_1.whiteSpaceRemove)(line, currentTabSize, identation);
        if (!data.endsWith("}") && !data.endsWith("]"))
            currentTabSize++;
        if (data.endsWith("}")) {
            data = data.replace(/\{\}/, "{ }");
            if (data.indexOf("{") < data.indexOf("}") - 2) {
                data = data
                    .replace(/\{\s{0,}/, `{\n${identation.repeat(currentTabSize + 1)}`)
                    .replace(/\s{0,}\}/, `\n${identation.repeat(currentTabSize)}}`);
            }
        }
        return data;
    }
    if (IsEndComponent.test(line)) {
        currentTabSize--;
        return (0, stringFormatter_1.whiteSpaceRemove)(line, currentTabSize, identation);
    }
    if (IsFunction.test(line)) {
        let data = (0, stringFormatter_1.whiteSpaceRemove)(line, currentTabSize, identation);
        if (data.lastIndexOf("{"))
            data = data.replace(/\s{0,}\{/, `\n${(0, stringFormatter_1.whiteSpaceRemove)("{", currentTabSize, identation)}`);
        currentTabSize++;
        return data;
    }
    if (IsIf.test(line)) {
        let data = (0, stringFormatter_1.whiteSpaceRemove)(line, currentTabSize, identation);
        if (data.lastIndexOf("{") > 0) {
            data = data.replace(/\s{0,}\{/, `\n${(0, stringFormatter_1.whiteSpaceRemove)("{", currentTabSize, identation)}`);
        }
        if (data.includes("}")) {
            data = data.replace("{", `{\n${identation.repeat(currentTabSize + 1)}`);
            data = data.replace("}", `\n${(0, stringFormatter_1.whiteSpaceRemove)("}", currentTabSize, identation)}`);
        }
        if (data.indexOf(")") >= data.length - 1)
            currentTabSize++;
        return data;
    }
    if (IsElse.test(line)) {
        let data = (0, stringFormatter_1.whiteSpaceRemove)(line, currentTabSize, identation);
        if (data.trim().endsWith("{")) {
            data = data
                .trim()
                .replace("{", `\n${(0, stringFormatter_1.whiteSpaceRemove)("{", currentTabSize - 1, identation)}`);
        }
        if (data.trim().startsWith("}")) {
            data = data.replace("}", `${(0, stringFormatter_1.whiteSpaceRemove)("}", currentTabSize - 1, identation)}\n`);
            data = data.replace("else", `${(0, stringFormatter_1.whiteSpaceRemove)("else", currentTabSize - 1, identation)}`);
        }
        currentTabSize++;
        return data;
    }
    if (IsBrackts.test(line)) {
        return (0, stringFormatter_1.whiteSpaceRemove)(line, currentTabSize - 1, identation);
    }
    if (IsLogicalOperator.test(line)) {
        return (0, stringFormatter_1.whiteSpaceRemove)(line, currentTabSize + 1, identation);
    }
    if (IsFunctionArgsBegin.test(line)) {
        const data = (0, stringFormatter_1.whiteSpaceRemove)(line, currentTabSize, identation);
        currentTabSize++;
        return data;
    }
    if (IsFunctionArgsEnd.test(line)) {
        currentTabSize--;
        return (0, stringFormatter_1.whiteSpaceRemove)(line, currentTabSize, identation);
    }
    if (IsNewJson.test(line)) {
        const data = (0, stringFormatter_1.whiteSpaceRemove)(line, currentTabSize, identation);
        currentTabSize++;
        return data;
    }
    const newLine = (0, stringFormatter_1.whiteSpaceRemove)(line, currentTabSize, identation);
    return newLine;
}
exports.Regex = Regex;
//# sourceMappingURL=regex.js.map