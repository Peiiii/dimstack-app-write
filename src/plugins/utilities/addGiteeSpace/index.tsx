import { createAtom } from "@/toolkit/common/atom";
import { DataStore } from "@/toolkit/common/dataStore";
import { createPlugin } from "@/toolkit/common/plugin";
import { createModalForm } from "@/toolkit/components/modalForm";
import PageBox from "@/toolkit/components/page-box";
import PowerForm, { PowerFormAtom } from "@/toolkit/components/power-form";
import { SpaceDef } from "@/toolkit/types/space";
import {
  Button,
  Card,
  CardFooter,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import {
  AiOutlineLogin,
  AiOutlinePlayCircle,
  AiOutlinePlus,
  AiOutlinePlusCircle,
} from "react-icons/ai";

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
                  <Card>
                    <InputGroup>
                      <Input
                        placeholder="请输入链接"
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
                            const spaceStore = xbook.registry.get(
                              "spaceStore"
                            ) as DataStore<SpaceDef>;
                            const id = `${platform}:${owner}:${repo}`;
                            spaceStore
                              .getActions()
                              .upsert({ platform, owner, repo, id });
                            xbook.notificationService.success("成功添加空间");
                            modal.close();
                          }
                        }}
                      >
                        一键添加
                      </InputRightAddon>
                    </InputGroup>
                  </Card>
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

                          const spaceStore = xbook.registry.get(
                            "spaceStore"
                          ) as DataStore<SpaceDef>;
                          const id = `${data.platform}:${data.owner}:${data.repo}`;
                          spaceStore.getActions().upsert({ ...data, id });
                          xbook.notificationService.success("成功添加空间");
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

      // const modal = createModalForm({
      //   title: "添加",
      //   fieldList: [
      //     {
      //       name: "platform",
      //       title: "平台",
      //       select: {
      //         options: [
      //           { value: "github", label: "GitHub" },
      //           { value: "gitee", label: "Gitee" },
      //         ],
      //       },
      //       required: true,
      //     },
      //     {
      //       name: "owner",
      //       title: "所有者",
      //       required: true,
      //     },
      //     {
      //       name: "repo",
      //       title: "仓库名",
      //       required: true,
      //     },
      //   ],
      //   defaultData: {
      //     platform: "gitee",
      //   },
      //   onFinish: (data) => {
      //     // console.log(data);
      //     xbook.notificationService.success("成功添加空间");
      //     const spaceStore = xbook.registry.get(
      //       "spaceStore"
      //     ) as DataStore<SpaceDef>;
      //     const id = `${data.platform}:${data.owner}:${data.repo}`;
      //     spaceStore.getActions().upsert({ ...data, id });
      //   },
      // });
      modal.open();
    });
  },
});
