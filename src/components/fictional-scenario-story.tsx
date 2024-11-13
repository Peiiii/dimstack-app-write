"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AIService } from "../services/ai-service";

interface SaveDataFunction {
  (data: any): Promise<void>;
}

interface LoadDataFunction {
  (): Promise<any>;
}

interface AppProps {
  saveData: SaveDataFunction;
  loadData: LoadDataFunction;
}

interface ConversationItem {
  type: string;
  content: string;
}

const AI_MODELS = [
  { id: "gpt-4o", name: "GPT-4O" },
  { id: "gpt-4o-mini", name: "GPT-4O Mini" },
  { id: "gpt-4", name: "GPT-4" },
  { id: "gpt-4-turbo-preview", name: "GPT-4 Turbo" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
] as const;

export default function Component({ saveData, loadData }: AppProps) {
  const [input, setInput] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [furtherDescription, setFurtherDescription] = useState("");
  const { toast } = useToast();
  const [selectedModel, setSelectedModel] = useState<string>("gpt4o-mini");
  const [showApiKey, setShowApiKey] = useState(false);
  const aiService = useMemo(
    () => new AIService(apiKey, selectedModel),
    [apiKey, selectedModel]
  );
  const lastCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await loadData();
        if (savedData) {
          setConversation(savedData.conversation || []);
          setApiKey(savedData.apiKey || "");
          setSelectedModel(savedData.selectedModel || "gpt4o-mini");
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: "加载数据失败",
          description: "无法加载保存的数据，请检查您的存储设置。",
          variant: "destructive",
        });
      }
    };
    loadSavedData();
  }, []);

  // 添加自动保存功能
  useEffect(() => {
    const autoSave = async () => {
      try {
        await saveData({ conversation, apiKey, selectedModel });
        console.log('Auto saved successfully');
      } catch (error) {
        console.error('Auto save failed:', error);
      }
    };

    // 使用防抖来避免频繁保存
    const timeoutId = setTimeout(autoSave, 1000);
    return () => clearTimeout(timeoutId);
  }, [conversation, apiKey, selectedModel, saveData]);

  const generateCards = async () => {
    if (!apiKey) {
      toast({
        title: "错误",
        description: "请输入OpenAI API密钥",
        variant: "destructive",
      });
      return;
    }

    if (!input.trim()) {
      toast({
        title: "错误",
        description: "请输入内容",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // 获取历史情节
      const historyScenes = getHistoryScenes();

      // 使用 aiService 生成情节描述
      const sceneContent = await aiService.generateSceneDescription(
        input,
        historyScenes
      );

      // 使用 aiService 生成分支选项
      const divergentContent = await aiService.generateDivergentOptions(
        sceneContent,
        [...historyScenes, sceneContent]
      );

      setConversation((prev) => [
        ...prev,
        { type: "user", content: input },
        { type: "scene", content: sceneContent },
        { type: "divergent", content: divergentContent },
      ]);

      setInput("");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "生成失败",
        description: "无法生成AI回应，请检查您的API密钥和网络连接。",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDirectionSelect = (direction) => {
    setSelectedDirection(direction);
  };

  const startNewRound = async () => {
    if (!selectedDirection) {
      toast({
        title: "错误",
        description: "请选择一个方向",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const newInput = furtherDescription.trim()
        ? `${selectedDirection}: ${furtherDescription}`
        : selectedDirection;

      // 获取历史情节
      const historyScenes = getHistoryScenes();

      // 使用 aiService 生成情节描述
      const sceneContent = await aiService.generateSceneDescription(
        newInput,
        historyScenes
      );

      // 使用 aiService 生成分支选项
      const divergentContent = await aiService.generateDivergentOptions(
        sceneContent,
        [...historyScenes, sceneContent]
      );

      // 更新对话历史
      setConversation((prev) => [
        ...prev,
        { type: "user", content: newInput },
        { type: "scene", content: sceneContent },
        { type: "divergent", content: divergentContent },
      ]);

      setSelectedDirection(null);
      setFurtherDescription("");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "生成失败",
        description: "无法开始新一轮对话，请重试。",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderCard = (item, index) => {
    const isLastCard = index === conversation.length - 1;
    const cardProps = isLastCard ? { ref: lastCardRef } : {};

    switch (item.type) {
      case "user":
        return (
          <Card
            key={index}
            className="w-full mb-4 bg-slate-50 border-slate-200 shadow-sm"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-600">用户输入</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-800">{item.content}</p>
            </CardContent>
          </Card>
        );

      case "scene":
        return (
          <Card
            key={index}
            className="w-full mb-4 bg-white border-blue-100 shadow-md"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-800">情节描述</CardTitle>
              <CardDescription className="text-blue-600">
                当前场景与故事发展
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {item.content}
              </p>
            </CardContent>
          </Card>
        );

      case "divergent":
        const directions = item.content
          .split("\n")
          .filter((line) => line.trim().length > 0)
          .map((direction) => {
            const [title, description] = direction.split(":");
            return { title: title?.trim(), description: description?.trim() };
          });

        return (
          <Card
            key={index}
            className="w-full mb-4 bg-gradient-to-b from-white to-green-50 border-green-100 shadow-md"
            {...cardProps}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-green-800">故事分支</CardTitle>
              <CardDescription className="text-green-600">
                选择接下来的发展方向
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {directions.map(({ title, description }, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-lg border border-green-100 bg-white shadow-sm 
                      hover:shadow-md hover:border-green-200 transition-all duration-200"
                    onClick={() => handleDirectionSelect(title)}
                  >
                    <div className="p-4">
                      <h4 className="font-medium text-green-800 mb-2 group-hover:text-green-700">
                        {title}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed mb-3">
                        {description}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full bg-white border-green-200 text-green-700 
                          hover:bg-green-50 hover:text-green-800 hover:border-green-300
                          transition-colors duration-200"
                      >
                        选择此方向
                      </Button>
                    </div>
                    <div
                      className="absolute inset-0 border-2 border-transparent 
                      group-hover:border-green-200 rounded-lg transition-colors duration-200"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  // 获取历史情节描述
  const getHistoryScenes = useCallback(() => {
    return conversation
      .filter((msg) => msg.type === "scene")
      .map((msg) => msg.content);
  }, [conversation]);

  // 添加自动滚动功能
  useEffect(() => {
    if (lastCardRef.current) {
      lastCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [conversation]);

  // 处理回车键发送
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (selectedDirection) {
        startNewRound();
      } else {
        generateCards();
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable conversation area */}
      <div className="flex-1 overflow-auto p-4 pb-[200px] scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-4">
          {conversation.map((item, index) => renderCard(item, index))}
        </div>
      </div>

      {/* Bottom input area (not fixed anymore) */}
      <div className="relative bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Input
                type={showApiKey ? "text" : "password"}
                placeholder="输入OpenAI API密钥"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择模型" />
              </SelectTrigger>
              <SelectContent>
                {AI_MODELS.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedDirection ? (
            <div className="space-y-2">
              <div className="text-sm font-medium">
                继续 {selectedDirection} 方向
              </div>
              <div className="flex space-x-2">
                <Textarea
                  placeholder="输入进一步描述..."
                  value={furtherDescription}
                  onChange={(e) => setFurtherDescription(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="min-h-[80px]"
                />
                <Button
                  onClick={startNewRound}
                  disabled={isGenerating}
                  className="shrink-0"
                >
                  开始新一轮
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Input
                placeholder="输入任意内容..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <Button
                onClick={generateCards}
                disabled={isGenerating}
                className="shrink-0"
              >
                {isGenerating ? "生成中..." : "发送"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
