import FictionalScenarioStory from "@/components/fictional-scenario-story";
import { Uri } from "@/toolkit/vscode/uri";
import { FC } from "react";
import xbook from "xbook/index";

export const AppAIStoryCards: FC<{
  uri: string;
}> = ({ uri }) => {
  console.log("uri", uri);
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
    const data = await xbook.fs.readFile(Uri.parse(uri));
    return JSON.parse(new TextDecoder().decode(data));
  };
  return <FictionalScenarioStory saveData={saveData} loadData={loadData} />;
};
