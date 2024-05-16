import { EventKeys } from "@/constants/eventKeys";
import { AnyFunction, SafeAny } from "@/toolkit/types";
import {
  As,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { createDeferredComponentProxy } from "xbook/hooks/useDeferredComponentProxy";
import { eventBus } from "xbook/services";
import { cacheService } from "xbook/services/cacheService";
import { commandService } from "xbook/services/commandService";
import { DragSortItem, moveItem } from "xbook/ui/components/DragSort";
import { createShell } from "xbook/ui/shell";
import { componentService } from "./componentService";

type ActivityBarMethods = {
  addActivity(activity: ActivityItem): SafeAny;
  showActivity(id: string): SafeAny;
  removeActivity(id: string): SafeAny;
  setHighlightActivity(id: string): SafeAny;
  toggleActivity(id: string): SafeAny;
  hideActivity(id: string): SafeAny;
  setDirection(direction: string): SafeAny;
  addShortcut(shortcut: ShortcutItem): SafeAny;
  hide(): void;
  show(): void;
  toggle(): void;
};
export type ActivityItem = {
  id: string;
  name: string;
  shortcut?: string;
  icon: React.Component | React.FC;
  isActive?: boolean;
  order?: number;
  disabled?: boolean;
  events?: "click" | "focus" | "blur" | "mouseenter" | "mouseleave";
};

export type ShortcutItem = {
  id: string;
  name: string;
  icon: React.Component | React.FC;
  hasPopover?: boolean;
  order?: number;
};
const createCRUDActions = (setData: AnyFunction, primaryKey: string = "id") => {
  const add = (data, record, _update = false) => {
    if (data.find((rec) => rec[primaryKey] === record[primaryKey])) {
      if (_update) update(data, record);
    } else {
      data.push(record);
      return data.slice();
    }
  };
  const update = (data, record) => {
    const pValue = record[primaryKey];
    const oldRecord = data.find((record) => record[primaryKey] === pValue);
    if (oldRecord) {
      Object.assign(oldRecord, record);
    }
    return data.slice();
  };
  const remove = (data, id) => {
    data.filter((record) => record[primaryKey] !== id);
    return data;
  };

  return {
    add: (record, _update = false) =>
      setData((data) => add(data, record, _update)),
    update: (record) => setData((data) => update(data, record)),
    delete: (id) => setData((data) => remove(data, id)),
  };
};

const crossDirection = (direction: string) => {
  return direction === "row" ? "column" : "row";
};

const cache = cacheService.space("activityBar");
export const createActivityBar = () =>
  createDeferredComponentProxy<ActivityBarMethods>(
    ({ proxy }) => {
      const shell = createShell(proxy, "activityBar");
      // const isMobile = device.isMobile();
      const isMobile = false;
      const direction = isMobile ? "row" : "column";
      const [activeId, setActiveId] = useLocalStorage(
        "activityBar.activeId",
        ""
      );
      const {
        state: visible,
        toggleState: toggle,
        setTrue: show,
        setFalse: hide,
      } = shell.useCachedBoolState("visible", true);
      const [activityList, setActivityList] = cache.useCachedState<
        ActivityItem[]
      >("activityList", []);
      const [shortcutList, setShortcutList] = cache.useCachedState<
        ActivityItem[]
      >("shortcutList", []);

      useEffect(() => {
        const addActivity = (activity) =>
          setActivityList((activityList: ActivityItem[]) => {
            const existActivity = (id) => {
              return activityList.find((activity) => activity.id === id);
            };
            if (existActivity(activity.id)) {
              return activityList;
            }
            if (activity.isActive) {
              activityList.forEach((activity) => {
                activity.isActive = false;
              });
            }

            activityList.push(activity);
            return activityList.slice();
          });

        const setHighlightActivity = (id) => {
          setActiveId(id);
        };
        const showActivity = (id: string) => {
          if (activityList.find((a) => a.id === id)) {
            setActiveId(id);
            eventBus.emit(`activity:${id}:clicked`);
          }
        };
        const removeActivity = (id: string) => {
          const existingActivity = activityList.find((a) => a.id === id);
          const isActive = id === activeId;
          const isOnly = activityList.length === 1;
          setActivityList((as) => as.filter((a) => a.id !== id));
          console.log(
            "id:",
            id,
            "activeId:",
            activeId,
            "isActive:",
            isActive,
            "existingActivity:",
            existingActivity
          );
          if (existingActivity && isActive && !isOnly) {
            console.log(
              "next to show:",
              activityList.filter((a) => a.id !== id)[0].id
            );
            // showActivity(activityList.filter((a) => a.id !== id)[0].id);
            showActivity(activityList.filter((a) => a.id !== id)[0].id);
          }
        };
        const shortcutActions = createCRUDActions(setShortcutList);

        proxy.register({
          addActivity,
          showActivity,
          addShortcut: shortcutActions.add,
          setHighlightActivity,
          show,
          hide,
          toggle,
          removeActivity,
        });
      }, [
        activityList,
        shortcutList,
        setActivityList,
        setShortcutList,
        show,
        hide,
        toggle,
      ]);

      console.log("activeId:", activeId);

      const options = {};
      if (isMobile) {
        options["w"] = "100%";
        options["minH"] = "48px";
        options["p"] = "0.3rem 0.5rem";
      } else {
        options["h"] = "100%";
        options["minW"] = "48px";
        options["p"] = "0.5rem 0";
      }
      const textFontSize = "0.8rem";
      const iconFontSize = "1.5rem";
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
              const { icon, name, id } = activity;
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
                    setActivityList((data) => moveItem(data, idx1, idx2));
                    eventBus.emit(EventKeys.ActivityBar.DragItem, {
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
                        proxy.showActivity(id);
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
                        // textOverflow={"ellipsis"}
                        // textOverflow={"clip"}
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
    },
    (name, func) => {
      commandService.registerCommandWithScope("activityBar", name, func);
    }
  );

export const ShortcutItemView = ({
  direction,
  shortcut,
  isMobile,
  iconFontSize,
  textFontSize,
}: {
  direction: string;
  shortcut: ShortcutItem;
  isMobile?: boolean;
  iconFontSize?: string;
  textFontSize?: string;
}) => {
  const { id, icon, name, hasPopover } = shortcut;
  const props = {};
  if (crossDirection(direction) === "row") {
    props["w"] = "100%";
  } else {
    props["h"] = "100%";
  }
  const classList: string[] = ["activity", "shortcut"];
  // const className = classList.join(" ");

  return hasPopover ? (
    <Popover
      key={id}
      placement={isMobile ? "auto" : "right-end"}
      isLazy
      closeOnBlur={true}
      returnFocusOnClose={true}
    >
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Stack
              direction={crossDirection(direction)}
              {...props}
              className="activity-wrapper shortcut"
              key={id}
              m="0 !important"
              marginInlineStart={"10px"}
              justify={"center"}
              align="center"
              maxW={"100%"}
              overflow={"hidden"}
              onClick={() => {
                // onOpen();
                eventBus.emit(`shortcut:${id}:clicked`);
              }}
            >
              <VStack maxW={"100%"} overflow={"hidden"} gap={0}>
                <Icon
                  // className={className}
                  as={icon as As}
                  fontSize={iconFontSize}
                  title={name}
                ></Icon>
                <Text
                  m="0 !important"
                  fontSize={textFontSize}
                  className="shortcut-text text"
                  maxW={"100%"}
                  overflow={"hidden"}
                  whiteSpace={"nowrap"}
                  textOverflow={"ellipsis"}
                >
                  {name}
                </Text>
              </VStack>
            </Stack>
          </PopoverTrigger>
          <Portal>
            <PopoverContent
              _focus={{
                boxShadow: "none",
              }}
              maxW={"100vw"}
              borderRadius={"4px"}
              onClick={() => {
                onClose();
              }}
            >
              <PopoverArrow />
              <PopoverBody>
                {componentService.render({
                  type: `shortcut:${id}:page`,
                })}
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  ) : (
    <>
      <Stack
        direction={crossDirection(direction)}
        {...props}
        className="activity-wrapper shortcut"
        key={id}
        m="0 !important"
        marginInlineStart={"10px"}
        justify={"center"}
        align="center"
        maxW={"100%"}
        overflow={"hidden"}
        onClick={() => {
          eventBus.emit(`shortcut:${id}:clicked`);
        }}
      >
        <VStack maxW={"100%"} overflow={"hidden"} gap={0}>
          <Icon
            // className={className}
            as={icon as As}
            fontSize={iconFontSize}
            title={name}
          ></Icon>
          <Text
            m="0 !important"
            fontSize={textFontSize}
            className="shortcut-text text"
            maxW={"100%"}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
          >
            {name}
          </Text>
        </VStack>
      </Stack>
    </>
  );
};
