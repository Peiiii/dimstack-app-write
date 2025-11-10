import { EventKeys } from "@/constants/eventKeys";
import { SpaceDef } from "@/toolkit/types/space";
import { AiFillFolder } from "react-icons/ai";
import xbook from "xbook/index";

export class FolderTreeService {
  add = (space: SpaceDef) => {
    const { repo, id } = space;
    xbook.componentService.register("AiFillFolder", AiFillFolder);
    xbook.layoutService.sidebar.addView(
      {
        id: id,
        viewData: {
          type: "folderTree",
          props: {
            space,
          },
        },
      },
      true
    );
    xbook.eventBus.on(EventKeys.ActivityBar.ActivityClicked(id), () => {
      xbook.layoutService.sidebar.setView(id);
    });
  };
  focus = (id: string) => {
    xbook.layoutService.activityBar.showActivity(id);
    xbook.layoutService.sidebar.setView(id);
  };
  getCurrentViewId = () => {
    return xbook.layoutService.sidebar.getCurrentView()?.id;
  };
  useCurrentViewId = () => {
    return xbook.layoutService.sidebar.useCurrentView()?.id;
  };
  onCurrentViewIdChanged = (callback: (id: string | undefined) => void) => {
    xbook.layoutService.sidebar.subscribeActiveViewId(callback);
  };
  getCurrentViewId$ = () => xbook.layoutService.sidebar.ActiveViewId$;
  remove = (id: string) => {
    xbook.layoutService.activityBar.removeActivity(id);
    xbook.layoutService.sidebar.removeView(id);
  };
}

// Export a single, shared instance for direct imports.
export const folderTreeService = new FolderTreeService();
