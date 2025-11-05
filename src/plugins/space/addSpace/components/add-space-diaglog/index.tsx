import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddSpaceBySelect } from "@/plugins/space/addSpace/components/add-space-diaglog/components/add-space-by-select";
import { AddSpaceForm } from "@/plugins/space/addSpace/components/add-space-diaglog/components/add-space-form";
import { AddSpaceFromUrl } from "@/plugins/space/addSpace/components/add-space-diaglog/components/add-space-from-url";
import { AddSpaceQuickStart } from "@/plugins/space/addSpace/components/add-space-diaglog/components/add-space-quick-start";
import { AlertCircle } from "lucide-react";

export const AddSpaceDialog = () => {
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

      <Tabs defaultValue="quickstart" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quickstart">快速开始（本地）</TabsTrigger>
          <TabsTrigger value="select">连接云端仓库</TabsTrigger>
          <TabsTrigger value="url">从链接添加</TabsTrigger>
          <TabsTrigger value="custom">手动指定</TabsTrigger>
        </TabsList>
        <TabsContent value="quickstart" className="pb-4">
          <AddSpaceQuickStart />
        </TabsContent>
        <TabsContent value="select" className="pb-4">
          <AddSpaceBySelect />
        </TabsContent>
        <TabsContent value="url" className="pb-4">
          <AddSpaceFromUrl />
        </TabsContent>
        <TabsContent value="custom" className="pb-4">
          <AddSpaceForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};
