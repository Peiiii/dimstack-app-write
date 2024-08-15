import { Tokens } from "@/constants/tokens";
import { distinctUntilChanged, distinctUntilKeyChanged, pairwise } from "rxjs";
import { createPlugin } from "xbook/common/createPlugin";
import { CacheController } from "xbook/ui/services/cache-controller";

const cache = CacheController.create({
  scope: "showCurrentSpacePagesOnly",
  storage: "localStorage",
});

export const ShowCurrentSpacePagesOnly = createPlugin({
  initilize(xbook) {
    const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
    xbook.layoutService.pageBox.subscribePageList((pages) => {
      const space = spaceService.getFocusedSpace();
      if (space?.id) cache.set(space.id, pages);
    });
    spaceService
      .getFocusedSpace$()
      .pipe(
        distinctUntilChanged((a, b) => a?.id === b?.id),
        pairwise()
      )
      .subscribe(([s1, s2]) => {
        const pages = xbook.layoutService.pageBox.getPageList();
        if (s1?.id) cache.set(s1.id, pages);
        if (s2?.id) {
          const newPages = cache.get(s2.id, undefined);
          if (newPages) {
            xbook.layoutService.pageBox.setPageList(newPages);
          } else {
            xbook.layoutService.pageBox.setPageList([]);
          }
        }
      });
  },
});
