import { window, workspace } from "vscode";

export async function organizeImports() {
  if (!window.activeTextEditor) return;
  const {
    activeTextEditor: { document },
  } = window;
  let docText = document.getText();
  const importList = docText.split("\n").reduce((acc, item) => {
    if (item.trim().startsWith("import ")) return [...acc, item];
    return acc;
  }, []);

  const firstIndex = docText.indexOf(importList[0]);
  const lastIndex = docText.indexOf(importList[importList.length - 1]);

  const importText = docText.slice(
    firstIndex,
    lastIndex + importList[importList.length - 1].length
  );

  const importSplitedList = importText.split("\n\n");
  const importTextOrganized = importSplitedList
    .map((lines) => lines.split("\n").sort().join("\n"))
    .join("\n\n");

  docText = docText.replace(importText, importTextOrganized);

  const buffer = Buffer.from(docText);
  await workspace.fs.writeFile(document.uri, buffer);
}
