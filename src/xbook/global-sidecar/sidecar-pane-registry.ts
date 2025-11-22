import type { ComponentType } from "react";

export interface GlobalSidecarPaneDefinition {
  id: string;
  title: string;
  description?: string;
  icon?: ComponentType<{ className?: string }>;
  order?: number;
  component: ComponentType<Record<string, unknown>>;
}

const registry = new Map<string, GlobalSidecarPaneDefinition>();
const listeners = new Set<
  (panes: Map<string, GlobalSidecarPaneDefinition>) => void
>();

export const registerGlobalSidecarPane = (
  pane: GlobalSidecarPaneDefinition
) => {
  registry.set(pane.id, pane);
  listeners.forEach((listener) => listener(new Map(registry)));
};

export const unregisterGlobalSidecarPane = (paneId: string) => {
  if (registry.delete(paneId)) {
    listeners.forEach((listener) => listener(new Map(registry)));
  }
};

export const getRegisteredGlobalSidecarPanes = () => new Map(registry);

export const subscribeGlobalSidecarPanes = (
  listener: (panes: Map<string, GlobalSidecarPaneDefinition>) => void
) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
