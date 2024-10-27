import {
  EnhancedMenuManager,
  IEnhancedMenuItem,
  IEnhancedMenuItemData,
} from "./enhanced-menu-manager";

describe("EnhancedMenuManager", () => {
  let menuManager: EnhancedMenuManager;

  beforeEach(() => {
    menuManager = new EnhancedMenuManager<IEnhancedMenuItemData>({
      id: "root",
      data: {
        key: "root",
        label: "Root",
        order: 0,
      },
      children: [],
    });
  });

  test("should add menu items", () => {
    const menuItems: IEnhancedMenuItem[] = [
      {
        id: "item1",
        data: {
          key: "item1",
          label: "Item 1",
          order: 1,
          parentId: "root",
        },
      },
      {
        id: "item2",
        data: {
          key: "item2",
          label: "Item 2",
          order: 2,
          parentId: "root",
        },
      },
    ];

    menuManager.addMenuItems(menuItems);

    const rootTree = menuManager.getRootMenuTree();
    expect(rootTree.children?.length).toBe(2);
    expect(rootTree.children?.[0].data.key).toBe("item1");
    expect(rootTree.children?.[1].data.key).toBe("item2");
  });

  test("should sort menu items by order", () => {
    const menuItems: IEnhancedMenuItem[] = [
      {
        id: "item2",
        data: {
          key: "item2",
          label: "Item 2",
          order: 2,
          parentId: "root",
        },
      },
      {
        id: "item1",
        data: {
          key: "item1",
          label: "Item 1",
          order: 1,
          parentId: "root",
        },
      },
    ];

    menuManager.addMenuItems(menuItems);

    const rootTree = menuManager.getRootMenuTree();
    expect(rootTree.children?.[0].data.key).toBe("item1");
    expect(rootTree.children?.[1].data.key).toBe("item2");
  });

  test("should add nested menu items", () => {
    const menuItems: IEnhancedMenuItem[] = [
      {
        id: "parent",
        data: {
          key: "parent",
          label: "Parent",
          order: 1,
          parentId: "root",
        },
      },
      {
        id: "child",
        data: {
          key: "child",
          label: "Child",
          order: 1,
          parentId: "parent",
        },
      },
    ];

    menuManager.addMenuItems(menuItems);

    const rootTree = menuManager.getRootMenuTree();
    expect(rootTree.children?.length).toBe(1);
    expect(rootTree.children?.[0].data.key).toBe("parent");
    expect(rootTree.children?.[0].children?.length).toBe(1);
    expect(rootTree.children?.[0].children?.[0].data.key).toBe("child");
  });

  test("should update menu item", () => {
    const menuItem: IEnhancedMenuItem = {
      id: "item1",
      data: {
        key: "item1",
        label: "Item 1",
        order: 1,
        parentId: "root",
      },
    };

    menuManager.addMenuItems([menuItem]);

    const updatedMenuItem: IEnhancedMenuItem = {
      id: "item1",
      data: {
        key: "item1",
        label: "Updated Item 1",
        order: 2,
        parentId: "root",
      },
    };

    menuManager.updateMenuItem(updatedMenuItem);

    const rootTree = menuManager.getRootMenuTree();
    expect(rootTree.children?.[0].data.label).toBe("Updated Item 1");
    expect(rootTree.children?.[0].data.order).toBe(2);
  });

  test("should remove menu item", () => {
    const menuItem: IEnhancedMenuItem = {
      id: "item1",
      data: {
        key: "item1",
        label: "Item 1",
        order: 1,
        parentId: "root",
      },
    };

    menuManager.addMenuItems([menuItem]);
    menuManager.removeMenuItem("item1");

    const rootTree = menuManager.getRootMenuTree();
    expect(rootTree.children?.length).toBe(0);
  });
});
