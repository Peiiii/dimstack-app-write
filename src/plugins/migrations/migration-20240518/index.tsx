import { spaceHelper } from "@/helpers/space.helper";
import { spaceService } from "@/services/space.service";
import { createPlugin } from "xbook/common/createPlugin";

export const Migration20240518 = createPlugin({
  initilize(xbook) {
    spaceService.subscribeSpaces((spaces) => {
      let isOld = false;
      const migrated = spaces.map((space) => {
        // if(space.name === 'GitRepo')
        if (space.id.includes(":")) {
          isOld = true;
        }
        return {
          ...space,
          id: space.id.includes(":")
            ? spaceHelper.generateHash(space.id)
            : space.id,
        };
      });
      if (isOld) {
        spaceService.setSpaces(migrated);
      }
    });
  },
});
