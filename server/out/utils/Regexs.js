"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNewJson = exports.IsFunctionArgsEnd = exports.IsFunctionArgsBegin = exports.IsElse = exports.IsIf = exports.IsFunction = exports.IsLogicalOperator = exports.IsBrackts = exports.IsInReturnOrBreak = exports.IsInCaseOrDefault = exports.IsBegingSwitch = exports.IsJsonWithVaiableKey = exports.IsBegingProperty = exports.IsForLoop = exports.IsEndComponent = exports.IsComponentInLine = exports.IsBegingComponent = exports.IsImport = void 0;
exports.IsImport = /^\s{0,}import/;
exports.IsBegingComponent = /^\s{0,}[A-Za-z0-9.]{1,}\s{0,}:{0,1}\s{0,}[A-Za-z0-9.]{0,}\s{0,}(\{|\[)\s{0,}$/;
exports.IsComponentInLine = /^\s{0,}[A-Za-z0-9.]{1,}\s{0,}:{0,1}\s{0,}[A-Za-z0-9.]{0,}\s{0,}(\{|\[)\s{0,}.*(\}|\])\s{0,}$/;
exports.IsEndComponent = /^\s{0,}\}\s{0,},{0,1}\s{0,}|^\s{0,}\]\s{0,},{0,1}$/;
exports.IsForLoop = /^\s{0,}for\s{0,}\((.*)\)\s{0,}\{{0,1}/;
// export const IsBegingProperty =
//   /^\s{0,}(readonly){0,1}\s{1,}property\s{1,}([A-Za-z0-9]+)\s{1,}([A-Za-z0-9]+)\s:\s{0,}([^"'][A-Za-z0-9{([]+)/;
exports.IsBegingProperty = /^\s{0,}(readonly){0,1}\s{0,}property\s{1,}([A-Za-z0-9]){1,}\s{1,}(\D|\d){1,}\s{0,}:\s{0,}([^"'][A-Za-z0-9{([]){0,}/;
exports.IsJsonWithVaiableKey = /^\s{0,}\[(\D|\d){1,}\]\s{0,}:\s{0,}([[{(]){0,1}/;
exports.IsBegingSwitch = /^\s{0,}switch\s{0,}\(([A-Za-z0-9,]+)\)\s{0,}\{{0,1}/;
exports.IsInCaseOrDefault = /^\s{0,}(case|default)\s{0,}\({0,1}(\D|\d){0,}\){0,1}\s{0,}:/;
exports.IsInReturnOrBreak = /^\s{0,}(return|break).*/;
exports.IsBrackts = /^\s{0,}\{/;
exports.IsLogicalOperator = /^\s{0,}&&/;
exports.IsFunction = /^\s{0,}function [A-Za-z]{1,}/;
exports.IsIf = /^\s{0,}if\s{0,}\(\s{0,}(\D|\d){0,}/;
exports.IsElse = /^\s{0,}\}{0,1}\s{0,}else\s{0,}\{{0,1}/;
exports.IsFunctionArgsBegin = /\($/;
exports.IsFunctionArgsEnd = /^\s{0,}\)/;
exports.IsNewJson = /^\s{0,}[A-Za-z0-9]{1,}\s{0,}[A-Za-z0-9]{0,}\s{0,}={0,}\s{0,}\{/;
//# sourceMappingURL=Regexs.js.map