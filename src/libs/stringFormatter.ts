export function whiteSpaceRemove(str: string, spaceSize: number): string {
  str = str.trim();
  let identationSpace = str === ''
    ? ''
    : ' '.repeat(spaceSize);
  return identationSpace + str.replace(/([^"]+)|("[^"]+")/g, function ($0, $1, $2) {
    if ($1) {
      return $1.replace(/\s{1,}/g, " ");
    } else {
      return $2;
    }
  });
}