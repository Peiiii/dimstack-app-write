import { Box } from "@chakra-ui/react";
import "./sidebar.scss";

import { createDataStore } from "@/toolkit/common/dataStore";
import { createTreeDataStore } from "@/toolkit/common/treeDataStore";
import { Tree, WidgetViewState } from "@/toolkit/components/tree";
import {
  treePluginExpand,
  treePluginInitView,
} from "@/toolkit/components/tree/treePlugins";
import treePluginConfig from "./plugins/treePluginConfig";
import treePluginDeleteNode from "./plugins/treePluginDeleteNode";
import treePluginEditNode from "./plugins/treePluginEditNode";
import treePluginOpenChannel from "./plugins/treePluginOpenChannel";
import SideCard from "@/plugins/services/folderTreeService/components/SideCard";
import treePluginAddNode from "@/plugins/services/folderTreeService/plugins/treePluginAddNode";
import treePluginMigration from "@/plugins/services/folderTreeService/plugins/treePluginMigration";
import treePluginNodeType from "@/plugins/services/folderTreeService/plugins/treePluginNodeType";

const viewStateStore = createDataStore<WidgetViewState>({
  initialState: [],
  persistConfig: {
    name: "folderTreeViewState",
    type: "LocalStorage",
  },
});

const treeDataStore = createTreeDataStore<{
  name: string;
  content: string;
}>({
  initialState: {
    name: "root",
    content: "内容",
    id: "root",
  },
  persistConfig: {
    name: "folderTree",
    type: "LocalStorage",
  },
});
const TreeView = () => {
  console.log("会话");
  return (
    <SideCard title={"会话"} className="channelList">
      {/* <Box m={2}>
        <Input size="sm" placeholder="搜索" />
      </Box> */}
      <Box h="0.1rem" />
      <Box w="100%" className="channel-tree">
        <Tree
          dataStore={treeDataStore}
          viewStateStore={viewStateStore}
          plugins={[
            treePluginInitView(),
            treePluginExpand({
              defaultExpanded: false,
            }),
            treePluginOpenChannel(),
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
