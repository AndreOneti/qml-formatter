"use strict";
import * as vscode from "vscode";
import { Regex } from "./libs";

export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerDocumentFormattingEditProvider("qml", {
    provideDocumentFormattingEdits(
      document: vscode.TextDocument
    ): vscode.TextEdit[] {
      const { activeTextEditor } = vscode.window;

      function getTabSize(): number {
        return Number(activeTextEditor.options.tabSize);
      }

      function preFormatter(textDocument: string): string {
        let textDocumentFormatted = textDocument
          .replace(/\ {0,}\{\ {0,}/g, " { ")
          .replace(/\ {0,}\}\ {0,}/g, " } ")
          .replace(/\(\ {0,}/g, "(")
          .replace(/\ {0,}\)\ {0,}/g, ")")
          .replace(/\s{0,}:\s{0,}/g, ": ");
        return textDocumentFormatted || textDocument;
      }

      if (activeTextEditor && activeTextEditor.document.languageId === "qml") {
        const { document } = activeTextEditor;
        const edit = new vscode.WorkspaceEdit();
        const file = document.getText().split("\n");
        const tabSize = getTabSize();

        for (let index = 0; index < file.length; index++) {
          const line = file[index];
          edit.replace(
            document.uri,
            new vscode.Range(index, 0, index, line.length),
            `${Regex(preFormatter(line), index === 0, tabSize)}`
          );
          if (index === file.length - 1) {
            if (line !== "") {
              edit.insert(
                document.uri,
                document.lineAt(document.lineCount - 1).range.end,
                "\n"
              );
            }
            vscode.workspace.applyEdit(edit);
            return [];
          }
        }
      }
    },
  });
}
