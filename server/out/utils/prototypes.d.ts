interface String {
    lastChar(): string;
    getFileExt(): string;
    getFileName(): string;
    formatToPath(): string;
    getFileBaseName(): string;
    prefix(prefix: string): string;
    count(rgx: string | number): number;
}
