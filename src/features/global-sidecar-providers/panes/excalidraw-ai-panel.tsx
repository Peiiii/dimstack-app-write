import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader2, ArrowUp, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/toolkit/utils/shadcn-utils";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { useColorMode } from "@chakra-ui/react";
import { ExcalidrawAIIcon } from "@/components/icons/ai-assistant-icon";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ExcalidrawAISidebarProps {
  chatHistory?: ChatMessage[];
  onGenerate?: (prompt: string) => Promise<void>;
}

const CopyButton = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 text-muted-foreground/60 hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
      title="复制内容"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
};

export function ExcalidrawAISidebar({
  chatHistory = [],
  onGenerate,
}: ExcalidrawAISidebarProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const target = e.target;
    target.style.height = '40px';
    const newHeight = Math.min(Math.max(target.scrollHeight, 40), 200);
    target.style.height = `${newHeight}px`;
  };

  const canGenerate = typeof onGenerate === "function";
  const handleSend = async () => {
    if (!input.trim() || isGenerating || !canGenerate) return;

    const prompt = input.trim();
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px';
    }
    setIsGenerating(true);

    try {
      if (onGenerate) {
        await onGenerate(prompt);
      }
    } catch (error) {
      console.error("生成图表时出错:", error);
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
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth" ref={scrollAreaRef}>
        <div className="max-w-3xl mx-auto w-full">
          {chatHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-4 animate-in fade-in duration-500">
              <div className="w-16 h-16 mb-6">
                <ExcalidrawAIIcon className="w-full h-full" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">
                {t("excalidraw.welcomeTitle") || "开始你的 AI 绘图之旅"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mb-6">
                {t("excalidraw.welcomeDesc") || "用自然语言描述你想要的流程图或架构图，AI 会帮你自动生成"}
              </p>
              <div className="space-y-2 text-left w-full max-w-md">
                <button 
                  className="w-full p-3 rounded-md bg-muted/30 border border-border/50 hover:bg-muted/40 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={async () => {
                    const prompt = t("excalidraw.example1") || "一个包含前端、后端和数据库的三层 Web 系统";
                    if (canGenerate && !isGenerating) {
                      setInput(prompt);
                      setIsGenerating(true);
                      try {
                        if (onGenerate) {
                          await onGenerate(prompt);
                        }
                      } catch (error) {
                        console.error("生成图表时出错:", error);
                      } finally {
                        setIsGenerating(false);
                      }
                    }
                  }}
                  disabled={!canGenerate || isGenerating}
                >
                  <p className="text-sm text-foreground">
                    {t("excalidraw.example1") || "一个包含前端、后端和数据库的三层 Web 系统"}
                  </p>
                </button>
                <button 
                  className="w-full p-3 rounded-md bg-muted/30 border border-border/50 hover:bg-muted/40 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={async () => {
                    const prompt = t("excalidraw.example2") || "用户注册流程：输入信息 → 验证 → 创建账户 → 发送确认邮件";
                    if (canGenerate && !isGenerating) {
                      setInput(prompt);
                      setIsGenerating(true);
                      try {
                        if (onGenerate) {
                          await onGenerate(prompt);
                        }
                      } catch (error) {
                        console.error("生成图表时出错:", error);
                      } finally {
                        setIsGenerating(false);
                      }
                    }
                  }}
                  disabled={!canGenerate || isGenerating}
                >
                  <p className="text-sm text-foreground">
                    {t("excalidraw.example2") || "用户注册流程：输入信息 → 验证 → 创建账户 → 发送确认邮件"}
                  </p>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-4 space-y-6">
              {chatHistory.map((message) => (
                <div key={message.id} className="w-full group animate-in slide-in-from-bottom-2 duration-300">
                  {message.role === "assistant" ? (
                    <div className="flex flex-col gap-1.5">
                      <div className="px-4 group/content relative">
                        {message.content === "" ? (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            <span className="text-sm">
                              {t("excalidraw.generating") || "正在生成..."}
                            </span>
                          </div>
                        ) : (
                          <>
                            <MarkdownRenderer content={message.content} isDark={colorMode === 'dark'} />
                            <div className="mt-2 opacity-0 group-hover/content:opacity-100 transition-opacity">
                              <CopyButton content={message.content} />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1.5 items-end">
                      <div className="px-4 w-full flex justify-end">
                        <div className="bg-secondary/80 text-secondary-foreground px-4 py-2.5 rounded-[20px] rounded-tr-md shadow-sm max-w-full inline-block border border-border/5">
                          {message.content === "" ? (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              <span className="text-sm">发送中...</span>
                            </div>
                          ) : (
                            <div className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                              {message.content}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-border bg-background z-10">
        <div className="max-w-3xl mx-auto w-full p-4">
          {!canGenerate && (
            <div className="text-sm text-muted-foreground border border-dashed border-border/50 rounded-md p-2 bg-muted/20 mb-2">
              {t("excalidraw.canvasRequired") || "请在 Excalidraw 画布中打开并使用该助手，以便把生成的图形写入当前画布。"}
            </div>
          )}
          <div className="relative flex items-end gap-2 rounded-[26px] bg-background border border-border p-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder={
                t("excalidraw.promptPlaceholder") ||
                "描述图表内容..."
              }
              className="flex-1 resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2.5 text-[15px] disabled:opacity-50 disabled:cursor-not-allowed overflow-y-auto placeholder:text-muted-foreground/50"
              style={{ height: '40px', minHeight: '40px', maxHeight: '200px' }}
              rows={1}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isGenerating || !canGenerate}
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full transition-all duration-200 flex-shrink-0 mb-0.5 mr-0.5",
                !input.trim()
                  ? "bg-muted text-muted-foreground hover:bg-muted/80"
                  : "bg-gradient-to-br from-amber-500 to-red-500 text-white hover:from-amber-600 hover:to-red-600 shadow-sm"
              )}
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowUp className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
