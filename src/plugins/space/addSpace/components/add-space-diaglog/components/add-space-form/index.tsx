import { spacePlatformRegistry } from "@/services/space-platform.registry";
import PowerForm, { PowerFormRef } from "@/toolkit/components/power-form";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useContext, useRef, useState } from "react";
import { ModalActionContext } from "xbook/services/modalService";
import { spaceService } from "@/services/space.service";
import { Loader2, Info } from "lucide-react";
import xbook from "xbook";

interface SpaceFormData {
  platform: string;
  owner: string;
  repo: string;
}

export const AddSpaceForm = () => {
  const modal = useContext(ModalActionContext)!;
  const platforms = spacePlatformRegistry.getPlatforms();
  const [loading, setLoading] = useState(false);
  const ref = useRef<PowerFormRef<SpaceFormData>>(null);

  const handleCreate = () => {
    const data = ref.current!.getData() as Required<SpaceFormData>;
    
    if (!data.owner || !data.repo) {
      xbook.notificationService.error("请填写完整信息");
      return;
    }

    setLoading(true);
    try {
      spaceService.addSpace(
        {
          ...data,
          repo: data.repo.toLowerCase(),
        },
        { focus: true }
      );
      xbook.notificationService.success("仓库添加成功！");
      setTimeout(() => {
        modal.close();
      }, 500);
    } catch {
      xbook.notificationService.error("添加失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-1 text-sm">
            <p>手动输入仓库信息，适用于：</p>
            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
              <li>添加公开仓库（无需授权）</li>
              <li>精确指定仓库路径</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>

      <PowerForm
        ref={ref}
        fields={[
          {
            name: "platform",
            title: "平台",
            required: true,
            select: {
              options: platforms.map((p) => ({
                value: p.id,
                label: p.name,
              })),
            },
          },
          {
            name: "owner",
            title: "所有者",
            required: true,
            placeholder: "例如: username 或 organization",
          },
          {
            name: "repo",
            title: "仓库名",
            required: true,
            placeholder: "例如: my-repo",
          },
        ]}
        defaultData={{
          platform: "gitee",
        }}
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => modal.close()}>
          取消
        </Button>
        <Button
          onClick={handleCreate}
          disabled={loading}
          className="min-w-[100px]"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              添加中
            </>
          ) : (
            "添加"
          )}
        </Button>
      </div>
    </div>
  );
};
