import { AddSpaceBySelect } from "@/plugins/space/addSpace/components/add-space-diaglog/components/add-space-by-select";
import { AddSpaceQuickStart } from "@/plugins/space/addSpace/components/add-space-diaglog/components/add-space-quick-start";

interface AddSpaceDialogProps {
  defaultPlatform?: "github" | "gitee";
  defaultMode?: "local";
}

export const AddSpaceDialog = ({ defaultPlatform, defaultMode }: AddSpaceDialogProps = {}) => {
  if (defaultMode === "local") {
    return <AddSpaceQuickStart />;
  }

  const platformName = defaultPlatform === "github" ? "GitHub" : defaultPlatform === "gitee" ? "Gitee" : "";
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">选择仓库</h2>
        {platformName && (
          <p className="text-sm text-muted-foreground mt-1">从 {platformName} 仓库中选择一个</p>
        )}
        {!platformName && (
          <p className="text-sm text-muted-foreground mt-1">从你的仓库中选择一个</p>
        )}
      </div>

      <AddSpaceBySelect defaultPlatform={defaultPlatform} />
    </div>
  );
};
