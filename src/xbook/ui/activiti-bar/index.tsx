import { As, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import { AiFillFolder, AiOutlineFolder } from "react-icons/ai";
import { eventBus } from "xbook/services/eventBus";
import { ShortcutItemView } from "xbook/ui/activiti-bar/components/shortcut-item-view";
import { ActivityBarController } from "xbook/ui/activiti-bar/controller";
import { DragSortItem, moveItem } from "xbook/ui/components/DragSort";

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
      useShortcutList,
    } = controller;
    const visible = useVisible();
    const activityList = useActivityList();
    const activeId = useActiveId();
    const shortcutList = useShortcutList();

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
          {activityList.map((activity, index) => {
            const { icon = AiFillFolder, name, id } = activity;
            const classList: string[] = ["activity-wrapper", "activity"];
            if (activeId && activeId === id) classList.push("active");
            const className = classList.join(" ");
            const props = {};
            if (crossDirection(direction) === "row") {
              props["w"] = "100%";
            } else {
              props["h"] = "100%";
            }
            return (
              <DragSortItem
                key={id}
                id={id}
                index={index}
                moveItem={(idx1: number, idx2: number) => {
                  setActivityList(moveItem(activityList, idx1, idx2));
                  eventBus.emit("activityBar:DragItem", {
                    prevIndex: idx1,
                    nextIndex: idx2,
                  });
                }}
              >
                <Stack
                  direction={crossDirection(direction)}
                  {...props}
                  className={className}
                  key={id}
                  maxW={"100%"}
                  overflow={"hidden"}
                  m="0 !important"
                  marginInlineStart={"10px"}
                  justify={"center"}
                  align="center"
                >
                  <VStack
                    maxW={"100%"}
                    gap={0}
                    overflow={"hidden"}
                    title={name}
                    onClick={() => {
                      showActivity(id);
                    }}
                  >
                    <Icon
                      className="icon"
                      as={icon as As}
                      fontSize={iconFontSize}
                    ></Icon>
                    <Text
                      m="0 !important"
                      fontSize={textFontSize}
                      className="activity-text text"
                      maxW={"100%"}
                      p="0px 4px"
                      overflow={"hidden"}
                      whiteSpace={"nowrap"}
                    >
                      {name.slice(0, 2).toUpperCase()}
                    </Text>
                  </VStack>
                </Stack>
              </DragSortItem>
            );
          })}
          {!isMobile && <Stack flexGrow={1}></Stack>}
          {shortcutList
            .sort((s) => -(s.order || 0))
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
