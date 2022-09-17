"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizeImports = void 0;
const vscode_1 = require("vscode");
async function organizeImports() {
    if (!vscode_1.window.activeTextEditor)
        return;
    const { activeTextEditor: { document }, } = vscode_1.window;
    let docText = document.getText();
    const importList = docText.split("\n").reduce((acc, item) => {
        if (item.trim().startsWith("import "))
            return [...acc, item];
        return acc;
    }, []);
    const firstIndex = docText.indexOf(importList[0]);
    const lastIndex = docText.indexOf(importList[importList.length - 1]);
    const importText = docText.slice(firstIndex, lastIndex + importList[importList.length - 1].length);
    const importSplitedList = importText.split("\n\n");
    const importTextOrganized = importSplitedList
        .map((lines) => lines.split("\n").sort().join("\n"))
        .join("\n\n");
    docText = docText.replace(importText, importTextOrganized);
    const buffer = Buffer.from(docText);
    await vscode_1.workspace.fs.writeFile(document.uri, buffer);
}
exports.organizeImports = organizeImports;
//# sourceMappingURL=organizeImports.js.map