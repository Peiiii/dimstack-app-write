import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EventKeys } from "@/constants/eventKeys";
import { useSubscribeObservable } from "@/hooks/use-subscribe-observable";
import { createGiteeClient } from "libs/gitee-api";
import { createGithubClient } from "libs/github-api";
import { useContext, useState } from "react";
import { from, map, of } from "rxjs";
import xbook from "xbook/index";
import { ModalActionContext } from "xbook/services/modalService";
import { authService } from "@/services/auth.service";
import { spaceService } from "@/services/space.service";
import { Loader2, KeyRound } from "lucide-react";
import { RepoSelect } from "../repo-select";

const hasAlreadyLogin = (platform: string) => {
  return !!authService.getAnyAuthInfo(platform)?.accessToken;
};

const getPlatformRepos = (platform: string) => {
  const accessToken = authService.getAnyAuthInfo(platform)?.accessToken;
  if (!accessToken) return of([]);
  if (platform === "gitee") {
    const promise = createGiteeClient({
      getAccessToken: () => accessToken,
    }).Repo.getList({});
    return from(promise).pipe(map((res) => res.data));
  } else if (platform.toLowerCase() === "github") {
    const promise = createGithubClient({
      getAccessToken: () => accessToken,
    }).Repo.getList({per_page: 100});
    return from(promise).pipe(map((res) => res.data));
  }
  return of([]);
};

interface AddSpaceBySelectProps {
  defaultPlatform?: "github" | "gitee";
  onBack?: () => void;
}

export const AddSpaceBySelect = ({ defaultPlatform, onBack }: AddSpaceBySelectProps = {}) => {
  const modal = useContext(ModalActionContext)!;
  const [loading, setLoading] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<string>("");
  const [repoOptions, setRepoOptions] = useState<{ value: string; label: string }[]>([]);
  const [owner, setOwner] = useState<string>("");
  const platform = defaultPlatform || "gitee";
  const isLogin = hasAlreadyLogin(platform);

  useSubscribeObservable(
    () => {
      if (!platform) return of([]);
      setLoadingRepos(true);
      return getPlatformRepos(platform);
    },
    (data) => {
      setLoadingRepos(false);
      if (data && data.length > 0) {
        setOwner(data[0]?.owner?.name || data[0].owner.login || "");
        setRepoOptions(
          data.map((d) => ({
            value: d.name,
            label: d.name,
          }))
        );
      } else {
        setRepoOptions([]);
      }
    }
  );

  const handleCreate = async () => {
    if (!selectedRepo) {
      return;
    }

    setLoading(true);
    try {
      spaceService.addSpace(
        {
          platform,
          owner,
          repo: selectedRepo.toLowerCase(),
        },
        {
          focus: true,
        }
      );
      modal.close();
    } catch {
      xbook.notificationService.error("添加失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  if (!isLogin) {
    return (
      <div className="space-y-4 max-w-[280px] mx-auto">
        <Alert className="border-muted">
          <KeyRound className="h-4 w-4" />
          <AlertDescription className="text-sm">
            需要授权 {platform === "github" ? "GitHub" : "Gitee"} 账户
          </AlertDescription>
        </Alert>
        <div className="flex gap-2">
          <Button
            className="flex-1"
            onClick={() => {
              xbook.eventBus.emit(EventKeys.RequestAuthManage);
            }}
          >
            授权
          </Button>
          {onBack && (
            <Button variant="ghost" onClick={onBack}>
              返回
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[280px] mx-auto">
      <RepoSelect
        value={selectedRepo}
        options={repoOptions}
        loading={loadingRepos}
        placeholder="搜索并选择仓库"
        onValueChange={setSelectedRepo}
      />
      <div className="flex justify-end gap-2 pt-2">
        {onBack && (
          <Button variant="ghost" onClick={onBack} className="font-normal">
            返回
          </Button>
        )}
        <Button
          onClick={handleCreate}
          disabled={loading || !selectedRepo || loadingRepos}
          className="font-medium"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              添加中
            </>
          ) : (
            "完成"
          )}
        </Button>
      </div>
    </div>
  );
};
