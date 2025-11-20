import {
  ExcalidrawAICanvas,
  type StoredFileData,
} from "@/components/excalidraw-ai-canvas";
import { Uri } from "@/toolkit/vscode/uri";
import { FC } from "react";
import xbook from "xbook/index";

export const AppExcalidraw: FC<{
  uri: string;
}> = ({ uri }) => {
  if (!uri) {
    return <div>uri is required</div>;
  }

  const saveData = async (data: StoredFileData) => {
    await xbook.fs.writeFile(
      Uri.parse(uri),
      new TextEncoder().encode(JSON.stringify(data)),
      { create: true, overwrite: true },
    );
  };

  const loadData = async (): Promise<StoredFileData | null> => {
    try {
      const data = await xbook.fs.readFile(Uri.parse(uri));
      const parsed = JSON.parse(new TextDecoder().decode(data)) as
        | StoredFileData
        | null
        | undefined;
      if (!parsed || typeof parsed !== "object") {
        return null;
      }
      return parsed;
    } catch (error) {
      // New files or read errors just behave as empty scene
      return null;
    }
  };

  return <ExcalidrawAICanvas saveData={saveData} loadData={loadData} />;
};
