import {
  ITreeNode,
  ITreeNodeWithChildren,
  ReactiveTree,
} from "./reactive-tree";

export interface IMenuItemData {
  order?: number;
  parentId?: string;
  // label: string;
  // icon: string;
  // /**
  //  * 快捷键
  //  */
  // shortcut: string;
  // /**
  //  * 点击后发送的事件
  //  */
  // clickEvent: string;
  // /**
  //  * 子菜单
  //  */
}

export type IMenuItem<T extends IMenuItemData> = ITreeNode<T>;

export type IMenuTree<T extends IMenuItemData> = ITreeNodeWithChildren<T>;

export class MenuManager<T extends IMenuItemData> {
  private tree: ReactiveTree<T>;
  private rootId: string;

  constructor(rootMenuItem: IMenuTree<T>) {
    this.tree = new ReactiveTree<T>(rootMenuItem);
    this.rootId = rootMenuItem.id;
    this.sortSubTree(this.rootId);
  }

  getRootMenuTree = (): IMenuTree<T> => {
    const rootTree = this.getMenuTree(this.rootId)!;
    return {
      ...rootTree,
      children: rootTree.children || [],
    };
  };

  getMenuTree = (id: string) => this.tree.getSubTree(id);

  getMenuItem = (id: string) => this.tree.getNode(id);

  addMenuItems = (items: IMenuItem<T>[]) => {
    // 按照parentId分组
    const groups = items.reduce(
      (acc, item) => {
        const parentId = item.data.parentId;
        const group = acc.find((g) => g.parentId === parentId);
        if (group) {
          group.items.push(item);
        } else {
          acc.push({ parentId, items: [item] });
        }
        return acc;
      },
      [] as {
        parentId: string | undefined;
        items: ITreeNode<T>[];
      }[]
    );

    // 对于每个组分别添加，并排序
    groups.forEach((group) => {
      if (!group.parentId) {
        throw new Error(`Invalid menu item: parentId is required.`);
      }
      this.tree.addNode(group.parentId, ...group.items);
      this.sortChildren(group.parentId);
    });
  };

  private sortChildren = (parentId: string) =>
    this.tree.sortChildren(
      parentId,
      (a, b) =>
        (this.tree.getNode(a)!.data.order ?? Infinity) -
        (this.tree.getNode(b)!.data.order ?? Infinity)
    );

  private sortSubTree = (id: string) => {
    this.tree.sortSubTree(
      id,
      (a, b) =>
        (this.tree.getNode(a)!.data.order ?? Infinity) -
        (this.tree.getNode(b)!.data.order ?? Infinity)
    );
  };

  addMenuTree = (tree: IMenuTree<T>) => {
    this.tree.initSubTree(tree.data.parentId, tree);
    if (tree.data.parentId) this.sortSubTree(tree.data.parentId);
    else this.sortSubTree(tree.id);
  };

  updateMenuItem = (item: IMenuItem<T>) => {
    this.tree.updateNode(item);
    if (item.data.parentId) this.sortChildren(item.data.parentId);
  };

  removeMenuItem = (id: string) => this.tree.removeNode(id);

  getMenuItemObservable = (
    id: string,
    options?: {
      emitCurrentValueOnSubscribe?: boolean;
    }
  ) => this.tree.getNodeObservable(id, options);

  getChildrenIdsObservable = (
    parentId: string,
    options?: {
      emitCurrentValueOnSubscribe?: boolean;
    }
  ) => this.tree.getChildrenIdsObservable(parentId, options);
}
