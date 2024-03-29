"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const node_1 = require("vscode-languageserver/node");
const formatter_1 = require("./formatter");
const types_1 = require("./types");
require("./utils/prototypes");
class ServiceDispatcher {
    constructor() {
        this.connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
        this.documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
        this.workspaceFolders = null;
        this.hasWorkspaceFolderCapability = false;
        this.hasConfigurationCapability = false;
        this.mainCppDir = "";
        this.qrcData = [];
        this.qmlFiles = [];
        this.mainCppcData = [];
        this.references = [
            "function",
            "property",
            "signal",
            "id",
        ];
        this.formatter = new formatter_1.Formatter(this.documents);
        this.documents.onDidOpen((change) => this.onDidOpen(change));
        this.documents.onDidClose((change) => this.onDidClose(change));
        this.documents.onDidChangeContent((change) => this.onDidChangeContent(change));
        this.connection.onDidChangeWatchedFiles((handler) => this.onDidChangeWatchedFiles(handler));
        this.connection.onInitialize((handler) => this.onInitialize(handler));
        this.connection.onInitialized((_) => this.onInitialized());
        this.connection.onCompletion((pos) => this.onCompletion(pos));
        this.connection.onCompletionResolve((handler) => this.onCompletionResolve(handler));
        this.connection.onDocumentFormatting((params) => this.formatter.formattingDocument(params));
        this.connection.onDocumentRangeFormatting((params) => this.onDocumentRangeFormatting(params));
        this.connection.onDefinition((params) => this.onDefinition(params));
        this.connection.onCodeAction((params) => this.onCodeAction(params));
        // this.connection.onDocumentSymbol(handler => this.onDocumentSymbol(handler));
        // this.connection.onWorkspaceSymbol(handler => this.onWorkspaceSymbol(handler));
        // this.connection.onDidChangeConfiguration(change => this.onDidChangeConfiguration(change));
        this.documents.listen(this.connection);
        this.connection.listen();
    }
    onInitialize(params) {
        const capabilities = params.capabilities;
        this.workspaceFolders = params.workspaceFolders;
        this.hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
        this.hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
        const result = {
            capabilities: {
                textDocumentSync: node_1.TextDocumentSyncKind.Incremental,
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
    onInitialized() {
        if (this.hasConfigurationCapability) {
            this.connection.client.register(node_1.DidChangeConfigurationNotification.type, undefined);
        }
        if (this.hasWorkspaceFolderCapability) {
            this.connection.workspace.onDidChangeWorkspaceFolders((_event) => {
                this.connection.console.log("Workspace folder change event received.");
            });
        }
        if (this.workspaceFolders) {
            this.updateQrcData();
            this.updateMainCpp();
            this.getAllQmlFiles();
        }
    }
    onDidChangeContent(change) {
        this.validateImports(change.document);
    }
    onDidOpen(change) {
        this.validateImports(change.document);
    }
    onDidClose(change) {
        this.connection.sendDiagnostics({
            uri: change.document.uri,
            diagnostics: [],
        });
    }
    onDidChangeWatchedFiles(handler) {
        if (handler.changes.some((change) => change.uri.endsWith(".qrc") && change.type === node_1.FileChangeType.Changed)) {
            const uri = handler.changes.find((change) => change.uri.endsWith(".qrc")).uri;
            this.updateQrcData(uri);
        }
        else if (handler.changes.some((change) => change.uri.endsWith("main.cpp") &&
            change.type === node_1.FileChangeType.Changed)) {
            const uri = handler.changes.find((change) => change.uri.endsWith("main.cpp")).uri;
            this.updateMainCpp(uri);
        }
        else if (handler.changes.some(({ uri }) => uri.endsWith(".qml"))) {
            const change = handler.changes.find(({ uri }) => uri.endsWith(".qml"));
            console.log(change.uri);
            // if (change.type === FileChangeType.Changed) {
            //   this.updateQmlFile(change.uri);
            // }
        }
    }
    onCompletion(complitionPosition) {
        var _a, _b;
        let prop = [];
        let itens = [];
        try {
            const doc = this.documents.get(complitionPosition.textDocument.uri);
            if (!doc)
                return [];
            const text = doc.getText();
            if (!text)
                return [];
            const textLine = text.split("\n")[complitionPosition.position.line];
            const wordList = textLine
                .slice(0, complitionPosition.position.character)
                .split(" ");
            const word = wordList && wordList[(wordList === null || wordList === void 0 ? void 0 : wordList.length) - 1];
            if (!word)
                return this.getComponentProps(text, complitionPosition.position.line);
            if (word.includes("console.")) {
                return [
                    {
                        label: "log",
                        kind: node_1.CompletionItemKind.Function,
                        documentation: "console.log",
                        insertText: "log();",
                    },
                    {
                        label: "assert",
                        kind: node_1.CompletionItemKind.Function,
                        documentation: "console.assert",
                        insertText: "assert();",
                    },
                    {
                        label: "warn",
                        kind: node_1.CompletionItemKind.Function,
                        documentation: "console.warn",
                        insertText: "warn();",
                    },
                    {
                        label: "error",
                        kind: node_1.CompletionItemKind.Function,
                        documentation: "console.error",
                        insertText: "error();",
                    },
                    {
                        label: "info",
                        kind: node_1.CompletionItemKind.Function,
                        documentation: "console.info",
                        insertText: "info();",
                    },
                    {
                        label: "debug",
                        kind: node_1.CompletionItemKind.Function,
                        documentation: "console.debug",
                        insertText: "debug();",
                    },
                    {
                        label: "trace",
                        kind: node_1.CompletionItemKind.Function,
                        documentation: "console.trace",
                        insertText: "trace();",
                    },
                    {
                        label: "time",
                        kind: node_1.CompletionItemKind.Function,
                        documentation: "console.time",
                        insertText: "time();",
                    },
                    {
                        label: "timeEnd",
                        kind: node_1.CompletionItemKind.Function,
                        documentation: "console.timeEnd",
                        insertText: "timeEnd();",
                    },
                    {
                        label: "count",
                        kind: node_1.CompletionItemKind.Function,
                        documentation: "console.count",
                        insertText: "count();",
                    },
                ];
            }
            if (((_a = complitionPosition.context) === null || _a === void 0 ? void 0 : _a.triggerKind) === 1) {
                // trigged by 'ctrl+space'
                prop = text
                    .split("\n")
                    .filter((str) => str.match(new RegExp(`${word}`)))
                    .filter((str) => str !== textLine);
                itens = prop.map((str) => {
                    const item = {};
                    if (str.includes("function") || str.includes("signal")) {
                        item.kind = node_1.CompletionItemKind.Function;
                    }
                    else if (str.includes("property")) {
                        item.kind = node_1.CompletionItemKind.Property;
                    }
                    else if (str.trim().endsWith("{")) {
                        item.kind = node_1.CompletionItemKind.Module;
                    }
                    else if (str.includes("id:")) {
                        item.kind = node_1.CompletionItemKind.Keyword;
                    }
                    else {
                        item.kind = node_1.CompletionItemKind.Text;
                    }
                    let complitionText = str.split(" ").find((tx) => tx.includes(word)) || "";
                    complitionText =
                        (complitionText.match(/[A-z]+/) || [])[0] || complitionText;
                    item.data = complitionText;
                    item.label = complitionText;
                    return item;
                });
                const propertyData = this.getpropertyData(text, word.split(".")[0]);
                if (propertyData) {
                    const wordList = word.split(".").filter((str) => str);
                    let property = JSON.parse(propertyData);
                    wordList
                        .slice(1)
                        .forEach((item) => (property = property[item] || {}));
                    itens = [
                        ...itens,
                        ...Object.keys(property).map((key) => {
                            const item = {};
                            item.kind = node_1.CompletionItemKind.Property;
                            item.label = key;
                            item.data = key;
                            return item;
                        }),
                    ];
                }
                itens = [
                    ...this.getCustomComponents(),
                    ...this.getDefaultComponents(),
                    ...this.getCompletionProps(word),
                    ...this.getComponentProps(text, complitionPosition.position.line).filter((item) => item.data.toLowerCase().includes(word)),
                    ...itens,
                ];
            }
            if (((_b = complitionPosition.context) === null || _b === void 0 ? void 0 : _b.triggerKind) === 2 || word.includes(".")) {
                // trigged by '.'
                const componentId = word.split(".")[0];
                if (componentId === "JSON") {
                    prop = ["stringify", "parse"];
                    itens = prop.map((str) => {
                        const item = {};
                        item.kind = node_1.CompletionItemKind.Function;
                        item.data = str;
                        item.label = str;
                        return item;
                    });
                }
                else {
                    const match = text.match(new RegExp(`id: ?${componentId}`));
                    if (match) {
                        let parsedData = text.slice(match.index, text.length);
                        const finalData = parsedData.match(/[a-zA-Z]{1,}\s{0,}\{/);
                        let lastIndex = parsedData.length;
                        if (finalData && finalData.index)
                            lastIndex = finalData.index;
                        parsedData = parsedData.slice(0, lastIndex);
                        prop = parsedData
                            .split("\n")
                            .filter((line) => this.references.some((ref) => line.trim().startsWith(ref)) ||
                            line.includes(":"))
                            .filter((line) => !line.trim().startsWith("id"));
                        itens = prop.map((str) => {
                            const item = {};
                            if (str.includes("function") || str.includes("signal")) {
                                item.kind = node_1.CompletionItemKind.Function;
                            }
                            else {
                                item.kind = node_1.CompletionItemKind.Property;
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
                    const propertyData = this.getpropertyData(text, componentId);
                    if (propertyData) {
                        const wordList = word.split(".").filter((str) => str);
                        let property = JSON.parse(propertyData.replace(/,\s{0,}\}/g, "}"));
                        wordList
                            .slice(1)
                            .forEach((item) => (property = property[item] || {}));
                        if (typeof property === "object") {
                            itens = [
                                ...itens,
                                ...Object.keys(property).map((key) => {
                                    const item = {};
                                    item.kind = node_1.CompletionItemKind.Property;
                                    item.label = key;
                                    item.data = key;
                                    return item;
                                }),
                            ];
                        }
                    }
                    itens = [
                        ...itens,
                        ...this.getCompletionProps(word),
                        ...this.getComponentProps(text, complitionPosition.position.line),
                    ].filter((item) => !item.data.trim().startsWith("id"));
                }
            }
            itens = itens.filter((item, index) => itens.findIndex((i) => i.data === item.data) == index);
        }
        catch (error) {
            console.error(error);
        }
        return itens;
    }
    getpropertyData(text, property, index = 0) {
        const propMatch = text.match(new RegExp(` ?.*property [A-Za-z0-9]+ ?${property}: ?{`));
        if (propMatch) {
            const propData = text.slice(propMatch.index);
            let lastIndex = propData.indexOf("}");
            let tmpData = propData.slice(0, lastIndex);
            while (tmpData.count("{") - 1 != tmpData.count("}")) {
                lastIndex = propData.indexOf("}", lastIndex + 1);
                tmpData = propData.slice(0, lastIndex);
            }
            tmpData = `{${tmpData
                .slice(tmpData.indexOf("{") + 1)
                .replace("'", '"')}}`;
            return tmpData;
        }
        return "";
    }
    getCompletionProps(word) {
        const itens = [];
        let clearedWord = "";
        if (word.includes("."))
            clearedWord = word.replace(/\..*/, "");
        else
            clearedWord = word;
        let componentUri = this.qrcData.find((item) => item.includes(clearedWord));
        if (componentUri) {
            componentUri = `${this.mainCppDir}/${componentUri}.qml`;
            const dataList = fs
                .readFileSync(componentUri, { encoding: "utf8" })
                .split("\n");
            const functionList = dataList
                .filter((line) => line.trim().startsWith("function"))
                .map((line) => line
                .replace(/\/\*.*\*\//g, "")
                .replace("function", "")
                .replace(/\(.*/g, "")
                .trim());
            itens.push(...functionList.map((name) => {
                const item = {
                    data: name,
                    label: name,
                    kind: node_1.CompletionItemKind.Function,
                };
                return item;
            }));
            const propertyRegex = /property [a-zA-Z0-9]{1,}/;
            const propertyList = dataList
                .filter((line) => propertyRegex.test(line))
                .map((line) => line
                .replace(/\/\*.*\*\//g, "")
                .replace(propertyRegex, "")
                .replace(/\(.*/g, "")
                .trim()
                .replace(/:.*/, ""));
            itens.push(...propertyList.map((name) => {
                const item = {
                    data: name,
                    label: name,
                    kind: node_1.CompletionItemKind.Property,
                };
                return item;
            }));
        }
        return itens;
    }
    onCompletionResolve(item) {
        return item;
    }
    getProps(component) {
        const defaultComp = types_1.default[component];
        if (!defaultComp)
            return {};
        const props = defaultComp.properties;
        if (defaultComp.inherit)
            return Object.assign({}, props, this.getProps(defaultComp.inherit));
        return props;
    }
    getComponentProps(text, line) {
        let prop = [];
        let itens = [];
        const header = text
            .split("\n")
            .slice(0, line)
            .filter((str) => str.match(/[a-zA-Z]{1,}\s{0,}:{0,1}\s{0,}\{/));
        let component = header[header.length - 1] || "";
        if (component) {
            component = component.replace(/(\(|\{|:).*/, "").trim();
            prop = [
                ...prop,
                ...Object.keys(this.getProps(component)),
                ...this.getPropsFromProp(text, line, component).map((item) => item.data),
            ];
            itens = prop.map((str) => {
                const item = {};
                if (str.includes("function") || str.includes("signal")) {
                    item.kind = node_1.CompletionItemKind.Function;
                }
                else {
                    item.kind = node_1.CompletionItemKind.Property;
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
    getPropsFromProp(text, line, property = "") {
        let prop = [];
        let itens = [];
        const header = text
            .split("\n")
            .slice(0, line)
            .filter((str) => str.match(/[a-zA-Z]{1,}\s{0,}\{/));
        let component = header[header.length - 1] || "";
        if (component) {
            component = component.replace(/(\(|\{|:).*/, "").trim();
            const defaultProp = this.getProps(component);
            const propertyList = property.split(".").filter((item) => !!item);
            let propChildrens = propertyList.reduce((acc, value) => (acc = acc[value]), defaultProp) ||
                {};
            if (typeof propChildrens === "string")
                propChildrens = {};
            prop = [...prop, ...Object.keys(propChildrens)];
            itens = prop.map((str) => {
                const item = {};
                if (str.includes("function") || str.includes("signal")) {
                    item.kind = node_1.CompletionItemKind.Function;
                }
                else {
                    item.kind = node_1.CompletionItemKind.Property;
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
    getCustomComponents() {
        if (this.workspaceFolders) {
            const itens = this.qrcData.map((i) => {
                const list = i.split("/");
                const complitionText = list[list.length - 1];
                const item = {
                    data: complitionText,
                    label: complitionText,
                    kind: node_1.CompletionItemKind.Module,
                };
                return item;
            });
            return itens;
        }
        return [];
    }
    getDefaultComponents() {
        const itens = Object.keys(types_1.default).map((component) => {
            const item = {
                data: component,
                label: component,
                kind: node_1.CompletionItemKind.Module,
                documentation: types_1.default[component].doc,
                detail: types_1.default[component].doc && component,
            };
            return item;
        });
        return itens;
    }
    // TODO: fix diagnostic when has 2 components with same name.
    async validateImports(textDocument) {
        const text = textDocument.getText();
        const imports = text
            .split("\n")
            .filter((line) => line.startsWith("import"));
        const pattern = /[a-zA-Z]{1,} {0,}\{/g;
        let m;
        const diagnostics = [];
        while ((m = pattern.exec(text))) {
            const comp = m[0].replace("{", "").trim();
            const findedComp = this.qrcData.filter((qrc) => qrc.split("/").pop() === comp);
            findedComp.forEach((component) => {
                const importUrl = component.split("/").slice(0, -1).join("/");
                const isSamePath = textDocument.uri
                    .replace(this.mainCppDir, "")
                    .replace("file://", "")
                    .split("/")
                    .slice(0, -1)
                    .filter((i) => i)
                    .join("/") === importUrl || false;
                if (!!findedComp &&
                    !!importUrl &&
                    !isSamePath &&
                    !imports.some((line) => {
                        const cleanedLine = line
                            .replace(/(import| |"|qrc:\/|\/\/.*)/g, "")
                            .split("/")
                            .filter((i) => i)
                            .join("/");
                        const componentUri = textDocument.uri
                            .split("/")
                            .slice(0, -1)
                            .join("/");
                        return (cleanedLine === importUrl ||
                            path
                                .join(componentUri, cleanedLine)
                                .replace(/file:\/{1,}/, "/")
                                .replace(this.mainCppDir, "")
                                .split("/")
                                .filter((i) => i)
                                .join("/") === importUrl);
                    })) {
                    const diagnostic = {
                        severity: node_1.DiagnosticSeverity.Error,
                        range: {
                            start: textDocument.positionAt(m.index),
                            end: textDocument.positionAt(m.index + comp.length),
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
    onDocumentRangeFormatting(params) {
        return [];
    }
    onDefinition(params) {
        var _a;
        try {
            const { textDocument: { uri }, position: { character, line }, } = params;
            this.updateMainCpp();
            const doc = this.documents.get(uri);
            if (!doc)
                return;
            const data = doc.getText();
            if (!data)
                return;
            const textLine = data.split("\n")[line];
            const wordList = (_a = textLine.slice(0, character)) === null || _a === void 0 ? void 0 : _a.split(" ");
            let word = wordList && wordList[(wordList === null || wordList === void 0 ? void 0 : wordList.length) - 1];
            word = textLine.split(" ").find((txt) => txt.includes(word)) || word;
            word = word.split("(").filter((txt) => !!txt)[0];
            if (word.includes("Component"))
                return;
            let prop = data === null || data === void 0 ? void 0 : data.split("\n").filter((str) => str.match(new RegExp(`${word}`))).filter((str) => str !== textLine).filter((str) => this.references.some((reference) => str.includes(reference))).filter((str) => str
                .split(" ")
                .some((txt) => txt.replace(/(\(|\{|:).*/, "") === word));
            if (this.qmlFiles.some((file) => file.fileName === word)) {
                return this.qmlFiles
                    .filter((file) => file.fileName === word)
                    .map(({ definitionPosition: { line, start, end }, uri: fileUri }) => {
                    return node_1.Location.create(fileUri.prefix("file://"), {
                        start: { line, character: start },
                        end: { line, character: end },
                    });
                });
            } /*  else if (
              this.qmlFiles.some((file) => file.fileName === word.split(".")[0])
            ) {
              console.log("É uma prop de algum componente do custom");
            } */
            if (word.includes(".")) {
                const componentId = word.split(".")[0];
                const defText = wordList[(wordList === null || wordList === void 0 ? void 0 : wordList.length) - 1];
                const splited = word.split(".");
                word = splited.find((txt) => txt.includes(defText)) || splited[1];
                const match = data.match(new RegExp(`id: ?${componentId}`));
                if (match) {
                    let parsedData = data.slice(match.index, data.length);
                    const finalData = parsedData.match(/[a-zA-Z]{1,}\s{0,}\{/);
                    let lastIndex = parsedData.length;
                    if (finalData && finalData.index)
                        lastIndex = finalData.index;
                    parsedData = parsedData.slice(0, lastIndex);
                    prop = parsedData
                        .split("\n")
                        .filter((line) => this.references.some((ref) => line.trim().startsWith(ref)) ||
                        line.includes(":"))
                        .filter((str) => str
                        .split(" ")
                        .some((txt) => txt.replace(/(\(|\{|:).*/, "") === word));
                }
                else if (this.qrcData.some((qrc) => qrc.split("/").pop() === componentId)) {
                    if (this.workspaceFolders) {
                        this.updateMainCppDir();
                        const rootUri = `${this.mainCppDir}/${this.qrcData.find((qrc) => qrc.split("/").pop() === componentId)}.qml`;
                        const defUri = `file://${rootUri}`;
                        const data = fs
                            .readFileSync(rootUri, { encoding: "utf8" })
                            .split("\n");
                        const line = data.findIndex((line) => /[a-zA-Z0-9]{0,} \{/.test(line));
                        const character = data[line].trim().replace(/ .*/g, "").length;
                        return node_1.Location.create(defUri, {
                            start: { line, character: 0 },
                            end: { line, character },
                        });
                    }
                }
            }
            if (this.qrcData.some((qrc) => qrc.split("/").pop() === word)) {
                if (this.workspaceFolders) {
                    this.updateMainCppDir();
                    const rootUri = `${this.mainCppDir}/${this.qrcData.find((qrc) => qrc.split("/").pop() === word)}.qml`;
                    const defUri = `file://${rootUri}`;
                    const data = fs
                        .readFileSync(rootUri, { encoding: "utf8" })
                        .split("\n");
                    const line = data.findIndex((line) => /[a-zA-Z0-9]{0,} \{/.test(line));
                    const character = data[line].trim().replace(/ .*/g, "").length;
                    return node_1.Location.create(defUri, {
                        start: { line, character: 0 },
                        end: { line, character },
                    });
                }
            }
            if (!prop || prop.length === 0)
                return;
            if (prop.length === 1) {
                const definitionLine = data
                    .split("\n")
                    .findIndex((str) => str.includes(word));
                const text = data.split("\n")[definitionLine];
                const initPosition = text.indexOf(word);
                const endPosition = initPosition + word.length;
                return node_1.Location.create(uri, {
                    start: { line: definitionLine, character: initPosition },
                    end: { line: definitionLine, character: endPosition },
                });
            }
            else {
                const locations = [];
                prop.forEach((item) => {
                    const initPosition = item.indexOf(word);
                    const endPosition = initPosition + word.length;
                    const definitionLine = data.split("\n").indexOf(item);
                    locations.push(node_1.Location.create(uri, {
                        start: { line: definitionLine, character: initPosition },
                        end: { line: definitionLine, character: endPosition },
                    }));
                });
                return locations;
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    onCodeAction(params) {
        if (!params.context.diagnostics.length)
            return;
        const doc = this.documents.get(params.textDocument.uri);
        const actions = [];
        params.context.diagnostics.forEach((action) => {
            const codeAction = action.data || action.message.split(" ")[0] || "";
            actions.push(this.createImport(doc, codeAction));
        });
        return actions;
    }
    createImport(document, data) {
        const textEdit = [];
        const text = document.getText();
        const imports = text
            .split("\n")
            .filter((line) => line.trim().startsWith("import"));
        const impLine = imports[imports.length - 1];
        const line = text
            .split("\n")
            .findIndex((line) => line === imports[imports.length - 1]);
        if (impLine) {
            textEdit.push(node_1.TextEdit.insert(node_1.Position.create(line, impLine.length), `\n${data.trim()}`));
        }
        else {
            const line = text
                .split("\n")
                .findIndex((line) => /[a-zA-Z0-9]{1,} {0,}\{/.test(line));
            textEdit.push(node_1.TextEdit.insert(node_1.Position.create(line, 0), `${data.trim()}\n\n`));
        }
        const fix = {
            title: `Add missing ${data}`,
            kind: node_1.CodeActionKind.QuickFix,
            edit: {
                changes: {
                    [document.uri]: textEdit,
                },
            },
            data,
        };
        return fix;
    }
    getDirsFile(pathToSearch, arrayOfFiles = []) {
        const files = fs.readdirSync(pathToSearch);
        for (const file of files) {
            if (fs.statSync(pathToSearch + "/" + file).isDirectory()) {
                arrayOfFiles = this.getDirsFile(pathToSearch + "/" + file, arrayOfFiles);
            }
            else {
                arrayOfFiles.push(path.join(pathToSearch, "/", file));
            }
        }
        return arrayOfFiles;
    }
    updateMainCppDir() {
        if (!this.mainCppDir && this.workspaceFolders) {
            const files = this.getDirsFile(this.workspaceFolders[0].uri.replace("file://", ""));
            this.mainCppDir = files.find((file) => file.includes("main.cpp")) || "";
            this.mainCppDir = this.mainCppDir.split("/").slice(0, -1).join("/");
        }
    }
    updateQrcData(uri = "") {
        if (this.workspaceFolders) {
            this.updateMainCppDir();
            let data = "";
            if (uri) {
                const rootPath = uri.replace("file://", "");
                data = fs.readFileSync(rootPath, { encoding: "utf8" });
            }
            else {
                const rootPath = this.mainCppDir.replace("file://", "");
                const files = fs
                    .readdirSync(rootPath)
                    .filter((i) => i.includes(".qrc"));
                data = files
                    .map((file) => fs.readFileSync(`${this.mainCppDir}/${file}`, { encoding: "utf8" }))
                    .join("\n");
            }
            this.qrcData = data
                .split("\n")
                .filter((line) => line.includes(".qml"))
                .map((line) => line
                .trim()
                .replace("<file>", "")
                .replace("</file>", "")
                .replace(".qml", ""));
        }
    }
    updateMainCpp(uri = "") {
        if (this.workspaceFolders) {
            this.updateQrcData();
            let data = "";
            if (uri) {
                const rootPath = uri.replace("file://", "");
                data = fs.readFileSync(rootPath, { encoding: "utf8" });
            }
            else {
                const rootPath = `${this.mainCppDir.replace("file://", "")}/main.cpp`;
                data = fs.readFileSync(rootPath, { encoding: "utf8" });
            }
            const cppFiles = this.getDirsFile(this.workspaceFolders[0].uri.replace("file://", "")).filter((file) => file.trim().endsWith(".cpp") && file.trim().includes(this.mainCppDir));
            this.mainCppcData = data
                .split("\n")
                .filter((line) => line.includes("qmlRegister"))
                .map((line) => {
                const splitedLine = line.split("<");
                if (splitedLine.length === 2) {
                    const [file, dirtImport] = splitedLine[1].split(">(");
                    const [importName, major, minor, usability] = dirtImport.split(",");
                    return {
                        file: file.trim(),
                        uri: cppFiles.find((cpp) => cpp.toLowerCase().includes(file.trim().toLowerCase())),
                        importName: importName.trim().replace('"', ""),
                        version: `${major.trim()}.${minor.trim()}`,
                        usability: usability
                            .trim()
                            .replace('"', "")
                            .replace(/\).*/g, ""),
                    };
                }
                return line.trim();
            }
            // .replace(/(.*.\(|\).*)/g, '')
            );
            // console.log(this.mainCppcData);
        }
    }
    async getAllQmlFiles() {
        if (this.workspaceFolders) {
            const dataFiles = this.getDirsFile(this.workspaceFolders[0].uri.replace("file://", ""))
                .filter((file) => file.trim().endsWith(".qml"))
                .map((file) => new Promise((resolve) => {
                const data = fs.promises.readFile(file, { encoding: "utf8" });
                const importUri = file.replace(this.mainCppDir.formatToPath(), "");
                data.then((data) => {
                    const myData = data.split("\n");
                    const line = myData.findIndex((line) => /[a-zA-Z0-9]{0,} \{/.test(line));
                    const character = line !== -1
                        ? myData[line].trim().replace(/ .*/g, "").length
                        : 0;
                    resolve({
                        data,
                        uri: file.formatToPath(),
                        fileName: file.getFileName(),
                        importUri: `import "qrc:${importUri}"`,
                        definitionPosition: {
                            start: 0,
                            end: character,
                            line: line === -1 ? 0 : line,
                        },
                    });
                });
            }));
            Promise.all(dataFiles).then((data) => (this.qmlFiles = data));
        }
    }
}
let serviceDispatcher = null;
if (serviceDispatcher === null) {
    serviceDispatcher = new ServiceDispatcher();
}
//# sourceMappingURL=server.js.map