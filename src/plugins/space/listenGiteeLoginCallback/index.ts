import { appInfo } from "@/plugins/space/listenGiteeLoginCallback/appInfo";
import { DataStore } from "@/toolkit/common/dataStore";
import { createPlugin } from "@/toolkit/common/plugin";
import { SpaceDef } from "@/toolkit/types/space";
import { getLoginUrl } from "libs/gitee-api";
import giteeClient from "libs/gitee-api/gitee-client";
import history from "xbook/common/history";

export const listenGiteeLoginCallback = createPlugin({
  initilize(xbook) {
    const code = history.location.query["code"];
    if (code) {
      giteeClient
        .getGiteeAccessToken({
          clientId: appInfo.clientId,
          clientSecret: appInfo.clientSecret,
          redirectUri: appInfo.redirectUri,
          code: code,
        })
        .then((auth) => {
          const spaceId = xbook.cacheService
            .space("tmp", "localStorage")
            .get("authSpaceId");
          // console.log("Space:", spaceId, "auth:", auth);
          if (spaceId) {
            const spaceStore = xbook.registry.get(
              "spaceStore"
            ) as DataStore<SpaceDef>;
            spaceStore.getActions().upsert({ id: spaceId, auth });
            xbook.cacheService
              .space("tmp", "localStorage")
              .remove("authSpaceId");
          }
        });
      const newQuery = { ...history.location.query };
      delete newQuery["code"];
      history.push(
        history.createHref({
          pathname: history.location.pathname,
          query: newQuery,
        })
        // true
      );
    }

    xbook.serviceBus.expose("redirectAuthPage", (spaceId) => {
      xbook.cacheService
        .space("tmp", "localStorage")
        .set("authSpaceId", spaceId);
      const sId = xbook.cacheService
        .space("tmp", "localStorage")
        .get("authSpaceId");
      console.log("save space id: " + sId);
      const url = getLoginUrl({
        redirectUri: appInfo.redirectUri,
        clientId: appInfo.clientId,
      });
      console.log("url to redirect: " + url);
      window.open(url);
    });
  },
});
