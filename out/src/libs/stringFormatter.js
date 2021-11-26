"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whiteSpaceRemove = void 0;
function whiteSpaceRemove(str, spaceSize) {
    str = str.trim();
    var identationSpace = str === ''
        ? ''
        : ' '.repeat(spaceSize);
    return identationSpace + str.replace(/([^"]+)|("[^"]+")/g, function ($0, $1, $2) {
        if ($1) {
            return $1.replace(/\s{1,}/g, " ");
        }
        else {
            return $2;
        }
    });
}
exports.whiteSpaceRemove = whiteSpaceRemove;
//# sourceMappingURL=stringFormatter.js.map