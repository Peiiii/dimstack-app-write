import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import xbook from "xbook/index";
import { spaceService } from "@/services/space.service";
import { ModalActionContext } from "xbook/services/modalService";

export const AddSpaceFromUrl = () => {
  // Use singleton service directly
  const [url, setUrl] = useState("");
  const modal = useContext(ModalActionContext)!;
  const recommendUrls = [
    "https://gitee.com/liyupi/code-roadmap",
    "https://github.com/ruanyf/weekly",
  ];

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        <p>请输入你的 Gitee/Github 仓库链接。示例：</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {recommendUrls.map((u) => (
            <div key={u} className="flex items-center gap-2">
              <span className="text-sm">{u}</span>
              <Button
                variant="link"
                className="h-auto p-0"
                onClick={() => setUrl(u)}
              >
                填入
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="请输入链接"
          autoFocus
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />
        <Button
          onClick={() => {
            const { platform, owner, repo } = spaceService.parseRepoUrl(url);
            if (!(platform && owner && repo)) {
              xbook.notificationService.error("输入链接格式不符!");
            } else {
              spaceService.addSpace(
                { platform, owner, repo },
                { focus: true }
              );
              modal.close();
            }
          }}
        >
          一键添加
        </Button>
      </div>
    </div>
  );
};
