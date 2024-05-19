import { Tokens } from "@/constants/tokens";
import { spaceHelper } from "@/helpers/space.helper";
import PageBox from "@/toolkit/components/page-box";
import PowerForm, { PowerFormAtom } from "@/toolkit/components/power-form";
import { createAtom } from "@/toolkit/factories/atom";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Link,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createPlugin } from "xbook/common/createPlugin";
import xbook from "xbook/index";
import { ModalActionContext } from "xbook/services/modalService";

const AddSpaceView = () => {
  const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
  const [url, setUrl] = useState("");
  const modal = useContext(ModalActionContext)!;
  const recommendUrls = [
    "https://gitee.com/liyupi/code-roadmap",
    "https://github.com/ruanyf/weekly",
  ];
  return (
    <>
      <Text color="gray" wordBreak={"break-all"} mb="1em">
        请输入你的Gitee仓库链接。示例：
        {recommendUrls.map((u) => (
          <Wrap>
            <Text as="a">{u}</Text>
            <Link
              color="blue.500"
              onClick={() => {
                setUrl(u);
              }}
            >
              填入
            </Link>
          </Wrap>
        ))}
      </Text>
      <InputGroup>
        <Input
          placeholder="请输入链接"
          autoFocus
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <InputRightAddon
          onClick={() => {
            console.log("url:", url);
            const { platform, owner, repo } = spaceService.parseRepoUrl(url);
            if (!(platform && owner && repo)) {
              xbook.notificationService.error("输入链接格式不符!");
            } else {
              spaceService.addSpace(
                {
                  platform,
                  owner,
                  repo,
                },
                {
                  focus: true,
                }
              );
              modal.close();
            }
          }}
        >
          一键添加
        </InputRightAddon>
      </InputGroup>
    </>
  );
};

export const addGiteeSpace = createPlugin({
  initilize(xbook) {
    const id = "addGiteeRepo";
    const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
    xbook.layoutService.activityBar.addShortcut({
      id,
      icon: AiOutlinePlusCircle,
      name: "添加",
      order: 100,
    });
    xbook.eventBus.on(`shortcut:${id}:clicked`, () => {
      const atom: PowerFormAtom<{
        platform: string;
        owner: string;
        repo: string;
      }> = createAtom();
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
                view: <AddSpaceView />,
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

                          spaceService.addSpace(
                            {
                              ...data,
                            },
                            {
                              focus: true,
                            }
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
        width: "600px",
        content: (
          <>
            <Alert status="info">
              <AlertIcon />
              1.
              您可以将gitee仓库添加为空间，添加后，还需进行授权的操作才可正常使用。
              <br />
              2.
              授权后，如果是你的仓库，你可以对仓库进行编辑。如果是别人的仓库，你只能查看。
              <br />
              3. 编辑文件后，可以通过快捷键Ctrl+S或Cmd+S保存文件。
            </Alert>
            {pageBox}
          </>
        ),
        footer: false,
      });
      modal.open();
    });
    spaceHelper.getStore().waitUtilLoaded(() => {
      if (spaceHelper.getStore().getData().length === 0) {
        xbook.eventBus.emit(`shortcut:${id}:clicked`);
      }
    });
  },
});
