import * as path from "path";
import { commands, ExtensionContext, workspace } from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from "vscode-languageclient/node";
import { generateQmlFile } from "./commands/generateQmlFile";

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  registerCommands();
  serverConnect(context);
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) return undefined;
  return client.stop();
}

function registerCommands() {
  commands.registerCommand("qmlFormatter.qml", generateQmlFile);
}

function serverConnect(context: ExtensionContext) {
  const serverModule = context.asAbsolutePath(
    path.join("server", "out", "server.js")
  );
  const debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: "file", language: "qml" },
      { scheme: "untitle", language: "qml" },
    ],
    synchronize: {
      fileEvents: [
        workspace.createFileSystemWatcher("**/*.js"),
        workspace.createFileSystemWatcher("**/*.qml"),
        workspace.createFileSystemWatcher("**/*.qrc"),
        workspace.createFileSystemWatcher("**/main.cpp"),
      ],
    },
  };

  client = new LanguageClient(
    "qmlLanguageServer",
    "QML Language Server",
    serverOptions,
    clientOptions
  );

  client.start();
}
