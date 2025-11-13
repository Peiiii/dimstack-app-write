import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useContext, useState } from "react";
import xbook from "xbook/index";
import { spaceService } from "@/services/space.service";
import { ModalActionContext } from "xbook/services/modalService";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export const AddSpaceFromUrl = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const modal = useContext(ModalActionContext)!;
  const recommendUrls = [
    { url: "https://gitee.com/liyupi/code-roadmap", label: "代码学习路线" },
    { url: "https://github.com/ruanyf/weekly", label: "科技爱好者周刊" },
  ];

  const handleAdd = async () => {
    if (!url.trim()) {
      setError("请输入仓库链接");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { platform, owner, repo } = spaceService.parseRepoUrl(url);
      if (!(platform && owner && repo)) {
        setError("链接格式不正确，请检查是否为有效的 GitHub/Gitee 仓库链接");
        setLoading(false);
        return;
      }

      spaceService.addSpace({ platform, owner, repo }, { focus: true });
      xbook.notificationService.success("仓库添加成功！");
      setTimeout(() => {
        modal.close();
      }, 500);
    } catch (err) {
      setError("添加失败，请检查链接是否正确");
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleAdd();
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        <p className="mb-2">请输入 GitHub 或 Gitee 仓库链接：</p>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">推荐示例：</p>
          <div className="flex flex-wrap gap-2">
            {recommendUrls.map((item) => (
              <Button
                key={item.url}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setUrl(item.url);
                  setError("");
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="例如: https://github.com/username/repo 或 https://gitee.com/username/repo"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            onKeyPress={handleKeyPress}
            className="flex-1"
            disabled={loading}
          />
          <Button onClick={handleAdd} disabled={loading} className="min-w-[100px]">
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
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};
