import { useEffect, useMemo, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { aiGateway, type AIMessage } from "@/services/ai-gateway";
import { aiToolRegistry, type AITool } from "@/services/ai-tool-registry";
import { layoutService } from "xbook/services";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ChatMessage = AIMessage & { id: string };

export const AIChatSidebar = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      const el = containerRef.current;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const currentPageContext = useMemo(() => {
    const page = layoutService.pageBox.getCurrentPage?.();
    if (!page) return undefined;
    const viewData = page.viewData as { type?: string; props?: { uri?: string } } | undefined;
    const uri = viewData?.props?.uri as string | undefined;

    // We use viewData.type as openerId hint; this assumes opener id ~= component id.
    const openerId = viewData?.type as string | undefined;

    return {
      pageId: page.id,
      uri,
      openerId,
    };
  }, [layoutService.pageBox.getCurrentPage?.()]);

  const activeTools: AITool[] = useMemo(() => {
    if (!currentPageContext?.openerId) return [];
    return aiToolRegistry.getToolsForOpener(currentPageContext.openerId);
  }, [currentPageContext?.openerId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = {
      id: `${Date.now()}`,
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setBusy(true);

    try {
      const system: AIMessage = {
        role: "system",
        content:
          "你是一个项目内的 AI 助手。你可以查看当前页面信息，并在需要时调用可用的工具来辅助用户操作。",
      };

      const toolDefs = activeTools.map((tool) => ({
        type: "function" as const,
        function: {
          name: tool.name,
          description: tool.description,
          parameters: tool.parameters,
        },
      }));

      const res = await aiGateway.chat({
        messages: [system, ...messages, userMessage],
        tools: toolDefs.length ? toolDefs : undefined,
      });

      // Naive handling: only take assistant message (ignore tool calls for now)
      if (res.messages[0]) {
        const m = res.messages[0];
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-assistant`,
            role: m.role,
            content: m.content,
            name: m.name,
          },
        ]);
      }
    } catch (error) {
      console.error("AI assistant error:", error);
      toast({
        title: "AI助手错误",
        description: "调用 AI 服务时出错，请稍后重试。",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background border-l">
      <Card className="m-2">
        <CardHeader>
          <CardTitle>AI 助手（原型）</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs text-muted-foreground">
          <div>当前页面：{currentPageContext?.uri || "无"}</div>
          <div>可用工具：{activeTools.length}</div>
        </CardContent>
      </Card>

      <div
        ref={containerRef}
        className="flex-1 overflow-auto px-2 space-y-2 text-sm"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={
              m.role === "user"
                ? "bg-blue-50 border border-blue-100 rounded-md p-2 ml-8"
                : "bg-slate-50 border border-slate-200 rounded-md p-2 mr-8"
            }
          >
            {m.content}
          </div>
        ))}
      </div>

      <div className="border-t p-2 space-y-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="问点什么，或让 AI 帮你操作当前页面..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              !busy && handleSend();
            }
          }}
        />
        <Button
          onClick={handleSend}
          disabled={busy}
          className="w-full"
          size="sm"
        >
          {busy ? "思考中..." : "发送"}
        </Button>
      </div>
    </div>
  );
};
