import { Box, Button } from "@chakra-ui/react";
import { spaceService } from "@/services/space.service";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default ({ spaceId }) => {
  const { t } = useTranslation();
  const [platform, setPlatform] = useState("Gitee");
  
  useEffect(() => {
    const space = spaceService.getSpace(spaceId);
    if (space) {
      setPlatform(space.platform);
    }
  }, [spaceId]);
  
  return (
    <Box p="1rem">
      <Button
        onClick={() => {
          spaceService.redirectAuthPage(spaceId);
        }}
      >
        {t("space.loginTo", { platform })}
      </Button>
    </Box>
  );
};
