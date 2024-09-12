import { useGlobalContext } from "@/toolkit/components/context";
import { Action, SafeAny } from "@/toolkit/types";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { FC, ReactNode, forwardRef } from "react";
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
        >
          <Flex  align={"center"} w="100%" mt="1rem">
            <Tooltip label={title}>
              <>
                {typeof title === "string" ? (
                  <Text
                    as="b"
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                    overflow="hidden"
                  >
                    {title}
                  </Text>
                ) : (
                  title
                )}
              </>
            </Tooltip>

            <Box flexGrow={1} />
            <Flex flexGrow={0} flexShrink={0}>
              <MenuButton
                // borderRadius={0}
                as={forwardRef<SafeAny>((props, ref) => (
                  <IconButton
                    ref={ref}
                    aria-label=""
                    size={"sm"}
                    ml="0.2rem"
                    mr="0.2rem"
                    variant={"ghost"}
                    {...props}
                    icon={<AiOutlineSetting />}
                  />
                ))}
                bg="inherit"
              />
            </Flex>
          </Flex>

          {/* <Button  borderRadius={0} className="side-card-header" flexShrink={0}>
        {title}
      </Button> */}
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
              <MenuItem key={a.title} icon={a.icon} {...eventMap}>
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
          // overflowY="auto"
          // className="scroll scroll-7 "
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
