import { typedKey } from "@/toolkit/utils/typedKey";
import { SpaceDef } from "@/toolkit/types/space";

export const EventKeys = {
  RequestRedirectAuthPage: typedKey<string>("requestRedirectAuthPage"),
  Space: {
    SpacesChanged: typedKey<SpaceDef[]>("spaces:changed"),
  },
  ActivityBar: {
    DragItem: typedKey<{
      prevIndex: number;
      nextIndex: number;
    }>("activityBar:DragItem"),
    // No payload required when an activity is clicked
    ActivityClicked: (id: string) => typedKey<void>(`activity:${id}:clicked`),
  },
  Shortcut: {
    // No payload required when a shortcut is clicked
    ShortcutClicked: (id: string) => typedKey<void>(`shortcut:${id}:clicked`),
  },
  FileSaved: typedKey<void>("FileSaved"),
  FileDirty: typedKey<{ uri: string }>("FileDirty"),
  FileClean: typedKey<{ uri: string }>("FileClean"),
  FileLoading: typedKey<{ uri: string }>("FileLoading"),
  FileLoaded: typedKey<{ uri: string }>("FileLoaded"),
  ReadMeFileInitialized: typedKey<{
    spaceId: string
  }>("ReadMeFileInitialized"),
  Action: {
    // Generic action clicked; specify payload type at call-site if needed
    Clicked: <TPayload = unknown>(id: string) =>
      typedKey<TPayload>(`action:${id}:clicked`),
  },
};
