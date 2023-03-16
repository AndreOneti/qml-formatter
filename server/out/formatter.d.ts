import { TextDocument } from "vscode-languageserver-textdocument";
import { DocumentFormattingParams, TextDocuments, TextEdit } from "vscode-languageserver/node";
import "./utils/prototypes";
export declare class Formatter {
    private documents;
    private doc;
    private isSwitchStatement;
    private isCaseOrDefault;
    private isIfStatement;
    private ifWithKey;
    private currentTabSize;
    private tabSize;
    constructor(documents: TextDocuments<TextDocument>);
    private getTabSize;
    private resetGlobalVars;
    private initGlobalVars;
    private Regex;
    private preFormat;
    formattingDocument(params: DocumentFormattingParams): TextEdit[];
}
