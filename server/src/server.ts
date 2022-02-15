import * as fs from "fs";
import * as path from "path";
import { TextDocument } from "vscode-languageserver-textdocument";
import {
  CodeAction,
  CodeActionKind,
  CodeActionParams,
  Command,
  CompletionItem,
  CompletionItemKind,
  CompletionParams,
  createConnection,
  Definition,
  DefinitionParams,
  Diagnostic,
  DiagnosticSeverity,
  DidChangeConfigurationNotification,
  DidChangeWatchedFilesParams,
  DocumentFormattingParams,
  FileChangeType,
  HandlerResult,
  InitializeParams,
  InitializeResult,
  Location,
  Position,
  ProposedFeatures,
  Range,
  TextDocumentChangeEvent,
  TextDocuments,
  TextDocumentSyncKind,
  TextEdit,
  WorkspaceFolder,
} from "vscode-languageserver/node";

import { Regex } from "./libs";
import References from "./types";

class ServiceDispatcher {
  private connection = createConnection(ProposedFeatures.all);
  private documents: TextDocuments<TextDocument> = new TextDocuments(
    TextDocument
  );

  private workspaceFolders: WorkspaceFolder[] | null = null;
  private hasWorkspaceFolderCapability = false;
  private hasConfigurationCapability = false;
  private mainCppDir = "";
  private qrcData: string[] = [];
  private mainCppcData: string[] = [];

  private readonly references: string[] = [
    "function",
    "property",
    "signal",
    "id",
  ];

  constructor() {
    this.documents.onDidOpen((change) => this.onDidOpen(change));
    this.documents.onDidChangeContent((change) =>
      this.onDidChangeContent(change)
    );
    this.connection.onDidChangeWatchedFiles((handler) =>
      this.onDidChangeWatchedFiles(handler)
    );

    this.connection.onInitialize((handler) => this.onInitialize(handler));
    this.connection.onInitialized((_) => this.onInitialized());
    this.connection.onCompletion((pos) => this.onCompletion(pos));
    this.connection.onCompletionResolve((handler) =>
      this.onCompletionResolve(handler)
    );
    this.connection.onDocumentFormatting((params) =>
      this.onDocumentFormatting(params)
    );
    this.connection.onDocumentRangeFormatting((params) =>
      this.onDocumentRangeFormatting(params)
    );
    this.connection.onDefinition((params) => this.onDefinition(params));
    this.connection.onCodeAction((params: CodeActionParams) =>
      this.onCodeAction(params)
    );

    // this.documents.onDidClose(change => this.onDidClose(change));
    // this.connection.onDocumentSymbol(handler => this.onDocumentSymbol(handler));
    // this.connection.onWorkspaceSymbol(handler => this.onWorkspaceSymbol(handler));
    // this.connection.onDidChangeConfiguration(change => this.onDidChangeConfiguration(change));

    this.documents.listen(this.connection);
    this.connection.listen();
  }

  private onInitialize(params: InitializeParams): InitializeResult {
    const capabilities = params.capabilities;
    this.workspaceFolders = params.workspaceFolders;

    this.hasConfigurationCapability = !!(
      capabilities.workspace && !!capabilities.workspace.configuration
    );
    this.hasWorkspaceFolderCapability = !!(
      capabilities.workspace && !!capabilities.workspace.workspaceFolders
    );

    const result: InitializeResult = {
      capabilities: {
        textDocumentSync: TextDocumentSyncKind.Incremental,
        completionProvider: {
          resolveProvider: true,
          triggerCharacters: ["."],
        },
        definitionProvider: true,
        documentFormattingProvider: true,
        documentRangeFormattingProvider: true,
        codeActionProvider: true,
      },
    };
    if (this.hasWorkspaceFolderCapability) {
      result.capabilities.workspace = {
        workspaceFolders: {
          supported: true,
        },
      };
    }
    return result;
  }

  private onInitialized(): void {
    if (this.hasConfigurationCapability) {
      this.connection.client.register(
        DidChangeConfigurationNotification.type,
        undefined
      );
    }
    if (this.hasWorkspaceFolderCapability) {
      this.connection.workspace.onDidChangeWorkspaceFolders((_event) => {
        this.connection.console.log("Workspace folder change event received.");
      });
    }
    if (this.workspaceFolders) {
      this.updateQrcData();
      this.updateMainCpp();
    }
  }

  private onDidChangeContent(
    change: TextDocumentChangeEvent<TextDocument>
  ): void {
    this.validateImports(change.document);
  }

  private onDidOpen(change: TextDocumentChangeEvent<TextDocument>): void {
    this.validateImports(change.document);
  }

  private onDidChangeWatchedFiles(handler: DidChangeWatchedFilesParams): void {
    if (
      handler.changes.some(
        (change) =>
          change.uri.endsWith(".qrc") && change.type === FileChangeType.Changed
      )
    ) {
      const uri = handler.changes.find((change) =>
        change.uri.endsWith(".qrc")
      )!.uri;
      this.updateQrcData(uri);
    } else if (
      handler.changes.some(
        (change) =>
          change.uri.endsWith("main.cpp") &&
          change.type === FileChangeType.Changed
      )
    ) {
      const uri = handler.changes.find((change) =>
        change.uri.endsWith("main.cpp")
      )!.uri;
      this.updateMainCpp(uri);
    }
  }

  private onCompletion(complitionPosition: CompletionParams): CompletionItem[] {
    let prop: string[] = [];
    let itens: CompletionItem[] = [];

    try {
      const doc = this.documents.get(complitionPosition.textDocument.uri);
      if (!doc) return [];

      const text = doc.getText();
      if (!text) return [];

      const textLine = text.split("\n")[complitionPosition.position.line];
      const wordList = textLine
        .slice(0, complitionPosition.position.character)
        .split(" ");

      const word = wordList && wordList[wordList?.length - 1];

      if (!word)
        return this.getComponentProps(text, complitionPosition.position.line);

      if (
        !complitionPosition.context ||
        complitionPosition.context.triggerKind === 1
      ) {
        // trigged by 'ctrl+space'
        prop = text
          .split("\n")
          .filter((str: string) => str.match(new RegExp(`${word}`)))
          .filter((str: string) => str !== textLine);

        itens = prop.map((str) => {
          const item: CompletionItem = {} as CompletionItem;

          if (str.includes("function") || str.includes("signal")) {
            item.kind = CompletionItemKind.Function;
          } else if (str.includes("property")) {
            item.kind = CompletionItemKind.Property;
          } else if (str.trim().endsWith("{")) {
            item.kind = CompletionItemKind.Module;
          } else if (str.includes("id:")) {
            item.kind = CompletionItemKind.Keyword;
          } else {
            item.kind = CompletionItemKind.Text;
          }

          let complitionText =
            str.split(" ").find((tx: string) => tx.includes(word!)) || "";
          complitionText =
            (complitionText.match(/[A-z]+/) || [])[0] || complitionText;

          item.data = complitionText;
          item.label = complitionText;

          return item;
        });
        itens = [
          ...this.getCustomComponents(),
          ...this.getDefaultComponents(),
          ...this.getComponentProps(
            text,
            complitionPosition.position.line
          ).filter((item: CompletionItem) =>
            item.data.toLowerCase().includes(word)
          ),
          ...itens,
        ];
      }

      if (complitionPosition.context?.triggerKind === 2 || word.includes(".")) {
        // trigged by '.'
        const componentId = word.split(".")[0];

        if (componentId === "JSON") {
          prop = ["stringify", "parse"];

          itens = prop.map((str) => {
            const item: CompletionItem = {} as CompletionItem;

            item.kind = CompletionItemKind.Function;

            item.data = str;
            item.label = str;

            return item;
          });
        } else {
          const match = text.match(new RegExp(`id: ?${componentId}`));
          if (!match)
            return this.getPropsFromProp(
              text,
              complitionPosition.position.line,
              word
            );
          let parsedData = text.slice(match.index, text.length);
          const finalData = parsedData.match(/[a-zA-Z]{1,}\s{0,}\{/);
          let lastIndex = parsedData.length;
          if (finalData && finalData.index) lastIndex = finalData.index;

          parsedData = parsedData.slice(0, lastIndex);

          prop = parsedData
            .split("\n")
            .filter(
              (line: string): boolean =>
                this.references.some((ref) => line.trim().startsWith(ref)) ||
                line.includes(":")
            )
            .filter((line: string): boolean => !line.trim().startsWith("id"));

          itens = prop.map((str) => {
            const item: CompletionItem = {} as CompletionItem;

            if (str.includes("function") || str.includes("signal")) {
              item.kind = CompletionItemKind.Function;
            } else {
              item.kind = CompletionItemKind.Property;
            }

            let complitionText = str
              .replace(/(property [a-zA-Z0-9]{1,}|function |signal )/, "")
              .trim()
              .replace(/:.*|\(.*/, "");
            complitionText =
              (complitionText.match(/[A-z]+/) || [])[0] || complitionText;

            item.data = complitionText;
            item.label = complitionText;

            return item;
          });
          itens = [
            ...itens,
            ...this.getCustomComponents(),
            ...this.getDefaultComponents(),
            ...this.getComponentProps(text, complitionPosition.position.line),
          ].filter(
            (item: CompletionItem): boolean =>
              !item.data.trim().startsWith("id")
          );
        }
      }

      itens = itens.filter(
        (item, index) => itens.findIndex((i) => i.data === item.data) == index
      );
    } catch (error) {
      console.error(error);
    }

    return itens;
  }

  private onCompletionResolve(item: CompletionItem): CompletionItem {
    return item;
  }

  private getProps(component: string): any {
    const defaultComp = References[component];
    if (!defaultComp) return {};
    const props = defaultComp.properties;
    if (defaultComp.inherit)
      return Object.assign({}, props, this.getProps(defaultComp.inherit));
    return props;
  }

  private getComponentProps(text: string, line: number): CompletionItem[] {
    let prop: string[] = [];
    let itens: CompletionItem[] = [];

    const header: string[] = text
      .split("\n")
      .slice(0, line)
      .filter((str) => str.match(/[a-zA-Z]{1,}\s{0,}:{0,1}\s{0,}\{/));
    let component: string = header[header.length - 1] || "";
    if (component) {
      component = component.replace(/(\(|\{|:).*/, "").trim();
      prop = [
        ...prop,
        ...Object.keys(this.getProps(component)),
        ...this.getPropsFromProp(text, line, component).map(
          (item) => item.data
        ),
      ];

      itens = prop.map((str) => {
        const item: CompletionItem = {} as CompletionItem;

        if (str.includes("function") || str.includes("signal")) {
          item.kind = CompletionItemKind.Function;
        } else {
          item.kind = CompletionItemKind.Property;
        }

        let complitionText = str
          .replace(/(property [a-zA-Z0-9]{1,}|function |signal )/, "")
          .trim()
          .replace(/:.*|\(.*/, "");
        complitionText =
          (complitionText.match(/[A-z]+/) || [])[0] || complitionText;

        item.data = complitionText;
        item.label = complitionText;

        return item;
      });
    }

    return itens;
  }

  // TODO: Add custom property catch
  private getPropsFromProp(
    text: string,
    line: number,
    property = ""
  ): CompletionItem[] {
    let prop: string[] = [];
    let itens: CompletionItem[] = [];

    const header: string[] = text
      .split("\n")
      .slice(0, line)
      .filter((str) => str.match(/[a-zA-Z]{1,}\s{0,}\{/));
    let component: string = header[header.length - 1] || "";
    if (component) {
      component = component.replace(/(\(|\{|:).*/, "").trim();
      const defaultProp = this.getProps(component);
      const propertyList = property.split(".").filter((item) => !!item);
      let propChildrens =
        propertyList.reduce((acc, value) => (acc = acc[value]), defaultProp) ||
        {};
      if (typeof propChildrens === "string") propChildrens = {};
      prop = [...prop, ...Object.keys(propChildrens)];

      itens = prop.map((str) => {
        const item: CompletionItem = {} as CompletionItem;

        if (str.includes("function") || str.includes("signal")) {
          item.kind = CompletionItemKind.Function;
        } else {
          item.kind = CompletionItemKind.Property;
        }

        let complitionText = str
          .replace(/(property [a-zA-Z0-9]{1,}|function |signal )/, "")
          .trim()
          .replace(/:.*|\(.*/, "");
        complitionText =
          (complitionText.match(/[A-z]+/) || [])[0] || complitionText;

        item.data = complitionText;
        item.label = complitionText;

        return item;
      });
    }
    return itens;
  }

  private getCustomComponents(): CompletionItem[] {
    if (this.workspaceFolders) {
      const itens = this.qrcData.map((i) => {
        const list = i.split("/");
        const complitionText = list[list.length - 1];

        const item: CompletionItem = {
          data: complitionText,
          label: complitionText,
          kind: CompletionItemKind.Module,
        };
        return item;
      });

      return itens;
    }
    return [];
  }

  private getDefaultComponents(): CompletionItem[] {
    const itens: CompletionItem[] = Object.keys(References).map((component) => {
      const item: CompletionItem = {
        data: component,
        label: component,
        kind: CompletionItemKind.Module,
        documentation: References[component].doc,
        detail: References[component].doc && component,
      };
      return item;
    });

    return itens;
  }

  // TODO: fix diagnostic when has 2 components with same name.
  private async validateImports(textDocument: TextDocument): Promise<void> {
    const doc = this.documents.get(textDocument.uri);
    const text = doc!.getText();
    const imports = text
      .split("\n")
      .filter((line) => line.startsWith("import"));

    const pattern = /[a-zA-Z]{1,} {0,}\{/g;
    let m: RegExpExecArray | null;

    const diagnostics: Diagnostic[] = [];
    while ((m = pattern.exec(text))) {
      const comp = m[0].replace("{", "").trim();
      const findedComp = this.qrcData.filter(
        (qrc) => qrc.split("/").pop() === comp
      );
      findedComp.forEach((component: string): void => {
        const importUrl = component.split("/").slice(0, -1).join("/");
        const isSamePath =
          textDocument.uri
            .replace(this.mainCppDir, "")
            .replace("file://", "")
            .split("/")
            .slice(0, -1)
            .filter((i) => i)
            .join("/") === importUrl || false;
        if (
          !!findedComp &&
          !!importUrl &&
          !isSamePath &&
          !imports.some(
            (line) =>
              line
                .replace(/(import| |"|qrc:\/)/g, "")
                .split("/")
                .filter((i) => i)
                .join("/") === importUrl
          )
        ) {
          const diagnostic: Diagnostic = {
            severity: DiagnosticSeverity.Error,
            range: {
              start: textDocument.positionAt(m!.index),
              end: textDocument.positionAt(m!.index + comp.length),
            },
            message: `${comp} missing import "qrc:/${importUrl}"`,
            data: `import "qrc:/${importUrl}"`,
            source: "qml-formatter",
          };
          diagnostics.push(diagnostic);
        }
      });
    }

    // Send the computed diagnostics to VS Code.
    this.connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
  }

  private onDocumentFormatting(params: DocumentFormattingParams): TextEdit[] {
    const doc = this.documents.get(params.textDocument.uri);
    if (!doc) return [];

    const file = doc.getText();
    const tabSize: string = params.options.insertSpaces
      ? " ".repeat(params.options.tabSize)
      : "\t";

    const textEdit: TextEdit[] = [];

    file.split("\n").forEach((line, index) => {
      const data = Regex(this.preFormatter(line), index === 0, tabSize);
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

    return textEdit;
  }

  private onDocumentRangeFormatting(
    params: DocumentFormattingParams
  ): TextEdit[] {
    return [];
  }

  private preFormatter(textDocument: string): string {
    const textDocumentFormatted = textDocument
      .replace(/\s{0,}:\s{0,}/g, ": ");
    return textDocumentFormatted || textDocument;
  }

  private onDefinition(
    params: DefinitionParams
  ): Definition | Location[] | undefined {
    try {
      const {
        textDocument: { uri },
        position: { character, line },
      } = params;

      const doc = this.documents.get(uri);
      if (!doc) return;

      const data = doc.getText();
      if (!data) return;

      const textLine = data.split("\n")[line];
      const wordList = textLine.slice(0, character)?.split(" ");
      let word: string = wordList && wordList[wordList?.length - 1];
      word = textLine!.split(" ").find((txt) => txt.includes(word)) || word;
      word = word.replace(/(\(|\{|:).*/, "");

      if (word.includes("Component")) return;

      let prop = data
        ?.split("\n")
        .filter((str: string) => str.match(new RegExp(`${word}`)))
        .filter((str: string) => str !== textLine)
        .filter((str: string) =>
          this.references.some((reference): boolean => str.includes(reference))
        )
        .filter((str: string) =>
          str
            .split(" ")
            .some(
              (txt: string): boolean => txt.replace(/(\(|\{|:).*/, "") === word
            )
        );

      if (word.includes(".")) {
        const componentId = word.split(".")[0];
        const defText = wordList[wordList?.length - 1];
        const splited = word.split(".");
        word = splited.find((txt) => txt.includes(defText)) || splited[1];

        const match = data.match(new RegExp(`id: ?${componentId}`));
        if (!match) return [];
        let parsedData = data.slice(match.index, data.length);
        const finalData = parsedData.match(/[a-zA-Z]{1,}\s{0,}\{/);
        let lastIndex = parsedData.length;
        if (finalData && finalData.index) lastIndex = finalData.index;

        parsedData = parsedData.slice(0, lastIndex);

        prop = parsedData
          .split("\n")
          .filter(
            (line: string): boolean =>
              this.references.some((ref) => line.trim().startsWith(ref)) ||
              line.includes(":")
          )
          .filter((str: string) =>
            str
              .split(" ")
              .some(
                (txt: string): boolean =>
                  txt.replace(/(\(|\{|:).*/, "") === word
              )
          );
      }

      if (this.qrcData.some((qrc) => qrc.split("/").pop() === word)) {
        if (this.workspaceFolders) {
          this.updateMainCppDir();
          const rootUri = `${this.mainCppDir}/${this.qrcData.find(
            (qrc) => qrc.split("/").pop() === word
          )}.qml`;
          const defUri = `file://${rootUri}`;
          const data = fs
            .readFileSync(rootUri, { encoding: "utf8" })
            .split("\n");
          const line = data.findIndex((line) =>
            /[a-zA-Z0-9]{0,} \{/.test(line)
          );
          const character = data[line].trim().replace(/ .*/g, "").length;

          return Location.create(defUri, {
            start: { line, character: 0 },
            end: { line, character },
          });
        }
      }

      if (!prop || prop.length === 0) return;
      if (prop.length === 1) {
        const definitionLine = data
          .split("\n")
          .findIndex((str) => str.includes(word));
        const text = data.split("\n")[definitionLine];
        const initPosition = text.indexOf(word);
        const endPosition = initPosition + word.length;

        return Location.create(uri, {
          start: { line: definitionLine, character: initPosition },
          end: { line: definitionLine, character: endPosition },
        });
      } else {
        const locations: Location[] = [];

        prop.forEach((item) => {
          const initPosition = item.indexOf(word);
          const endPosition = initPosition + word.length;
          const definitionLine = data.split("\n").indexOf(item);
          locations.push(
            Location.create(uri, {
              start: { line: definitionLine, character: initPosition },
              end: { line: definitionLine, character: endPosition },
            })
          );
        });

        return locations;
      }
    } catch (error) {
      console.error(error);
    }
  }

  private onCodeAction(
    params: CodeActionParams
  ): HandlerResult<(Command | CodeAction)[] | null | undefined, void> {
    if (!params.context.diagnostics.length) return;
    const doc = this.documents.get(params.textDocument.uri);
    const actions: CodeAction[] = [];
    params.context.diagnostics.forEach((action) => {
      const codeAction =
        (action.data as string) || action.message.split(" ")[0] || "";
      actions.push(this.createImport(doc!, codeAction));
    });
    return actions;
  }

  private createImport(document: TextDocument, data: string): CodeAction {
    const textEdit: TextEdit[] = [];

    const text = document.getText();
    const imports = text
      .split("\n")
      .filter((line) => line.trim().startsWith("import"));
    const impLine = imports[imports.length - 1];
    const line = text
      .split("\n")
      .findIndex((line) => line === imports[imports.length - 1]);

    if (impLine) {
      textEdit.push(
        TextEdit.insert(
          Position.create(line, impLine.length),
          `\n${data.trim()}`
        )
      );
    } else {
      const line = text
        .split("\n")
        .findIndex((line) => /[a-zA-Z0-9]{1,} {0,}\{/.test(line));
      textEdit.push(
        TextEdit.insert(Position.create(line, 0), `${data.trim()}\n\n`)
      );
    }

    const fix: CodeAction = {
      title: `Add missing ${data}`,
      kind: CodeActionKind.QuickFix,
      edit: {
        changes: {
          [document.uri]: textEdit,
        },
      },
      data,
    };
    return fix;
  }

  private getDirsFile(
    pathToSearch: string,
    arrayOfFiles: string[] = []
  ): string[] {
    const files = fs.readdirSync(pathToSearch);

    for (const file of files) {
      if (fs.statSync(pathToSearch + "/" + file).isDirectory()) {
        arrayOfFiles = this.getDirsFile(
          pathToSearch + "/" + file,
          arrayOfFiles
        );
      } else {
        arrayOfFiles.push(path.join(pathToSearch, "/", file));
      }
    }

    return arrayOfFiles;
  }

  private updateMainCppDir() {
    if (!this.mainCppDir && this.workspaceFolders) {
      const files = this.getDirsFile(
        this.workspaceFolders[0].uri.replace("file://", "")
      );
      this.mainCppDir = files.find((file) => file.includes("main.cpp")) || "";
      this.mainCppDir = this.mainCppDir.split("/").slice(0, -1).join("/");
    }
  }

  private updateQrcData(uri = ""): void {
    if (this.workspaceFolders) {
      this.updateMainCppDir();
      let data = "";
      if (uri) {
        const rootPath = uri.replace("file://", "");
        data = fs.readFileSync(rootPath, { encoding: "utf8" });
      } else {
        const rootPath = this.mainCppDir.replace("file://", "");
        const files = fs
          .readdirSync(rootPath)
          .filter((i) => i.includes(".qrc"));
        data = files
          .map((file) =>
            fs.readFileSync(`${this.mainCppDir}/${file}`, { encoding: "utf8" })
          )
          .join("\n");
      }
      this.qrcData = data
        .split("\n")
        .filter((line) => line.includes(".qml"))
        .map((line) =>
          line
            .trim()
            .replace("<file>", "")
            .replace("</file>", "")
            .replace(".qml", "")
        );
    }
  }

  private updateMainCpp(uri = ""): void {
    if (this.workspaceFolders) {
      this.updateQrcData();
      let data = "";
      if (uri) {
        const rootPath = uri.replace("file://", "");
        data = fs.readFileSync(rootPath, { encoding: "utf8" });
      } else {
        const rootPath = `${this.mainCppDir.replace("file://", "")}/main.cpp`;
        data = fs.readFileSync(rootPath, { encoding: "utf8" });
      }
      this.mainCppcData = data
        .split("\n")
        .filter((line) => line.includes("qmlRegister"))
        .map(
          (line) => line.trim()
          // .replace(/(.*.\(|\).*)/g, '')
        );
      console.log(this.mainCppcData);
    }
  }
}

let serviceDispatcher: ServiceDispatcher | null = null;

if (serviceDispatcher === null) {
  serviceDispatcher = new ServiceDispatcher();
}
