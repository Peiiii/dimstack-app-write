import { Button } from "@/components/ui/button";
import { spaceHelper } from "@/helpers/space.helper";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useContext } from "react";
import xbook from "xbook";
import { spaceService } from "@/services/space.service";
import { ModalActionContext } from "xbook/services/modalService";
import { openerService } from "@/services/opener.service";

// Quick start tab: focus the local IndexedDB space and open README.md
export const AddSpaceQuickStart = () => {
  const modal = useContext(ModalActionContext)!;
  // Use singleton service directly
  const defaultSpaceInfo = { platform: "idb", owner: "root", repo: "home" };

  const handleQuickStart = async () => {
    // Ensure local space exists, focus it, and open README.md
    const existing = spaceService.getSpaceByInfo(defaultSpaceInfo);
    const space = existing
      ? existing
      : spaceService.addSpace(defaultSpaceInfo, { focus: true, silent: true });

    spaceService.focusSpace(space.id);

    // Open the default README.md; create if needed
    try {
      const uri = spaceHelper.getUri(space.id, "/README.md").toString();
      // Let opener service route to the proper editor/view
      // Minimal FolderTreeNode-like shape with path for opener
      await openerService.open(space.id, { path: "/README.md" } as any);
    } catch (e) {
      // If anything fails, just notify and continue
      xbook.notificationService.info("已创建本地空间，可在左侧选择文件开始编辑");
    }
    modal.close();
  };

  return (
    <div className="space-y-4">
      <Alert>
        <AlertDescription>
          无需登录，立即在本地开始写作。稍后可在右上角选择“连接云端”启用同步。
        </AlertDescription>
      </Alert>
      <div className="flex justify-end">
        <Button onClick={handleQuickStart} autoFocus>
          快速开始（本地）
        </Button>
      </div>
    </div>
  );
};
