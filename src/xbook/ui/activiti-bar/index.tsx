import { EventKeys } from "@/constants/eventKeys";
import { Stack } from "@chakra-ui/react";
import { shortcutService } from "xbook/services";
import { eventBus } from "xbook/services/eventBus";
import ActivityItem from "xbook/ui/activiti-bar/components/activity-item";
import { ShortcutItemView } from "xbook/ui/activiti-bar/components/shortcut-item-view";
import { ActivityBarController } from "xbook/ui/activiti-bar/controller";
import { moveItem } from "xbook/ui/components/DragSort";

const crossDirection = (direction: string) => {
  return direction === "row" ? "column" : "row";
};

export const createActivityBar = () => {
  const controller = ActivityBarController.create();
  const View = () => {
    const {
      direction,
      isMobile,
      useVisible,
      options,
      useActivityList,
      setActivityList,
      useActiveId,
      showActivity,
      iconFontSize,
      textFontSize,
      // useShortcutList,
    } = controller;
    const visible = useVisible();
    const activityList = useActivityList();
    const activeId = useActiveId();
    const shortcutList = shortcutService.useShortcutList();

    return (
      <>
        <Stack
          flexFlow={direction}
          justify={isMobile ? "space-around" : "flex-start"}
          minW={"60px"}
          maxW={"64px"}
          overflow={"hidden"}
          className={"activity-bar " + (visible ? "" : "width-collapsed")}
          align="stretch"
          flexShrink={0}
          gap={"0.5rem"}
          {...options}
        >
          {activityList.map((activity, index) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              index={index}
              moveItem={(idx1, idx2) => {
                setActivityList(moveItem(activityList, idx1, idx2));
                eventBus.emit(EventKeys.ActivityBar.DragItem, {
                  prevIndex: idx1,
                  nextIndex: idx2,
                });
              }}
              crossDirection={crossDirection(direction)}
              activeId={activeId}
              showActivity={showActivity}
              iconFontSize={iconFontSize}
              textFontSize={textFontSize}
            />
          ))}
          {!isMobile && <Stack flexGrow={1}></Stack>}
          {shortcutList
            .map((shortcut) => {
              return (
                <ShortcutItemView
                  key={shortcut.id}
                  shortcut={shortcut}
                  direction={direction}
                  iconFontSize={iconFontSize}
                  textFontSize={textFontSize}
                  isMobile={isMobile}
                />
              );
            })}
        </Stack>
      </>
    );
  };
  return {
    instance: <View />,
    proxy: controller,
  };
};
