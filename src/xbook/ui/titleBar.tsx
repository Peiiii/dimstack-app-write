import { Box, Flex } from "@chakra-ui/react";
import { ProxiedControls } from "xbook/hooks/proxiedControls";
import { createDeferredComponentProxy } from "xbook/hooks/useDeferredComponentProxy";
import { commandService } from "xbook/services/commandService";
import { GitaryBrand } from "@/components/gitary-brand";

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
            px={4}
            borderBottom="1px solid"
            borderColor="gray.200"
            _dark={{ borderColor: "gray.700" }}
            bg="gray.50"
            _dark={{ bg: "gray.900" }}
          >
            <Flex h="100%" align="center">
              <GitaryBrand showLogo={true} showName={true} size="sm" />
            </Flex>
          </Box>
        )
      );
    },
    (name, func) => {
      commandService.registerCommandWithScope("titleBar", name, func);
    }
  );
