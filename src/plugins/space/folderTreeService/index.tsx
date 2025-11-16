import { Tokens } from "@/constants/tokens";
import { spaceHelper } from "@/helpers/space.helper";
import { EventKeys } from "@/constants/eventKeys";
import { folderTreeService as folderTreeServiceInstance } from "@/services/folder-tree.service";
import { Action } from "@/toolkit/types";
import { SpaceDef } from "@/toolkit/types/space";
import { Box, HStack, Icon, Link, Stat, Text } from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineInfoCircle } from "react-icons/ai";
import { HiOutlineExternalLink } from "react-icons/hi";
import { createPlugin } from "xbook/common/createPlugin";
import TreeView from "./treeView";
import { t } from "@/i18n/utils";

export const folderTreeService = createPlugin({
  addComponents() {
    return {
      folderTree: (props: { space: SpaceDef }) => {
        return <TreeView {...props} />;
      },
    };
  },
  initilize(xbook) {
    xbook.registry.set<string, Action[]>("space.actions", [
      ...(xbook.registry.get("space.actions") || []),
      {
        id: "space.delete",
        title: t("space.deleteSpace"),
        icon: <AiOutlineDelete />,
        events: ["Click"],
      },
      {
        id: "space.info",
        title: t("space.viewInfo"),
        icon: <AiOutlineInfoCircle />,
        events: ["Click"],
      },
    ]);

    xbook.eventBus.on<{ context: { space: SpaceDef } }>(
      EventKeys.Action.Clicked("space.delete"),
      ({ context }) => {
        spaceHelper.getStore().getActions().delete(context.space.id);
      }
    );

    xbook.eventBus.on<{ context: { space: SpaceDef } }>(
      EventKeys.Action.Clicked("space.info"),
      ({ context }) => {
        const { repo, id, owner, platform } = context.space;
        const url = `https://${platform}.com/${owner}/${repo}`;
        xbook.modalService
          .createModal({
            title: `About ${context.space.repo}`,
          footer: false,
          content: (
            <Box mb="1em">
              <Box>
                <HStack>
                  <Text as="b">Owner</Text>
                </HStack>
                <Text>
                  <Stat>{owner}</Stat>
                </Text>
              </Box>
              <Box>
                <HStack>
                  <Text as="b">Repository</Text>
                </HStack>
                <Text>
                  <Stat>
                    {url}
                    <Link as={"a"} href={url} target="_blank">
                      <Icon as={HiOutlineExternalLink} />
                    </Link>
                  </Stat>
                </Text>
              </Box>
            </Box>
          ),
        })
        .open();
      }
    );

    // Expose the singleton instance for legacy callers still using serviceBus.
    xbook.serviceBus.exposeAt(Tokens.FolderTreeService, folderTreeServiceInstance);
  },
});
