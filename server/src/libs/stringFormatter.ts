export function whiteSpaceRemove(str: string, spaceSize: number): string {
  str = str.trim();
  spaceSize = spaceSize > 0 ? spaceSize : 0;
  const identationSpace = str === "" ? "" : " ".repeat(spaceSize);
  return (
    identationSpace +
    str
      .replace(/\s{0,},\s{0,}/g, ", ")
      .replace(/([^"]+)|("[^"]+")/g, function ($0, $1, $2) {
        if ($1) {
          if (str.includes("//")) return $1;
          return $1.replace(/\s{1,}/g, " ");
        } else {
          return $2;
        }
      })
      .trim()
  );
}
