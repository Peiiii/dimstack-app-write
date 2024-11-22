import { AIResumeChat } from "@/components/ai-resume-chat";
import { Uri } from "@/toolkit/vscode/uri";
import { FC } from "react";
import xbook from "xbook/index";

export const AppAIResume: FC<{
  uri: string;
}> = ({ uri }) => {
  if (!uri) {
    return <div>uri is required</div>;
  }

  const saveData = async (data: any) => {
    await xbook.fs.writeFile(
      Uri.parse(uri),
      new TextEncoder().encode(JSON.stringify(data)),
      { create: true, overwrite: true }
    );
  };

  const loadData = async () => {
    try {
      const data = await xbook.fs.readFile(Uri.parse(uri));
      return JSON.parse(new TextDecoder().decode(data));
    } catch (error) {
      return { messages: [], apiKey: "" };
    }
  };

  return <AIResumeChat saveData={saveData} loadData={loadData} />;
}; 