import { Action } from "@/toolkit/common/types";
import { useGlobalContext } from "@/toolkit/components/context";
import {
  Button,
  HStack,
  VStack,
  Text,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  IconButton,
  Tooltip,
  Spacer,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import xbook from "xbook/index";
export const SideCard: FC<{
  title: string;
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
    >
      <HStack
        w="100%"
        h="2.5rem"
        align={"center"}
        flexShrink={0}
        className="header"
      >
        <Flex pl="0.6rem" align={"center"} w="100%">
          <Tooltip label={title}>
            <>
              {/* <AiOutlineHome />
              <Box w="0.3em"/> */}
              <Text
                as="b"
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                overflow="hidden"
              >
                {title}
              </Text>
            </>
          </Tooltip>

          <Box flexGrow={1} />
          <Flex flexGrow={0} flexShrink={0}>
            <Menu>
              <MenuButton
                borderRadius={0}
                as={IconButton}
                icon={<AiOutlineSetting />}
                bg="inherit"
              />
              <MenuList>
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
                  // console.log("eventMap:", eventMap);
                  return (
                    <MenuItem key={a.title} icon={a.icon} {...eventMap}>
                      {a.title}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        {/* <Button  borderRadius={0} className="side-card-header" flexShrink={0}>
        {title}
      </Button> */}
      </HStack>
      <VStack m="0 !important" w="100%" flexGrow={1} overflow="hidden">
        <VStack
          w="100%"
          height={"100%"}
          overflowX={"hidden"}
          overflowY="auto"
          className="scroll scroll-7 "
        >
          {children}
        </VStack>
      </VStack>
    </VStack>
  );
};

export default SideCard;
