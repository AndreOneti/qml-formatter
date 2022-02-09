import { FileType, Uri, window, workspace } from "vscode";
import { DefaultQmlTemplate } from "../DefaultQmlTemplate";

export async function generateQmlFile(uri: Uri) {
  const workspaceUri =
    workspace.workspaceFolders && workspace.workspaceFolders[0].uri;
  const currentUri = uri || workspaceUri;
  if (!currentUri) {
    window.showErrorMessage("Workspace doesn't contain any folders.");
    return;
  }

  let fileName = await window.showInputBox({
    ignoreFocusOut: true,
    placeHolder: "Enter with file name",
    value: "newQml.qml",
  });

  fileName = fileName.includes(".qml") ? fileName : `${fileName}.qml`;

  const qmlUri = Uri.parse(`${currentUri.toString()}/${fileName}`);

  try {
    const stats = await workspace.fs.stat(qmlUri);
    if (stats.type === FileType.File) {
      window.showErrorMessage(
        `An ${fileName} file already exists in this folder.`
      );
      return;
    }
  } catch (err) {
    if (err) {
      if (err.name === "EntryNotFound (FileSystemError)") {
        writeFile();
      } else {
        window.showErrorMessage(err.message);
      }
      return;
    }
  }

  async function updateQrcData(qmlUri: Uri): Promise<void> {
    const qrc = (await workspace.findFiles("**/*.qrc", "", 1))[0];
    const qrcUri = Uri.parse(qrc.path);
    const qrcData = (await workspace.fs.readFile(qrcUri)).toString();

    const folderUri = workspace.workspaceFolders[0].uri;
    let fileImport = "";

    try {
      let mainCppDir = (await workspace.findFiles("**/main.cpp", "", 1))[0]
        .path;
      mainCppDir = mainCppDir.split("/").slice(0, -1).join("/");
      fileImport = qmlUri.path
        .replace(mainCppDir, "")
        .split("/")
        .filter((i) => i)
        .join("/");
    } catch (error) {
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
    await workspace.fs.writeFile(qrcUri, buffer);
  }

  async function writeFile() {
    try {
      const templateBuffer: Buffer = Buffer.from(DefaultQmlTemplate);
      workspace.fs.writeFile(qmlUri, templateBuffer);
      await updateQrcData(qmlUri);
    } catch (error) {
      window.showErrorMessage(error.message);
    }

    return;
  }
}
