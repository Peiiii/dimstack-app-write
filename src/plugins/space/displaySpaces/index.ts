import { spaceHelper } from "@/helpers/space.helper";
import { createPlugin } from "@/toolkit/common/plugin";
import { SpaceDef } from "@/toolkit/types/space";

export default createPlugin({
  initilize(xbook) {
    let prevSpaces: SpaceDef[] = [];
    xbook.pipeService.on("spaceStore.spaces", (spaces: SpaceDef[]) => {
      console.log("prevSpaces:", prevSpaces, "spaces:", spaces);
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
      spacesAddedOrUpdated.forEach((space) => {
        // console.log("space:", space);
        xbook.serviceBus.invoke("folderTreeService.add", space);
      });
      spacesRemoved.forEach((space) => {
        xbook.serviceBus.invoke("folderTreeService.remove", space.id);
      });
      // spacesAdded.forEach((space) => {
      //   xbook.serviceBus.invoke("folderTreeService.focus", space.id);
      // });
    });
    xbook.eventBus.on("activityBar:dragItem", (idx1: number, idx2: number) => {
      const store = spaceHelper.getStore();
      store.getActions().reduce((data) => {
        if (idx1 === idx2) return data;
        const before = data.slice(0, Math.min(idx1, idx2));
        const after = data.slice(Math.max(idx1, idx2) + 1);
        const middle = data.slice(Math.min(idx1, idx2) + 1, Math.max(idx1, idx2));
        const source = data[idx1];
        const target = data[idx2];

        if (idx1 < idx2) {
          return [...before, ...middle, target, source, ...after];
        } else {
          return [...before, source, target, ...middle, ...after];
        }
      });
    });
  },
});
