import {
  ServicePoints,
  TreeEventKeys,
} from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";
import { Icon, Text } from "@chakra-ui/react";
import {
  AiFillFile,
  AiFillFileMarkdown,
  AiFillFolder,
  AiFillFolderOpen,
} from "react-icons/ai";
const getNodeType = (node: FolderTreeNode) => {
  // if (node.id === "root" || !/.+\/.+/.test(node.id)) return "dir";
  if (node.id === "root") return "dir";
  else return node.type!;
};

const getNodeFileType = (_) => {
  // if (!node.id) return "dir";
  // if (!/.+\/.+/.test(node.id)) "dir";
  // else return "file";
  return "file";
};
export const treePluginNodeType = createTreePlugin<FolderTreeNode>({
  activate({ viewSystem, eventBus, dataStore, serviceBus }) {
    const treeService = serviceBus.createProxy(ServicePoints.TreeService);
    viewSystem.setDefaultViewStateProvider(({ id }, props) => {
      let expandable;
      const node = dataStore.getNode(id)!;
      if (getNodeType(node) === "dir") expandable = true;
      else expandable = false;
      return {
        ...props,
        id: node.id,
        expanded: false,
        editMode: false,
        expandable,
      };
    });

    // console.log(`[${spaceId}] treePluginNodeType activating`);

    viewSystem.renderer.register(
      "icon-node-type",
      ({ node }) => {
        const state =
          viewSystem.viewStateStore.useRecord(node.id) ||
          viewSystem.getDefaultViewState(node);
        const { editMode, editingName } = state;
        const name = editMode ? editingName ?? node.name : node.name;

        if (getNodeType(node) === "dir") {
          return (
            <Icon
              className="icon dir"
              as={state?.expanded ? AiFillFolderOpen : AiFillFolder}
            />
          );
        } else {
          if (getNodeFileType(node) === "file") {
            const isMarkdown =
              name.endsWith(".md") || name.endsWith(".markdown");
            return (
              <Icon
                className={"icon file " + (isMarkdown ? "file-markdown" : "")}
                as={isMarkdown ? AiFillFileMarkdown : AiFillFile}
              />
            );
          } else return <Text as="h3"> </Text>;
        }
      },
      true
    );

    const focusNode = (node) => {
      if (getNodeType(node) === "file") {
        viewSystem.viewStateStore.getActions().reduce((data) => {
          data = data.map((item) => ({ ...item, highlight: false }));
          const item = data.find((item) => item.id === node.id);
          if (item) {
            item.highlight = true;
          } else {
            data.push({
              ...viewSystem.getDefaultViewState(node),
              highlight: true,
            });
          }
          return data;
        });
        const pathNodes = treeService.findPathNodes(
          node.id,
          dataStore.getData()
        );
        if (pathNodes) {
          viewSystem.viewStateStore.getActions().reduce((data) => {
            for (const node of pathNodes) {
              const item = data.find((item) => item.id === node.id);
              if (item) {
                item.expanded = true;
              } else {
                data.push({
                  ...viewSystem.getDefaultViewState(node),
                  expanded: true,
                });
              }
              // console.log("pathNodes:", pathNodes, data);
            }
            return data;
          });
        }
      }
    };
    eventBus.on(TreeEventKeys.NodeClick, ({ node }) => {
      focusNode(node);
    });
  },
});

export default treePluginNodeType;
