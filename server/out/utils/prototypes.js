"use strict";
String.prototype.getFileName = function () {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require("path");
    return this.getFileBaseName().replace(this.getFileExt(), "");
};
String.prototype.getFileExt = function () {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require("path");
    return path.extname(this.toString());
};
String.prototype.getFileBaseName = function () {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require("path");
    return path.basename(this.toString());
};
String.prototype.formatToPath = function () {
    return this.toString().replace("file://", "");
};
String.prototype.prefix = function (prefix) {
    return `${prefix}${this}`;
};
String.prototype.count = function count(rgx) {
    const rx = new RegExp(String(rgx), "ig");
    return (this.match(rx) || []).length;
};
String.prototype.lastChar = function lastChar() {
    return this[this.length - 1];
};
//# sourceMappingURL=prototypes.js.map