import * as vscode from 'vscode';
export declare let doc: vscode.TextDocument;
export declare let editor: vscode.TextEditor;
export declare let documentEol: string;
export declare let platformEol: string;
/**
 * Activates the vscode.lsp-sample extension
 */
export declare function activate(docUri: vscode.Uri): Promise<void>;
export declare const getDocPath: (p: string) => string;
export declare const getDocUri: (p: string) => vscode.Uri;
export declare function setTestContent(content: string): Promise<boolean>;
