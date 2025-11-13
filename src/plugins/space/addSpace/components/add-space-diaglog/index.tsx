import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AddSpaceBySelect } from "@/plugins/space/addSpace/components/add-space-diaglog/components/add-space-by-select";
import { AddSpaceForm } from "@/plugins/space/addSpace/components/add-space-diaglog/components/add-space-form";
import { AddSpaceFromUrl } from "@/plugins/space/addSpace/components/add-space-diaglog/components/add-space-from-url";
import { AddSpaceQuickStart } from "@/plugins/space/addSpace/components/add-space-diaglog/components/add-space-quick-start";
import { AlertCircle, Cloud, Link2, Settings, Zap } from "lucide-react";
import { useState } from "react";

export const AddSpaceDialog = () => {
  const [activeTab, setActiveTab] = useState<string>("quickstart");

  const options = [
    {
      id: "quickstart",
      title: "快速开始",
      description: "无需登录，立即在本地开始写作",
      icon: Zap,
      highlight: true,
      component: AddSpaceQuickStart,
    },
    {
      id: "select",
      title: "连接云端仓库",
      description: "从 GitHub/Gitee 选择已有仓库",
      icon: Cloud,
      component: AddSpaceBySelect,
    },
    {
      id: "url",
      title: "从链接添加",
      description: "通过仓库链接快速添加",
      icon: Link2,
      component: AddSpaceFromUrl,
    },
    {
      id: "custom",
      title: "手动指定",
      description: "手动输入平台、所有者、仓库名",
      icon: Settings,
      component: AddSpaceForm,
    },
  ];

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>欢迎使用 GitNote</AlertTitle>
        <AlertDescription>
          <div className="space-y-2 mt-2">
            <p>1. 先在本地开始写（无需登录），随时可连接云端同步</p>
            <p>2. 连接 GitHub/Gitee 后，可编辑自己的仓库或查看公开仓库</p>
            <p>3. 使用 Ctrl+S / Cmd+S 保存文件</p>
          </div>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => {
          const Icon = option.icon;
          const isActive = activeTab === option.id;
          return (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all hover:shadow-md ${isActive
                  ? "border-primary shadow-md"
                  : "hover:border-primary/50"
                } ${option.highlight ? "border-2 border-primary/50" : ""}`}
              onClick={() => setActiveTab(option.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${isActive
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{option.title}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      {option.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      <div className="mt-6">
        {options.map((option) => {
          const Component = option.component;
          if (activeTab !== option.id) return null;
          return (
            <div key={option.id} className="animate-in fade-in-50 duration-200">
              <Component />
            </div>
          );
        })}
      </div>
    </div>
  );
};
