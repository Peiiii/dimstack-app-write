import { spaceHelper } from "@/helpers/space.helper";
import PageBox from "@/toolkit/components/page-box";
import PowerForm, { PowerFormAtom } from "@/toolkit/components/power-form";
import { createAtom } from "@/toolkit/factories/atom";
import { DataStore } from "@/toolkit/factories/dataStore";
import { SpaceDef } from "@/toolkit/types/space";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createPlugin } from "xbook/common/createPlugin";

const doAddSpace = (xbook, platform: string, owner: string, repo: string) => {
  const spaceStore = xbook.registry.get("spaceStore") as DataStore<SpaceDef>;
  const id = `${platform}:${owner}:${repo}`;
  spaceStore.getActions().upsert({ platform, owner, repo, id });
  xbook.notificationService.success("成功添加空间");
  xbook.serviceBus.invoke(
    "folderTreeService.focus",
    spaceHelper.generateSpaceId(platform, owner, repo)
  );
  setTimeout(() => {
    xbook.serviceBus.invoke(`space-${id}.trigger`);
  }, 100);
};
export const addGiteeSpace = createPlugin({
  initilize(xbook) {
    const id = "addGiteeRepo";
    xbook.layoutService.activityBar.addShortcut({
      id,
      icon: AiOutlinePlusCircle,
      name: "添加",
    });
    xbook.eventBus.on(`shortcut:${id}:clicked`, () => {
      const atom: PowerFormAtom<{
        platform: string;
        owner: string;
        repo: string;
      }> = createAtom();
      let url;
      const pageBox = (
        <PageBox
          defaultActivePath="/"
          config={{
            id: "root",
            // title: "添加空间",
            children: [
              {
                id: "addFromUrl",
                title: "从URL添加",
                height: "320px",
                view: (
                  <>
                    <Text color="gray" wordBreak={"break-all"} mb="1em">
                      请输入你的Gitee仓库链接，例如:{" "}
                      <Text as="a">https://gitee.com/peiiii/docs</Text>
                    </Text>
                    <InputGroup>
                      <Input
                        placeholder="请输入链接"
                        autoFocus
                        onChange={(e) => (url = e.target.value)}
                      />
                      <InputRightAddon
                        onClick={() => {
                          console.log("url:", url);
                          const u = new URL(url);
                          let platform, owner, repo;
                          if (u.hostname === "gitee.com") platform = "gitee";
                          else if (u.hostname === "github.com")
                            platform = "github";
                          [owner, repo] = u.pathname.slice(1).split("/");
                          // if(u.pathname)
                          console.log("path", u.pathname);
                          if (!(platform && owner && repo)) {
                            xbook.notificationService.error(
                              "输入链接格式不符!"
                            );
                          } else {
                            doAddSpace(xbook, platform, owner, repo);
                            modal.close();
                          }
                        }}
                      >
                        一键添加
                      </InputRightAddon>
                    </InputGroup>
                  </>
                ),
              },
              {
                id: "custom",
                title: "自定义添加",
                height: "320px",
                view: (
                  <>
                    <PowerForm<{
                      platform: string;
                      owner: string;
                      repo: string;
                    }>
                      atom={atom}
                      fields={[
                        {
                          name: "platform",
                          title: "平台",
                          select: {
                            options: [
                              { value: "github", label: "GitHub" },
                              { value: "gitee", label: "Gitee" },
                            ],
                          },
                          required: true,
                        },
                        {
                          name: "owner",
                          title: "所有者",
                          required: true,
                        },
                        {
                          name: "repo",
                          title: "仓库名",
                          required: true,
                        },
                      ]}
                      defaultData={{
                        platform: "gitee",
                      }}
                    />
                    <Flex justify={"flex-end"} gap={"1em"}>
                      <Button
                        colorScheme="blue"
                        onClick={() => {
                          const data = atom.invoke("getData");
                          // console.log(data);

                          doAddSpace(
                            xbook,
                            data.platform,
                            data.owner,
                            data.repo
                          );
                          modal.close();
                        }}
                      >
                        创建
                      </Button>
                      <Button onClick={() => modal.close()}>取消</Button>
                    </Flex>
                  </>
                ),
              },
            ],
          }}
        />
      );
      const modal = xbook.modalService.createModal({
        title: "添加空间",
        content: pageBox,
        footer: false,
      });
      modal.open();
    });
    spaceHelper.getStore().on("load", () => {
      if (spaceHelper.getStore().getData().length === 0) {
        xbook.eventBus.emit(`shortcut:${id}:clicked`);
      }
    });
  },
});
