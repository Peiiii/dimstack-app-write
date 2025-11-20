import { FolderTreeNode } from "@/plugins/space/folderTreeService/types";
import { spaceHelper } from "@/helpers/space.helper";
import { device } from "xbook/common/device";
import xbook from "xbook/index";

export type FileTemplateInitialContent =
  | string
  | Uint8Array
  | (() => string | Uint8Array | Promise<string | Uint8Array>);

export type FileTemplate = {
  /**
   * Unique id of this template under a given opener.
   */
  id: string;
  /**
   * Label used in UI menus, e.g. "New Excalidraw canvas".
   */
  label: string;
  /**
   * Default file name when creating this template.
   * Users can still rename before creation.
   */
  defaultFileName: string;
  /**
   * Optional initial file content.
   * If omitted, an empty file will be created.
   */
  initialContent?: FileTemplateInitialContent;
  /**
   * Optional icon id for menus.
   */
  icon?: string;
};

export type FileOpenerOptions = {
  /**
   * Unique id of this opener. Used for "Open With XXX" style actions.
   * Convention: reuse the component/view id when possible, e.g. "zenmark-editor".
   */
  id: string;
  /**
   * Human readable label, e.g. "Zenmark Editor".
   */
  label?: string;
  /**
   * Optional icon id for use in menus (renderer key).
   */
  icon?: string;
  /**
   * Whether this opener should appear as a dedicated "Open with ..." entry
   * in file tree/context menus.
   */
  showInTreeMenu?: boolean;
  /**
   * Optional file templates which can be used to create new files
   * from the folder tree "add" menu.
   */
  templates?: FileTemplate[];
  match: string[] | RegExp[] | ((s: string) => boolean);
  priority?: number;
  init(uri: string): void;
};

interface IOpenerService {
  /**
   * Open with the highest-priority opener that matches the file.
   */
  open(spaceId: string, file: FolderTreeNode): Promise<void>;
  /**
   * Open using a specific opener (if it matches the file).
   */
  openWith(
    spaceId: string,
    file: FolderTreeNode,
    openerId: string
  ): Promise<void>;
  /**
   * Register a new opener.
   */
  register(options: FileOpenerOptions): boolean;
  /**
   * List all registered openers.
   */
  getOpeners(): FileOpenerOptions[];
  /**
   * List all openers that match a file name, ordered by priority (desc).
   */
  getMatchedOpeners(fileName: string): FileOpenerOptions[];
  /**
   * Subscribe to newly registered openers. Returns an unsubscribe fn.
   */
  subscribe(listener: (opener: FileOpenerOptions) => void): () => void;
}

export class OpenerService implements IOpenerService {
  private openers: FileOpenerOptions[] = [];
  private listeners: ((opener: FileOpenerOptions) => void)[] = [];

  open = async (spaceId: string, file: FolderTreeNode): Promise<void> => {
    if (!file || !file.path) return;

    const fileName = file.path!.split("/").pop()!;
    const opener = this.getMatchedOpeners(fileName)[0];

    if (opener) {
      const uri = spaceHelper.getUri(spaceId, file.path!).toString();
      opener.init(uri);
      if (device.isMobile())
        xbook.commandService.executeCommand("client:toggleHome");
    }
  };

  openWith = async (
    spaceId: string,
    file: FolderTreeNode,
    openerId: string
  ): Promise<void> => {
    if (!file || !file.path) return;
    const opener = this.openers.find((o) => o.id === openerId);
    if (!opener) return;

    const fileName = file.path!.split("/").pop()!;
    // Respect opener's match rule; if it doesn't match, do nothing.
    if (!this.match(opener, fileName)) return;

    const uri = spaceHelper.getUri(spaceId, file.path!).toString();
    opener.init(uri);
    if (device.isMobile())
      xbook.commandService.executeCommand("client:toggleHome");
  };

  register = (options: FileOpenerOptions): boolean => {
    if (!options.id) return false;
    // Avoid accidental duplicate ids; latest registration wins.
    this.openers = this.openers.filter((o) => o.id !== options.id);
    this.openers.push(options);
    // Notify listeners about the new/updated opener
    for (const listener of this.listeners) {
      listener(options);
    }
    return true;
  };

  getOpeners = (): FileOpenerOptions[] => {
    return [...this.openers];
  };

  getMatchedOpeners = (fileName: string): FileOpenerOptions[] => {
    return this.openers
      .filter((opener) => this.match(opener, fileName))
      .sort((a, b) => (b.priority || 0) - (a.priority || 0));
  };

  subscribe = (listener: (opener: FileOpenerOptions) => void): (() => void) => {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
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

// Export a single, shared instance for direct imports.
export const openerService = new OpenerService();
