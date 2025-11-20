import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Excalidraw } from "@excalidraw/excalidraw";
import type {
  ExcalidrawInitialDataState,
  ExcalidrawImperativeAPI,
} from "@excalidraw/excalidraw/types";
import "@excalidraw/excalidraw/index.css";

import { useToast } from "@/hooks/use-toast";

type ExcalidrawElement = NonNullable<
  ExcalidrawInitialDataState["elements"]
>[number];
type ExcalidrawAppState = NonNullable<
  ExcalidrawInitialDataState["appState"]
>;
type BinaryFiles = NonNullable<ExcalidrawInitialDataState["files"]>;

// We don't want to persist non-serializable fields like `collaborators`
// into the JSON file, because Excalidraw expects them to be a Map.
// So we strip them when saving/loading.
type StoredAppState = Partial<Omit<ExcalidrawAppState, "collaborators">>;

export interface StoredSceneData {
  elements?: readonly ExcalidrawElement[];
  appState?: StoredAppState | null;
  files?: BinaryFiles;
}

export interface StoredFileData extends StoredSceneData {}

interface ExcalidrawAICanvasProps {
  saveData: (data: StoredFileData) => Promise<void>;
  loadData: () => Promise<StoredFileData | null>;
}

// Normalize appState before persisting
function sanitizeAppStateForStorage(
  appState: ExcalidrawAppState | null | undefined,
): StoredAppState | undefined {
  if (!appState) return undefined;
  const { collaborators: _collaborators, ...rest } = appState as ExcalidrawAppState & {
    collaborators?: unknown;
  };
  return rest;
}

// Normalize loaded appState (drop any persisted collaborators etc.)
function normalizeLoadedAppState(input: unknown): StoredAppState | undefined {
  if (!input || typeof input !== "object") return undefined;
  const { collaborators: _collaborators, ...rest } = input as {
    collaborators?: unknown;
    [key: string]: unknown;
  };
  return rest as StoredAppState;
}

export function ExcalidrawAICanvas({
  saveData,
  loadData,
}: ExcalidrawAICanvasProps) {
  const { t } = useTranslation();
  const { toast } = useToast();

  const excalidrawRef = useRef<ExcalidrawImperativeAPI | null>(null);
  const fileDataRef = useRef<StoredFileData>({});
  const saveTimeoutRef = useRef<number | null>(null);
  const saveDataRef = useRef(saveData);
  const [initialData, setInitialData] = useState<
    ExcalidrawInitialDataState | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  // Keep latest saveData in a ref so callbacks stay stable
  useEffect(() => {
    saveDataRef.current = saveData;
  }, [saveData]);

  const scheduleSave = useCallback(() => {
    if (saveTimeoutRef.current != null) {
      window.clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = window.setTimeout(() => {
      const dataToSave = fileDataRef.current;
      saveDataRef.current(dataToSave).catch((error) => {
        console.error("Auto save excalidraw data failed:", error);
      });
    }, 1000);
  }, []);

  // Clear pending timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current != null) {
        window.clearTimeout(saveTimeoutRef.current);
      }
      // Flush latest scene data on unmount to avoid losing edits
      const latest = fileDataRef.current;
      if (
        latest.elements &&
        Array.isArray(latest.elements) &&
        latest.elements.length > 0
      ) {
        saveDataRef.current(latest).catch((error) => {
          console.error("Final save excalidraw data failed:", error);
        });
      }
    };
  }, []);


  // Load saved data on mount
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await loadData();
        if (data && typeof data === "object") {
          const loaded: StoredFileData = {
            elements: Array.isArray(data.elements) ? data.elements : [],
            appState: normalizeLoadedAppState(
              (data as StoredFileData).appState ?? undefined,
            ),
            files: data.files ?? undefined,
          };

          fileDataRef.current = loaded;

          if (!cancelled) {
            if (loaded.elements && loaded.elements.length > 0) {
              setInitialData({
                elements: loaded.elements,
                appState: loaded.appState ?? undefined,
                files: loaded.files,
                scrollToContent: true,
              });
            } else {
              setInitialData(null);
            }
          }
        }
      } catch (error) {
        console.error("Error loading excalidraw data:", error);
        toast({
          title: t("excalidraw.generateFailed") || "加载失败",
          description:
            t("excalidraw.generateFailedDesc") ||
            "无法加载保存的数据，请稍后重试。",
          variant: "destructive",
        });
      }

      if (!cancelled) {
        setIsLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [loadData, t, toast]);

  const handleExcalidrawChange = useCallback(
    (
      elements: readonly ExcalidrawElement[],
      appState: ExcalidrawAppState,
      files: BinaryFiles,
    ) => {
      console.log("handleExcalidrawChange", elements.length);
      fileDataRef.current = {
        ...fileDataRef.current,
        elements,
        appState: sanitizeAppStateForStorage(appState),
        files,
      };
      scheduleSave();
    },
    [scheduleSave],
  );

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-sm text-muted-foreground">
        {t("excalidraw.loading") || "Loading Excalidraw canvas..."}
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-background">
      <div className="flex-1 relative">
        <div className="absolute inset-0">
          <Excalidraw
            initialData={initialData || undefined}
            excalidrawAPI={(api) => {
              excalidrawRef.current = api;
            }}
            onChange={handleExcalidrawChange}
            aiEnabled={false}
          />
        </div>
      </div>
    </div>
  );
}
