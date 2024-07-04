import {
  CustomMonacoEditor,
  MonacoKeyCode,
  MonacoKeyMod,
} from "@/components/custom-monaco-editor";
import { Tokens } from "@/constants/tokens";
import { useResource } from "@/hooks/use-resource";
import { Uri } from "@/toolkit/vscode/uri";
import React from "react";
import xbook from "xbook/index";

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
      language={suffix || "txt"}
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
