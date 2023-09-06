import {
  Button,
  MenuList,
  MenuItem,
  Menu,
  Box,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  Icon,
  PopoverHeader,
  VStack,
  Text,
  Flex,
  HStack,
} from "@chakra-ui/react";
import store from "./store";

export default () => {
  const settingEntries = store.useData();
  console.log(settingEntries);
  return (
    <>
      <VStack w="100%">
        {settingEntries.map((entry) => {
          const { id, name, description,icon, menuItems,widget:Wedget } = entry;

          return (
            <HStack w="100%" key={id}>
              <Flex alignItems={"center"}>{
                icon&&<Icon as={icon as any} />
              }</Flex><Box><Text whiteSpace={"nowrap"}>{name}</Text></Box>{
                Wedget && <Box>{<Wedget/>}</Box>
              }
              {/* <Box flexGrow={1}></Box> */}
              {/* <Box>{description}</Box> */}
            </HStack>
          );
        })}
      </VStack>
    </>
  );
};
