import { Alert, Box, Flex, HStack, Link, Spacer, Text } from "@chakra-ui/react";
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
import { useEffect, useMemo, useState } from "react";
import { FolderTreeNode } from "@/plugins/services/folderTreeService/types";
import { fileSystemHelper } from "@/helpers/file-system.helper";
import { join, dirname } from "path-browserify";
import treePluginRefreshSpaceAuth from "@/plugins/services/folderTreeService/plugins/treePluginRefreshSpaceAuth";
import { AiOutlineLink } from "react-icons/ai";

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
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    return xbook.pipeService.on(`space[${space.id}].isLogin`, setIsLogin);
  }, [space.id]);
  // console.log("space in treeView:", space);
  // console.log("会话");
  return (
    <SideCard title={`${space.repo}`} className="channelList">
      {/* <Box m={2}>
        <Input size="sm" placeholder="搜索" />
      </Box> */}
      {/* <Box h="0.1rem" /> */}
      {!isLogin && (
        <Alert status="warning" fontSize={"sm"}>
          您尚未登录，请前往
          <Link
            color="blue.300"
            display={"flex"}
            onClick={() => {
              xbook.serviceBus.invoke(
                "spaceService.redirectAuthPage",
                space.id
              );
            }}
          >
            登录
            <AiOutlineLink />
          </Link>
        </Alert>
      )}
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
              renameNode: async (node, name) => {
                const newPath = join(dirname(node.path!), name);
                await fileSystemHelper.service.rename(
                  fileSystemHelper.generateFileId(space.id, node.path!),
                  fileSystemHelper.generateFileId(space.id!, newPath)
                );
                // console.log("updateNode:", partialNode);
                treeDataStore.getActions().delete({ id: node.id });
                // console.log("add:",)

                treeDataStore.getActions().add({
                  node: { ...node, id: newPath, path: newPath, name },
                  parentId: dirname(node.path!),
                });
                // fileSystemHelper.createFile(fileSystemHelper.createFileId(space.id,));
              },
            }),
            treePluginAddNode(),
            treePluginDeleteNode({
              deletable: ({ level }) => {
                return level !== 0;
              },
              deleteNode: ({ id, path }: FolderTreeNode) => {
                // console.log("deleteNode:", id);
                treeDataStore.getActions().delete({ id });
                // console.log("nodes:", treeDataStore.getData());
                fileSystemHelper.service.delete(
                  fileSystemHelper.generateFileId(space.id, path!)
                );
              },
            }),
            treePluginConfig({
              rootId: "",
            }),
            treePluginNodeType(),
            treePluginMigration(),
            treePluginRefreshSpaceAuth(),
          ]}
        />
      </Box>
    </SideCard>
  );
};

export default TreeView;
