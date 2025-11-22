import OpenAI from "openai";
import type {
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
} from "openai/resources/chat/completions";
import type {
  AIMessage,
  AIGatewayRequest,
  AIGatewayResponse,
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
}

const defaultReferer = () => {
  if (
    typeof window !== "undefined" &&
    window.location &&
    window.location.origin
  ) {
    return window.location.origin;
  }
  return undefined;
};

interface ProviderConfig {
  baseUrl: string;
  apiKey?: string;
  defaultModel: string;
  headersFactory?: () => Record<string, string>;
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
    headersFactory: () => {
      const headers: Record<string, string> = {};
      const referer =
        import.meta.env.VITE_OPENROUTER_REFERRER || defaultReferer();
      const title = import.meta.env.VITE_OPENROUTER_TITLE;
      if (referer) headers["HTTP-Referer"] = referer;
      if (title) headers["X-Title"] = title;
      return headers;
    },
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
