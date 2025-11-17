// Simple tokenizer supporting English words and basic CJK bigrams.
// Keep it dependency-free and fast for client-side usage.

const isCJK = (ch: string): boolean => {
  const code = ch.charCodeAt(0);
  // Basic CJK Unified Ideographs + extensions (coarse check)
  return (
    (code >= 0x4e00 && code <= 0x9fff) ||
    (code >= 0x3400 && code <= 0x4dbf) ||
    (code >= 0x20000 && code <= 0x2a6df) ||
    (code >= 0x2a700 && code <= 0x2b73f) ||
    (code >= 0x2b740 && code <= 0x2b81f) ||
    (code >= 0x2b820 && code <= 0x2ceaf)
  );
};

const normalize = (s: string) => s.toLowerCase();

// Build ASCII 3-grams to support substring recall (e.g. "down" matches "markdown").
// We only generate grams for words length >= 3 and <= 48 to limit index growth.
const ascii3grams = (word: string): string[] => {
  const grams: string[] = [];
  if (!word) return grams;
  if (!/^[a-z0-9_]+$/.test(word)) return grams;
  if (word.length < 3 || word.length > 48) return grams;
  for (let i = 0; i <= word.length - 3; i++) {
    grams.push(word.slice(i, i + 3));
  }
  return grams;
};

export const tokenize = (text: string): string[] => {
  if (!text) return [];
  const s = normalize(text);
  const tokens: string[] = [];

  // Split the text into segments of CJK and non-CJK for specialized handling
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    const cjk = isCJK(c);
    let j = i + 1;
    while (j < s.length && isCJK(s[j]) === cjk) j++;
    const seg = s.slice(i, j);

    if (cjk) {
      // CJK bigrams; fall back to single char if length=1
      if (seg.length === 1) tokens.push(seg);
      else for (let k = 0; k < seg.length - 1; k++) tokens.push(seg.slice(k, k + 2));
    } else {
      // Non-CJK: keep letters, digits, underscore; split by others
      const words = seg.split(/[^a-z0-9_]+/g).filter(Boolean);
      for (const w of words) {
        tokens.push(w);
        // Add 3-gram tokens to improve substring recall for ASCII content
        const grams = ascii3grams(w);
        if (grams.length) tokens.push(...grams);
      }
    }
    i = j;
  }

  return tokens;
};

export const tokenizeForIndex = (title: string, body: string): string[] => {
  const tt = tokenize(title || "");
  const tb = tokenize(body || "");
  // Slight title boost by duplicating tokens
  return [...tt, ...tt, ...tb];
};
