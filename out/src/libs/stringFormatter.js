"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whiteSpaceRemove = void 0;
function whiteSpaceRemove(str, spaceSize) {
    str = str.trim();
    spaceSize = spaceSize > 0 ? spaceSize : 0;
    var identationSpace = str === "" ? "" : " ".repeat(spaceSize);
    return (identationSpace +
        str
            .replace(/,/g, ", ")
            .replace(/([^"]+)|("[^"]+")/g, function ($0, $1, $2) {
            if ($1) {
                if (str.includes("//"))
                    return $1;
                return $1.replace(/\s{1,}/g, " ");
            }
            else {
                return $2;
            }
        })
            .trim());
}
exports.whiteSpaceRemove = whiteSpaceRemove;
//# sourceMappingURL=stringFormatter.js.map