import Auth from "@/plugins/space/spaceService/Auth";
import { createDataStore } from "@/toolkit/common/dataStore";
import { createPlugin } from "@/toolkit/common/plugin";
import { SpaceDef } from "@/toolkit/types/space";
import { refreshAccessToken } from "libs/gitee-api";

export const spaceService = createPlugin({
  initilize(xbook) {
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

    xbook.serviceBus.exposeAt("spaceService",{
      refreshAuth: (spaceId:string)=>{
       return new Promise((resolve) =>{
        const space=spaceStore.getRecord(spaceId)!;
        if(!space.auth) return resolve(false);
        refreshAccessToken({ refreshToken: space.auth?.refresh_token }).then(res=>{
          spaceStore.getActions().update({...space,auth:res})
          console.log("auth updated:",res);
          resolve(true);
        }).catch(err => {
          console.log("auth error:",err);
          resolve(false);
        });
       })
      },
      login: (spaceId:string)=>{
        const space=spaceStore.getRecord(spaceId)!;
        const modal = xbook.modalService.createModal({
          title: `登录 ${space.platform}`,
          content: <Auth spaceId={spaceId} />,
          footer: false,
        });
        modal.open();
      },
      redirectAuthPage: (spaceId: string) =>{
        xbook.serviceBus.invoke("redirectAuthPage",spaceId);
      }
    })
  },
});
