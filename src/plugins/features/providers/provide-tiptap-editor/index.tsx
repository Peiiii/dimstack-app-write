import { EventKeys } from "@/constants/eventKeys";
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
    systemjsModuleService
      .load(
        "https://apps.eiooie.com/tiptap-editor/lib/tiptap-editor.umd.js" as any
      )
      .then((module) => module.plugin)
      .then((plugin) => {
        xbook.pluginService.use(plugin);
        xbook.eventBus.on(EventKeys.FileSaved, () => {
          xbook.notificationService.success({
            title: "文件保存成功",
            duration: 1000,
          });
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
