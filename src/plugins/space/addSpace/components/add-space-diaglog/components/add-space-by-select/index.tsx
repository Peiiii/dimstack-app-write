import {
  createFormBean,
  FormControllerContext,
  getFormData,
  getFormItemComponents,
} from "@/components/form-builder/utils";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { EventKeys } from "@/constants/eventKeys";
import { useSubscribeObservable } from "@/hooks/use-subscribe-observable";
import { defineController } from "app-toolkit";
import { createGiteeClient } from "libs/gitee-api";
import { createGithubClient } from "libs/github-api";
import { useContext, useMemo, useState } from "react";
import { distinctUntilChanged, from, map, of, switchMap } from "rxjs";
import xbook from "xbook/index";
import { ModalActionContext } from "xbook/services/modalService";
import { authService } from "@/services/auth.service";
import { spaceService } from "@/services/space.service";
import { Loader2, KeyRound } from "lucide-react";

export type SpaceFormData = {
  platform: string;
  repo: string;
  owner: string;
};

export const SpaceFormController = defineController(
  () =>
    useMemo(
      () =>
        createFormBean<SpaceFormData>({
          platform: {
            value: "gitee",
            title: "平台",
            options: [
              { value: "github", label: "GitHub" },
              { value: "gitee", label: "Gitee" },
            ],
          },
          repo: {
            value: "",
            title: "仓库名",
            options: [],
          },
          owner: {
            value: "",
            title: "拥有者",
          },
        }),
      []
    ),
  {
    isHook: true,
  }
);

const { FormItemSelect } = getFormItemComponents<SpaceFormData>();

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
    console.log("github client");

    const promise = createGithubClient({
      getAccessToken: () => accessToken,
    }).Repo.getList({per_page: 100});
    return from(promise).pipe(map((res) => res.data));
  }
  return of([]);
};

export const AddSpaceBySelect = () => {
  const modal = useContext(ModalActionContext)!;
  const [loading, setLoading] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const controller = SpaceFormController.useInstace();
  const {
    get,
    use: useFormState,
    namespaces: {
      platform: {
        namespaces: {
          value: { $: platform$ },
        },
      },
      repo: {
        namespaces: {
          value: { $: _repo$ },
          options: { set: setRepoOptions },
        },
      },
      owner: {
        namespaces: {
          value: { set: setOwner },
        },
      },
    },
  } = controller;

  useSubscribeObservable(
    () =>
      platform$.pipe(
        distinctUntilChanged(),
        switchMap((p) => {
          setLoadingRepos(true);
          return getPlatformRepos(p);
        })
      ),
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

  const formState = useFormState();
  const { platform, repo } = getFormData<SpaceFormData>(formState);
  const isLogin = hasAlreadyLogin(platform);

  const handleCreate = async () => {
    const data = getFormData<SpaceFormData>(get());
    if (!data.repo) {
      xbook.notificationService.error("请选择仓库");
      return;
    }

    setLoading(true);
    try {
      spaceService.addSpace(
        {
          ...data,
          repo: data.repo.toLowerCase(),
        },
        {
          focus: true,
        }
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

  const noLoginNotice = !isLogin && (
    <Alert className="mb-4">
      <KeyRound className="h-4 w-4" />
      <AlertTitle>需要授权</AlertTitle>
      <AlertDescription>
        <div className="flex items-center justify-between">
          <span>
            请先授权 {platform === "github" ? "GitHub" : "Gitee"} 账户以访问您的仓库
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              xbook.eventBus.emit(EventKeys.RequestAuthManage);
              modal.close();
            }}
          >
            去授权
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );

  return (
    <FormControllerContext.Provider value={controller as never}>
      <div className="space-y-4">
        <div className="space-y-4">
          <FormItemSelect name="platform" />
          {noLoginNotice}
          {isLogin && (
            <div className="relative">
              <FormItemSelect name="repo" />
              {loadingRepos && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => modal.close()}>
            取消
          </Button>
          <Button
            onClick={handleCreate}
            disabled={loading || !isLogin || !repo || loadingRepos}
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
    </FormControllerContext.Provider>
  );
};
