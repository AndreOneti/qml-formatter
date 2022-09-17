export const IsImport = /^\s{0,}import/;

export const IsBegingComponent =
  /^\s{0,}[A-Za-z0-9.]{1,}\s{0,}:{0,1}\s{0,}[A-Za-z0-9.]{0,}\s{0,}(\{|\[)\s{0,}$/;
export const IsComponentInLine =
  /^\s{0,}[A-Za-z0-9.]{1,}\s{0,}:{0,1}\s{0,}[A-Za-z0-9.]{0,}\s{0,}(\{|\[)\s{0,}.*(\}|\])\s{0,}$/;
export const IsEndComponent =
  /^\s{0,}\}\s{0,},{0,1}\s{0,}|^\s{0,}\]\s{0,},{0,1}$/;

export const IsForLoop = /^\s{0,}for\s{0,}\((.*)\)\s{0,}\{{0,1}/;

// export const IsBegingProperty =
//   /^\s{0,}(readonly){0,1}\s{1,}property\s{1,}([A-Za-z0-9]+)\s{1,}([A-Za-z0-9]+)\s:\s{0,}([^"'][A-Za-z0-9{([]+)/;

export const IsBegingProperty =
/^\s{0,}(readonly){0,1}\s{0,}property\s{1,}([A-Za-z0-9]){1,}\s{1,}(\D|\d){1,}\s{0,}:\s{0,}([^"'][A-Za-z0-9{([]){0,}/;

export const IsJsonWithVaiableKey =
  /^\s{0,}\[(\D|\d){1,}\]\s{0,}:\s{0,}([[{(]){0,1}/;
export const IsBegingSwitch =
  /^\s{0,}switch\s{0,}\(([A-Za-z0-9,]+)\)\s{0,}\{{0,1}/;
export const IsInCaseOrDefault =
  /^\s{0,}(case|default)\s{0,}\({0,1}(\D|\d){0,}\){0,1}\s{0,}:/;
export const IsInReturnOrBreak = /^\s{0,}(return|break).*/;

export const IsBrackts = /^\s{0,}\{/;
export const IsLogicalOperator = /^\s{0,}&&/;

export const IsFunction = /^\s{0,}function [A-Za-z]{1,}/;
export const IsIf = /^\s{0,}if\s{0,}\(\s{0,}(\D|\d){0,}/;
export const IsElse = /^\s{0,}\}{0,1}\s{0,}else\s{0,}\{{0,1}/;

export const IsFunctionArgsBegin = /\($/;
export const IsFunctionArgsEnd = /^\s{0,}\)/;

export const IsNewJson =
  /^\s{0,}[A-Za-z0-9]{1,}\s{0,}[A-Za-z0-9]{0,}\s{0,}={0,}\s{0,}\{/;
