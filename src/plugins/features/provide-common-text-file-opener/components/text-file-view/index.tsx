import { CustomMonacoEditor } from "@/components/custom-monaco-editor";
import { Tokens } from "@/constants/tokens";
import { useResource } from "@/hooks/use-resource";
import { Uri } from "@/toolkit/vscode/uri";
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
  return (
    <CustomMonacoEditor
      value={data || ""}
      language={suffix || "txt"}
      onChange={(e) => {
        console.log("onChange", e);
      }}
    />
  );
};
