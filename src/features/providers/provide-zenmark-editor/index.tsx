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
      priority: -100,
      match: [".md", ".markdown", ".MD"],
      init: (uri: string) => {
        xbook.layoutService.pageBox.addPage({
          id: uri,
          title: uri,
          viewData: {
            type: "zenmark-editor",
            props: {
              uri,
            },
          },
        });
      },
    });
    xbook.eventBus.on(EventKeys.FileSaved, () => {
      xbook.notificationService.success({
        title: t("zenmark.fileSaved"),
        duration: 1000,
      });
    });

    xbook.eventBus.on(EventKeys.FileDirty, ({ uri }) => {
      xbook.layoutService.pageBox.updatePage({
        id: uri,
        status: "unsaved",
      });
    });

    xbook.eventBus.on(EventKeys.FileClean, ({ uri }) => {
      xbook.layoutService.pageBox.updatePage({
        id: uri,
        status: undefined,
      });
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
