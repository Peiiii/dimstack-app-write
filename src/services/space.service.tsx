import { Tokens } from "@/constants/tokens";
import { spaceHelper } from "@/helpers/space.helper";
import Auth from "@/plugins/space/spaceService/Auth";
import { ISpaceService } from "@/services/space.service.interface";
import { DataStore, createDataStore } from "@/toolkit/factories/dataStore";
import { AnyFunction } from "@/toolkit/types";
import { SpaceDef } from "@/toolkit/types/space";
import { createObservableFromExternalStore } from "@/toolkit/utils/rx-utils";
import { refreshGiteeAccessToken } from "libs/gitee-api";
import { useEffect, useState } from "react";
import { switchMap } from "rxjs";
import xbook from "xbook/index";
import { folderTreeService } from "./folder-tree.service";
import { authService } from "./auth.service";
import { EventKeys } from "@/constants/eventKeys";
import { spacePlatformRegistry } from "@/services/space-platform.registry";

export class SpaceService implements ISpaceService {
  spaceStore = createDataStore<SpaceDef>({
    initialState: [],
    persistConfig: {
      name: "spaces",
      type: "LocalStorage",
    },
  });

  setSpaces = (spaces: SpaceDef[]) => {
    this.spaceStore.getActions().init(spaces);
  };

  useSpaces = () => {
    const [spaces, setSpaces] = useState<SpaceDef[]>(this.spaceStore.getData());
    useEffect(() => {
      this.spaceStore.reduxStore.subscribe(() => {
        setSpaces(this.spaceStore.getData());
      });
    }, []);
    return spaces;
  };

  getSpaceStore = (): DataStore<SpaceDef> => {
    return this.spaceStore;
  };

  getSpaces = () => {
    return this.spaceStore.getData();
  };

  onLoad = (func: AnyFunction) => {
    return this.spaceStore.on("load", func);
  };

  constructor() {
    xbook.registry.set("spaceStore", this.spaceStore);
    this.spaceStore.reduxStore.subscribe(() => {
      // Broadcast space list changes via the typed event bus
      xbook.eventBus.emit(
        EventKeys.Space.SpacesChanged,
        this.spaceStore.getData()
      );
    });
  }

  refreshAuth = (spaceId: string) => {
    return new Promise<boolean>((resolve) => {
      const space = this.spaceStore.getRecord(spaceId)!;
      if (!space.auth) return resolve(false);
      refreshGiteeAccessToken({ refreshToken: space.auth?.refresh_token })
        .then((res) => {
          this.spaceStore.getActions().update({ ...space, auth: res });
          resolve(true);
        })
        .catch((err) => {
          console.log("auth error:", err);
          resolve(false);
        });
    });
  };

  login = (spaceId: string) => {
    const space = this.spaceStore.getRecord(spaceId)!;
    const modal = xbook.modalService.createModal({
      title: `登录 ${space.platform}`,
      content: <Auth spaceId={spaceId} />,
      footer: false,
    });
    modal.open();
  };

  redirectAuthPage = (spaceId: string) => {
    xbook.serviceBus.invoke("redirectAuthPage", spaceId);
  };

  isAuthorized = (spaceId: string) => {
    // const space = spaceStore.getRecord(spaceId);
    // return !!space?.auth;
    const space = this.spaceStore.getRecord(spaceId);
    if (!space) return false;
    // if (!space.auth) return false;
    return authService.hasReadPermission(space.platform, space.owner);
  };

  useAutoRefreshAuth = (spaceId: string, maxRetry = 1) => {
    const space = this.spaceStore.getRecord(spaceId);
    const existingAuthRecord = authService.getAnyAuthInfo(
      space?.platform || ""
    );
    const authRecord = authService.useAuthRecord(
      authService.generateAuthId({
        platform: existingAuthRecord?.platform || "",
        username: existingAuthRecord?.username || "",
      })
    );
    const [retryCount, setRetryCount] = useState(0);
    useEffect(() => {
      if (
        !authService.isSessionValid(
          authRecord?.platform || "",
          authRecord?.username || ""
        )
      ) {
        if (retryCount < maxRetry) {
          authService
            .tryRefreshAuthInfo(
              authRecord?.platform || "",
              authRecord?.username || ""
            )
            .then((res) => {
              setRetryCount(retryCount + 1);
            })
            .catch((err) => {
              console.log("tryRefreshAuthInfo error:", err);
              setRetryCount(retryCount + 1);
            });
        }
      }
    }, [authRecord]);
  };

  usePermissions = (spaceId: string) => {
    const space = this.spaceStore.getRecord(spaceId);
    if (!space)
      return {
        hasReadPermission: false,
        hasWritePermission: false,
      };
    if (["idb"].includes(space.platform)) {
      return {
        hasReadPermission: true,
        hasWritePermission: true,
      };
    }
    // if (!space.auth) return false;
    const [hasReadPermission, setHasReadPermission] = useState<boolean>(
      authService.hasReadPermission(space.platform, space.owner)
    );
    const [hasWritePermission, setHasWritePermission] = useState<boolean>(
      authService.hasWritePermission(space.platform, space.owner)
    );

    // const [isExpired, setIsExpired] = useState<boolean>(
    //   authService.isExpired(space.platform, space.owner)
    // );
    useEffect(() => {
      authService.onAuthRecordsChange(() => {
        setHasReadPermission(
          authService.hasReadPermission(space.platform, space.owner)
        );
        setHasWritePermission(
          authService.hasWritePermission(space.platform, space.owner)
        );
        // setIsExpired(
        //   authService.isExpired(space.platform,space.owner)
        // )
      });
    }, []);

    return { hasReadPermission, hasWritePermission };
  };

  getSpace = (spaceId: string) => {
    return this.spaceStore.getRecord(spaceId);
  };

  getSpaceByInfo = (spaceInfo: {
    platform: string;
    owner: string;
    repo: string;
  }) => {
    const id = spaceHelper.generateSpaceId(
      spaceInfo.platform,
      spaceInfo.owner,
      spaceInfo.repo
    );
    return this.spaceStore.getRecord(id);
  };

  updateSpace = (space: SpaceDef) => {
    this.spaceStore.getActions().update(space);
  };

  addSpace = (
    spaceInfo: {
      platform: string;
      owner: string;
      repo: string;
    },
    options?: {
      focus?: boolean;
      /** @description 不弹出提示消息 */
      silent?: boolean;
    }
  ): SpaceDef => {
    const { platform, owner, repo } = spaceInfo;
    const spaceStore = this.spaceStore;
    const id = spaceHelper.generateSpaceId(platform, owner, repo);
    const { focus, silent } = options || {};
    const existingSpace = spaceStore.getRecord(id);
    spaceStore.waitUtilLoaded(() => {
      spaceStore.getActions().upsert({ ...spaceInfo, id });
    });
    if (!existingSpace) {
      if (!silent) xbook.notificationService.success("成功添加空间");
    } else {
      if (!silent) xbook.notificationService.success("空间已存在");
    }
    if (focus) {
      this.focusSpace(id);
    }
    return { platform, owner, repo, id };
  };

  focusSpace = (spaceId: string) => {
    folderTreeService.focus(spaceId);
    setTimeout(() => {
      xbook.serviceBus.invoke(`space-${spaceId}.trigger`);
    }, 100);
  };

  getFocusedSpace = () => {
    const id = folderTreeService.getCurrentViewId();
    if (id) {
      return this.spaceStore.getRecord(id);
    }
  };

  useFocusedSpace = () => {
    const id = folderTreeService.useCurrentViewId();
    const space = this.spaceStore.getRecord(id);
    return space;
  };

  getFocusedSpace$ = () => {
    return folderTreeService.getCurrentViewId$().pipe(
      switchMap((id) => {
        return createObservableFromExternalStore(
          () => this.spaceStore.getRecord(id),
          (callback) => {
            return this.spaceStore.reduxStore.subscribe(() => {
              callback(this.spaceStore.getRecord(id));
            });
          }
        );
      })
    );
  };

  parseRepoUrl = (url: string) => {
    try {
      const u = new URL(url);
      const platform = Array.from(spacePlatformRegistry.getPlatforms()).find(
        (p) => p.hostname === u.hostname
      );
      if (!platform) return {};

      // 移除开头和结尾的斜杠
      const path = u.pathname.replace(/^\/|\/$/g, "");
      const [owner, repo, ...rest] = path.split("/");

      // 确保只有 owner/repo 的格式
      if (!owner || !repo || rest.length > 0) {
        return {};
      }

      return {
        platform: platform?.id || "",
        owner: owner || "",
        repo: (repo || "").replace(/\.git$/, ""),
      };
    } catch (e) {
      return { platform: "", owner: "", repo: "" };
    }
  };

  subscribeSpaces = (callback: (spaces: SpaceDef[]) => void) => {
    callback(this.spaceStore.getData());
    this.spaceStore.reduxStore.subscribe(() => {
      callback(this.spaceStore.getData());
    });
  };
}

// Export a single, shared instance for direct imports.
// This enables a simpler architecture without a global service bus.
export const spaceService = new SpaceService();
