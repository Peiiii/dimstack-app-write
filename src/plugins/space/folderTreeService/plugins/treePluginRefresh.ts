import { fileSystemHelper } from "@/helpers/file-system.helper";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreeHelper } from "@/toolkit/components/tree/treePlugins";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";

export default createTreeHelper<FolderTreeNode>().createPlugin({
  activate({
    serviceBus,
    dataStore,
    viewSystem: { viewStateStore },
    options: { space },
  }) {
    viewStateStore.reduxStore.subscribe(() => {
      const data = viewStateStore.getData();
      console.log("viewStateStore:", data);
    });
    const readTreeReferToViewState = async (
      spaceId: string,
      node: TreeDataNode<FolderTreeNode>
    ): Promise<TreeDataNode<FolderTreeNode>> => {
      const oldNode = dataStore.getNode(node.id)!;
      const viewState = viewStateStore.getData().find((v) => v.id === node.id);
      if (!viewState || !viewState.expanded) return node;
      const dirInfo = await fileSystemHelper.service.readDirectory(
        fileSystemHelper.generateFileId(
          spaceId,
          node.id === "root" ? "/" : node.path!
        )
      );
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
      console.log("updatedData:", dataStore.getData());
    };
    serviceBus.expose("refresh", deepRefresh);
  },
});
