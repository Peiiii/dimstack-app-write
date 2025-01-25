import { TreeServicePoints } from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";
import { Icon, Text } from "@chakra-ui/react";
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
import { getFileTypeByExtension } from "../constants/fileTypes";
import { getNodeFileType, getNodeType } from "../utils";
import classNames from "classnames";
import { css } from "@emotion/css";

export const treePluginNodeType = createTreePlugin<FolderTreeNode>({
  activate({ viewSystem, eventBus, dataStore, serviceBus }) {
    const treeService = serviceBus.createProxy(TreeServicePoints.TreeService);
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
        } else if (getNodeFileType(node) === "file") {
          const fileType = getFileTypeByExtension(name);

          return (
            <Icon
              className={classNames(
                "icon file",
                css`
                  & {
                    color: ${fileType.color} !important;
                  }
                `
              )}
              as={fileType.icon}
              color={fileType.color}
              opacity={0.7}
            />
          );
        }

        return <Text as="h3"> </Text>;
      },
      true
    );
  },
});

export default treePluginNodeType;
