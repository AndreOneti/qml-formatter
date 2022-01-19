import {
	createConnection,
	TextDocuments,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	CompletionItem,
	CompletionItemKind,
	TextDocumentSyncKind,
	InitializeResult,
	WorkspaceFolder,
	DocumentFormattingParams,
	TextEdit,
	Range,
	Position,
	Definition,
	DefinitionParams,
	Location,
	CompletionParams,
} from 'vscode-languageserver/node';
import { Regex } from "./libs";

import { TextDocument } from 'vscode-languageserver-textdocument';
class ServiceDispatcher {
	private connection = createConnection(ProposedFeatures.all);
	private documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

	private workspaceFolders: WorkspaceFolder[] | null = null;
	private hasWorkspaceFolderCapability = false;
	private hasConfigurationCapability = false;

	private readonly references: string[] = ['function', 'property', 'signal', 'id'];

	constructor() {
		// this.documents.onDidChangeContent(change => this.onDidChangeContent(change));
		// this.documents.onDidClose(change => this.onDidClose(change));

		this.connection.onInitialize((handler) => this.onInitialize(handler));
		this.connection.onInitialized((_) => this.onInitialized());
		this.connection.onCompletion((pos) => this.onCompletion(pos));
		this.connection.onCompletionResolve((handler) => this.onCompletionResolve(handler));
		// this.connection.onDocumentSymbol(handler => this.onDocumentSymbol(handler));
		// this.connection.onWorkspaceSymbol(handler => this.onWorkspaceSymbol(handler));
		// this.connection.onDidChangeConfiguration(change => this.onDidChangeConfiguration(change));
		this.connection.onDocumentFormatting((params) => this.onDocumentFormatting(params));
		this.connection.onDocumentRangeFormatting((params) => this.onDocumentRangeFormatting(params));
		this.connection.onDefinition((params) => this.onDefinition(params));

		this.documents.listen(this.connection);
		this.connection.listen();
	}

	private onInitialize(params: InitializeParams): InitializeResult {
		const capabilities = params.capabilities;
		this.workspaceFolders = params.workspaceFolders;

		this.hasConfigurationCapability = !!(
			capabilities.workspace && !!capabilities.workspace.configuration
		);
		this.hasWorkspaceFolderCapability = !!(
			capabilities.workspace && !!capabilities.workspace.workspaceFolders
		);

		const result: InitializeResult = {
			capabilities: {
				textDocumentSync: TextDocumentSyncKind.Incremental,
				completionProvider: {
					resolveProvider: true,
					triggerCharacters: ["."]
				},
				definitionProvider: true,
				documentFormattingProvider: true,
				documentRangeFormattingProvider: true
			},
		};
		if (this.hasWorkspaceFolderCapability) {
			result.capabilities.workspace = {
				workspaceFolders: {
					supported: true,
				},
			};
		}
		return result;
	}

	private onInitialized(): void {
		if (this.hasConfigurationCapability) {
			this.connection.client.register(DidChangeConfigurationNotification.type, undefined);
		}
		if (this.hasWorkspaceFolderCapability) {
			this.connection.workspace.onDidChangeWorkspaceFolders((_event) => {
				this.connection.console.log('Workspace folder change event received.');
			});
		}
	}

	private onCompletion(complitionPosition: CompletionParams): CompletionItem[] {
		const doc = this.documents.get(complitionPosition.textDocument.uri);
		if(!doc) return [];

		const text = doc.getText();
		if(!text) return [];

		const textLine = text.split('\n')[complitionPosition.position.line];
		const wordList = textLine
			.slice(0, complitionPosition.position.character)
			.split(' ');

		const word = wordList && wordList[wordList?.length - 1];

		if (!word) return [];

		let prop: string[] = [];
		let itens: CompletionItem[] = [];

		if(!complitionPosition.context || complitionPosition.context.triggerKind === 1) // trigged by "ctrl+space"
		{
			prop = text
				.split('\n')
				.filter((str: string) => str.match(new RegExp(`${word}`)))
				.filter((str: string) => str !== textLine);

				itens = prop.map((str) => {
					const item: CompletionItem = {} as CompletionItem;

					if (str.includes('function') || str.includes('signal')) {
						item.kind = CompletionItemKind.Function;
					} else if (str.includes('property')) {
						item.kind = CompletionItemKind.Property;
					} else if (str.trim().endsWith('{')) {
						item.kind = CompletionItemKind.Module;
					} else if (str.includes('id:')) {
						item.kind = CompletionItemKind.Keyword;
					} else {
						item.kind = CompletionItemKind.Text;
					}

					let complitionText = str.split(' ').find((tx: string) => tx.includes(word!)) || '';
					complitionText = (complitionText.match(/[A-z]+/) || [])[0] || complitionText;

					item.data = complitionText;
					item.label = complitionText;

					return item;
				});
		}

		if(complitionPosition.context?.triggerKind === 2 || word.includes(".")) // trigged by "."
		{
			const componentId = word.split(".")[0];

			if(componentId === "JSON")
			{
				prop = ["stringify","parse"];

				itens = prop.map((str) => {
					const item: CompletionItem = {} as CompletionItem;

					item.kind = CompletionItemKind.Function;

					item.data = str;
					item.label = str;

					return item;
				});
			} else {
				const match = text.match(new RegExp(`id: ?${componentId}`));
				if(!match) return [];
				let parsedData = text.slice(match.index, text.length);
				const finalData = parsedData.match(/[a-zA-Z]{1,}\s{0,}\{/);
				let lastIndex = parsedData.length;
				if(finalData && finalData.index) lastIndex = finalData.index;

				parsedData = parsedData.slice(0, lastIndex);

				prop = parsedData
					.split('\n')
					.filter((line: string): boolean =>
						this.references.some((ref) => line.trim().startsWith(ref)) || line.includes(":")
					)
					.filter((line: string): boolean => !line.trim().startsWith('id'));

				itens = prop.map((str) => {
					const item: CompletionItem = {} as CompletionItem;

					if (str.includes('function') || str.includes('signal')) {
						item.kind = CompletionItemKind.Function;
					} else {
						item.kind = CompletionItemKind.Property;
					}

					let complitionText = str
						.replace(/(property [a-zA-Z0-9]{1,}|function |signal )/,'')
						.trim()
						.replace(/:.*|\(.*/,'');
					complitionText = (complitionText.match(/[A-z]+/) || [])[0] || complitionText;

					item.data = complitionText;
					item.label = complitionText;

					return item;
				});
			}
		}

		if (!prop.length) return [];

		itens = itens.filter(
			(item, index) => itens.findIndex((i) => i.data === item.data) == index
		);

		return itens;
	}

	private onCompletionResolve(item: CompletionItem): CompletionItem {
		return item;
	}

	private onDocumentFormatting(params: DocumentFormattingParams): TextEdit[] {
		const doc = this.documents.get(params.textDocument.uri);
		if (!doc) return [];

		const file = doc.getText();
		const tabSize = params.options.tabSize;

		const textEdit: TextEdit[] = [];

		file.split('\n').forEach((line, index) => {
			const data = Regex(this.preFormatter(line), index === 0, tabSize);
			textEdit.push(TextEdit.replace(
				Range.create(Position.create(index, 0), Position.create(index, line.length)),
				data.trimEnd()
			));
		});

		return textEdit;
	}

	private onDocumentRangeFormatting(params: DocumentFormattingParams): TextEdit[] {
		return [];
	}

	private preFormatter(textDocument: string): string {
		const textDocumentFormatted = textDocument
			.replace(/ {0,}\{ {0,}/g, ' { ')
			.replace(/ {0,}\} {0,}/g, ' } ')
			.replace(/\( {0,}/g, '(')
			.replace(/ {0,}\) {0,}/g, ')')
			.replace(/\s{0,}:\s{0,}/g, ': ');
		return textDocumentFormatted || textDocument;
	}

	private onDefinition(params: DefinitionParams): Definition | Location[] | undefined {
		const {
			textDocument: { uri },
			position: { character, line },
		} = params;

		const doc = this.documents.get(uri);
		if(!doc) return;

		const data = doc.getText();
		if(!data) return;

		const textLine = data.split('\n')[line];
		const wordList = textLine.slice(0, character)?.split(' ');
		let word: string = wordList && wordList[wordList?.length - 1];
		word = textLine!.split(' ').find(txt => txt.includes(word)) || word;
		word = word.replace(/(\(|\{|:).*/, '');

		if(word.includes("Component")) return;

		let prop = data
			?.split('\n')
			.filter((str: string) => str.match(new RegExp(`${word}`)))
			.filter((str: string) => str !== textLine)
			.filter((str: string) =>
				this.references.some((reference): boolean => str.includes(reference))
			)
			.filter((str: string) =>
				str
					.split(' ')
					.some((txt: string): boolean => txt.replace(/(\(|\{|:).*/, '') === word)
			);

		if(word.includes(".")) {
			const componentId = word.split(".")[0];
			word = word.split(".")[1];

			const match = data.match(new RegExp(`id: ?${componentId}`));
			if(!match) return [];
			let parsedData = data.slice(match.index, data.length);
			const finalData = parsedData.match(/[a-zA-Z]{1,}\s{0,}\{/);
			let lastIndex = parsedData.length;
			if(finalData && finalData.index) lastIndex = finalData.index;

			parsedData = parsedData.slice(0, lastIndex);

			prop = parsedData
				.split('\n')
				.filter((line: string): boolean =>
					this.references.some((ref) => line.trim().startsWith(ref)) || line.includes(":")
				)
				.filter((line: string): boolean => !line.trim().startsWith('id'))
				.filter((str: string) =>
					str
						.split(' ')
						.some((txt: string): boolean => txt.replace(/(\(|\{|:).*/, '') === word)
				);
		}

		if(!prop || prop.length === 0) return;
    if (prop.length === 1) {
      const text = prop[0];
      const initPosition = text.indexOf(word);
      const endPosition = initPosition + word.length;
      const definitionLine = data.split("\n").indexOf(text);

      return Location.create(uri, {
        start: { line: definitionLine, character: initPosition },
        end: { line: definitionLine, character: endPosition },
      });
    } else {
      const locations: Location[] = [];

      prop.forEach((item) => {
        const initPosition = item.indexOf(word);
        const endPosition = initPosition + word.length;
        const definitionLine = data.split("\n").indexOf(item);
        locations.push(
          Location.create(uri, {
            start: { line: definitionLine, character: initPosition },
            end: { line: definitionLine, character: endPosition },
          })
        );
      });

      return locations;
    }
	}
}

let serviceDispatcher: ServiceDispatcher | null = null;

if (serviceDispatcher === null) {
	serviceDispatcher = new ServiceDispatcher();
}
