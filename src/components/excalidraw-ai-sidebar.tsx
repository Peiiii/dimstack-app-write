import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sparkles, Send, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/toolkit/utils/shadcn-utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface ExcalidrawAISidebarProps {
  chatHistory: ChatMessage[];
  onChatHistoryChange: (history: ChatMessage[]) => void;
  onGenerate: (prompt: string) => Promise<void>;
  onClose: () => void;
}

export function ExcalidrawAISidebar({
  chatHistory,
  onChatHistoryChange,
  onGenerate,
  onClose,
}: ExcalidrawAISidebarProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const prompt = input.trim();
    setInput("");
    setIsGenerating(true);

    try {
      await onGenerate(prompt);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-background to-background/95 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 shadow-md">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {t("excalidraw.aiAssistant") || "AI 绘图助手"}
            </h2>
            <p className="text-xs text-muted-foreground">
              {t("excalidraw.aiAssistantDesc") || "用自然语言描述，AI 帮你生成图表"}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 rounded-full hover:bg-background/80"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-4 py-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {chatHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 mb-4">
                <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t("excalidraw.welcomeTitle") || "开始你的 AI 绘图之旅"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mb-6">
                {t("excalidraw.welcomeDesc") || "用自然语言描述你想要的流程图或架构图，AI 会帮你自动生成"}
              </p>
              <div className="space-y-2 text-left w-full max-w-sm">
                <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                  <p className="text-xs font-medium text-muted-foreground mb-1">示例 1：</p>
                  <p className="text-sm text-foreground">
                    "一个包含前端、后端和数据库的三层 Web 系统"
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                  <p className="text-xs font-medium text-muted-foreground mb-1">示例 2：</p>
                  <p className="text-sm text-foreground">
                    "用户注册流程：输入信息 → 验证 → 创建账户 → 发送确认邮件"
                  </p>
                </div>
              </div>
            </div>
          ) : (
            chatHistory.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 animate-in fade-in slide-in-from-bottom-2",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-md">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm transition-all duration-200",
                    message.role === "user"
                      ? "bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-br-sm"
                      : "bg-muted/80 border border-border/50 text-foreground rounded-bl-sm",
                    message.content === "" && "flex items-center gap-2"
                  )}
                >
                  {message.content === "" ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {t("excalidraw.generating") || "正在生成..."}
                      </span>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                    <span className="text-xs font-medium text-foreground">你</span>
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background/95 backdrop-blur-sm">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              t("excalidraw.promptPlaceholder") ||
              "描述你想要的图表，例如：一个包含前端、后端和数据库的三层 Web 系统"
            }
            className="min-h-[80px] max-h-[200px] resize-none border-2 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
            disabled={isGenerating}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isGenerating}
            className="h-auto px-6 bg-gradient-to-br from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {t("excalidraw.inputHint") || "按 Enter 发送，Shift + Enter 换行"}
        </p>
      </div>
    </div>
  );
}

