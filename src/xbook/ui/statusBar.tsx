import { Box } from "@chakra-ui/react";
import { ProxiedControls } from "xbook/hooks/proxiedControls";
import { createDeferredComponentProxy } from "xbook/hooks/useDeferredComponentProxy";
import { commandService } from "xbook/services";

export const createStatusBar = () =>
  createDeferredComponentProxy(
    ({ proxy }) => {
      const visibilityControl = ProxiedControls.useVisibilityControl(
        proxy,
        true
      );
      return (
        visibilityControl.visible && (
          <Box
            key="statusBar"
            w="100%"
            flexShrink={0}
            minH={30}
            h={30}
            className="status-bar"
          ></Box>
        )
      );
    },
    (name, func) => {
      commandService.registerCommandWithScope("statusBar", name, func);
    }
  );
