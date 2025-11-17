export const highlightText = (text: string, query: string): React.ReactNode => {
  if (!text) return null;
  if (!query) return <>{text}</>;
  const q = query.toLowerCase();
  const s = text;
  const lower = s.toLowerCase();
  const parts: React.ReactNode[] = [];
  let i = 0;
  while (i < s.length) {
    const idx = lower.indexOf(q, i);
    if (idx === -1) {
      parts.push(s.slice(i));
      break;
    }
    if (idx > i) parts.push(s.slice(i, idx));
    parts.push(
      <mark key={idx} className="bg-yellow-200/60 dark:bg-yellow-900/40 rounded px-0.5 font-medium">
        {s.slice(idx, idx + q.length)}
      </mark>
    );
    i = idx + q.length;
  }
  return <>{parts}</>;
};

