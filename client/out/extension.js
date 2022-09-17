"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const path = require("path");
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
const generateQmlFile_1 = require("./commands/generateQmlFile");
let client;
function activate(context) {
    registerCommands();
    serverConnect(context);
}
exports.activate = activate;
function deactivate() {
    if (!client)
        return undefined;
    return client.stop();
}
exports.deactivate = deactivate;
function registerCommands() {
    vscode_1.commands.registerCommand("qmlFormatter.qml", generateQmlFile_1.generateQmlFile);
}
function serverConnect(context) {
    const serverModule = context.asAbsolutePath(path.join("server", "out", "server.js"));
    const debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };
    const serverOptions = {
        run: { module: serverModule, transport: node_1.TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: node_1.TransportKind.ipc,
            options: debugOptions,
        },
    };
    const clientOptions = {
        documentSelector: [
            { scheme: "file", language: "qml" },
            { scheme: "untitle", language: "qml" },
        ],
        synchronize: {
            fileEvents: [
                vscode_1.workspace.createFileSystemWatcher("**/*.qml"),
                vscode_1.workspace.createFileSystemWatcher("**/*.qrc"),
                vscode_1.workspace.createFileSystemWatcher("**/main.cpp"),
            ],
        },
    };
    client = new node_1.LanguageClient("qmlLanguageServer", "QML Language Server", serverOptions, clientOptions);
    client.start();
}
//# sourceMappingURL=extension.js.map