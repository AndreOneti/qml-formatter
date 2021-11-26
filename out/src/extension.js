'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
var vscode = require("vscode");
var libs_1 = require("./libs");
function activate(context) {
    vscode.languages.registerDocumentFormattingEditProvider('qml', {
        provideDocumentFormattingEdits: function (document) {
            var activeTextEditor = vscode.window.activeTextEditor;
            if (activeTextEditor && activeTextEditor.document.languageId === 'qml') {
                var document_1 = activeTextEditor.document;
                var edit = new vscode.WorkspaceEdit();
                var file = document_1.getText().split('\n');
                for (var index = 0; index < file.length; index++) {
                    edit.replace(document_1.uri, new vscode.Range(index, 0, index, file[index].length), "" + libs_1.Regex(file[index]));
                    if (index === (file.length - 1)) {
                        if (file[index] !== '') {
                            edit.insert(document_1.uri, document_1.lineAt(document_1.lineCount - 1).range.end, '\n');
                        }
                        vscode.workspace.applyEdit(edit);
                        return [];
                    }
                }
            }
        }
    });
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map