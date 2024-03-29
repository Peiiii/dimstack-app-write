import { Alert, Box, Icon, Link } from "@chakra-ui/react";
import "./sidebar.scss";

import { fileSystemHelper } from "@/helpers/file-system.helper";
import { useStateFromRegistry } from "@/helpers/hooks/user-state-from-registry";
import SideCard from "@/plugins/space/folderTreeService/components/SideCard";
import treePluginAddNode from "@/plugins/space/folderTreeService/plugins/treePluginAddNode";
import treePluginMigration from "@/plugins/space/folderTreeService/plugins/treePluginMigration";
import treePluginNodeType from "@/plugins/space/folderTreeService/plugins/treePluginNodeType";
import treePluginRefreshSpaceAuth from "@/plugins/space/folderTreeService/plugins/treePluginRefreshSpaceAuth";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { createDataStore } from "@/toolkit/common/dataStore";
import { createTreeDataStore } from "@/toolkit/common/treeDataStore";
import { Action } from "@/toolkit/common/types";
import { Tree, WidgetViewState } from "@/toolkit/components/tree";
import {
  treePluginExpandTemplate,
  treePluginInitViewTemplate,
} from "@/toolkit/components/tree/treePlugins";
import { SpaceDef } from "@/toolkit/types/space";
import { dirname, join } from "path-browserify";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import xbook from "xbook/index";
import treePluginClickNode from "./plugins/treePluginClickNode";
import treePluginConfig from "./plugins/treePluginConfig";
import treePluginDeleteNode from "./plugins/treePluginDeleteNode";
import treePluginEditNode from "./plugins/treePluginEditNode";
import ContextProvider from "@/toolkit/components/context";
import treePluginRefresh from "@/plugins/space/folderTreeService/plugins/treePluginRefresh";
import { createServiceBus } from "@/toolkit/common/serviceBus";
import { useAtom } from "@/toolkit/common/hooks/use-atom";
import treePluginInit from "@/plugins/space/folderTreeService/plugins/treePluginInit";

const TreeView = ({ space }: { space: SpaceDef }) => {
  const treeDataStore = useMemo(
    () =>
      createTreeDataStore<FolderTreeNode>({
        initialState: {
          name: "root",
          content: "内容",
          id: "root",
          type: "dir",
          path: "/",
        },
        persistConfig: {
          name: `folderTree:${space.id}`,
          type: "LocalStorage",
        },
      }),
    [space.id]
  );
  const serviceBus = useMemo(() => createServiceBus(), []);
  // console.log("space.id:",space.id,"dataStoreData:", treeDataStore.getData());
  const viewStateStore = useMemo(
    () =>
      createDataStore<WidgetViewState>({
        initialState: [],
        persistConfig: {
          name: `folderTreeViewState:${space.id}`,
          type: "LocalStorage",
        },
      }),
    [space.id]
  );
  const atom = useAtom({ id: `fstree#${space.id}` });

  const [isLogin, setIsLogin] = xbook.cacheService
    .space(atom.id, "localStorage")
    .useLocalStorage("isLogin", true);
  useEffect(() => {
    return xbook.pipeService.on(`space[${space.id}].isLogin`, setIsLogin);
  }, [space.id]);

  useEffect(() => {
    xbook.serviceBus.expose(`space-${space.id}.trigger`, () => {
      serviceBus.invoke("expandNode", "root");
      serviceBus.invoke("refresh", "root");
    });
  }, []);

  const [actions] = useStateFromRegistry<Action[]>("space.actions", []);

  // console.log("actions: ", actions);

  return (
    <ContextProvider space={space}>
      {!isLogin && (
        <Alert
         display={"p"}
          status="warning"
          size={"sm"}
          fontSize={"sm"}
          flexGrow={0}
          flexShrink={0}
          p="10px"
          w="100%"
        >
          此空间未授权，请前往
          <Link
            
            color="blue.300"
            // display={"flex"}
            onClick={() => {
              xbook.serviceBus.invoke(
                "spaceService.redirectAuthPage",
                space.id
              );
            }}
          >
            授权
            <Icon as={AiOutlineLink}/>
          </Link>
        </Alert>
      )}
      <SideCard
        title={`${space.repo}`}
        className="fs-tree-container"
        actions={actions}
      >
        {/* <Box m={2}>
        <Input size="sm" placeholder="搜索" />
      </Box> */}
        {/* <Box h="0.1rem" /> */}

        <Box h="0.5rem" flexShrink={0} flexGrow={0} />
        <Box w="100%" className="channel-tree">
          <Tree
            serviceBus={serviceBus}
            options={{ space }}
            dataStore={treeDataStore}
            viewStateStore={viewStateStore}
            plugins={[
              treePluginInitViewTemplate<FolderTreeNode>(),
              treePluginExpandTemplate<FolderTreeNode>({
                defaultExpanded: false,
              }),
              treePluginRefresh(),
              treePluginInit(),
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
                  const parentPath = dirname(node.path!);
                  const parentId = fileSystemHelper.isRootPath(parentPath)
                    ? "root"
                    : parentPath;
                  console.log("parent:", parentId, parentPath);
                  treeDataStore.getActions().add({
                    node: { ...node, id: newPath, path: newPath, name },
                    parentId,
                  });
                  // fileSystemHelper.createFile(fileSystemHelper.createFileId(space.id,));
                },
              }),
              treePluginAddNode({
                addable: ({ node }) => {
                  return node.id === "root" || node.type === "dir";
                },
              }),
              treePluginDeleteNode({
                deletable: ({ node }) => {
                  return node.type === "file";
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
        <Box h="1rem" flexShrink={0} flexGrow={0} />
      </SideCard>
    </ContextProvider>
  );
};

export default TreeView;
