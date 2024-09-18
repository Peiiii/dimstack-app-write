export const joinPath = (...parts: string[]) => {
  let prev = parts[0];
  for (let i = 1; i < parts.length; i++) {
    if (prev.endsWith("/")) {
      prev += parts[i];
    } else {
      prev += "/" + parts[i];
    }
  }
  return prev;
};

export const isAnsestorPathOf = (path: string, base: string) => {
  const pathParts = path.split("/");
  const baseParts = base.split("/");
  if (pathParts.length <= baseParts.length) return false;
  return pathParts
    .slice(0, baseParts.length)
    .every((part, index) => part === baseParts[index]);
};
