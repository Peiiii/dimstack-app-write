export function updateSearchParams(
  url: string,
  params: Record<string, string | null>
): string {
  const urlObj = new URL(url);
  const searchParams = urlObj.searchParams;

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value === null) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
  });

  urlObj.search = searchParams.toString();
  return urlObj.toString();
}
