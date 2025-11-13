import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useContext, useState } from "react";
import xbook from "xbook";
import { spaceService } from "@/services/space.service";
import { ModalActionContext } from "xbook/services/modalService";
import { openerService } from "@/services/opener.service";
import { Loader2, CheckCircle2 } from "lucide-react";

export const AddSpaceQuickStart = () => {
  const modal = useContext(ModalActionContext)!;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const defaultSpaceInfo = { platform: "idb", owner: "root", repo: "home" };

  const handleQuickStart = async () => {
    setLoading(true);
    setSuccess(false);
    
    try {
      const existing = spaceService.getSpaceByInfo(defaultSpaceInfo);
      const space = existing
        ? existing
        : spaceService.addSpace(defaultSpaceInfo, { focus: true, silent: true });

      spaceService.focusSpace(space.id);

      try {
        await openerService.open(space.id, {
          id: space.id + "/README.md",
          name: "README.md",
          path: "/README.md",
          type: "file",
        });
      } catch {
        xbook.notificationService.info("已创建本地空间，可在左侧选择文件开始编辑");
      }
      
      setSuccess(true);
      setTimeout(() => {
        modal.close();
      }, 800);
    } catch {
      xbook.notificationService.error("创建本地空间失败，请重试");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Alert>
        <AlertDescription>
          <div className="space-y-2">
            <p>无需登录，立即在本地开始写作。</p>
            <p className="text-xs text-muted-foreground">
              稍后可在右上角选择"连接云端"启用同步功能。
            </p>
          </div>
        </AlertDescription>
      </Alert>
      <div className="flex justify-end gap-2">
        <Button
          onClick={handleQuickStart}
          disabled={loading || success}
          className="min-w-[120px]"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              创建中...
            </>
          ) : success ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              已创建
            </>
          ) : (
            "立即开始"
          )}
        </Button>
      </div>
    </div>
  );
};
