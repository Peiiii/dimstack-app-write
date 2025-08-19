import { fileSystemHelper } from "@/helpers/file-system.helper";
import { ZenmarkEditor } from "zenmark-editor";

export const ZenmarkEditorComponent = (props: { uri: string }) => {
    const { uri } = props;

    return <ZenmarkEditor readContent={() => fileSystemHelper.service.read(uri)} writeContent={async (content) => {
        await fileSystemHelper.service.write(uri, content)
    }} />
};