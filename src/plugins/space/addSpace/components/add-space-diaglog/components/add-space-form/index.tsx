import { Tokens } from "@/constants/tokens";
import PowerForm, { PowerFormAtom } from "@/toolkit/components/power-form";
import { createAtom } from "@/toolkit/factories/atom";
import { Button, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import xbook from "xbook/index";
import { ModalActionContext } from "xbook/services/modalService";

export const AddSpaceForm = () => {
  const spaceService = xbook.serviceBus.createProxy(Tokens.SpaceService);
  const modal = useContext(ModalActionContext)!;
  const atom: PowerFormAtom<{
    platform: string;
    owner: string;
    repo: string;
  }> = createAtom();

  return (
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
  );
};
