import OpenAI from "openai";
import type {
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
} from "openai/resources/chat/completions";
import type {
  AIMessage,
  AIGatewayRequest,
  AIGatewayResponse,
  AIRole,
} from "./types";

export type AIProviderName =
  | "openai"
  | "dashscope"
  | "openrouter"
  | "deepseek"
  | "kimi"
  | "glm";

export interface AIProvider {
  readonly name: string;
  readonly defaultModel: string;
  chat(req: Partial<AIGatewayRequest>): Promise<AIGatewayResponse>;
  chatStream(
    req: Partial<AIGatewayRequest>,
    onChunk: (chunk: string) => void
  ): Promise<AIGatewayResponse>;
}

export interface OpenAICompatibleProviderOptions {
  baseUrl?: string;
  apiKey?: string;
  defaultModel?: string;
  headers?: Record<string, string>;
}

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export class OpenAICompatibleProvider implements AIProvider {
  readonly name: string;
  readonly defaultModel: string;
  private baseUrl: string;
  private apiKey?: string;
  private client: OpenAI;

  constructor(name: string, options?: OpenAICompatibleProviderOptions) {
    this.name = name;
    this.baseUrl = trimTrailingSlash(
      options?.baseUrl || "https://api.openai.com/v1"
    );
    this.apiKey = options?.apiKey;
    this.defaultModel = options?.defaultModel || "gpt-4o-mini";
    this.client = new OpenAI({
      apiKey: this.apiKey || "",
      baseURL: this.baseUrl,
      defaultHeaders:
        options?.headers && Object.keys(options.headers).length
          ? options.headers
          : undefined,
      dangerouslyAllowBrowser: true,
    });
  }

  private mapMessage(message: AIMessage): ChatCompletionMessageParam {
    switch (message.role) {
      case "system":
      case "user":
        return {
          role: message.role,
          content: message.content,
        };
      case "assistant":
        return {
          role: "assistant",
          content: message.content,
          name: message.name,
        };
      case "tool":
        return {
          role: "tool",
          content: message.content,
          tool_call_id:
            message.name || `tool-call-${Math.random().toString(36).slice(2)}`,
        };
      default:
        return {
          role: "user",
          content: message.content,
        };
    }
  }

  async chat(req: Partial<AIGatewayRequest>): Promise<AIGatewayResponse> {
    const model = req.model || this.defaultModel;
    if (!model) {
      throw new Error(`Provider "${this.name}" 未配置模型`);
    }

    if (!this.apiKey) {
      throw new Error(`Provider "${this.name}" 未配置 API Key`);
    }

    const completion = await this.client.chat.completions.create({
      model,
      messages: (req.messages || []).map((message) =>
        this.mapMessage(message)
      ),
      tools: req.tools?.map((tool) => ({
        type: tool.type,
        function: {
          name: tool.function.name,
          description: tool.function.description,
          parameters: tool.function.parameters,
        },
      })),
    });

    const choice = completion.choices?.[0];
    const msg = choice?.message;

    const result: AIGatewayResponse = {
      messages: [],
    };

    if (msg) {
      const name = (msg as { name?: string }).name;
      result.messages.push({
        role: msg.role,
        content: msg.content ?? "",
        name,
      });

      if (msg.tool_calls && msg.tool_calls.length) {
        result.toolCalls = msg.tool_calls.map((c: ChatCompletionMessageToolCall) => ({
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

  async chatStream(
    req: Partial<AIGatewayRequest>,
    onChunk: (chunk: string) => void
  ): Promise<AIGatewayResponse> {
    const model = req.model || this.defaultModel;
    if (!model) {
      throw new Error(`Provider "${this.name}" 未配置模型`);
    }

    if (!this.apiKey) {
      throw new Error(`Provider "${this.name}" 未配置 API Key`);
    }

    const stream = await this.client.chat.completions.create({
      model,
      messages: (req.messages || []).map((message) =>
        this.mapMessage(message)
      ),
      tools: req.tools?.map((tool) => ({
        type: tool.type,
        function: {
          name: tool.function.name,
          description: tool.function.description,
          parameters: tool.function.parameters,
        },
      })),
      stream: true,
    });

    let fullContent = "";
    let role: AIRole = "assistant";
    let name: string | undefined;
    const toolCalls: AIGatewayResponse["toolCalls"] = [];

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta;
      if (!delta) continue;

      if (delta.content) {
        fullContent += delta.content;
        onChunk(delta.content);
      }

      if (delta.role && (delta.role === "system" || delta.role === "user" || delta.role === "assistant" || delta.role === "tool")) {
        role = delta.role;
      }

      if ((delta as { name?: string }).name) {
        name = (delta as { name?: string }).name;
      }

      if (delta.tool_calls) {
        for (const toolCall of delta.tool_calls) {
          const index = toolCall.index ?? 0;
          if (!toolCalls[index]) {
            toolCalls[index] = {
              id: toolCall.id || "",
              type: "function",
              function: {
                name: "",
                arguments: "",
              },
            };
          }
          if (toolCall.function?.name) {
            toolCalls[index].function.name += toolCall.function.name;
          }
          if (toolCall.function?.arguments) {
            toolCalls[index].function.arguments += toolCall.function.arguments;
          }
        }
      }
    }

    const result: AIGatewayResponse = {
      messages: [
        {
          role,
          content: fullContent,
          name,
        },
      ],
      toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
    };

    return result;
  }
}

interface ProviderConfig {
  baseUrl: string;
  apiKey?: string;
  defaultModel: string;
}

export const PROVIDER_CONFIGS: Record<AIProviderName, ProviderConfig> = {
  openai: {
    baseUrl: "https://api.openai.com/v1",
    apiKey: import.meta.env.VITE_AI_API_KEY,
    defaultModel: "gpt-4o-mini",
  },
  dashscope: {
    baseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    apiKey: import.meta.env.VITE_AI_DASHSCOPE_API_KEY,
    defaultModel: "qwen3-max",
  },
  openrouter: {
    baseUrl: "https://openrouter.ai/api/v1",
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
    defaultModel: "gpt-4o-mini",
  },
  deepseek: {
    baseUrl: "https://api.deepseek.com/v1",
    apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
    defaultModel: "deepseek-3.2",
  },
  kimi: {
    baseUrl: "https://api.moonshot.cn/v1",
    apiKey: import.meta.env.VITE_KIMI_API_KEY,
    defaultModel: "kimi-k2-thingking",
  },
  glm: {
    baseUrl: "https://open.bigmodel.cn/api/paas/v4",
    apiKey: import.meta.env.VITE_GLM_API_KEY,
    defaultModel: "glm-4.6",
  },
};
