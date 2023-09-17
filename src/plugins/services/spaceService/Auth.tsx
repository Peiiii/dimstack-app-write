import { Box, Button, Spacer } from "@chakra-ui/react";
import xbook from "xbook/index";

export default ({ spaceId }) => {
  return (
    <Box p="1rem">
      <Button
        onClick={() => {
          xbook.serviceBus.invoke("redirectAuthPage", spaceId);
        }}
      >
        登录Gitee
      </Button>
    </Box>
  );
};
