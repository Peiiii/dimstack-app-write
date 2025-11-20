import { EventKeys } from "@/constants/eventKeys";
import { openerService } from "@/services/opener.service";
import { ZenmarkEditorComponent } from "@/features/providers/provide-zenmark-editor/zenmark-editor-component";
import { createPlugin } from "xbook/common/createPlugin";
import { t } from "@/i18n/utils";


export default createPlugin({
  async initilize(xbook) {
    // Use local zenmark-editor; no SystemJS runtime required
    xbook.componentService.register("zenmark-editor", ZenmarkEditorComponent);
    openerService.register({
      id: "zenmark-editor",
      label: t("apps.zenNotes"),
      // Use markdown-style file icon for ZenNotes markdown editor
      icon: "AiOutlineFileMarkdown",
      showInTreeMenu: true,
      // Higher than generic text viewer so markdown defaults to Zenmark.
      priority: -10,
      match: [".md", ".markdown", ".MD"],
      init: (uri: string) => {
        const pageId = `zenmark-editor:${uri}`;
        xbook.layoutService.pageBox.addPage({
          id: pageId,
          title: uri,
          status: "loading",
          viewData: {
            type: "zenmark-editor",
            props: {
              uri,
            },
          },
        });
        xbook.eventBus.emit(EventKeys.FileLoading, { uri });
      },
    });

    const updatePagesStatusByUri = (
      uri: string,
      status: "deleted" | "loading" | "unsaved" | undefined
    ) => {
      const pageList = xbook.layoutService.pageBox.getPageList?.() || [];
      pageList
        .filter(
          (page) => (page.viewData as any)?.props?.uri === uri
        )
        .forEach((page) => {
          xbook.layoutService.pageBox.updatePage({
            id: page.id,
            status,
          });
        });
    };

    xbook.eventBus.on(EventKeys.FileSaved, () => {
      xbook.notificationService.success({
        title: t("zenmark.fileSaved"),
        duration: 1000,
      });
    });

    xbook.eventBus.on(EventKeys.FileDirty, ({ uri }) => {
      updatePagesStatusByUri(uri, "unsaved");
    });

    xbook.eventBus.on(EventKeys.FileClean, ({ uri }) => {
      updatePagesStatusByUri(uri, undefined);
    });

    xbook.eventBus.on(EventKeys.FileLoaded, ({ uri }) => {
      updatePagesStatusByUri(uri, undefined);
    });

    // xbook.layoutService.activityBar.addActivity({
    //   id: "plugins",
    //   name: "Plugins",
    //   icon: VscExtensions,
    // });
    // xbook.componentService.register("pluginsPanel", () => {
    //   return (
    //     <Card>
    //       <InputGroup>
    //         <Input placeholder="请输入关键词搜索插件" />
    //         <Button colorScheme="blue">搜索</Button>
    //       </InputGroup>
    //     </Card>
    //   );
    // });

    // xbook.eventBus.on(EventKeys.ActivityBar.ActivityClicked("plugins"), () => {
    //   xbook.layoutService.sidebar.addView({
    //     id: "plugins",
    //     viewData: {
    //       type: "pluginsPanel",
    //     },
    //   });
    //   xbook.layoutService.sidebar.setView("plugins");
    // });
  },
});
