import { AnyFunction, SafeAny } from "@/toolkit/common/types";
import React from "react";
import { useEffect, useState } from "react";
import { cacheService, commandService } from "xbook/services";

export type WidgetConfiguration<T> = {
  id: string;
  reactNode: React.ReactNode;
  commands?: string[];
  handle?: T;
};

export type Widget = {
  reactNode: React.ReactNode;
  hide(): void;
  show(): void;
  toggle(): void;
  discard(): void;
  createReactNode(): React.ReactNode;
  [commandName: string]: AnyFunction | React.ReactNode | SafeAny;
};

export type WidgetSpec = Record<
  Exclude<
    string,
    "reactNode" | "hide" | "show" | "toggle" | "discard" | "createReactNode"
  >,
  AnyFunction
>;
export const createWidget = <T extends WidgetSpec>(
  config: WidgetConfiguration<T>
) => {
  let alive = true;
  const { reactNode, id, commands = [], handle } = config;
  const Commands = {
    hide: id + ".hide",
    show: id + ".show",
    toggle: id + ".toggle",
    discard: id + ".discard",
  };
  const discard = () => (alive = false);

  commandService.registerCommandWithScope(id, {
    discard,
  });
  const C = React.memo(() => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
      cacheService.space(id, "localStorage").set("visible", visible);
    }, [visible]);
    useEffect(() => {
      const hide = () => setVisible(false);
      const show = () => setVisible(true);
      const toggle = () => setVisible(!visible);
      commandService.registerCommandWithScope(id, { hide, show, toggle });
    }, [visible, setVisible]);
    return <>{visible && reactNode}</>;
  });
  const newReactNode = <C />;
  const createReactNode = () => {
    if (alive) return <C />;
    else return null;
  };
  const hide = () => commandService.executeCommandOnReady(Commands.hide);
  const show = () => commandService.executeCommandOnReady(Commands.show);
  const toggle = () => commandService.executeCommandOnReady(Commands.toggle);
  const commandExecutor = {} as {
    [key: (typeof commands)[number]]: AnyFunction;
  };
  for (const command of commands) {
    commandExecutor[command] = (...args) =>
      commandService.executeCommandOnReady(id + "." + command, ...args);
  }
  const R: Widget & T = {
    reactNode: newReactNode,
    hide,
    show,
    toggle,
    discard,
    createReactNode,
  } as never;
  const handler: ProxyHandler<Widget & T> = {
    get(target, p: string) {
      if (typeof target[p] !== "undefined") {
        return target[p];
      } else if (commandExecutor && typeof commandExecutor[p] !== "undefined") {
        return commandExecutor[p];
      } else if (handle) {
        return handle[p];
      } else {
        throw new Error("No property named " + p);
      }
    },
  };
  return new Proxy(R, handler);
};
