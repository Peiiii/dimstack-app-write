import type {
  AIRole,
  AIMessage,
  AIToolDefinition,
  AIGatewayRequest,
  AIGatewayResponse,
  AIToolCall,
} from "./types";
import {
  AIProvider,
  AIProviderName,
  OpenAICompatibleProvider,
  PROVIDER_CONFIGS,
} from "./providers";

export type {
  AIRole,
  AIMessage,
  AIToolDefinition,
  AIGatewayRequest,
  AIGatewayResponse,
  AIToolCall,
};

export interface AIGatewayServiceOptions {
  provider?: AIProvider;
  providerName?: AIProviderName;
  baseUrl?: string;
  apiKey?: string;
  model?: string;
}

export class AIGatewayService {
  private readonly serviceOptions?: AIGatewayServiceOptions;
  private readonly providerCache = new Map<string, AIProvider>();
  private readonly defaultProvider: AIProvider;
  private readonly defaultProviderName: AIProviderName;

  constructor(options?: AIGatewayServiceOptions) {
    this.serviceOptions = options;

    if (options?.provider) {
      this.defaultProvider = options.provider;
      this.defaultProviderName =
        options.providerName ||
        (options.provider.name as AIProviderName) ||
        "openai";
      this.providerCache.set(this.defaultProviderName, options.provider);
      return;
    }

    const providerName =
      options?.providerName ||
      (import.meta.env.VITE_AI_PROVIDER as AIProviderName) ||
      "openai";

    this.defaultProviderName = providerName;
    const provider = this.resolveProvider(providerName);
    this.defaultProvider = provider;
    this.providerCache.set(providerName, provider);
  }

  private resolveProvider(providerName: AIProviderName): AIProvider {
    const config = PROVIDER_CONFIGS[providerName];
    if (!config) {
      throw new Error(`未识别的 AI provider: ${providerName}`);
    }

    const baseUrl = this.serviceOptions?.baseUrl || config.baseUrl;
    const apiKey = this.serviceOptions?.apiKey || config.apiKey;
    const defaultModel = this.serviceOptions?.model || config.defaultModel;

    return new OpenAICompatibleProvider(providerName, {
      baseUrl,
      apiKey,
      defaultModel,
    });
  }

  private getProvider(providerName?: AIProviderName): AIProvider {
    if (!providerName) {
      return this.defaultProvider;
    }

    const cached = this.providerCache.get(providerName);
    if (cached) {
      return cached;
    }

    const provider = this.resolveProvider(providerName);
    this.providerCache.set(providerName, provider);
    return provider;
  }

  private parseModel(model?: string): {
    provider: AIProviderName;
    model?: string;
  } {
    if (!model) {
      return { provider: this.defaultProviderName, model: undefined };
    }

    const segments = model.split("/");
    if (segments.length > 1) {
      const providerCandidate = segments[0] as AIProviderName;
      if (PROVIDER_CONFIGS[providerCandidate]) {
        const actualModel = segments.slice(1).join("/");
        return {
          provider: providerCandidate,
          model: actualModel || undefined,
        };
      }
    }

    return {
      provider: this.defaultProviderName,
      model,
    };
  }

  async chat(req: Partial<AIGatewayRequest>): Promise<AIGatewayResponse> {
    const { provider, model } = this.parseModel(req.model);
    const targetProvider = this.getProvider(provider);
    return targetProvider.chat({
      ...req,
      model,
    });
  }
}

export const aiGateway = new AIGatewayService();
