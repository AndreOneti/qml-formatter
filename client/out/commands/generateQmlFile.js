"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQmlFile = void 0;
const vscode_1 = require("vscode");
const DefaultQmlTemplate_1 = require("../DefaultQmlTemplate");
async function generateQmlFile(uri) {
    const workspaceUri = vscode_1.workspace.workspaceFolders && vscode_1.workspace.workspaceFolders[0].uri;
    const currentUri = uri || workspaceUri;
    if (!currentUri) {
        vscode_1.window.showErrorMessage("Workspace doesn't contain any folders.");
        return;
    }
    let fileName = await vscode_1.window.showInputBox({
        ignoreFocusOut: true,
        placeHolder: "Enter with file name",
        value: "newQml.qml",
    });
    fileName = fileName.includes(".qml") ? fileName : `${fileName}.qml`;
    const qmlUri = vscode_1.Uri.parse(`${currentUri.toString()}/${fileName}`);
    try {
        const stats = await vscode_1.workspace.fs.stat(qmlUri);
        if (stats.type === vscode_1.FileType.File) {
            vscode_1.window.showErrorMessage(`An ${fileName} file already exists in this folder.`);
            return;
        }
    }
    catch (err) {
        if (err) {
            if (err.name === "EntryNotFound (FileSystemError)") {
                writeFile();
            }
            else {
                vscode_1.window.showErrorMessage(err.message);
            }
            return;
        }
    }
    async function openFile() {
        const doc = await vscode_1.workspace.openTextDocument(qmlUri);
        await vscode_1.window.showTextDocument(doc);
    }
    async function updateQrcData(qmlUri) {
        const qrc = (await vscode_1.workspace.findFiles("**/*.qrc", "", 1))[0];
        const qrcUri = vscode_1.Uri.parse(qrc.path);
        const qrcData = (await vscode_1.workspace.fs.readFile(qrcUri)).toString();
        const folderUri = vscode_1.workspace.workspaceFolders[0].uri;
        let fileImport = "";
        try {
            let mainCppDir = (await vscode_1.workspace.findFiles("**/main.cpp", "", 1))[0]
                .path;
            mainCppDir = mainCppDir.split("/").slice(0, -1).join("/");
            fileImport = qmlUri.path
                .replace(mainCppDir, "")
                .split("/")
                .filter((i) => i)
                .join("/");
        }
        catch (error) {
            fileImport = qmlUri.path
                .replace(folderUri.path, "")
                .split("/")
                .filter((i) => i)
                .join("/");
        }
        fileImport = `<file>${fileImport}</file>`;
        const qrcList = qrcData.split("\n");
        const index = qrcList
            .reverse()
            .findIndex((line) => line.includes("<file>"));
        const space = qrcList[index].replace(/<file.*/, "");
        let qrcListChanged = qrcList.slice(0, index);
        qrcListChanged.push(`${space}${fileImport}`);
        qrcListChanged = [...qrcListChanged, ...qrcList.slice(index)].reverse();
        const buffer = Buffer.from(qrcListChanged.join("\n"));
        await vscode_1.workspace.fs.writeFile(qrcUri, buffer);
    }
    async function writeFile() {
        try {
            const templateBuffer = Buffer.from(DefaultQmlTemplate_1.DefaultQmlTemplate);
            vscode_1.workspace.fs.writeFile(qmlUri, templateBuffer);
            await updateQrcData(qmlUri);
            await openFile();
        }
        catch (error) {
            vscode_1.window.showErrorMessage(error.message);
            await vscode_1.workspace.fs.delete(qmlUri);
        }
        return;
    }
}
exports.generateQmlFile = generateQmlFile;
//# sourceMappingURL=generateQmlFile.js.map