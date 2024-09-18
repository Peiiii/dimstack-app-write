import {
  createFormBean,
  FormControllerContext,
  getFormData,
  getFormItemComponents,
} from "@/components/form-builder/utils";
import { EventKeys } from "@/constants/eventKeys";
import { Tokens } from "@/constants/tokens";
import { useSubscribeObservable } from "@/hooks/use-subscribe-observable";
import { Alert, AlertIcon, Button, Flex } from "@chakra-ui/react";
import { defineController } from "app-toolkit";
import { createGiteeClient } from "libs/gitee-api";
import { createGithubClient } from "libs/github-api";
import { useContext, useEffect, useMemo } from "react";
import { useEffectOnce } from "rx-nested-bean";
import { distinctUntilChanged, from, map, of, switchMap } from "rxjs";
import xbook from "xbook/index";
import { ModalActionContext } from "xbook/services/modalService";

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
  const authService = xbook.serviceBus.createProxy(Tokens.AuthService);
  return !!authService.getAnyAuthInfo(platform)?.accessToken;
};

const getPlatformRepos = (platform: string) => {
  const authService = xbook.serviceBus.createProxy(Tokens.AuthService);
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
    }).Repo.getList({});
    return from(promise).pipe(map((res) => res.data));
  }
  return of([]);
};

export const AddSpaceBySelect = () => {
  const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
  const modal = useContext(ModalActionContext)!;
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
          value: { $: repo$ },
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
  useEffectOnce(() => {
    console.log("useEffectOnce");
  });

  useSubscribeObservable(
    () =>
      platform$.pipe(
        distinctUntilChanged(),
        switchMap((p) => {
          console.log("platform", p);

          return getPlatformRepos(p);
        })
      ),
    (data) => {
      console.log("data", data);

      setOwner(data[0]?.owner?.name || data[0].owner.login || "");
      setRepoOptions(
        data.map((d) => ({
          value: d.name,
          label: d.name,
        }))
      );
    }
  );

  const formState = useFormState();
  const { platform } = getFormData<SpaceFormData>(formState);

  useEffect(() => {
    console.log("formState", formState);
  }, [formState]);

  const isLogin = hasAlreadyLogin(platform);

  console.log("isLogin", isLogin);

  // platform 未登录提示
  const noLoginNotice = !isLogin && (
    <Alert status="warning">
      <AlertIcon />
      未授权，请先授权，
      <a
        onClick={() => {
          xbook.eventBus.emit(EventKeys.RequestAuthManage);
        }}
        className="text-blue-400 dark:text-blue-300 hover:underline cursor-pointer"
      >
        点击管理授权
      </a>
    </Alert>
  );

  return (
    <FormControllerContext.Provider value={controller as any}>
      <>
        <div>
          <FormItemSelect name="platform" />
          {noLoginNotice}
          <FormItemSelect name="repo" />
        </div>
        <Flex justify={"flex-end"} gap={"1em"}>
          <Button
            colorScheme="blue"
            onClick={() => {
              const data = getFormData<SpaceFormData>(get());
              spaceService.addSpace(
                {
                  ...data,
                },
                {
                  focus: true,
                }
              );
              modal.close();
            }}
          >
            创建
          </Button>
          <Button onClick={() => modal.close()}>取消</Button>
        </Flex>
      </>
    </FormControllerContext.Provider>
  );
};
