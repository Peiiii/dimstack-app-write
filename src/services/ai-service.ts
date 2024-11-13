export class AIService {
  private apiKey: string;
  private model: string;
  private baseUrl = "https://api.openai.com/v1/chat/completions";

  constructor(apiKey: string, model: string = "gpt-3.5-turbo") {
    this.apiKey = apiKey;
    this.model = model;
  }

  private async callAPI(messages: Array<{ role: string; content: string }>) {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error("API 调用失败");
    }

    const data = await response.json();
    return data.choices[0].message.content;
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

    return this.callAPI([
      { role: "user", content: prompt }
    ]);
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

    return this.callAPI([
      { role: "user", content: prompt }
    ]);
  }
} 