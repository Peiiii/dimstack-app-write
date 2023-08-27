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
import { device } from "xbook/common/device";
import { ProxiedControls } from "xbook/hooks/proxiedControls";
import { createDeferredComponentProxy } from "xbook/hooks/useDeferredComponentProxy";
import { eventBus } from "xbook/services";
import { cacheService } from "xbook/services/cacheService";
import { commandService } from "xbook/services/commandService";
import { componentService } from "./componentService";
import { AnyFunction, SafeAny } from "xbook/common/types";

type ActivityBarMethods = {
  addActivity(activity: ActivityItem): SafeAny;
  showActivity(id: string): SafeAny;
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
  disabled?: boolean;
};

export type ShortcutItem = {
  id: string;
  name: string;
  icon: React.Component | React.FC;
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

const cache = cacheService.space("activityBar");
export const createActivityBar = () =>
  createDeferredComponentProxy<ActivityBarMethods>(
    ({ proxy }) => {
      const direction = device.isMobile() ? "row" : "column";
      const [activeId, setActiveId] = useLocalStorage(
        "activityBar.activeId",
        ""
      );
      const visibilityControl = ProxiedControls.useVisibilityControl(
        proxy,
        true
      );
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
        const showActivity = () => {};
        const shortcutActions = createCRUDActions(setShortcutList);

        proxy.register({
          addActivity,
          showActivity,
          addShortcut: shortcutActions.add,
          setHighlightActivity,
        });
      }, [activityList, shortcutList, setActivityList, setShortcutList]);

      const crossDirection = (direction: string) => {
        return direction === "row" ? "column" : "row";
      };

      const options = {};
      if (device.isMobile()) {
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
          {visibilityControl.visible && (
            <Stack
              flexFlow={direction}
              justify={device.isMobile() ? "space-around" : "flex-start"}
              minW={"60px"}
              className="activity-bar"
              align="stretch"
              flexShrink={0}
              gap={"0.5rem"}
              {...options}
            >
              {activityList.map((activity) => {
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
                  <Stack
                    direction={crossDirection(direction)}
                    {...props}
                    className={className}
                    key={id}
                    m="0 !important"
                    marginInlineStart={"10px"}
                    justify={"center"}
                    align="center"
                  >
                    <VStack
                      onClick={() => {
                        setActiveId(id);
                        eventBus.emit(`activity:${id}:clicked`);
                      }}
                    >
                      <Icon
                        as={icon as As}
                        fontSize={iconFontSize}
                        title={name}
                      ></Icon>
                      <Text
                        m="0 !important"
                        fontSize={textFontSize}
                        className="activity-text"
                      >
                        {name}
                      </Text>
                    </VStack>
                  </Stack>
                );
              })}
              {!device.isMobile() && <Stack flexGrow={1}></Stack>}
              {shortcutList.map((shortcut) => {
                const { icon, name, id } = shortcut;
                const classList: string[] = ["activity", "shortcut"];
                const className = classList.join(" ");
                const props = {};
                if (crossDirection(direction) === "row") {
                  props["w"] = "100%";
                } else {
                  props["h"] = "100%";
                }
                return (
                  <Popover
                    key={id}
                    placement={device.isMobile() ? "auto" : "right-end"}
                    isLazy
                  >
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
                      >
                        <VStack
                          onClick={() => {
                            eventBus.emit(`shortcut:${id}:clicked`);
                          }}
                        >
                          <Icon
                            className={className}
                            as={icon as As}
                            fontSize={iconFontSize}
                            title={name}
                          ></Icon>
                          <Text
                            m="0 !important"
                            fontSize={textFontSize}
                            className="shortcut-text"
                          >
                            {name}
                          </Text>
                        </VStack>
                      </Stack>
                    </PopoverTrigger>
                    {/* <Portal>
                      <PopoverContent maxW={"100vw"}>
                        <PopoverArrow />
                        <PopoverBody>
                          {componentService.render({
                            type: `/shortcutPages/${id}`,
                          })}
                        </PopoverBody>
                      </PopoverContent>
                    </Portal> */}
                  </Popover>
                );
              })}
            </Stack>
          )}
        </>
      );
    },
    (name, func) => {
      commandService.registerCommandWithScope("activityBar", name, func);
    }
  );
