import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import xbook from "xbook";
import { EventKeys } from "@/constants/eventKeys";

export const IntroductionPage = () => (
  <div className="p-6 max-w-[1400px] mx-auto">
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight">欢迎使用 GitNote</h1>
        <p className="text-xl text-muted-foreground">
          用 Git 的方式，管理你的笔记
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FeatureCard
          icon="🔄"
          title="Git 集成"
          description="直接连接 GitHub/Gitee 仓库，将笔记存储在你的代码仓库中"
        />
        <FeatureCard
          icon="✍️"
          title="Markdown 编辑"
          description="所见即所得的 Markdown 编辑器，支持数学公式和代码高亮"
        />
        <FeatureCard
          icon="📱"
          title="便捷访问"
          description="随时随地通过浏览器访问你的笔记，无需本地安装"
        />
        <FeatureCard
          icon="🔐"
          title="安全可控"
          description="笔记数据完全存储在你的 Git 仓库中，无需担心数据安全"
        />
      </div>

      <div className="text-center">
        <Button
          size="lg"
          className="px-8"
          onClick={() => xbook.eventBus.emit(EventKeys.ActivityBar.ActivityClicked("addGiteeRepo"))}
        >
          开始使用
        </Button>
      </div>
    </div>
  </div>
);

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <Card className="h-full">
    <CardContent className="p-6 flex flex-col h-full">
      <div className="flex items-center space-x-3 mb-3">
        <span className="text-3xl">{icon}</span>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <p className="text-muted-foreground text-lg">{description}</p>
    </CardContent>
  </Card>
);
