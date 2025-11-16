import { FlowDemoCanvas } from "@/components/flow-demo-canvas";
import { Uri } from "@/toolkit/vscode/uri";
import { FC } from "react";
import xbook from "xbook/index";

export const AppFlowDemo: FC<{
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
      return { nodes: [], edges: [] };
    }
  };

  return <FlowDemoCanvas saveData={saveData} loadData={loadData} />;
}; 