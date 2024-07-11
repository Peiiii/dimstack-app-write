import { Tokens } from "@/constants/tokens";
import { spaceHelper } from "@/helpers/space.helper";
import { createPlugin } from "xbook/common/createPlugin";

export const Migration20240518 = createPlugin({
  initilize(xbook) {
    const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
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
