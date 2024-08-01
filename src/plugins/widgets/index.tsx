import integrations from "@/plugins/widgets/integrations";
import introduction from "@/plugins/widgets/introduction";
import settings from "@/plugins/widgets/settings";
import spaceList from "@/plugins/widgets/space-list";
import { createPlugin } from "xbook/common/createPlugin";

export default createPlugin({
    initilize(xbook) {
        xbook.pluginService.use([
            settings,
            introduction,
            integrations,
            // spaceList,
        ]);
    },
})