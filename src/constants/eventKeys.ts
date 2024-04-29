import { typedKey } from "@/toolkit/utils/typedKey";

export const EventKeys = {
  RequestRedirectAuthPage: typedKey<string>("requestRedirectAuthPage"),
  ActivityBar: {
    DragItem: typedKey<{
      prevIndex: number;
      nextIndex: number;
    }>("activityBarDragItem"),
  },
  FileSaved: typedKey("FileSaved"),
};
