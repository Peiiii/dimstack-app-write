import {
  CustomMonacoEditor,
  MonacoKeyCode,
  MonacoKeyMod,
} from "@/components/custom-monaco-editor";
import { useResource } from "@/hooks/use-resource";
import { Uri } from "@/toolkit/vscode/uri";
import React from "react";
import xbook from "xbook/index";

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
  uri = uri.replace("::", ":/xxx.com");
  console.log("TextFileView", uri);

  const [{ data }] = useResource(() =>
    xbook.fs
      .readFile(Uri.parse(uri))
      .then((content) => new TextDecoder().decode(content))
  );
  const suffix = uri.split(".").pop();
  const htmlContentRef = React.useRef<string | null>(data || null);
  const onSave = (content: string) => {
    console.log("onSave", content);

    xbook.fs
      .writeFile(Uri.parse(uri), new TextEncoder().encode(content), {
        overwrite: true,
        create: false,
      })
      .then(() => {
        xbook.notificationService.success("保存成功");
      });
  };
  return (
    <CustomMonacoEditor
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
  );
};
