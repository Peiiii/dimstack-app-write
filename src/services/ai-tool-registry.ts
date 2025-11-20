
export interface AITool {
  name: string;
  description?: string;
  parameters?: Record<string, any>;
  invoke: (args: any, context: { pageId: string; uri?: string }) => Promise<any>;
}

export interface AIToolProvider {
  getTools(): AITool[];
}

export class AIToolRegistry {
  private providers = new Map<string, AIToolProvider>(); // key: openerId

  register(openerId: string, provider: AIToolProvider) {
    this.providers.set(openerId, provider);
  }

  getToolsForOpener(openerId: string): AITool[] {
    return this.providers.get(openerId)?.getTools() ?? [];
  }
}

export const aiToolRegistry = new AIToolRegistry();

