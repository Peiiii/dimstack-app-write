import { spacePlatformRegistry } from "@/services/space-platform.registry";
import PowerForm, { PowerFormRef } from "@/toolkit/components/power-form";
import { Button } from "@/components/ui/button";
import { useContext, useRef } from "react";
import { ModalActionContext } from "xbook/services/modalService";
import { spaceService } from "@/services/space.service";

interface SpaceFormData {
  platform: string;
  owner: string;
  repo: string;
}

export const AddSpaceForm = () => {
  // Use singleton service directly
  const modal = useContext(ModalActionContext)!;
  const platforms = spacePlatformRegistry.getPlatforms();

  const ref = useRef<PowerFormRef<SpaceFormData>>(null);

  return (
    <div className="space-y-4">
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
            placeholder: "请输入仓库所有者",
          },
          {
            name: "repo",
            title: "仓库名",
            required: true,
            placeholder: "请输入仓库名称",
          },
        ]}
        defaultData={{
          platform: "gitee",
        }}
      />
      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          form="power-form"
          onClick={() => {
            const data = ref.current!.getData() as Required<SpaceFormData>;
            spaceService.addSpace(
              {
                ...data,
                repo: data.repo.toLowerCase(),
              },
              { focus: true }
            );
          }}
        >
          创建
        </Button>
        <Button variant="outline" onClick={() => modal.close()}>
          取消
        </Button>
      </div>
    </div>
  );
};
