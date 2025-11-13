import { Button } from "@/components/ui/button";
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
      }, 600);
    } catch {
      xbook.notificationService.error("创建本地空间失败，请重试");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">本地开始</h2>
        <p className="text-sm text-muted-foreground mt-1">无需登录，立即开始写作</p>
      </div>
      
      <div className="max-w-[280px] mx-auto">
        <Button
          onClick={handleQuickStart}
          disabled={loading || success}
          className="w-full h-11"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              创建中
            </>
          ) : success ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              已创建
            </>
          ) : (
            "开始使用"
          )}
        </Button>
      </div>
    </div>
  );
};
