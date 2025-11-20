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
  model: string;
  messages: AIMessage[];
  tools?: AIToolDefinition[];
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

/**
 * Global AI gateway service.
 *
 * - Uses a single, project-level AI endpoint (OpenAI-compatible).
 * - No per-component API key handling.
 */
export class AIGatewayService {
  private baseUrl: string;
  private apiKey?: string;
  private defaultModel: string;

  constructor(options?: { baseUrl?: string; apiKey?: string; model?: string }) {
    this.baseUrl =
      options?.baseUrl ||
      (import.meta as any).env?.VITE_AI_BASE_URL ||
      "https://api.openai.com/v1";
    this.apiKey =
      options?.apiKey || (import.meta as any).env?.VITE_AI_API_KEY || undefined;
    this.defaultModel =
      options?.model ||
      (import.meta as any).env?.VITE_AI_MODEL ||
      "gpt-4o-mini";
  }

  async chat(req: Partial<AIGatewayRequest>): Promise<AIGatewayResponse> {
    const model = req.model || this.defaultModel;
    const url = `${this.baseUrl.replace(/\/$/, "")}/chat/completions`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.apiKey) {
      headers.Authorization = `Bearer ${this.apiKey}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model,
        messages: req.messages,
        tools: req.tools,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI gateway request failed with ${response.status}`);
    }

    const data = await response.json();

    const choice = data.choices?.[0];
    const msg = choice?.message;

    const result: AIGatewayResponse = {
      messages: [],
    };

    if (msg) {
      result.messages.push({
        role: msg.role,
        content: msg.content ?? "",
        name: msg.name,
      });
      if (msg.tool_calls && msg.tool_calls.length) {
        result.toolCalls = msg.tool_calls.map((c: any) => ({
          id: c.id,
          type: c.type,
          function: {
            name: c.function.name,
            arguments: c.function.arguments,
          },
        }));
      }
    }

    return result;
  }
}

export const aiGateway = new AIGatewayService();

