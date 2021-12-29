"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
var vscode = require("vscode");
var libs_1 = require("./libs");
function activate(context) {
    vscode.languages.registerDocumentFormattingEditProvider("qml", {
        provideDocumentFormattingEdits: function (document) {
            var activeTextEditor = vscode.window.activeTextEditor;
            function getTabSize() {
                return Number(activeTextEditor.options.tabSize);
            }
            function preFormatter(textDocument) {
                var textDocumentFormatted = textDocument
                    .replace(/\ {0,}\{\ {0,}/g, "{ ")
                    .replace(/\ {0,}\}\ {0,}/g, " }")
                    .replace(/\s{0,}:\s{0,}/g, ": ");
                return textDocumentFormatted || textDocument;
            }
            if (activeTextEditor && activeTextEditor.document.languageId === "qml") {
                var document_1 = activeTextEditor.document;
                var edit = new vscode.WorkspaceEdit();
                var file = document_1.getText().split("\n");
                var tabSize = getTabSize();
                for (var index = 0; index < file.length; index++) {
                    var line = file[index];
                    edit.replace(document_1.uri, new vscode.Range(index, 0, index, line.length), "" + libs_1.Regex(preFormatter(line), index === 0, tabSize));
                    if (index === file.length - 1) {
                        if (line !== "") {
                            edit.insert(document_1.uri, document_1.lineAt(document_1.lineCount - 1).range.end, "\n");
                        }
                        vscode.workspace.applyEdit(edit);
                        return [];
                    }
                }
            }
        },
    });
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map