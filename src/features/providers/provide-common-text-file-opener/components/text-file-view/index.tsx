import React, { useEffect } from "react";
// Lazy-load Monaco editor to avoid pulling it into the main chunk immediately
const LazyCustomMonacoEditor = React.lazy(() =>
  import("@/components/custom-monaco-editor").then((m) => ({
    default: m.CustomMonacoEditor,
  }))
);
// Import key enums from a tiny module that only pulls monaco editor.api (no languages)
import { MonacoKeyCode, MonacoKeyMod } from "@/monaco/keys";
import { useResource } from "@/hooks/use-resource";
import { Uri } from "@/toolkit/vscode/uri";
import xbook from "xbook/index";
import { useTranslation } from "react-i18next";
import { EventKeys } from "@/constants/eventKeys";

// 30+ languages supported by Monaco Editor
const LanguageMap = {
  js: "javascript",
  ts: "typescript",
  json: "json",
  html: "html",
  css: "css",
  md: "markdown",
  scss: "scss",
  less: "less",
  vue: "vue",
  jsx: "javascript",
  tsx: "typescript",
  yaml: "yaml",
  yml: "yaml",
  toml: "toml",
  xml: "xml",
  csv: "csv",
  log: "log",
  ini: "ini",
  conf: "conf",
  properties: "properties",
  java: "java",
  c: "c",
  cpp: "cpp",
  h: "c",
  hpp: "cpp",
  py: "python",
  sh: "shell",
  bat: "bat",
  cmd: "cmd",
  ps1: "powershell",
  psm1: "powershell",
  sql: "sql",
  php: "php",
  go: "go",
  rb: "ruby",
  lua: "lua",
  pl: "perl",
  m: "matlab",
  r: "r",
  rs: "rust",
  cs: "csharp",
  fs: "fsharp",
  swift: "swift",
  kt: "kotlin",
  groovy: "groovy",
  scala: "scala",
  perl: "perl",
  coffee: "coffeescript",
};



export const TextFileView: React.FC<{
  uri: string;
}> = ({ uri }) => {
  const { t } = useTranslation();
  uri = uri.replace("::", ":/xxx.com");
  const [{ data, loading }] = useResource(() =>
    xbook.fs
      .readFile(Uri.parse(uri))
      .then((content) => new TextDecoder().decode(content))
  );
  const suffix = uri.split(".").pop();
  
  useEffect(() => {
    if (!loading && data !== undefined) {
      xbook.eventBus.emit(EventKeys.FileLoaded, { uri });
    }
  }, [loading, data, uri]);
  const htmlContentRef = React.useRef<string | null>(data || null);
  const onSave = (content: string) => {
    xbook.fs
      .writeFile(Uri.parse(uri), new TextEncoder().encode(content), {
        overwrite: true,
        create: false,
      })
      .then(() => {
        xbook.notificationService.success(t("file.saveSuccess"));
      });
  };
  return (
    <React.Suspense fallback={<div>{t("file.loadingEditor")}</div>}>
      <LazyCustomMonacoEditor
        value={data || ""}
        language={(suffix && LanguageMap[suffix]) || "txt"}
        onChange={(e) => {
          htmlContentRef.current = e;
        }}
        keyBindings={[
          {
            key: MonacoKeyMod.CtrlCmd | MonacoKeyCode.KeyS,
            action: () => {
              if (htmlContentRef.current !== null) {
                onSave(htmlContentRef.current);
              }
            },
          },
        ]}
      />
    </React.Suspense>
  );
};
