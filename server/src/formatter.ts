import { TextDocument } from "vscode-languageserver-textdocument";
import {
  DocumentFormattingParams,
  Position,
  Range,
  TextDocuments,
  TextEdit,
} from "vscode-languageserver/node";
import { whiteSpaceRemove } from "./libs";
import "./utils/prototypes";
import {
  IsBegingComponent,
  IsBegingProperty,
  IsBegingSwitch,
  IsBrackts,
  IsComponentInLine,
  IsElse,
  IsEndComponent,
  IsForLoop,
  IsFunction,
  IsFunctionArgsBegin,
  IsFunctionArgsEnd,
  IsIf,
  IsImport,
  IsInCaseOrDefault,
  IsInReturnOrBreak,
  IsJsonWithVaiableKey,
  IsLogicalOperator,
  IsNewJson,
} from "./utils/Regexs";

export class Formatter {
  private documents: TextDocuments<TextDocument>;
  private doc: TextDocument | undefined;
  private isSwitchStatement = false;
  private isCaseOrDefault = false;
  private isIfStatement = false;
  private ifWithKey = false;
  private currentTabSize = 0;
  private tabSize = "\t";

  constructor(documents: TextDocuments<TextDocument>) {
    this.documents = documents;
  }

  private getTabSize({
    options: { insertSpaces, tabSize },
  }: DocumentFormattingParams): string {
    return insertSpaces ? " ".repeat(tabSize) : "\t";
  }

  private resetGlobalVars(): void {
    this.isSwitchStatement = false;
    this.isCaseOrDefault = false;
    this.isIfStatement = false;
    this.ifWithKey = false;
    this.currentTabSize = 0;
    this.doc = undefined;
    this.tabSize = "\t";
  }

  private initGlobalVars(params: DocumentFormattingParams): void {
    this.doc = this.documents.get(params.textDocument.uri);
    this.tabSize = this.getTabSize(params);
  }

  private Regex(line: string, isfirstLine = false, identation = "  "): string {
    if (this.currentTabSize < 0) this.currentTabSize = 0;
    if (isfirstLine) this.currentTabSize = 0;

    if (this.isIfStatement) {
      let data = whiteSpaceRemove(line, this.currentTabSize, identation);

      if (data.includes("{")) {
        data = whiteSpaceRemove(line, this.currentTabSize - 1, identation);
      } else if (!this.ifWithKey) {
        this.currentTabSize--;
      }

      this.isIfStatement = false;
      this.ifWithKey = false;

      return data;
    }

    if (this.isSwitchStatement) {
      let data = whiteSpaceRemove(line, this.currentTabSize, identation);
      this.isSwitchStatement = false;

      if (data.includes("{")) {
        data = whiteSpaceRemove(line, this.currentTabSize - 1, identation);
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

    if (IsImport.test(line)) {
      this.currentTabSize = 0;
      return whiteSpaceRemove(
        line.replace(/\s{0,}:\s{0,}/g, ":"),
        this.currentTabSize,
        identation
      );
    }

    if (IsBegingComponent.test(line)) {
      let data = whiteSpaceRemove(line, this.currentTabSize, identation);
      if (!data.endsWith("}") && !data.endsWith("]")) this.currentTabSize++;
      if (data.endsWith("}")) {
        data = data.replace(/\{\}/, "{ }");
        if (data.indexOf("{") < data.indexOf("}") - 2) {
          data = data
            .replace(
              /\{\s{0,}/,
              `{\n${identation.repeat(this.currentTabSize + 1)}`
            )
            .replace(
              /\s{0,}\}/,
              `\n${identation.repeat(this.currentTabSize)}}`
            );
        }
      }
      return data;
    }

    if (IsComponentInLine.test(line)) {
      return whiteSpaceRemove(line, this.currentTabSize, identation);
    }

    if (IsBegingProperty.test(line)) {
      let data = whiteSpaceRemove(line, this.currentTabSize, identation);

      if (!data.endsWith("}") && !data.endsWith("]") && !data.endsWith(")")) {
        this.currentTabSize++;
      }

      if (data.endsWith("}")) {
        data = data.replace(/\{\}/, "{ }");
        if (data.indexOf("{") < data.indexOf("}") - 2) {
          data = data
            .replace(
              /\{\s{0,}/,
              `{\n${identation.repeat(this.currentTabSize + 1)}`
            )
            .replace(
              /\s{0,}\}/,
              `\n${identation.repeat(this.currentTabSize)}}`
            );
        }
      }

      return data;
    }

    if (IsJsonWithVaiableKey.test(line)) {
      const data = whiteSpaceRemove(line, this.currentTabSize, identation);
      this.currentTabSize++;
      return data;
    }

    if (IsBegingSwitch.test(line)) {
      let data = line.replace(/( {0,}switch) {0,}\(/, "$1 (");
      data = whiteSpaceRemove(data, this.currentTabSize, identation);
      this.isSwitchStatement = true;

      if (!data.endsWith("}") && !data.endsWith("]")) this.currentTabSize++;

      if (data.endsWith("}")) {
        data = data.replace(/\{\}/, "{ }");
        if (data.indexOf("{") < data.indexOf("}") - 2) {
          data = data
            .replace(
              /\{\s{0,}/,
              `{\n${identation.repeat(this.currentTabSize + 1)}`
            )
            .replace(
              /\s{0,}\}/,
              `\n${identation.repeat(this.currentTabSize)}}`
            );
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

    if (IsForLoop.test(line)) {
      let data = line.replace(/( {0,}for) {0,}\(/, "$1 (");
      data = whiteSpaceRemove(data, this.currentTabSize, identation);

      if (/\{$/.test(data)) {
        data = data.replace(/\s{0,}\{$/, " {");
      }

      this.currentTabSize++;

      return data;
    }

    if (IsEndComponent.test(line)) {
      this.currentTabSize--;
      return whiteSpaceRemove(line, this.currentTabSize, identation);
    }

    if (IsFunction.test(line)) {
      let data = whiteSpaceRemove(line, this.currentTabSize, identation);
      if (data.lastIndexOf("{"))
        data = data.replace(
          /\s{0,}\{/,
          `\n${whiteSpaceRemove("{", this.currentTabSize, identation)}`
        );
      this.currentTabSize++;
      return data;
    }

    if (IsIf.test(line)) {
      let data = line.replace(/( {0,}if) {0,}\(/, "$1 (");
      data = whiteSpaceRemove(data, this.currentTabSize, identation);

      if (data.lastIndexOf("{") >= data.length - 1) {
        data = data.replace(
          /\s{0,}\{/,
          `\n${whiteSpaceRemove("{", this.currentTabSize, identation)}`
        );
        this.currentTabSize++;
        this.isIfStatement = true;
        this.ifWithKey = true;
      }

      if (data.includes("}")) {
        data = data.replace(
          "{",
          `{\n${identation.repeat(this.currentTabSize + 1)}`
        );
        data = data.replace(
          "}",
          `\n${whiteSpaceRemove("}", this.currentTabSize, identation)}`
        );
      }

      if (data.lastIndexOf(")") >= data.length - 1) {
        this.currentTabSize++;
        this.isIfStatement = true;
      }

      return data;
    }

    if (IsElse.test(line)) {
      let data = whiteSpaceRemove(line, this.currentTabSize, identation);
      if (data.trim().endsWith("{")) {
        data = data
          .trim()
          .replace(
            "{",
            `\n${whiteSpaceRemove("{", this.currentTabSize - 1, identation)}`
          );
      }
      if (data.trim().startsWith("}")) {
        data = data.replace(
          "}",
          `${whiteSpaceRemove("}", this.currentTabSize - 1, identation)}\n`
        );
        data = data.replace(
          "else",
          `${whiteSpaceRemove("else", this.currentTabSize - 1, identation)}`
        );
      }
      this.currentTabSize++;
      return data;
    }

    if (IsBrackts.test(line)) {
      return whiteSpaceRemove(line, this.currentTabSize - 1, identation);
    }

    if (IsLogicalOperator.test(line)) {
      return whiteSpaceRemove(line, this.currentTabSize + 1, identation);
    }

    if (IsFunctionArgsBegin.test(line)) {
      const data = whiteSpaceRemove(line, this.currentTabSize, identation);
      this.currentTabSize++;
      return data;
    }

    if (IsFunctionArgsEnd.test(line)) {
      this.currentTabSize--;
      return whiteSpaceRemove(line, this.currentTabSize, identation);
    }

    if (IsNewJson.test(line)) {
      const data = whiteSpaceRemove(line, this.currentTabSize, identation);
      this.currentTabSize++;
      return data;
    }

    const newLine = whiteSpaceRemove(line, this.currentTabSize, identation);
    return newLine;
  }

  private preFormat(text:string): string {
    text = text.replace(/([A-Za-z0-9]{1,})( {0,})(\{)/gm, "$1 $3");
    text = text.replace(/(property) ([A-Za-z0-9]{1,}) ([A-Za-z0-9]{1,})(\s{0,}):(\s{0,})/gm, "$1 $2 $3: ");
    text = text.replace(/([A-Za-z0-9]{1,})(\s{0,}):(\s{0,})(\{|\[|\()/gm, "$1: $4");

    return text;
  }

  formattingDocument(params: DocumentFormattingParams): TextEdit[] {
    this.resetGlobalVars();
    this.initGlobalVars(params);
    const textEdit: TextEdit[] = [];

    if (!this.doc) {
      return textEdit;
    }

    const fileData = this.preFormat(this.doc.getText());
    fileData.split("\n").forEach((line, index) => {
      const data = this.Regex(line, index === 0, this.tabSize);
      textEdit.push(
        TextEdit.replace(
          Range.create(
            Position.create(index, 0),
            Position.create(index, line.length)
          ),
          data.trimEnd()
        )
      );
    });

    this.resetGlobalVars();
    return textEdit;
  }
}
