interface String {
  lastChar(): string;
  getFileExt(): string;
  getFileName(): string;
  formatToPath(): string;
  getFileBaseName(): string;
  prefix(prefix: string): string;
  count(rgx: string | number): number;
}

String.prototype.getFileName = function (): string {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const path = require("path");
  return this.getFileBaseName().replace(this.getFileExt(), "");
};

String.prototype.getFileExt = function (): string {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const path = require("path");
  return path.extname(this.toString());
};

String.prototype.getFileBaseName = function (): string {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const path = require("path");
  return path.basename(this.toString());
};

String.prototype.formatToPath = function (): string {
  return this.toString().replace("file://", "");
};

String.prototype.prefix = function (prefix: string): string {
  return `${prefix}${this}`;
};

String.prototype.count = function count(rgx: string | number): number {
  const rx = new RegExp(String(rgx), "ig");
  return (this.match(rx) || []).length;
};

String.prototype.lastChar = function lastChar(): string {
  return this[this.length - 1];
};
