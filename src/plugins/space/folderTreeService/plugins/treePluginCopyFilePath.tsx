import { spaceHelper } from "@/helpers/space.helper";
import { createFolderTreePlugin } from "@/plugins/space/folderTreeService/plugins/base";
import {
  TreeEventKeys,
  TreeServicePoints,
} from "@/plugins/space/folderTreeService/tokens";
import { Copy } from "lucide-react";
import xbook from "xbook/index";
import { t } from "@/i18n/utils";

export default createFolderTreePlugin({
  activate({ viewSystem, eventBus, serviceBus }) {
    const treeService = serviceBus.createProxy(TreeServicePoints.TreeService);
    const space = treeService.getSpace();
    viewSystem.addNodeMenuItems([
      {
        id: "copyFilePath",
        key: "copyFilePath",
        label: t("tree.copyUri"),
        icon: "AiFillCopy",
        event: TreeEventKeys.CopyFilePath.name,
        group: "more",
      },
    ]);
    viewSystem.renderer.register("AiFillCopy", Copy);
    eventBus.on(TreeEventKeys.CopyFilePath, ({ node }) => {
      const uri = spaceHelper.getUri(space.id, node.id === "root" ? "" : node.id);
      navigator.clipboard.writeText(uri.toString());
      xbook.notificationService.success(t("tree.uriCopied"));
    });
  },
});
