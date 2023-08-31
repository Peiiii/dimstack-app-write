import { createPlugin } from "@/toolkit/common/plugin";
import { SpaceDef } from "@/toolkit/types/space";

export default createPlugin({
  initilize(xbook) {
    xbook.pipeService.on("spaceStore.spaces", (spaces: SpaceDef[]) => {
      spaces.forEach((space) => {
        // console.log("space:", space);
        xbook.serviceBus.invoke("folderTreeService.add", space);
      });
    });
  },
});
