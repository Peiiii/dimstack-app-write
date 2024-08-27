import { Tokens } from "@/constants/tokens";
import { fileSystemHelper } from "@/helpers/file-system.helper";
import { spaceHelper } from "@/helpers/space.helper";
import {
  TreeEventKeys,
  TreeNodeTypeEnum,
} from "@/plugins/space/folderTreeService/tokens";
import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { getNodeType } from "@/plugins/space/folderTreeService/utils";
import { WidgetContext, WidgetViewState } from "@/toolkit/components/tree";
import { getBaseTreeServiceClass } from "@/toolkit/components/tree/tree.service";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";
import { SpaceDef } from "@/toolkit/types/space";
import { FileType } from "@/toolkit/vscode/file-system";
import xbook from "xbook/index";

export const createTreeService = (
  context: WidgetContext<TreeDataNode<FolderTreeNode>>
) => {
  const {
    dataStore,
    viewSystem,
    options: { space },
    eventBus,
  } = context;
  const { viewStateStore, getViewStateOrDefaultViewState } = viewSystem;
  const BaseClass = getBaseTreeServiceClass(context);
  class TreeService extends BaseClass {
    getSpace = (): SpaceDef => {
      return space;
    };

    updateViewState = (
      id: string,
      partialViewState: Partial<WidgetViewState>
    ) => {
      viewStateStore.getActions().update({
        ...getViewStateOrDefaultViewState(id),
        ...partialViewState,
      });
    };

    deleteNode = async (node: FolderTreeNode) => {
      const { id, path } = node;
      this.updateViewState(id, { loading: true });
      try {
        await xbook.fs.delete(spaceHelper.getUri(space.id, path!));
        dataStore.getActions().delete({ id });
      } catch (e) {
      } finally {
        if (viewStateStore.getRecord(id)) {
          this.updateViewState(id, { loading: false });
        }
      }
      // 如果父节点下没有子节点了，刷新祖父节点，因为父节点可能已经被删除
      const parentNode = this.findParentNode(path!);
      if (parentNode && parentNode.children?.length === 0) {
        const grandParentNode = this.findParentNode(parentNode.path!);
        if (grandParentNode) {
          this.deepRefresh(grandParentNode.id);
        }
      }
    };

    getNodeIdFromPath = (path: string) => {
      if (path === "/" || path === "") return "root";
      return path;
    };

    findParentNode = (path: string) => {
      const pathNodes = this.findPathNodes(path, dataStore.getData());
      return pathNodes?.[pathNodes.length - 1];
    };

    findPathNodes = (
      targetPath: string,
      root?: TreeDataNode<FolderTreeNode>
    ) => {
      const nodes: any[] = [];
      root = root || dataStore.getData();
      const parts = targetPath.split("/").filter((x) => x);
      let currentNode = root;
      nodes.push(currentNode);
      let prevPath = "";
      const joinPath = (a: string, b: string) => {
        return [a, b].filter((x) => x).join("/");
      };
      const samePath = (a: string, b: string) => {
        // slash
        // slash slash
        [a, b] = [a, b].map((x) => (x.endsWith("/") ? x.slice(0, -1) : x));
        // start slash
        [a, b] = [a, b].map((x) => (x.startsWith("/") ? x.slice(1) : x));
        return a === b;
      };
      for (const key of parts) {
        const currentPath = joinPath(prevPath, key);
        console.log("key:", key, "currentPath:", currentPath);

        if (samePath(currentPath, targetPath)) {
          break;
        }
        if (!currentNode.children) {
          return undefined;
        }
        for (const node of currentNode.children) {
          if (samePath(node.path!, currentPath)) {
            nodes.push(node);
            currentNode = node;
            prevPath = currentPath;
            break;
          }
        }
      }
      return nodes;
    };

    /** 暂未使用 */
    shallowRefresh = async (id: string) => {
      const node = dataStore.getNode(id)!;
      const oldNode = dataStore.getNode(node.id)!;

     this.updateViewState(id, { loading: true });
      const uri = spaceHelper.getUri(
        space.id,
        node.id === "root" ? "/" : node.path!
      );
      const info = await xbook.fs.readDirectory(uri);
      this.updateViewState(id, { loading: false });

      console.log("readDirectory:", id, info);

      let parentPath = node.id === "root" ? "/" : node.path!;
      parentPath = parentPath.endsWith("/") ? parentPath : parentPath + "/";

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

      dataStore.getActions().update({
        node: {
          ...node,
          children: dirInfo
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

    readTreeReferToViewState = async (
      spaceId: string,
      node: TreeDataNode<FolderTreeNode>
    ): Promise<TreeDataNode<FolderTreeNode>> => {
      const oldNode = dataStore.getNode(node.id)!;
      const viewState = viewStateStore.getData().find((v) => v.id === node.id);
      if (!viewState || !viewState.expanded) return node;

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
      // viewStateStore.getActions().update({
      //   ...viewState,
      //   loading: false,
      // });
      this.updateViewState(node.id, { loading: false });

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
                ? this.readTreeReferToViewState(spaceId, child)
                : child
            )
        ),
      };
    };

    deepRefresh = async (id: string) => {
      const node = dataStore.getNode(id)!;
      const updatedNode = await this.readTreeReferToViewState(space.id, node);
      dataStore.getActions().update({ node: updatedNode });
      eventBus.emit(TreeEventKeys.NodeContentLoaded, {
        node: updatedNode,
      });
    };

    focusNode = (id: string) => {
      const node = dataStore.getNode(id)!;
      if (getNodeType(node) === TreeNodeTypeEnum.File) {
        viewSystem.viewStateStore.getActions().reduce((data) => {
          data = data.map((item) => ({ ...item, highlight: false }));
          const item = data.find((item) => item.id === node.id);
          if (item) {
            item.highlight = true;
          } else {
            data.push({
              ...viewSystem.getViewStateOrDefaultViewState(node.id),
              highlight: true,
            });
          }
          return data;
        });
        const pathNodes = this.findPathNodes(node.id, dataStore.getData());
        if (pathNodes) {
          viewSystem.viewStateStore.getActions().reduce((data) => {
            for (const node of pathNodes) {
              const item = data.find((item) => item.id === node.id);
              if (item) {
                item.expanded = true;
              } else {
                data.push({
                  ...viewSystem.getViewStateOrDefaultViewState(node),
                  expanded: true,
                });
              }
            }
            return data;
          });
        }
      }
    };

    openNode = (id: string) => {
      const node = dataStore.getNode(id)!;
      const openerService = xbook.serviceBus.createProxy(Tokens.OpenerService);
      openerService.open(space.id, node);
    };

    getReadMeFileNode = () => {
      const rootNode = dataStore.getData();
      if (!rootNode || !rootNode.children) {
        return;
      }

      // 在根目录下查找 README 文件
      const readmeFile = rootNode.children.find(
        (node) =>
          node.type === TreeNodeTypeEnum.File &&
          node.name.toLowerCase() === "readme.md"
      );

      return readmeFile;
    };

    validateForEditingName = ({
      name: tryName,
      parentNode,
      node,
    }: {
      name: string;
      parentNode?: TreeDataNode<FolderTreeNode>;
      node: TreeDataNode<FolderTreeNode>;
    }) => {
      const result = {
        hasError: false,
        message: "",
      };
      if (parentNode) {
        const exist = parentNode.children?.find((n) => n.name === tryName);
        if (exist && exist.id !== node.id) {
          result.hasError = true;
          result.message = "名称已存在";
        } else {
          result.hasError = false;
        }
      }
      return result;
    };
  }
  return new TreeService();
};

export type ITreeService = ReturnType<typeof createTreeService>;
