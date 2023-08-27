import { Box } from "@chakra-ui/react";
import { ProxiedControls } from "xbook/hooks/proxiedControls";
import { createDeferredComponentProxy } from "xbook/hooks/useDeferredComponentProxy";
import { commandService } from "xbook/services/commandService";

export const createTitleBar = () =>
  createDeferredComponentProxy(
    ({ proxy }) => {
      const visibilityControl = ProxiedControls.useVisibilityControl(
        proxy,
        true
      );

      return (
        visibilityControl.visible && (
          <Box
            w="100%"
            flexShrink={0}
            className="menu-bar"
            h={35}
            minH={35}
          ></Box>
        )
      );
    },
    (name, func) => {
      commandService.registerCommandWithScope("titleBar", name, func);
    }
  );
