import { createTreePluginTemplate } from "@/toolkit/components/tree/plugin";
import { BaseServicePoints } from "@/toolkit/components/tree/tokens";
import { getBaseTreeServiceClass } from "@/toolkit/components/tree/tree.service";

export const treePluginProvideBaseTreeService = createTreePluginTemplate({
  activate(context) {
    const { serviceBus } = context;
    const Cls = getBaseTreeServiceClass(context);
    serviceBus.registerFromMap(BaseServicePoints.TreeService, new Cls());
  },
});
