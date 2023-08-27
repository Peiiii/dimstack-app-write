import { Button, HStack, VStack, Text, Box } from "@chakra-ui/react";
export default ({ title, children, className = "" }) => {
  return (
    <VStack
      className={["side-card", className].join(" ")}
      w="100%"
      h="100%"
      overflow={"hidden"}
      flexShrink={0}
    >
      <HStack w="100%" h="3rem" align={"center"} className="side-card-header">
        <Box p="0 1rem">
          <Text as="b">{title}</Text>
        </Box>
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
