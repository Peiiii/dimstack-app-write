import { MenuManager, IMenuItemData } from "./menu-manager";
import { ITreeNodeWithChildren } from "./reactive-tree";

describe("MenuManager", () => {
  let menuManager: MenuManager<IMenuItemData>;
  let rootMenuItem: ITreeNodeWithChildren<IMenuItemData>;

  beforeEach(() => {
    rootMenuItem = {
      id: "root",
      data: {
        order: 0,
        parentId: undefined,
      },
      children: [],
    };
    menuManager = new MenuManager(rootMenuItem);
  });

  test("should create a MenuManager instance", () => {
    expect(menuManager).toBeInstanceOf(MenuManager);
  });

  test("should add menu items", () => {
    const items = [
      { id: "item1", data: { order: 2, parentId: "root" } },
      { id: "item2", data: { order: 1, parentId: "root" } },
      { id: "item3", data: { order: 3, parentId: "root" } },
    ];

    menuManager.addMenuItems(items);

    const rootTree = menuManager.getRootMenuTree();
    expect(rootTree.children).toHaveLength(3);
    expect(rootTree.children?.[0].id).toBe("item2");
    expect(rootTree.children?.[1].id).toBe("item1");
    expect(rootTree.children?.[2].id).toBe("item3");
  });

  test("should throw error when adding items without parentId", () => {
    const items = [{ id: "item1", data: { order: 1, parentId: undefined } }];

    expect(() => menuManager.addMenuItems(items)).toThrow(
      "Invalid menu item: parentId is required."
    );
  });

  test("should add menu tree", () => {
    const subTree: ITreeNodeWithChildren<IMenuItemData> = {
      id: "subTree",
      data: { order: 1, parentId: "root" },
      children: [
        { id: "subItem1", data: { order: 2, parentId: "subTree" } },
        { id: "subItem2", data: { order: 1, parentId: "subTree" } },
      ],
    };

    menuManager.addMenuTree(subTree);

    const rootTree = menuManager.getRootMenuTree();
    expect(rootTree.children).toHaveLength(1);
    expect(rootTree.children?.[0].id).toBe("subTree");
    expect(rootTree.children?.[0].children).toHaveLength(2);
    expect(rootTree.children?.[0].children?.[0].id).toBe("subItem2");
    expect(rootTree.children?.[0].children?.[1].id).toBe("subItem1");
  });

  test("should update menu item", () => {
    menuManager.addMenuItems([
      { id: "item1", data: { order: 1, parentId: "root" } },
    ]);

    menuManager.updateMenuItem({
      id: "item1",
      data: { order: 2, parentId: "root" },
    });

    const updatedItem = menuManager.getMenuItem("item1");
    expect(updatedItem?.data.order).toBe(2);
  });

  test("should remove menu item", () => {
    menuManager.addMenuItems([
      { id: "item1", data: { order: 1, parentId: "root" } },
    ]);

    menuManager.removeMenuItem("item1");

    const removedItem = menuManager.getMenuItem("item1");
    expect(removedItem).toBeUndefined();
  });

  test("should get menu item observable", (done) => {
    menuManager.addMenuItems([
      { id: "item1", data: { order: 1, parentId: "root" } },
    ]);

    const observable = menuManager.getMenuItemObservable("item1", {
      emitCurrentValueOnSubscribe: true,
    });
    observable.subscribe((item) => {
      expect(item?.id).toBe("item1");
      done();
    });
  });

  test("should get children ids observable", (done) => {
    menuManager.addMenuItems([
      { id: "item1", data: { order: 1, parentId: "root" } },
      { id: "item2", data: { order: 2, parentId: "root" } },
    ]);

    const observable = menuManager.getChildrenIdsObservable("root", {
      emitCurrentValueOnSubscribe: true,
    });
    observable.subscribe((ids) => {
      expect(ids).toEqual(["item1", "item2"]);
      done();
    });
  });
});
