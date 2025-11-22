export const DEFAULT_CHAT_MODEL = "dashscope/qwen3-max";

export const CHAT_CONFIG = {
  defaultModel: DEFAULT_CHAT_MODEL,
  systemPrompt: "You are a helpful assistant embedded inside a developer workspace. Provide concise, high-signal answers. Use Markdown for code and formatting.",
} as const;

