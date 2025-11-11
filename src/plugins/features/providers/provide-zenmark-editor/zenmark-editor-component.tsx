import { fileSystemHelper } from "@/helpers/file-system.helper";
import { ZenmarkEditor } from "zenmark-editor";
// For future editors, prefer using `useDocument(uri)` to centralize read/write/autosave.
// Kept simple here to match zenmark-editor's current contract.

export const ZenmarkEditorComponent = (props: { uri: string }) => {
  const { uri } = props;
  return (
    <ZenmarkEditor
      readContent={() => fileSystemHelper.service.read(uri)}
      writeContent={async (content) => {
        await fileSystemHelper.service.write(uri, content);
      }}
    />
  );
};
