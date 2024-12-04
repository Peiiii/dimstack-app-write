import { useGlobalContext } from "@/toolkit/components/context";
import { Action } from "@/toolkit/types";
import {
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  VStack
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import xbook from "xbook/index";

export const SideCard: FC<{
  title: ReactNode;
  className?: string;
  actions: Action[];
  children: ReactNode;
}> = ({ title, children, className = "", actions }) => {
  const context = useGlobalContext();
  return (
    <VStack
      className={["side-card", className].join(" ")}
      w="100%"
      h="100%"
      overflow={"hidden"}
      flexShrink={0}
      gap={0}
    >
      <Menu>
        <HStack
          w="100%"
          h="2.5rem"
          align={"center"}
          flexShrink={0}
          className="header"
          px={4}
          py={2}
          bg="gray.100"
          _dark={{ bg: "gray.800",borderColor: "gray.700"  }}
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Flex align={"center"} w="100%">
            <Tooltip label={title}>
              <>
                {typeof title === "string" ? (
                  <Text
                    as="b"
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                    overflow="hidden"
                    fontSize="lg"
                    color="gray.800"
                    _dark={{ color: "gray.200" }}
                  >
                    {title}
                  </Text>
                ) : (
                  title
                )}
              </>
            </Tooltip>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<AiOutlineSetting />}
              variant="ghost"
              size="sm"
              ml="auto"
              _hover={{ bg: "gray.200", _dark: { bg: "gray.600" } }}
            />
          </Flex>
        </HStack>
        <MenuList zIndex={2}>
          {actions.map((a) => {
            const eventMap = {};
            if (a.events && a.id) {
              a.events.forEach(
                (e) =>
                  (eventMap[`on${e}`] = (event: Event) =>
                    xbook.eventBus.emit(`${a.id}::${e}`, {
                      event: event,
                      context: context,
                    }))
              );
            }

            return (
              <MenuItem
                key={a.title}
                icon={a.icon}
                {...eventMap}
                _hover={{ bg: "gray.100", _dark: { bg: "gray.700" } }}
              >
                {a.title}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      <VStack m="0 !important" w="100%" flexGrow={1} overflow="hidden" gap={0}>
        <VStack
          w="100%"
          height={"100%"}
          overflowX={"hidden"}
          className="flex-container-limited"
          gap={0}
        >
          {children}
        </VStack>
      </VStack>
    </VStack>
  );
};

export default SideCard;
