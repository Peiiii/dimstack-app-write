export const tryParseJSON = <T>(str: string | null, defaultValue: T) => {
  if (str === null) {
    return defaultValue;
  }
  try {
    return JSON.parse(str);
  } catch {
    return defaultValue;
  }
};
