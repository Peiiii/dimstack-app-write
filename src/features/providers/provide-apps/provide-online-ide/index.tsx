import { OnlineReactIde } from "@/components/online-react-ide";
import { openerService } from "@/services/opener.service";
import { AiFillCode } from "react-icons/ai";
import { createPlugin } from "xbook/common/createPlugin";

export const provideReactIDE = createPlugin({
  initilize(xbook) {
    const config = {
      appName: "react-ide",
      title: "React IDE",
      iconName: "code",
      iconComponent: AiFillCode,
      suffix: ".ide.json",
    };
    setTimeout(() => {
      xbook.layoutService.pageBox.addPage({
        id: config.appName,
        title: config.title,
        viewData: {
          type: config.appName,
        },
      });
    });
    xbook.componentService.register(config.appName, OnlineReactIde);
    // Use singleton openerService
    openerService.register({
      match: [config.suffix],
      priority: 100,
      init: (uri) => {
        const getFileName = (uri: string) => {
          return uri.split("/").pop() ?? "unknown";
        };
        console.log("open uri:", uri);
        xbook.layoutService.pageBox.addPage({
          id: `${config.appName}:${uri}`,
          title: `${config.title}:${getFileName(uri)}`,
          viewData: {
            type: config.appName,
            props: { uri },
          },
        });
      },
    });
  },
});
