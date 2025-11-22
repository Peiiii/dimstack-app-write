import type { ComponentType } from "react";
import { ExcalidrawAISidebar } from "./excalidraw-ai-panel";
import type { ExcalidrawAISidebarProps } from "./excalidraw-ai-panel";

type BridgeProps = Record<string, unknown>;

export const ExcalidrawPaneBridge: ComponentType<BridgeProps> = (props) => {
  const { chatHistory, onGenerate, ...rest } = props;
  return (
    <ExcalidrawAISidebar
      chatHistory={
        Array.isArray(chatHistory) ? (chatHistory as ExcalidrawAISidebarProps["chatHistory"]) : []
      }
      onGenerate={
        typeof onGenerate === "function"
          ? (onGenerate as ExcalidrawAISidebarProps["onGenerate"])
          : undefined
      }
      {...rest}
    />
  );
};
