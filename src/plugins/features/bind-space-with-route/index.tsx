import { Tokens } from "@/constants/tokens";
import { spaceHelper } from "@/helpers/space.helper";
import { createObservableFromExternalStore } from "@/toolkit/utils/rx-utils";
import { BehaviorSubject } from "rxjs";
import { createPlugin } from "xbook/common/createPlugin";
import { createHashHistory } from "history";

const history = createHashHistory();

const parseSpaceInfoFromRoute = () => {
  const hash = window.location.hash;
  const match = hash.match(/\/https:\/\/([^\.]+)\.com\/([^\/]+)\/([^\/]+)/);
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
    setTimeout(() => {
      const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
      const routeSpace$ = getSpaceInfoObservableFromRoute();
      routeSpace$.subscribe((spaceInfo) => {
        if (!spaceInfo) return;
        const { platform, owner, repo } = spaceInfo;
        spaceService.focusSpace(
          spaceHelper.generateSpaceId(platform, owner, repo)
        );
      });

      const space$ = createObservableFromExternalStore(
        () => spaceService.getFocusedSpace(),
        (callback) => spaceService.getFocusedSpace$().subscribe(callback)
      );

      space$.subscribe((space) => {
        if (!space) return;
        const { platform, owner, repo } = space;
        const path = `/${location.search}#/https://${platform}.com/${owner}/${repo}`;
        if (window.location.pathname === path) return;
        window.history.pushState(null, "", path);
      });
    }, 500);
  },
});
