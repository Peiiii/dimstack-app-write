import { fileSystemHelper } from "@/helpers/file-system.helper";
import { spaceHelper } from "@/helpers/space.helper";
import { TreeEventKeys } from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreeHelper } from "@/toolkit/components/tree/treePlugins";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";
import { FileType } from "@/toolkit/vscode/file-system";
import xbook from "xbook/index";

export default createTreeHelper<FolderTreeNode>().createPlugin({
  activate({
    serviceBus,
    dataStore,
    viewSystem: { viewStateStore },
    options: { space },
    eventBus
  }) {
    viewStateStore.reduxStore.subscribe(() => {
      const data = viewStateStore.getData();
      console.log("viewStateStore:", data);
    });
    /** read children only when expanded */
    const readTreeReferToViewState = async (
      spaceId: string,
      node: TreeDataNode<FolderTreeNode>
    ): Promise<TreeDataNode<FolderTreeNode>> => {
      const oldNode = dataStore.getNode(node.id)!;
      const viewState = viewStateStore.getData().find((v) => v.id === node.id);
      if (!viewState || !viewState.expanded) return node;
      // const dirInfo = await fileSystemHelper.service.readDirectory(
      //   fileSystemHelper.generateFileId(
      //     spaceId,
      //     node.id === "root" ? "/" : node.path!
      //   )
      // );

      const uri = spaceHelper.getUri(
        spaceId,
        node.id === "root" ? "/" : node.path!
      );

      let parentPath = node.id === "root" ? "/" : node.path!;
      parentPath = parentPath.endsWith("/") ? parentPath : parentPath + "/";

      viewStateStore.getActions().update({
        ...viewState,
        loading: true,
      });
      const info = await xbook.fs.readDirectory(uri);
      viewStateStore.getActions().update({
        ...viewState,
        loading: false,
      });

      const dirInfo = info.map(([name, type]) => {
        return {
          id: `${parentPath}${name}`,
          name,
          path: `${parentPath}${name}`,
          type: (type === FileType.Directory
            ? "dir"
            : type === FileType.File
            ? "file"
            : "file") as "dir" | "file",
        };
      });

      return {
        ...node,
        children: await Promise.all(
          dirInfo
            .map((child) => ({
              ...oldNode.children?.find((c) => c.path == child.path),
              ...child,
            }))
            .map((child) => ({
              ...child,
              id: child.path,
            }))
            .map((child) =>
              child.type === "dir"
                ? readTreeReferToViewState(spaceId, child)
                : child
            )
        ),
      };
    };
    const shallowRefresh = async (id: string) => {
      const node = dataStore.getNode(id)!;
      const oldNode = dataStore.getNode(node.id)!;
      const info = await fileSystemHelper.service.readDirectory(
        fileSystemHelper.generateFileId(
          space.id,
          node.id === "root" ? "/" : node.path!
        )
      );
      dataStore.getActions().update({
        node: {
          ...node,
          children: info
            .map((child) => ({
              ...oldNode.children?.find((c) => c.path == child.path),
              ...child,
            }))
            .map((child) => ({
              ...child,
              id: child.path,
            })),
        },
      });
      console.log("updatedData:", dataStore.getData());
    };
    const deepRefresh = async (id: string) => {
      const node = dataStore.getNode(id)!;
      const updatedNode = await readTreeReferToViewState(space.id, node);
      dataStore.getActions().update({ node: updatedNode });
      eventBus.emit(TreeEventKeys.NodeContentLoaded, {
        node: updatedNode,
      });
      console.log("updatedData:", dataStore.getData());
    };
    serviceBus.expose("refresh", deepRefresh);
  },
});
