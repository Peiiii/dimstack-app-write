import { typedKey } from "@/toolkit/utils/typedKey";

export const EventKeys = {
  RequestRedirectAuthPage: typedKey<string>("requestRedirectAuthPage"),
  RequestAuthManage: typedKey<string>("requestAuthManage"),
  ActivityBar: {
    DragItem: typedKey<{
      prevIndex: number;
      nextIndex: number;
    }>("activityBar:DragItem"),
    ActivityClicked: (id: string) => typedKey(`activity:${id}:clicked`),
  },
  Shortcut: {
    ShortcutClicked: (id: string) => typedKey(`shortcut:${id}:clicked`),
  },
  FileSaved: typedKey("FileSaved"),
  ReadMeFileInitialized: typedKey<{
    spaceId: string
  }>("ReadMeFileInitialized"),
};
