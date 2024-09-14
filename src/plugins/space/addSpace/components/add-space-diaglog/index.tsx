import { AddSpaceBySelect } from "@/plugins/space/addSpace/components/add-space-diaglog/components/add-space-by-select";
import { AddSpaceForm } from "@/plugins/space/addSpace/components/add-space-diaglog/components/add-space-form";
import { AddSpaceFromUrl } from "@/plugins/space/addSpace/components/add-space-diaglog/components/add-space-from-url";
import PageBox from "@/toolkit/components/page-box";
import { Alert, AlertIcon } from "@chakra-ui/react";

export const AddSpaceDialog = () => {
  const pageBox = (
    <PageBox
      defaultActivePath="/"
      config={{
        id: "root",
        children: [
          {
            id: "selectRepo",
            title: "选择账号下仓库",
            height: "320px",
            view: <AddSpaceBySelect />,
          },
          {
            id: "addFromUrl",
            title: "从URL添加",
            height: "320px",
            view: <AddSpaceFromUrl />,
          },
          {
            id: "custom",
            title: "指定所有者和仓库",
            height: "320px",
            view: <AddSpaceForm />,
          },
        ],
      }}
    />
  );
  return (
    <>
      <Alert status="info">
        <AlertIcon />
        1.
        您可以将Gitee/Github仓库添加为空间，添加后，还需进行授权的操作才可正常使用。
        <br />
        2.
        授权后，如果是你的仓库，你可以对仓库进行编辑。如果是别人的仓库，你只能查看。
        <br />
        3. 编辑文件后，可以通过快捷键Ctrl+S或Cmd+S保存文件。
      </Alert>
      {pageBox}
    </>
  );
};
