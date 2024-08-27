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
import { getNodeFileType, getNodeType } from "../utils";

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
  },
});

export default treePluginNodeType;
