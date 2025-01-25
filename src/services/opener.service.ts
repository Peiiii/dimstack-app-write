import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { device } from "xbook/common/device";
import xbook from "xbook/index";

// type Subscriber = (s: string) => void;
// type Unsubscriber = () => void;
// type FileHandler = {
//   id: string;
//   read(): Promise<string>;
//   write(s: string): Promise<void>;
//   subscribe(subscriber: Subscriber): Unsubscriber;
// };

type FileOpenerOptions = {
  match: string[] | RegExp[] | ((s: string) => boolean);
  priority?: number;
  init(uri: string): void;
};

interface IOpenerService {
  open(spaceId: string, file: FolderTreeNode): Promise<void>;
  register(options: FileOpenerOptions): boolean;
}

export class OpenerService implements IOpenerService {
  private openers: FileOpenerOptions[] = [];

  open = async (spaceId: string, file: FolderTreeNode): Promise<void> => {
    if (!file || !file.path) return;

    const opener = this.openers
      .sort((a, b) => (a.priority || 0) - (b.priority || 0))
      .reverse()
      .find((opener) => this.match(opener, file.path!.split("/").pop()!));

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
  };

  register = (options: FileOpenerOptions): boolean => {
    if (Array.isArray(options) && options.length === 0) return false;
    this.openers.push(options);
    return true;
  };

  private match = (opener: FileOpenerOptions, s: string): boolean => {
    if (typeof opener.match === "function") {
      return opener.match(s);
    } else {
      if (typeof opener.match[0] === "string") {
        return !!(opener.match as string[]).find((m) => s.endsWith(m));
      } else if (opener.match[0] instanceof RegExp) {
        return !!(opener.match as RegExp[]).find((m) => m.test(s));
      }
    }
    return false;
  };
}
