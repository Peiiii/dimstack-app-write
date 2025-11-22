"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { AIService } from "@/services/ai/ai-service";
import { useEffect, useRef, useState } from "react";
import { useStickyAutoScroll } from "@/hooks/use-sticky-autoscroll";
import { ResumeView } from "@/components/resume-view";
import { Message, Resume, AppProps } from "@/types/resume";
import { isEqual } from 'lodash';

export function AIResumeChat({ saveData, loadData }: AppProps) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const { toast } = useToast();
  const { containerRef, notifyNewItem, scrollToBottom, setIsSticky } =
    useStickyAutoScroll({ threshold: 80 });
  const aiService = new AIService("gpt-4o-mini");
  const prevDataRef = useRef({ messages });

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await loadData();
        if (savedData) {
          setMessages(savedData.messages || []);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: t("resume.loadFailed"),
          description: t("resume.loadFailedDesc"),
          variant: "destructive",
        });
      }
    };
    loadSavedData();
  }, [loadData, t, toast]);

  useEffect(() => {
    const currentData = { messages };
    
    if (isEqual(currentData, prevDataRef.current)) {
      return;
    }

    const autoSave = async () => {
      try {
        await saveData(currentData);
        prevDataRef.current = currentData;
      } catch (error) {
        console.error("Auto save failed:", error);
      }
    };
    
    const timeoutId = setTimeout(autoSave, 1000);
    return () => clearTimeout(timeoutId);
  }, [messages, saveData]);

  // Auto scroll on new messages when sticky
  useEffect(() => {
    notifyNewItem();
  }, [messages, notifyNewItem]);

  const handleSend = async () => {
    if (!input.trim()) {
      toast({
        title: t("resume.error"),
        description: t("resume.enterContent"),
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const userMessage: Message = {
        type: "user",
        content: input,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      // User reply should always scroll to bottom
      requestAnimationFrame(() => scrollToBottom());

      const prompt = `你是一个专业的简历顾问。基于用户的输入："${input}"，
请提供专业的建议和帮助。如果收集到足够信息，请生成一份简历。

历史对话：
${messages.map((m) => `${m.type}: ${m.content}`).join("\n")}

请返回以下格式的JSON：
{
  "reply": "你的回复",
  "generateResume": true/false,
  "resumeData": {
    "basics": {
      "name": "姓名",
      "title": "职位",
      "experience": "经验年限",
      "summary": "个人总结"
    },
    "skills": ["技能1", "技能2"],
    "experience": [{
      "company": "公司名",
      "position": "职位",
      "duration": "时间段",
      "highlights": ["亮点1", "亮点2"]
    }],
    "projects": [{
      "name": "项目名",
      "description": "描述",
      "achievements": ["成就1", "成就2"],
      "technologies": ["技术1", "技术2"]
    }]
  }
}`;

      const response = await aiService.generateJSONResponse(prompt);
      const result = JSON.parse(response);

      const aiMessages: Message[] = [
        {
          type: "assistant",
          content: result.reply,
          timestamp: new Date().toISOString(),
        },
      ];

      if (result.generateResume) {
        aiMessages.push({
          type: "resume-card",
          content: "简历预览",
          resumeData: result.resumeData,
          timestamp: new Date().toISOString(),
        });
      }

      setMessages((prev) => [...prev, ...aiMessages]);
      // AI reply respects sticky (handled by notifyNewItem in messages effect)
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "生成失败",
        description: "无法生成回应，请检查您的API密钥和网络连接。",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderMessage = (message: Message) => {
    switch (message.type) {
      case "resume-card":
        return (
          <Card
            key={message.timestamp}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedResume(message.resumeData || null)}
          >
            <CardHeader>
              <CardTitle>简历预览</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3>{message.resumeData?.basics.title}</h3>
                <p>{message.resumeData?.basics.summary}</p>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return (
          <div
            key={message.timestamp}
            className={`p-4 rounded-lg mb-4 ${
              message.type === "user"
                ? "bg-blue-100 ml-12"
                : "bg-gray-100 mr-12"
            }`}
          >
            {message.content}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>AI简历助手</CardTitle>
          </CardHeader>
        </Card>

        <div
          className="space-y-4 mb-4 max-h-[60vh] overflow-auto"
          ref={containerRef}
          onMouseEnter={() => setIsSticky(false)}
          onMouseLeave={() => setIsSticky(true)}
        >
          {messages.map(renderMessage)}
        </div>

        <div className="flex space-x-2">
          <Input
            placeholder="告诉我你想找什么样的工作，或分享你的经历..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          />
          <Button
            onClick={handleSend}
            disabled={isGenerating}
            className="shrink-0"
          >
            {isGenerating ? "生成中..." : "发送"}
          </Button>
        </div>
      </div>

      <Sheet
        open={!!selectedResume}
        onOpenChange={() => setSelectedResume(null)}
      >
        <SheetContent 
          side="right" 
          className="w-[1000px] overflow-y-auto max-h-screen p-8"
        >
          <SheetHeader className="mb-6">
            <SheetTitle>个人简历</SheetTitle>
          </SheetHeader>
          {selectedResume && <ResumeView resume={selectedResume} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}
