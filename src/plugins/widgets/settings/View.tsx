import { Box, Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import store from "./store";

export default () => {
  const settingEntries = store.useData();
  console.log(settingEntries);
  return (
    <>
      <VStack w="100%">
        {settingEntries.map((entry) => {
          const {
            id,
            name,
            description,
            icon,
            menuItems,
            widget: Wedget,
          } = entry;

          return (
            <HStack w="100%" key={id}>
              <Flex alignItems={"center"}>
                {icon && <Icon as={icon as any} />}
              </Flex>
              <Box>
                <Text whiteSpace={"nowrap"}>{name}</Text>
              </Box>
              {Wedget && <Box>{<Wedget />}</Box>}
              {/* <Box flexGrow={1}></Box> */}
              {/* <Box>{description}</Box> */}
            </HStack>
          );
        })}
      </VStack>
    </>
  );
};
