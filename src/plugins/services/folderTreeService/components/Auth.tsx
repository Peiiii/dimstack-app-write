import { Button, Spacer } from "@chakra-ui/react";
import xbook from "xbook/index";

export default ({ spaceId }) => {
  return (
    <Spacer>
      <Button
        onClick={() => {
          xbook.serviceBus.invoke("redirectAuthPage", spaceId);
        }}
      >
        登录Gitee
      </Button>
    </Spacer>
  );
};
