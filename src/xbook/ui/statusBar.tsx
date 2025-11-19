import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { ProxiedControls } from "xbook/hooks/proxiedControls";
import { createDeferredComponentProxy } from "xbook/hooks/useDeferredComponentProxy";
import { commandService } from "xbook/services";
import { GitaryBrand } from "@/components/gitary-brand";

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
            borderTop="1px solid"
            borderColor="gray.200"
            bg="gray.50"
            _dark={{ borderColor: "gray.700", bg: "gray.900" }}
          >
            <Flex
              h="100%"
              align="center"
              justify="space-between"
              px={4}
              fontSize="xs"
              color="gray.600"
              _dark={{ color: "gray.400" }}
            >
              <HStack spacing={2}>
                <GitaryBrand showLogo={true} showName={true} size="sm" />
              </HStack>
              <Text fontSize="xs">Manage your knowledge the Git way</Text>
            </Flex>
          </Box>
        )
      );
    },
    (name, func) => {
      commandService.registerCommandWithScope("statusBar", name, func);
    }
  );
