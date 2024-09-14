import { Tokens } from "@/constants/tokens";
import {
  Input,
  InputGroup,
  InputRightAddon,
  Link,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { css } from "@emotion/css";
import { Fragment, useContext, useState } from "react";
import xbook from "xbook/index";
import { ModalActionContext } from "xbook/services/modalService";

export const AddSpaceFromUrl = () => {
  const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
  const [url, setUrl] = useState("");
  const modal = useContext(ModalActionContext)!;
  const recommendUrls = [
    "https://gitee.com/liyupi/code-roadmap",
    "https://github.com/ruanyf/weekly",
  ];
  return (
    <>
      <div
        className={css`
          margin-bottom: 1em;
        `}
      >
        <Text color="gray" wordBreak={"break-all"}>
          请输入你的Gitee/Github仓库链接。示例：
        </Text>
        <Wrap>
          {recommendUrls.map((u) => (
            <Fragment key={u}>
              {" "}
              <Text as="a">{u}</Text>
              <Link
                color="blue.500"
                onClick={() => {
                  setUrl(u);
                }}
              >
                填入
              </Link>
            </Fragment>
          ))}
        </Wrap>
      </div>
      <InputGroup>
        <Input
          placeholder="请输入链接"
          autoFocus
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <InputRightAddon
          onClick={() => {
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
