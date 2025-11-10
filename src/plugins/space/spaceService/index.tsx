import { Tokens } from "@/constants/tokens";
import { spaceService } from "@/services/space.service";
import { createPlugin } from "xbook/common/createPlugin";

export const spaceServiceModule = createPlugin({
  initilize(xbook) {
    // Expose the singleton instance for legacy callers still using serviceBus.
    // New code should import `spaceService` directly.
    xbook.serviceBus.exposeAt(Tokens.SpaceService, spaceService);
  },
});
