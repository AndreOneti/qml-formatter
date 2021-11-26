"use strict";
import * as vscode from "vscode";
import { whiteSpaceRemove } from "./stringFormatter";

const { activeTextEditor } = vscode.window;
const editor = Number(activeTextEditor.options.tabSize);

const IsImport = /^\s{0,}import/;

var currentTabSize: number = 0;

export function Regex(line: string): string {
  if (currentTabSize < 0) currentTabSize = 0;

  if (IsImport.test(line)) return whiteSpaceRemove(line, currentTabSize);

  // currentTabSize += editor;

  let newLine = whiteSpaceRemove(line, currentTabSize);
  return newLine;
}
