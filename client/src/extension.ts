import * as path from "path";
import { commands, ExtensionContext, extensions, workspace } from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  NotificationType,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";
import { generateQmlFile } from "./commands/generateQmlFile";
import { organizeImports } from './commands/organizeImports';
import { glob } from 'glob';

const QmlTypesNotification = {
  type: new NotificationType<string[]>('qml/types')
};

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
  commands.registerCommand("qmlFormatter.imports.organize", organizeImports);
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
  client.onReady().then(() => {
    const qmlTypes = getQmlTypes();
    client.sendNotification(QmlTypesNotification.type, qmlTypes);
  });
}

function getQmlTypes(): string[] {
	return extensions.all.flatMap(extension => {
		const qmlTypes = extension.packageJSON?.contributes?.qmlTypes;

    if (!Array.isArray(qmlTypes)) {
      return [];
    }

    return qmlTypes.flatMap(pattern => 
      glob.sync(pattern, {
        absolute: true,
        cwd: extension.extensionPath,
        nodir: true
      })
    );
	});
}
