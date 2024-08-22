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
