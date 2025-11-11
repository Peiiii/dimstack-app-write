import { useCallback, useEffect, useRef, useState } from "react";
import { fileSystemHelper } from "@/helpers/file-system.helper";
import xbook from "xbook/index";
import { EventKeys } from "@/constants/eventKeys";

export type UseDocumentOptions = {
  autosave?: boolean;
  debounceMs?: number;
};

export function useDocument(uri: string, opts?: UseDocumentOptions) {
  const autosave = opts?.autosave ?? false;
  const debounceMs = opts?.debounceMs ?? 500;

  const [content, setContentState] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  // Load content
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fileSystemHelper.service
      .read(uri)
      .then((c) => {
        if (!cancelled) {
          setContentState(c);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(String((e as any)?.message || e));
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [uri]);

  const flush = useCallback(
    async (nextContent?: string) => {
      const text =
        typeof nextContent !== "undefined" ? nextContent : content;
      setSaving(true);
      try {
        await fileSystemHelper.service.write(uri, text);
        xbook.eventBus.emit(EventKeys.FileSaved);
      } catch (e) {
        setError(String((e as any)?.message || e));
      } finally {
        setSaving(false);
      }
    },
    [uri, content]
  );

  const setContent = useCallback(
    (next: string) => {
      setContentState(next);
      if (!autosave) return;
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        flush();
      }, debounceMs);
    },
    [autosave, debounceMs, flush]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return { content, setContent, flush, loading, saving, error };
}

