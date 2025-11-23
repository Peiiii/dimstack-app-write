import type { AIContext } from "./context-service";
import i18n from "@/i18n/config";

export const DEFAULT_CHAT_MODEL = "dashscope/qwen3-max";

export function buildSystemPrompt(context?: AIContext): string {
  const t = i18n.t.bind(i18n);
  const BASE_SYSTEM_PROMPT = t("globalChat.systemPrompt");

  if (!context) {
    return BASE_SYSTEM_PROMPT;
  }

  const parts = [BASE_SYSTEM_PROMPT];

  const hasContext = context.browserTab || context.editor || context.project;
  if (hasContext) {
    parts.push(`\n## ${t("globalChat.contextInfo")}`);
    
    if (context.browserTab) {
      parts.push(`- ${t("globalChat.browserViewing", { title: context.browserTab.title, url: context.browserTab.url })}`);
    }
    
    if (context.editor) {
      parts.push(`- ${t("globalChat.editorEditing", { fileName: context.editor.fileName, lineCount: context.editor.lineCount })}`);
    }
    
    if (context.project?.currentFile) {
      parts.push(`- ${t("globalChat.projectFile", { file: context.project.currentFile })}`);
    }
    
    parts.push(`\n${t("globalChat.contextHint")}`);
  }

  return parts.join("\n");
}

export const CHAT_CONFIG = {
  defaultModel: DEFAULT_CHAT_MODEL,
  getSystemPrompt: (context?: AIContext) => buildSystemPrompt(context),
} as const;

