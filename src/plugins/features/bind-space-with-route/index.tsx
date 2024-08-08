import { Tokens } from "@/constants/tokens";
import { spaceHelper } from "@/helpers/space.helper";
import { BehaviorSubject } from "rxjs";
import { createPlugin } from "xbook/common/createPlugin";

const parseSpaceInfoFromRoute = () => {
  const path = window.location.pathname;
  const match = path.match(/\/#\/https:\/\/([^\.]+)\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) return null;
  const [, platform, owner, repo] = match;
  return { platform, owner, repo };
};

const getSpaceInfoObservableFromRoute = () => {
  const subject = new BehaviorSubject(parseSpaceInfoFromRoute());
  window.addEventListener("popstate", () => {
    subject.next(parseSpaceInfoFromRoute());
  });
  return subject;
};

export const bindSpaceWithRoute = createPlugin({
  initilize(xbook) {
    const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
    const routeSpace$ = getSpaceInfoObservableFromRoute();
    routeSpace$.subscribe((spaceInfo) => {
      if (!spaceInfo) return;
      const { platform, owner, repo } = spaceInfo;
      spaceService.focusSpace(
        spaceHelper.generateSpaceId(platform, owner, repo)
      );
    });
    spaceService.subscribeSpaces((spaces) => {
      const focusedSpace = spaceService.getFocusedSpace();
      if (!focusedSpace) return;
      const { platform, owner, repo } = focusedSpace;
      const path = `/#/https://${platform}.com/${owner}/${repo}`;
      if (window.location.pathname === path) return;
      window.history.pushState(null, "", path);
    });

    // // 监听路由变化
    // window.addEventListener("popstate", () => {
    //   const spaceInfo = parseSpaceInfoFromRoute();
    //   if (!spaceInfo) return;
    //   const { platform, owner, repo } = spaceInfo;
    //   spaceService.focusSpace(
    //     spaceHelper.generateSpaceId(platform, owner, repo)
    //   );
    // });
  },
});
