import { EventKeys } from "@/constants/eventKeys";
import { Tokens } from "@/constants/tokens";
import { ZenmarkEditorComponent } from "@/plugins/features/providers/provide-zenmark-editor/zenmark-editor-component";
import { systemjsModuleService } from "@/services/systemjs-module.service";
import "systemjs/dist/extras/amd";
import "systemjs/dist/system.min";
import { createPlugin } from "xbook/common/createPlugin";
declare global {
  interface Window {
    System: any;
  }
}
// const importFromString = (str: string) => {
//   if (URL.createObjectURL) {
//     const blob = new Blob([str], { type: "text/javascript" });
//     const url = URL.createObjectURL(blob);
//     const module = import(url);
//     URL.revokeObjectURL(url); // GC objectURLs
//     return module;
//   }

//   const url = "data:text/javascript;base64," + btoa(str);
//   return import(url);
// };


export default createPlugin({
  async initilize(xbook) {
    if (!systemjsModuleService.isInitialized()) {
      systemjsModuleService.init();
    }

    xbook.componentService.register("zenmark-editor", ZenmarkEditorComponent);
    const openerService = xbook.serviceBus.createProxy(
      Tokens.OpenerService
    );
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
        title: "文件保存成功",
        duration: 1000,
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
