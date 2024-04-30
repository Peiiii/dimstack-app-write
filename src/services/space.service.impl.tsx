import Auth from "@/plugins/space/spaceService/Auth";
import { ISpaceService } from "@/services/space.service.interface";
import { createDataStore } from "@/toolkit/factories/dataStore";
import { SpaceDef } from "@/toolkit/types/space";
import { refreshAccessToken } from "libs/gitee-api";
import xbook from "xbook/index";

export const createSpaceService = (): ISpaceService => {
  const spaceStore = createDataStore<SpaceDef>({
    initialState: [],
    persistConfig: {
      name: "spaces",
      type: "LocalStorage",
    },
  });
  xbook.registry.set("spaceStore", spaceStore);
  spaceStore.reduxStore.subscribe(() => {
    xbook.pipeService.emit("spaceStore.spaces", spaceStore.getData());
  });

  const refreshAuth = (spaceId: string) => {
    return new Promise<boolean>((resolve) => {
      const space = spaceStore.getRecord(spaceId)!;
      if (!space.auth) return resolve(false);
      refreshAccessToken({ refreshToken: space.auth?.refresh_token })
        .then((res) => {
          spaceStore.getActions().update({ ...space, auth: res });
          console.log("auth updated:", res);
          resolve(true);
        })
        .catch((err) => {
          console.log("auth error:", err);
          resolve(false);
        });
    });
  };

  const login = (spaceId: string) => {
    const space = spaceStore.getRecord(spaceId)!;
    const modal = xbook.modalService.createModal({
      title: `登录 ${space.platform}`,
      content: <Auth spaceId={spaceId} />,
      footer: false,
    });
    modal.open();
  };

  const redirectAuthPage = (spaceId: string) => {
    xbook.serviceBus.invoke("redirectAuthPage", spaceId);
  };

  const isAuthorized = (spaceId: string) => {
    // const space = spaceStore.getRecord(spaceId);
    // return !!space?.auth;
    const space = spaceStore.getRecord(spaceId);
    if (!space) return false;
    if (!space.auth) return false;
    return true;
  };

  return {
    refreshAuth,
    login,
    redirectAuthPage,
    isAuthorized,
  };
};

export const spaceService = createSpaceService();
