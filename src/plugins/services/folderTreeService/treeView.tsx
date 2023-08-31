import { Box } from "@chakra-ui/react";
import "./sidebar.scss";

import { createDataStore } from "@/toolkit/common/dataStore";
import { createTreeDataStore } from "@/toolkit/common/treeDataStore";
import { Tree, WidgetViewState } from "@/toolkit/components/tree";
import {
  treePluginExpandTemplate,
  treePluginInitViewTemplate,
} from "@/toolkit/components/tree/treePlugins";
import treePluginConfig from "./plugins/treePluginConfig";
import treePluginDeleteNode from "./plugins/treePluginDeleteNode";
import treePluginEditNode from "./plugins/treePluginEditNode";
import treePluginClickNode from "./plugins/treePluginClickNode";
import SideCard from "@/plugins/services/folderTreeService/components/SideCard";
import treePluginAddNode from "@/plugins/services/folderTreeService/plugins/treePluginAddNode";
import treePluginMigration from "@/plugins/services/folderTreeService/plugins/treePluginMigration";
import treePluginNodeType from "@/plugins/services/folderTreeService/plugins/treePluginNodeType";
import xbook from "xbook/index";
import { SpaceDef } from "@/toolkit/types/space";
import { useMemo } from "react";
import { FolderTreeNode } from "@/plugins/services/folderTreeService/types";

const viewStateStore = createDataStore<WidgetViewState>({
  initialState: [],
  persistConfig: {
    name: "folderTreeViewState",
    type: "LocalStorage",
  },
});

const TreeView = ({ space }: { space: SpaceDef }) => {
  const treeDataStore = useMemo(
    () =>
      createTreeDataStore<FolderTreeNode>({
        initialState: {
          name: "root",
          content: "内容",
          id: "root",
        },
        persistConfig: {
          name: "folderTree",
          type: "LocalStorage",
        },
      }),
    []
  );
  // console.log("会话");
  return (
    <SideCard title={"会话"} className="channelList">
      {/* <Box m={2}>
        <Input size="sm" placeholder="搜索" />
      </Box> */}
      <Box h="0.1rem" />
      <Box w="100%" className="channel-tree">
        <Tree
          options={{ space }}
          dataStore={treeDataStore}
          viewStateStore={viewStateStore}
          plugins={[
            treePluginInitViewTemplate<FolderTreeNode>(),
            treePluginExpandTemplate<FolderTreeNode>({
              defaultExpanded: false,
            }),
            treePluginClickNode(),
            treePluginEditNode({
              editable: ({ level }) => {
                return level !== 0;
              },
            }),
            treePluginAddNode(),
            treePluginDeleteNode({
              deletable: ({ level }) => {
                return level !== 0;
              },
            }),
            treePluginConfig({
              rootId: "",
            }),
            treePluginNodeType(),
            treePluginMigration(),
          ]}
        />
      </Box>
    </SideCard>
  );
};

export default TreeView;
