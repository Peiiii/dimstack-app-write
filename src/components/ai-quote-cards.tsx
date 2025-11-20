import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { AIService } from "../services/ai-service";

interface AppProps {
  saveData: (data: { quotes: Quote[] }) => Promise<void>;
  loadData: () => Promise<{ quotes?: Quote[] } | null>;
}

interface Quote {
  id: string;
  content: string;
  author: string;
  category: string;
  timestamp: string;
}

export function AIQuoteCards({ saveData, loadData }: AppProps) {
  const { t } = useTranslation();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [category, setCategory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const aiService = new AIService("gpt-4o-mini");

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await loadData();
        if (savedData) {
          setQuotes(savedData.quotes || []);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: t("quotes.loadFailed"),
          description: t("quotes.loadFailedDesc"),
          variant: "destructive",
        });
      }
    };
    loadSavedData();
  }, [loadData, t, toast]);

  useEffect(() => {
    const autoSave = async () => {
      try {
        await saveData({ quotes });
      } catch (error) {
        console.error("Auto save failed:", error);
      }
    };
    const timeoutId = setTimeout(autoSave, 1000);
    return () => clearTimeout(timeoutId);
  }, [quotes, saveData]);

  const generateQuote = async () => {
    setIsGenerating(true);

    try {
      const prompt = `创作一句极具洞察力和启发性的观点或思考。${
        category ? `围绕主题：${category}` : ""
      }

要求：
1. 内容要有独特视角，展现深刻的思考
2. 可以是反直觉的洞察，或是对常见现象的重新诠释
3. 语言要简练有力，一针见血
4. 可以挑战传统观点，但要有说服力
5. 创造一个虚构的作者（可以是中文名或英文名）
6. 严格按照以下JSON格式输出，不要包含其他内容：
{
  "content": "你的洞察/思考内容",
  "author": "作者名字"
}`;

      const response = await aiService.generateText(prompt);
      
      let quoteData;
      try {
        // 尝试清理响应文本，移除可能的多余内容
        const jsonStr = response.trim().replace(/```json\n?|\n?```/g, '');
        quoteData = JSON.parse(jsonStr);
        
        // 验证响应格式
        if (!quoteData.content || !quoteData.author) {
          throw new Error("响应格式不正确");
        }
      } catch (parseError) {
        console.error("Parse error:", parseError);
        console.log("Raw response:", response);
        throw new Error("AI响应格式错误");
      }

      const newQuote: Quote = {
        id: Date.now().toString(),
        content: quoteData.content,
        author: quoteData.author,
        category: category || "通用",
        timestamp: new Date().toISOString(),
      };

      setQuotes((prev) => [newQuote, ...prev]);
      setCategory("");

      toast({
        title: "生成成功",
        description: "新的名言已生成",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "生成失败",
        description: error instanceof Error ? error.message : "生成名言时出错，请重试",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>AI名言生成器</CardTitle>
            <CardDescription>生成富有哲理的名言</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="输入主题或类别（可选）"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Button
              onClick={generateQuote}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? "生成中..." : "生成名言"}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {quotes.map((quote) => (
            <Card key={quote.id} className="bg-white">
              <CardContent className="pt-6">
                <blockquote className="border-l-4 border-blue-500 pl-4 italic">
                  <p className="text-lg text-gray-800 mb-2">{quote.content}</p>
                  <footer className="text-right">
                    <cite className="text-gray-600">—— {quote.author}</cite>
                  </footer>
                </blockquote>
                <div className="mt-4 text-sm text-gray-500 flex justify-between">
                  <span>{quote.category}</span>
                  <time>{new Date(quote.timestamp).toLocaleString()}</time>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 
