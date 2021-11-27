'use strict';
import * as vscode from 'vscode';
import { Regex } from "./libs";

export function activate(context: vscode.ExtensionContext) {

  vscode.languages.registerDocumentFormattingEditProvider('qml', {
    provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
      const { activeTextEditor } = vscode.window;

      if (activeTextEditor && activeTextEditor.document.languageId === 'qml') {
        const { document } = activeTextEditor;
        const edit = new vscode.WorkspaceEdit();
        const file = document.getText().split('\n');

        for (let index = 0; index < file.length; index++) {
          edit.replace(
            document.uri,
            new vscode.Range(index, 0, index, file[index].length),
            `${Regex(file[index], index === 0)}`
          );
          if (index === (file.length - 1)) {
            if (file[index] !== '') {
              edit.insert(
                document.uri,
                document.lineAt(document.lineCount - 1).range.end,
                '\n'
              );
            }
            vscode.workspace.applyEdit(edit)
            return [];
          }
        }
      }
    }
  });
}
