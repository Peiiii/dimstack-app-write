import { Alert, Box, Icon, Link } from "@chakra-ui/react";
import "./sidebar.scss";

import { EventKeys } from "@/constants/eventKeys";
import { Tokens } from "@/constants/tokens";
import { fileSystemHelper } from "@/helpers/file-system.helper";
import { useStateFromRegistry } from "@/helpers/hooks/user-state-from-registry";
import { spaceHelper } from "@/helpers/space.helper";
import SideCard from "@/plugins/space/folderTreeService/components/SideCard";
import { Combobox } from "@/plugins/space/folderTreeService/components/combobox";
import { SpaceTag } from "@/plugins/space/folderTreeService/components/space-tag";
import treePluginAddNode from "@/plugins/space/folderTreeService/plugins/treePluginAddNode";
import treePluginAutoOpenReadme from "@/plugins/space/folderTreeService/plugins/treePluginAutoOpenReadme";
import { treePluginHideDirKeepFile } from "@/plugins/space/folderTreeService/plugins/treePluginHideDirKeepFile";
import treePluginInit from "@/plugins/space/folderTreeService/plugins/treePluginInit";
import treePluginMigration from "@/plugins/space/folderTreeService/plugins/treePluginMigration";
import treePluginNodeType from "@/plugins/space/folderTreeService/plugins/treePluginNodeType";
import treePluginProvideIcons from "@/plugins/space/folderTreeService/plugins/treePluginProvideIcons";
import { treePluginProvideTreeService } from "@/plugins/space/folderTreeService/plugins/treePluginProvideTreeService";
import treePluginRefresh from "@/plugins/space/folderTreeService/plugins/treePluginRefresh";
import treePluginRefreshSpaceAuth from "@/plugins/space/folderTreeService/plugins/treePluginRefreshSpaceAuth";
import { TreeServicePoints } from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import ContextProvider from "@/toolkit/components/context";
import { Tree, WidgetViewState } from "@/toolkit/components/tree";
import {
  treePluginExpandTemplate,
  treePluginInitViewTemplate,
} from "@/toolkit/components/tree/treePlugins";
import { createDataStore } from "@/toolkit/factories/dataStore";
import { createDecoupledServiceBus } from "@/toolkit/factories/serviceBus";
import { createTreeDataStore } from "@/toolkit/factories/treeDataStore";
import { Action } from "@/toolkit/types";
import { SpaceDef } from "@/toolkit/types/space";
import { joinPath } from "@/toolkit/utils/path";
import { dirname } from "path-browserify";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import xbook from "xbook/index";
import { fs } from "xbook/services";
import treePluginClickNode from "./plugins/treePluginClickNode";
import treePluginConfig from "./plugins/treePluginConfig";
import treePluginDeleteNode from "./plugins/treePluginDeleteNode";
import treePluginEditNode from "./plugins/treePluginEditNode";
import { treePluginForIndexedDbSpace } from "@/plugins/space/folderTreeService/plugins/treePluginForIndexedDbSpace";
import treePluginDragAndDrop from "@/plugins/space/folderTreeService/plugins/treePluginDragAndDrop";

const TreeView = ({ space }: { space: SpaceDef }) => {
  const treeDataStore = useMemo(
    () =>
      createTreeDataStore<FolderTreeNode>({
        initialState: {
          name: "文件",
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
  const serviceBus = useMemo(() => createDecoupledServiceBus(), []);
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
  const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
  const treeService = serviceBus.createProxy(TreeServicePoints.TreeService);
  const { hasReadPermission: isLogin } = spaceService.usePermissions(space.id);
  const [pluginsLoaded, setPluginsLoaded] = useState(false);
  useEffect(() => {
    xbook.serviceBus.expose(`space-${space.id}.trigger`, () => {
      treeService.deepRefresh("root");
      treeService.expandNode({ id: "root" });
    });
  }, []);

  useEffect(() => {
    if (isLogin && pluginsLoaded) {
      treeService.deepRefresh("root");
      treeService.expandNode({ id: "root" });
    }
  }, [isLogin, pluginsLoaded]);
  const [actions] = useStateFromRegistry<Action[]>("space.actions", []);
  const spaces = spaceService.useSpaces();
  spaceService.useAutoRefreshAuth(space.id);  
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
          当前平台 {space.platform} 未授权或授权已过期，请
          <Link
            color="blue.300"
            onClick={() => {
              xbook.eventBus.emit(EventKeys.RequestRedirectAuthPage, space.id);
            }}
          >
            点此授权
            <Icon as={AiOutlineLink} />
          </Link>
        </Alert>
      )}
      <SideCard
        title={
          <>
            <Combobox
              options={spaces.map((space) => ({
                value: space.id,
                label: <SpaceTag space={space} />,
                title: `${space.owner}/${space.repo}`,
                data: space,
              }))}
              value={spaceService.getFocusedSpace()?.id}
              onChange={(value) => {
                if (value) {
                  spaceService.focusSpace(value);
                }
              }}
              placeholder="搜索"
            />
          </>
        }
        className="fs-tree-container"
        actions={actions}
      >
        <Box h="0.5rem" flexShrink={0} flexGrow={0} />
        <Box w="100%" className="channel-tree flex-container-limited flex-col">
          <Tree
            serviceBus={serviceBus}
            options={{ space, defaultExpanded: false }}
            dataStore={treeDataStore}
            viewStateStore={viewStateStore}
            onPluginsLoaded={() => setPluginsLoaded(true)}
            plugins={[
              treePluginProvideIcons(),
              treePluginProvideTreeService(),
              treePluginInitViewTemplate<FolderTreeNode>(),
              treePluginExpandTemplate<FolderTreeNode>(),
              treePluginRefresh(),
              treePluginInit(),
              treePluginClickNode(),
              treePluginEditNode({
                editable: ({ level, node }) => {
                  return level !== 0 && node.type === "file";
                },
                renameNode: async (node, name) => {
                  const newPath = joinPath(dirname(node.path!), name);
                  await fs.rename(
                    spaceHelper.getUri(space.id, node.path!),
                    spaceHelper.getUri(space.id, newPath),
                    {
                      overwrite: false,
                    }
                  );
                  treeDataStore.getActions().delete({ id: node.id });
                  const parentPath = dirname(node.path!);
                  const parentId = fileSystemHelper.isRootPath(parentPath)
                    ? "root"
                    : parentPath;
                  treeDataStore.getActions().add({
                    node: { ...node, id: newPath, path: newPath, name },
                    parentId,
                  });
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
              }),
              treePluginConfig({
                rootId: "",
              }),
              treePluginNodeType(),
              treePluginDragAndDrop(),
              treePluginMigration(),
              treePluginRefreshSpaceAuth(),
              treePluginAutoOpenReadme(),
              treePluginHideDirKeepFile(),
              treePluginForIndexedDbSpace(),
            
            ]}
          />
        </Box>
        <Box h="1rem" flexShrink={0} flexGrow={0} />
      </SideCard>
    </ContextProvider>
  );
};

export default TreeView;
