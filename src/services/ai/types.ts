export type AIRole = "system" | "user" | "assistant" | "tool";

export interface AIMessage {
  role: AIRole;
  content: string;
  name?: string;
}

export interface AIToolDefinition {
  type: "function";
  function: {
    name: string;
    description?: string;
    parameters?: Record<string, any>;
  };
}

export interface AIGatewayRequest {
  messages: AIMessage[];
  tools?: AIToolDefinition[];
  model?: string;
}

export interface AIToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

export interface AIGatewayResponse {
  messages: AIMessage[];
  toolCalls?: AIToolCall[];
}
