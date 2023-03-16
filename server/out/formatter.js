"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formatter = void 0;
const node_1 = require("vscode-languageserver/node");
const libs_1 = require("./libs");
require("./utils/prototypes");
const Regexs_1 = require("./utils/Regexs");
class Formatter {
    constructor(documents) {
        this.isSwitchStatement = false;
        this.isCaseOrDefault = false;
        this.isIfStatement = false;
        this.ifWithKey = false;
        this.currentTabSize = 0;
        this.tabSize = "\t";
        this.documents = documents;
    }
    getTabSize({ options: { insertSpaces, tabSize }, }) {
        return insertSpaces ? " ".repeat(tabSize) : "\t";
    }
    resetGlobalVars() {
        this.isSwitchStatement = false;
        this.isCaseOrDefault = false;
        this.isIfStatement = false;
        this.ifWithKey = false;
        this.currentTabSize = 0;
        this.doc = undefined;
        this.tabSize = "\t";
    }
    initGlobalVars(params) {
        this.doc = this.documents.get(params.textDocument.uri);
        this.tabSize = this.getTabSize(params);
    }
    Regex(line, isfirstLine = false, identation = "  ") {
        if (this.currentTabSize < 0)
            this.currentTabSize = 0;
        if (isfirstLine)
            this.currentTabSize = 0;
        if (this.isIfStatement) {
            let data = (0, libs_1.whiteSpaceRemove)(line, this.currentTabSize, identation);
            if (data.includes("{")) {
                data = (0, libs_1.whiteSpaceRemove)(line, this.currentTabSize - 1, identation);
            }
            else if (!this.ifWithKey) {
                this.currentTabSize--;
            }
            this.isIfStatement = false;
            this.ifWithKey = false;
            return data;
        }
        if (this.isSwitchStatement) {
            let data = (0, libs_1.whiteSpaceRemove)(line, this.currentTabSize, identation);
            this.isSwitchStatement = false;
            if (data.includes("{")) {
                data = (0, libs_1.whiteSpaceRemove)(line, this.currentTabSize - 1, identation);
            }
            return data;
        }
        // if (this.isCaseOrDefault) {
        //   let data = whiteSpaceRemove(line, this.currentTabSize, identation);
        //   if (IsInReturnOrBreak.test(line)) {
        //     this.isCaseOrDefault = false;
        //     this.currentTabSize--;
        //   }
        //   if (IsInCaseOrDefault.test(line)) {
        //     data = whiteSpaceRemove(line, this.currentTabSize - 1, identation);
        //   }
        //   return data;
        // }
        if (Regexs_1.IsImport.test(line)) {
            this.currentTabSize = 0;
            return (0, libs_1.whiteSpaceRemove)(line.replace(/\s{0,}:\s{0,}/g, ":"), this.currentTabSize, identation);
        }
        if (Regexs_1.IsBegingComponent.test(line)) {
            let data = (0, libs_1.whiteSpaceRemove)(line, this.currentTabSize, identation);
            if (!data.endsWith("}") && !data.endsWith("]"))
                this.currentTabSize++;
            if (data.endsWith("}")) {
                data = data.replace(/\{\}/, "{ }");
                if (data.indexOf("{") < data.indexOf("}") - 2) {
                    data = data
                        .replace(/\{\s{0,}/, `{\n${identation.repeat(this.currentTabSize + 1)}`)
                        .replace(/\s{0,}\}/, `\n${identation.repeat(this.currentTabSize)}}`);
                }
            }
            return data;
        }
        if (Regexs_1.IsComponentInLine.test(line)) {
            return (0, libs_1.whiteSpaceRemove)(line, this.currentTabSize, identation);
        }
        if (Regexs_1.IsBegingProperty.test(line)) {
            let data = (0, libs_1.whiteSpaceRemove)(line, this.currentTabSize, identation);
            if (!data.endsWith("}") && !data.endsWith("]") && !data.endsWith(")")) {
                this.currentTabSize++;
            }
            if (data.endsWith("}")) {
                data = data.replace(/\{\}/, "{ }");
                if (data.indexOf("{") < data.indexOf("}") - 2) {
                    data = data
                        .replace(/\{\s{0,}/, `{\n${identation.repeat(this.currentTabSize + 1)}`)
                        .replace(/\s{0,}\}/, `\n${identation.repeat(this.currentTabSize)}}`);
                }
            }
            return data;
        }
        if (Regexs_1.IsJsonWithVaiableKey.test(line)) {
            const data = (0, libs_1.whiteSpaceRemove)(line, this.currentTabSize, identation);
            this.currentTabSize++;
            return data;
        }
        if (Regexs_1.IsBegingSwitch.test(line)) {
            let data = line.replace(/( {0,}switch) {0,}\(/, "$1 (");
            data = (0, libs_1.whiteSpaceRemove)(data, this.currentTabSize, identation);
            this.isSwitchStatement = true;
            if (!data.endsWith("}") && !data.endsWith("]"))
                this.currentTabSize++;
            if (data.endsWith("}")) {
                data = data.replace(/\{\}/, "{ }");
                if (data.indexOf("{") < data.indexOf("}") - 2) {
                    data = data
                        .replace(/\{\s{0,}/, `{\n${identation.repeat(this.currentTabSize + 1)}`)
                        .replace(/\s{0,}\}/, `\n${identation.repeat(this.currentTabSize)}}`);
                }
            }
            if (data.endsWith("{")) {
                this.isSwitchStatement = false;
            }
            return data;
        }
        // if (IsInCaseOrDefault.test(line)) {
        //   const data = whiteSpaceRemove(line, this.currentTabSize, identation);
        //   this.isCaseOrDefault = true;
        //   this.currentTabSize++;
        //   return data;
        // }
        if (Regexs_1.IsForLoop.test(line)) {
            let data = line.replace(/( {0,}for) {0,}\(/, "$1 (");
            data = (0, libs_1.whiteSpaceRemove)(data, this.currentTabSize, identation);
            if (/\{$/.test(data)) {
                data = data.replace(/\s{0,}\{$/, " {");
            }
            this.currentTabSize++;
            return data;
        }
        if (Regexs_1.IsEndComponent.test(line)) {
            this.currentTabSize--;
            return (0, libs_1.whiteSpaceRemove)(line, this.currentTabSize, identation);
        }
        if (Regexs_1.IsFunction.test(line)) {
            let data = (0, libs_1.whiteSpaceRemove)(line, this.currentTabSize, identation);
            if (data.lastIndexOf("{"))
                data = data.replace(/\s{0,}\{/, `\n${(0, libs_1.whiteSpaceRemove)("{", this.currentTabSize, identation)}`);
            this.currentTabSize++;
            return data;
        }
        if (Regexs_1.IsIf.test(line)) {
            let data = line.replace(/( {0,}if) {0,}\(/, "$1 (");
            data = (0, libs_1.whiteSpaceRemove)(data, this.currentTabSize, identation);
            if (data.lastIndexOf("{") >= data.length - 1) {
                data = data.replace(/\s{0,}\{/, `\n${(0, libs_1.whiteSpaceRemove)("{", this.currentTabSize, identation)}`);
                this.currentTabSize++;
                this.isIfStatement = true;
                this.ifWithKey = true;
            }
            if (data.includes("}")) {
                data = data.replace("{", `{\n${identation.repeat(this.currentTabSize + 1)}`);
                data = data.replace("}", `\n${(0, libs_1.whiteSpaceRemove)("}", this.currentTabSize, identation)}`);
            }
            if (data.lastIndexOf(")") >= data.length - 1) {
                this.currentTabSize++;
                this.isIfStatement = true;
            }
            return data;
        }
        if (Regexs_1.IsElse.test(line)) {
            let data = (0, libs_1.whiteSpaceRemove)(line, this.currentTabSize, identation);
            if (data.trim().endsWith("{")) {
                data = data
                    .trim()
                    .replace("{", `\n${(0, libs_1.whiteSpaceRemove)("{", this.currentTabSize - 1, identation)}`);
            }
            if (data.trim().startsWith("}")) {
                data = data.replace("}", `${(0, libs_1.whiteSpaceRemove)("}", this.currentTabSize - 1, identation)}\n`);
                data = data.replace("else", `${(0, libs_1.whiteSpaceRemove)("else", this.currentTabSize - 1, identation)}`);
            }
            this.currentTabSize++;
            return data;
        }
        if (Regexs_1.IsBrackts.test(line)) {
            return (0, libs_1.whiteSpaceRemove)(line, this.currentTabSize - 1, identation);
        }
        if (Regexs_1.IsLogicalOperator.test(line)) {
            return (0, libs_1.whiteSpaceRemove)(line, this.currentTabSize + 1, identation);
        }
        if (Regexs_1.IsFunctionArgsBegin.test(line)) {
            const data = (0, libs_1.whiteSpaceRemove)(line, this.currentTabSize, identation);
            this.currentTabSize++;
            return data;
        }
        if (Regexs_1.IsFunctionArgsEnd.test(line)) {
            this.currentTabSize--;
            return (0, libs_1.whiteSpaceRemove)(line, this.currentTabSize, identation);
        }
        if (Regexs_1.IsNewJson.test(line)) {
            const data = (0, libs_1.whiteSpaceRemove)(line, this.currentTabSize, identation);
            this.currentTabSize++;
            return data;
        }
        const newLine = (0, libs_1.whiteSpaceRemove)(line, this.currentTabSize, identation);
        return newLine;
    }
    preFormat(text) {
        text = text.replace(/([A-Za-z0-9]{1,})( {0,})(\{)/gm, "$1 $3");
        text = text.replace(/(property) ([A-Za-z0-9]{1,}) ([A-Za-z0-9]{1,})(\s{0,}):(\s{0,})/gm, "$1 $2 $3: ");
        text = text.replace(/([A-Za-z0-9]{1,})(\s{0,}):(\s{0,})(\{|\[|\()/gm, "$1: $4");
        return text;
    }
    formattingDocument(params) {
        this.resetGlobalVars();
        this.initGlobalVars(params);
        const textEdit = [];
        if (!this.doc) {
            return textEdit;
        }
        const fileData = this.preFormat(this.doc.getText());
        fileData.split("\n").forEach((line, index) => {
            const data = this.Regex(line, index === 0, this.tabSize);
            textEdit.push(node_1.TextEdit.replace(node_1.Range.create(node_1.Position.create(index, 0), node_1.Position.create(index, line.length)), data.trimEnd()));
        });
        this.resetGlobalVars();
        return textEdit;
    }
}
exports.Formatter = Formatter;
//# sourceMappingURL=formatter.js.map