import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import IframeOpener from "@/plugins/services/openerService/IframeOpener";
import { createPlugin } from "xbook/common/createPlugin";
import { device } from "xbook/common/device";
type Subscriber = (s: string) => void;
type Unsubscriber = () => void;
type FileHandler = {
  id: string;
  read(): Promise<string>;
  write(s: string): Promise<void>;
  subscribe(subscriber: Subscriber): Unsubscriber;
};
type FileOpenerOptions = {
  match: string[] | RegExp[] | ((s: string) => boolean);
  init(fid: string): void;
};
const openers: FileOpenerOptions[] = [];
const match = (opener: FileOpenerOptions, s: string) => {
  if (typeof opener.match === "function") {
    return opener.match(s);
  } else {
    if (typeof opener.match[0] === "string") {
      return !!(opener.match as string[]).find((m) => s.endsWith(m));
    } else if (opener.match[0] instanceof RegExp) {
      return !!(opener.match as RegExp[]).find((m) => m.test(s));
    }
  }
};
export default createPlugin({
  addComponents() {
    return {
      IframeOpener,
    };
  },
  addServices(xbook) {
    return [
      "openerService",
      {
        open: async (spaceId: string, file: FolderTreeNode) => {
          if (!file || !file.path) return;
          const opener = openers.find((opener) =>
            match(opener, file.path!.split("/").pop()!)
          );
          if (opener) {
            opener.init(
              await xbook.serviceBus.invoke(
                "fileSystemService.open",
                spaceId,
                file.path!
              )
            );
            if (device.isMobile())
              xbook.commandService.executeCommand("client:toggleHome");
          }
          // if (file.path?.endsWith(".md")) {
          //   xbook.layoutService.pageBox.addPage({
          //     id: file.path,
          //     title: file.name,
          //     viewData: {
          //       type: "IframeOpener",
          //       props: {
          //         url: import.meta.env.DEV
          //           ? "http://localhost:3000"
          //           : "https://apps.eiooie.com/tiptap-editor/",
          //         path: file.path,
          //         spaceId,
          //       },
          //     },
          //   });
          // }
        },
        register: (options: FileOpenerOptions) => {
          if (Array.isArray(options) && options.length === 0) return false;
          openers.push(options);
          return true;
        },
      },
    ];
  },
});
