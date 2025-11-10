import { defineController } from "app-toolkit";
import { FC, ReactNode } from "react";
import { createCustomReactBean } from "rx-bean";
import SplitPane from "xbook/ui/components/split-pane";
import { CacheController, withCache } from "xbook/ui/services/cache-controller";

const cache = CacheController.create({
  scope: "sideResizer",
  storage: "localStorage",
});

export const SideResizerController = defineController(() => {
  const { setLeftHidden, useLeftHidden, getLeftHidden } = createCustomReactBean(
    "LeftHidden",
    false,
    (bean) => {
      withCache(bean, cache);
    }
  );

  return {
    setLeftHidden,
    useLeftHidden,
    getLeftHidden,
  };
});

export const sideResizerController = SideResizerController.create();

export const SideResizer: FC<{
  children: [ReactNode, ReactNode];
}> = ({ children }) => {
  const { useLeftHidden, setLeftHidden, getLeftHidden } = sideResizerController;
  const leftHidden = useLeftHidden();
  return (
    <SplitPane.Horizontal leftHidden={leftHidden}>
      {children}
    </SplitPane.Horizontal>
  );
};

// Direct API for toggling the left pane without global service bus
export const sideResizer = {
  toggleLeft: () =>
    sideResizerController.setLeftHidden(
      !sideResizerController.getLeftHidden()
    ),
};
