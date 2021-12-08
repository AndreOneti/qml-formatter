"use strict";
import * as vscode from "vscode";
import { whiteSpaceRemove } from "./stringFormatter";

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

const IsNewJson =
  /^\s{0,}[A-Za-z0-9]{1,}\s{0,}[A-Za-z0-9]{0,}\s{0,}={0,}\s{0,}\{/;

let currentTabSize: number = 0;

export function Regex(
  line: string,
  isfirstLine: boolean = false,
  editor: number = 2
): string {
  if (currentTabSize < 0) currentTabSize = 0;
  if (isfirstLine) currentTabSize = 0;

  if (IsImport.test(line)) {
    currentTabSize = 0;
    return whiteSpaceRemove(line, 0);
  }

  if (IsBegingComponent.test(line)) {
    let data = whiteSpaceRemove(line, currentTabSize);
    if (!data.endsWith("}")) currentTabSize += editor;
    if (data.endsWith("}")) {
      data = data.replace(/\{\}/, "{ }");
      if (data.indexOf("{") < data.indexOf("}") - 2) {
        data = data
          .replace(/\{\s{0,}/, `{\n${" ".repeat(currentTabSize + editor)}`)
          .replace(/\s{0,}\}/, `\n${" ".repeat(currentTabSize)}}`);
      }
    }
    return data;
  }

  if (IsEndComponent.test(line)) {
    currentTabSize -= editor;
    return whiteSpaceRemove(line, currentTabSize);
  }

  if (IsFunction.test(line)) {
    let data = whiteSpaceRemove(line, currentTabSize);
    if (data.lastIndexOf("{"))
      data = data.replace(
        /\s{0,}\{/,
        `\n${whiteSpaceRemove("{", currentTabSize)}`
      );
    currentTabSize += editor;
    return data;
  }

  if (IsIf.test(line)) {
    let data = whiteSpaceRemove(line, currentTabSize);
    if (data.lastIndexOf("{") > 0) {
      data = data.replace(
        /\s{0,}\{/,
        `\n${whiteSpaceRemove("{", currentTabSize)}`
      );
    }
    if (data.includes("}")) {
      data = data.replace("{", `{\n${" ".repeat(currentTabSize + editor)}`);
      data = data.replace("}", `\n${whiteSpaceRemove("}", currentTabSize)}`);
    }
    if (data.indexOf(")") >= data.length - 1) {
      currentTabSize += editor;
    }
    return data;
  }

  if (IsElse.test(line)) {
    let data = whiteSpaceRemove(line, currentTabSize);
    if (data.trim().endsWith("{")) {
      data = data
        .trim()
        .replace("{", `\n${whiteSpaceRemove("{", currentTabSize - editor)}`);
    }
    if (data.trim().startsWith("}")) {
      data = data.replace(
        "}",
        `${whiteSpaceRemove("}", currentTabSize - editor)}\n`
      );
      data = data.replace(
        "else",
        `${whiteSpaceRemove("else", currentTabSize - editor)}`
      );
    }
    currentTabSize += editor;
    return data;
  }

  if (IsBrackts.test(line)) {
    return whiteSpaceRemove(line, currentTabSize - editor);
  }

  if (IsLogicalOperator.test(line)) {
    return whiteSpaceRemove(line, currentTabSize + editor);
  }

  if (IsFunctionArgsBegin.test(line)) {
    const data = whiteSpaceRemove(line, currentTabSize);
    currentTabSize += editor;
    return data;
  }

  if (IsFunctionArgsEnd.test(line)) {
    currentTabSize -= editor;
    return whiteSpaceRemove(line, currentTabSize);
  }

  if (IsNewJson.test(line)) {
    const data = whiteSpaceRemove(line, currentTabSize);
    currentTabSize += editor;
    return data;
  }

  let newLine = whiteSpaceRemove(line, currentTabSize);
  return newLine;
}
