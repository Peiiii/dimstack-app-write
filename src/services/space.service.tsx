import { Tokens } from "@/constants/tokens";
import { spaceHelper } from "@/helpers/space.helper";
import Auth from "@/plugins/space/spaceService/Auth";
import { ISpaceService } from "@/services/space.service.interface";
import { DataStore, createDataStore } from "@/toolkit/factories/dataStore";
import { SpaceDef } from "@/toolkit/types/space";
import { refreshGiteeAccessToken } from "libs/gitee-api";
import { useEffect, useState } from "react";
import xbook from "xbook/index";

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

  getSpaceStore(): DataStore<SpaceDef> {
    return this.spaceStore;
  }

  getSpaces = () => {
    return this.spaceStore.getData();
  };

  constructor() {
    xbook.registry.set("spaceStore", this.spaceStore);
    this.spaceStore.reduxStore.subscribe(() => {
      xbook.pipeService.emit("spaceStore.spaces", this.spaceStore.getData());
    });
  }

  refreshAuth = (spaceId: string) => {
    return new Promise<boolean>((resolve) => {
      const space = this.spaceStore.getRecord(spaceId)!;
      if (!space.auth) return resolve(false);
      refreshGiteeAccessToken({ refreshToken: space.auth?.refresh_token })
        .then((res) => {
          this.spaceStore.getActions().update({ ...space, auth: res });
          console.log("auth updated:", res);
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
    const authService = xbook.serviceBus.createProxy(Tokens.AuthService);
    return authService.hasReadPermission(space.platform, space.owner);
  };

  usePermissions = (spaceId: string) => {
    const space = this.spaceStore.getRecord(spaceId);
    if (!space)
      return {
        hasReadPermission: false,
        hasWritePermission: false,
      };
    // if (!space.auth) return false;
    const authService = xbook.serviceBus.createProxy(Tokens.AuthService);
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

  updateSpace = (space: SpaceDef) => {
    this.spaceStore.getActions().update(space);
  };

  addSpace = (
    {
      platform,
      owner,
      repo,
    }: {
      platform: string;
      owner: string;
      repo: string;
    },
    options?: {
      focus?: boolean;
    }
  ): SpaceDef => {
    const spaceStore = this.spaceStore;
    const id = spaceHelper.generateSpaceId(platform, owner, repo);
    const { focus } = options || {};
    const existingSpace = spaceStore.getRecord(id);
    spaceStore.waitUtilLoaded(() => {
      spaceStore.getActions().upsert({ platform, owner, repo, id });
    });
    if (!existingSpace) {
      xbook.notificationService.success("成功添加空间");
    } else {
      xbook.notificationService.success("空间已存在");
    }
    if (focus) {
      this.focusSpace(id);
    }
    return { platform, owner, repo, id };
  };

  focusSpace = (spaceId: string) => {
    const folderTreeService = xbook.serviceBus.createProxy(
      Tokens.FolderTreeService
    );
    folderTreeService.focus(spaceId);
    setTimeout(() => {
      xbook.serviceBus.invoke(`space-${spaceId}.trigger`);
    }, 100);
  };

  getFocusedSpace = () => {
    const folderTreeService = xbook.serviceBus.createProxy(
      Tokens.FolderTreeService
    );
    const id = folderTreeService.getCurrentViewId();
    if (id) {
      return this.spaceStore.getRecord(id);
    }
  };

  parseRepoUrl = (url: string) => {
    const u = new URL(url);
    let platform, owner, repo;
    if (u.hostname === "gitee.com") platform = "gitee";
    else if (u.hostname === "github.com") platform = "github";
    [owner, repo] = u.pathname.slice(1).split("/");
    return { platform, owner, repo };
  };

  subscribeSpaces = (callback: (spaces: SpaceDef[]) => void) => {
    callback(this.spaceStore.getData());
    this.spaceStore.reduxStore.subscribe(() => {
      callback(this.spaceStore.getData());
    });
  };
}

// export const createSpaceService = (): ISpaceService => {
//   const spaceStore = createDataStore<SpaceDef>({
//     initialState: [],
//     persistConfig: {
//       name: "spaces",
//       type: "LocalStorage",
//     },
//   });
//   xbook.registry.set("spaceStore", spaceStore);
//   spaceStore.reduxStore.subscribe(() => {
//     xbook.pipeService.emit("spaceStore.spaces", spaceStore.getData());
//   });

//   const refreshAuth = (spaceId: string) => {
//     return new Promise<boolean>((resolve) => {
//       const space = spaceStore.getRecord(spaceId)!;
//       if (!space.auth) return resolve(false);
//       refreshAccessToken({ refreshToken: space.auth?.refresh_token })
//         .then((res) => {
//           spaceStore.getActions().update({ ...space, auth: res });
//           console.log("auth updated:", res);
//           resolve(true);
//         })
//         .catch((err) => {
//           console.log("auth error:", err);
//           resolve(false);
//         });
//     });
//   };

//   const login = (spaceId: string) => {
//     const space = spaceStore.getRecord(spaceId)!;
//     const modal = xbook.modalService.createModal({
//       title: `登录 ${space.platform}`,
//       content: <Auth spaceId={spaceId} />,
//       footer: false,
//     });
//     modal.open();
//   };

//   const redirectAuthPage = (spaceId: string) => {
//     xbook.serviceBus.invoke("redirectAuthPage", spaceId);
//   };

//   const isAuthorized = (spaceId: string) => {
//     // const space = spaceStore.getRecord(spaceId);
//     // return !!space?.auth;
//     const space = spaceStore.getRecord(spaceId);
//     if (!space) return false;
//     // if (!space.auth) return false;
//     const authService = xbook.serviceBus.createProxy(Tokens.AuthService);
//     return authService.hasReadPermission(space.platform, space.owner);
//   };

//   const usePermissions = (spaceId: string) => {
//     const space = spaceStore.getRecord(spaceId);
//     if (!space)
//       return {
//         hasReadPermission: false,
//         hasWritePermission: false,
//       };
//     // if (!space.auth) return false;
//     const authService = xbook.serviceBus.createProxy(Tokens.AuthService);
//     const [hasReadPermission, setHasReadPermission] = useState<boolean>(
//       authService.hasReadPermission(space.platform, space.owner)
//     );
//     const [hasWritePermission, setHasWritePermission] = useState<boolean>(
//       authService.hasWritePermission(space.platform, space.owner)
//     );
//     useEffect(() => {
//       authService.onAuthChange(() => {
//         setHasReadPermission(
//           authService.hasReadPermission(space.platform, space.owner)
//         );
//         setHasWritePermission(
//           authService.hasWritePermission(space.platform, space.owner)
//         );
//       });
//     }, []);

//     return { hasReadPermission, hasWritePermission };
//   };

//   const getSpace = (spaceId: string) => {
//     return spaceStore.getRecord(spaceId);
//   };

//   const updateSpace = (space: SpaceDef) => {
//     spaceStore.getActions().update(space);
//   };

//   return {
//     refreshAuth,
//     login,
//     redirectAuthPage,
//     getSpace,
//     isAuthorized,
//     usePermissions,
//     updateSpace,
//   };
// };

// export const spaceService = createSpaceService();

// export const spaceService = new SpaceService();
