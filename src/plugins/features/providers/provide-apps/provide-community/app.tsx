import { Community } from "@/components/community";
import { Uri } from "@/toolkit/vscode/uri";
import { FC } from "react";
import xbook from "xbook/index";

export const AppCommunity: FC<{
  uri: string;
}> = ({ uri }) => {
  if (!uri) {
    return <div>uri is required</div>;
  }

  const saveData = async (data: any) => {
    try {
      await xbook.fs.writeFile(
        Uri.parse(uri),
        new TextEncoder().encode(JSON.stringify(data)),
        { create: true, overwrite: true }
      );
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };

  const loadData = async () => {
    try {
      const data = await xbook.fs.readFile(Uri.parse(uri));
      return JSON.parse(new TextDecoder().decode(data));
    } catch (error) {
      return { posts: [] };
    }
  };

  return <Community saveData={saveData} loadData={loadData} />;
}; 