import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddSpaceBySelect } from "@/plugins/space/addSpace/components/add-space-diaglog/components/add-space-by-select";
import { AddSpaceForm } from "@/plugins/space/addSpace/components/add-space-diaglog/components/add-space-form";
import { AddSpaceFromUrl } from "@/plugins/space/addSpace/components/add-space-diaglog/components/add-space-from-url";
import { AlertCircle } from "lucide-react";

export const AddSpaceDialog = () => {
  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>欢迎使用 GitNote!</AlertTitle>
        <AlertDescription>
          <div className="space-y-2 mt-2">
            <p>
              1. 您可以将 GitHub/Gitee
              仓库添加为知识空间，添加后需要进行授权才能正常使用
            </p>
            <p>2. 授权后，您可以编辑自己的仓库内容，或查看他人的公开仓库</p>
            <p>3. 使用快捷键 Ctrl+S 或 Cmd+S 可以快速保存文件</p>
          </div>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="select" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="select">选择账号下仓库</TabsTrigger>
          <TabsTrigger value="url">从URL添加</TabsTrigger>
          <TabsTrigger value="custom">指定所有者和仓库</TabsTrigger>
        </TabsList>
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
