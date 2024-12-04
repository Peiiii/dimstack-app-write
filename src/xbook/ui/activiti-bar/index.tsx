import { shortcutService } from "xbook/services";
import { ActivityBarController } from "./controller";
import { ModernActivityBar } from "./components/modern-activity-bar";
import { moveItem } from "xbook/ui/components/DragSort";

export const createActivityBar = () => {
  const controller = ActivityBarController.create();
  
  const View = () => {
    const {
      useVisible,
      useActivityList,
      setActivityList,
      useActiveId,
      showActivity,
      useExpanded,
      toggleExpanded,
    } = controller;

    const visible = useVisible();
    const activityList = useActivityList();
    const activeId = useActiveId();
    const isExpanded = useExpanded();
    const shortcutList = shortcutService.useShortcutList();

    if (!visible) return null;

    return (
      <ModernActivityBar
        activities={activityList}
        shortcuts={shortcutList}
        isExpanded={isExpanded}
        activeId={activeId}
        onToggleExpand={toggleExpanded}
        onActivityClick={showActivity}
        onMoveActivity={(fromIndex, toIndex) => {
          setActivityList(moveItem(activityList, fromIndex, toIndex));
        }}
      />
    );
  };

  return {
    instance: <View />,
    proxy: controller,
  };
};
