import { Tokens } from "@/constants/tokens";
import { OpenerService } from "@/services/opener-service";
import { createPlugin } from "xbook/common/createPlugin";

export default createPlugin({
  initilize(xbook) {
    xbook.serviceBus.exposeAt(Tokens.OpenerService, new OpenerService());
  },
});
