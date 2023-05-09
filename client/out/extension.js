"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const path = require("path");
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
const generateQmlFile_1 = require("./commands/generateQmlFile");
const organizeImports_1 = require("./commands/organizeImports");
const glob_1 = require("glob");
const QmlTypesNotification = {
    type: new node_1.NotificationType('qml/types')
};
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
    vscode_1.commands.registerCommand("qmlFormatter.imports.organize", organizeImports_1.organizeImports);
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
                vscode_1.workspace.createFileSystemWatcher("**/*.js"),
                vscode_1.workspace.createFileSystemWatcher("**/*.qml"),
                vscode_1.workspace.createFileSystemWatcher("**/*.qrc"),
                vscode_1.workspace.createFileSystemWatcher("**/main.cpp"),
            ],
        },
    };
    client = new node_1.LanguageClient("qmlLanguageServer", "QML Language Server", serverOptions, clientOptions);
    client.start();
    client.onReady().then(() => {
        const qmlTypes = getQmlTypes();
        client.sendNotification(QmlTypesNotification.type, qmlTypes);
    });
}
function getQmlTypes() {
    return vscode_1.extensions.all.flatMap(extension => {
        var _a, _b;
        const qmlTypes = (_b = (_a = extension.packageJSON) === null || _a === void 0 ? void 0 : _a.contributes) === null || _b === void 0 ? void 0 : _b.qmlTypes;
        if (!Array.isArray(qmlTypes)) {
            return [];
        }
        return qmlTypes.flatMap(pattern => glob_1.glob.sync(pattern, {
            absolute: true,
            cwd: extension.extensionPath,
            nodir: true
        }));
    });
}
//# sourceMappingURL=extension.js.map