export type MessageType = "user" | "scene" | "divergent";

export interface Message {
  type: MessageType;
  content: string;
} 