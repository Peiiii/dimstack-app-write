import { aiGateway } from "@/services/ai-gateway";

export class AIService {
  private model: string;

  /**
   * Legacy wrapper around the new AIGatewayService.
   * Kept for existing components (AI Resume, AI Quotes, etc).
   */
  constructor(model: string = "gpt-4o-mini") {
    this.model = model;
  }

  private async callAPI(
    messages: Array<{ role: "system" | "user" | "assistant"; content: string }>,
    responseFormat?: { type: string }
  ) {
    const res = await aiGateway.chat({
      model: this.model,
      messages,
      // responseFormat is not wired yet; kept for compatibility.
    });

    const msg = res.messages[0];
    if (!msg) {
      throw new Error("AI 网关未返回任何消息");
    }
    return msg.content;
  }

  async generateText(prompt: string) {
    return this.callAPI([{ role: "user", content: prompt }]);
  }

  async generateJSONResponse(prompt: string) {
    return this.callAPI([{ role: "user", content: prompt }], {
      type: "json_object",
    });
  }

  async generateSceneDescription(input: string, history: string[]) {
    const historyContext = history.length
      ? "之前的情节：\n" + history.join("\n") + "\n\n"
      : "";

    const prompt = `${historyContext}基于以下内容，请详细描述一个完整的场景或情节：${input}
要求：
1. 保持与之前情节的连贯性
2. 添加细节描述，包括环境、人物状态、动作等
3. 控制在200字以内`;

    return this.callAPI([{ role: "user", content: prompt }]);
  }

  async generateDivergentOptions(scene: string, history: string[]) {
    const historyContext = history.length
      ? "之前的情节：\n" + history.join("\n") + "\n\n"
      : "";

    const prompt = `${historyContext}当前情节：${scene}
    
请提供3个合理的剧情发展方向：
1. 每个方向都要简短但具体
2. 确保与已有情节连贯
3. 每个方向都要有独特性`;

    return this.callAPI([{ role: "user", content: prompt }]);
  }
}
