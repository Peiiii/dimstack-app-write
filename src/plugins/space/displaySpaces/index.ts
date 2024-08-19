import { EventKeys } from "@/constants/eventKeys";
import { Tokens } from "@/constants/tokens";
import { spaceHelper } from "@/helpers/space.helper";
import { SpaceDef } from "@/toolkit/types/space";
import { createPlugin } from "xbook/common/createPlugin";

export default createPlugin({
  initilize(xbook) {
    let prevSpaces: SpaceDef[] = [];
    xbook.pipeService.on("spaceStore.spaces", (spaces: SpaceDef[]) => {
      const prevIds = prevSpaces.map((p) => p.id);
      const ids = spaces.map((s) => s.id);
      const spacesAdded = spaces.filter((s) => !prevIds.includes(s.id));
      const spacesRemoved = prevSpaces.filter((s) => !ids.includes(s.id));
      const spacesAddedOrUpdated = spaces.filter(
        (s) => !prevSpaces.includes(s)
      );
      // const spacesUpdated = spacesAddedOrUpdated.filter(
      //   (s) => !spacesAdded.includes(s)
      // );
      // console.log("spaceAdded:", spacesAdded);
      prevSpaces = spaces;
      const folderTreeService = xbook.serviceBus.createProxy(Tokens.FolderTreeService);
      spacesAddedOrUpdated.forEach((space) => {;
        folderTreeService.add(space);
      });
      spacesRemoved.forEach((space) => {
        folderTreeService.remove(space.id);
      });
    });
    xbook.eventBus.on(
      EventKeys.ActivityBar.DragItem,
      ({ prevIndex: idx1, nextIndex: idx2 }) => {
        const store = spaceHelper.getStore();
        store.getActions().reduce((data) => {
          if (idx1 === idx2) return data;
          const before = data.slice(0, Math.min(idx1, idx2));
          const after = data.slice(Math.max(idx1, idx2) + 1);
          const middle = data.slice(
            Math.min(idx1, idx2) + 1,
            Math.max(idx1, idx2)
          );
          const source = data[idx1];
          const target = data[idx2];
          let res;
          if (idx1 < idx2) {
            res = [...before, ...middle, target, source, ...after];
          } else {
            res = [...before, source, target, ...middle, ...after];
          }
          console.log("spaceDataChange:", data.length, "=>", res.length);
          return res;
        });
      }
    );
  },
});
