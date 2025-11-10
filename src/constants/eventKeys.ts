import { typedKey } from "@/toolkit/utils/typedKey";
import { SpaceDef } from "@/toolkit/types/space";

export const EventKeys = {
  RequestRedirectAuthPage: typedKey<string>("requestRedirectAuthPage"),
  RequestAuthManage: typedKey<string>("requestAuthManage"),
  Space: {
    SpacesChanged: typedKey<SpaceDef[]>("spaces:changed"),
  },
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
