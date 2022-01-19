"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("vscode-languageserver/node");
const libs_1 = require("./libs");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
class ServiceDispatcher {
    constructor() {
        // this.documents.onDidChangeContent(change => this.onDidChangeContent(change));
        // this.documents.onDidClose(change => this.onDidClose(change));
        this.connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
        this.documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
        this.workspaceFolders = null;
        this.hasWorkspaceFolderCapability = false;
        this.hasConfigurationCapability = false;
        this.references = ['function', 'property', 'signal', 'id'];
        this.connection.onInitialize((handler) => this.onInitialize(handler));
        this.connection.onInitialized((_) => this.onInitialized());
        this.connection.onCompletion((pos) => this.onCompletion(pos));
        this.connection.onCompletionResolve((handler) => this.onCompletionResolve(handler));
        // this.connection.onDocumentSymbol(handler => this.onDocumentSymbol(handler));
        // this.connection.onWorkspaceSymbol(handler => this.onWorkspaceSymbol(handler));
        // this.connection.onDidChangeConfiguration(change => this.onDidChangeConfiguration(change));
        this.connection.onDocumentFormatting((params) => this.onDocumentFormatting(params));
        this.connection.onDocumentRangeFormatting((params) => this.onDocumentRangeFormatting(params));
        this.connection.onDefinition((params) => this.onDefinition(params));
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
                    triggerCharacters: ["."]
                },
                definitionProvider: true,
                documentFormattingProvider: true,
                documentRangeFormattingProvider: true
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
                this.connection.console.log('Workspace folder change event received.');
            });
        }
    }
    onCompletion(complitionPosition) {
        var _a;
        const doc = this.documents.get(complitionPosition.textDocument.uri);
        if (!doc)
            return [];
        const text = doc.getText();
        if (!text)
            return [];
        const textLine = text.split('\n')[complitionPosition.position.line];
        const wordList = textLine
            .slice(0, complitionPosition.position.character)
            .split(' ');
        const word = wordList && wordList[(wordList === null || wordList === void 0 ? void 0 : wordList.length) - 1];
        if (!word)
            return [];
        let prop = [];
        let itens = [];
        if (!complitionPosition.context || complitionPosition.context.triggerKind === 1) // trigged by "ctrl+space"
         {
            prop = text
                .split('\n')
                .filter((str) => str.match(new RegExp(`${word}`)))
                .filter((str) => str !== textLine);
            itens = prop.map((str) => {
                const item = {};
                if (str.includes('function') || str.includes('signal')) {
                    item.kind = node_1.CompletionItemKind.Function;
                }
                else if (str.includes('property')) {
                    item.kind = node_1.CompletionItemKind.Property;
                }
                else if (str.trim().endsWith('{')) {
                    item.kind = node_1.CompletionItemKind.Module;
                }
                else if (str.includes('id:')) {
                    item.kind = node_1.CompletionItemKind.Keyword;
                }
                else {
                    item.kind = node_1.CompletionItemKind.Text;
                }
                let complitionText = str.split(' ').find((tx) => tx.includes(word)) || '';
                complitionText = (complitionText.match(/[A-z]+/) || [])[0] || complitionText;
                item.data = complitionText;
                item.label = complitionText;
                return item;
            });
        }
        if (((_a = complitionPosition.context) === null || _a === void 0 ? void 0 : _a.triggerKind) === 2 || word.includes(".")) // trigged by "."
         {
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
                if (!match)
                    return [];
                let parsedData = text.slice(match.index, text.length);
                const finalData = parsedData.match(/[a-zA-Z]{1,}\s{0,}\{/);
                let lastIndex = parsedData.length;
                if (finalData && finalData.index)
                    lastIndex = finalData.index;
                parsedData = parsedData.slice(0, lastIndex);
                prop = parsedData
                    .split('\n')
                    .filter((line) => this.references.some((ref) => line.trim().startsWith(ref)) || line.includes(":"))
                    .filter((line) => !line.trim().startsWith('id'));
                itens = prop.map((str) => {
                    const item = {};
                    if (str.includes('function') || str.includes('signal')) {
                        item.kind = node_1.CompletionItemKind.Function;
                    }
                    else {
                        item.kind = node_1.CompletionItemKind.Property;
                    }
                    let complitionText = str
                        .replace(/(property [a-zA-Z0-9]{1,}|function |signal )/, '')
                        .trim()
                        .replace(/:.*|\(.*/, '');
                    complitionText = (complitionText.match(/[A-z]+/) || [])[0] || complitionText;
                    item.data = complitionText;
                    item.label = complitionText;
                    return item;
                });
            }
        }
        if (!prop.length)
            return [];
        itens = itens.filter((item, index) => itens.findIndex((i) => i.data === item.data) == index);
        return itens;
    }
    onCompletionResolve(item) {
        return item;
    }
    onDocumentFormatting(params) {
        const doc = this.documents.get(params.textDocument.uri);
        if (!doc)
            return [];
        const file = doc.getText();
        const tabSize = params.options.tabSize;
        const textEdit = [];
        file.split('\n').forEach((line, index) => {
            const data = (0, libs_1.Regex)(this.preFormatter(line), index === 0, tabSize);
            textEdit.push(node_1.TextEdit.replace(node_1.Range.create(node_1.Position.create(index, 0), node_1.Position.create(index, line.length)), data.trimEnd()));
        });
        return textEdit;
    }
    onDocumentRangeFormatting(params) {
        return [];
    }
    preFormatter(textDocument) {
        const textDocumentFormatted = textDocument
            .replace(/ {0,}\{ {0,}/g, ' { ')
            .replace(/ {0,}\} {0,}/g, ' } ')
            .replace(/\( {0,}/g, '(')
            .replace(/ {0,}\) {0,}/g, ')')
            .replace(/\s{0,}:\s{0,}/g, ': ');
        return textDocumentFormatted || textDocument;
    }
    onDefinition(params) {
        var _a;
        const { textDocument: { uri }, position: { character, line }, } = params;
        const doc = this.documents.get(uri);
        if (!doc)
            return;
        const data = doc.getText();
        if (!data)
            return;
        const textLine = data.split('\n')[line];
        const wordList = (_a = textLine.slice(0, character)) === null || _a === void 0 ? void 0 : _a.split(' ');
        let word = wordList && wordList[(wordList === null || wordList === void 0 ? void 0 : wordList.length) - 1];
        word = textLine.split(' ').find(txt => txt.includes(word)) || word;
        word = word.replace(/(\(|\{|:).*/, '');
        if (word.includes("Component"))
            return;
        let prop = data === null || data === void 0 ? void 0 : data.split('\n').filter((str) => str.match(new RegExp(`${word}`))).filter((str) => str !== textLine).filter((str) => this.references.some((reference) => str.includes(reference))).filter((str) => str
            .split(' ')
            .some((txt) => txt.replace(/(\(|\{|:).*/, '') === word));
        if (word.includes(".")) {
            const componentId = word.split(".")[0];
            word = word.split(".")[1];
            const match = data.match(new RegExp(`id: ?${componentId}`));
            if (!match)
                return [];
            let parsedData = data.slice(match.index, data.length);
            const finalData = parsedData.match(/[a-zA-Z]{1,}\s{0,}\{/);
            let lastIndex = parsedData.length;
            if (finalData && finalData.index)
                lastIndex = finalData.index;
            parsedData = parsedData.slice(0, lastIndex);
            prop = parsedData
                .split('\n')
                .filter((line) => this.references.some((ref) => line.trim().startsWith(ref)) || line.includes(":"))
                .filter((line) => !line.trim().startsWith('id'))
                .filter((str) => str
                .split(' ')
                .some((txt) => txt.replace(/(\(|\{|:).*/, '') === word));
        }
        if (!prop || prop.length === 0)
            return;
        if (prop.length === 1) {
            const text = prop[0];
            const initPosition = text.indexOf(word);
            const endPosition = initPosition + word.length;
            const definitionLine = data.split("\n").indexOf(text);
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
}
let serviceDispatcher = null;
if (serviceDispatcher === null) {
    serviceDispatcher = new ServiceDispatcher();
}
//# sourceMappingURL=server.js.map