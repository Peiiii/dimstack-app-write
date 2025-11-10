import { Box, Button } from "@chakra-ui/react";
import { spaceService } from "@/services/space.service";

export default ({ spaceId }) => {
  return (
    <Box p="1rem">
      <Button
        onClick={() => {
          spaceService.redirectAuthPage(spaceId);
        }}
      >
        登录Gitee
      </Button>
    </Box>
  );
};
