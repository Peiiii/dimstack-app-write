import { DataStore } from "@/toolkit/common/dataStore";
import { createPlugin } from "@/toolkit/common/plugin";
import { createModalForm } from "@/toolkit/components/modalForm";
import { SpaceDef } from "@/toolkit/types/space";
import { AiOutlineLogin, AiOutlinePlayCircle, AiOutlinePlus, AiOutlinePlusCircle } from "react-icons/ai";

export const addGiteeSpace = createPlugin({
  initilize(xbook) {
    const id = "addGiteeRepo";
    xbook.layoutService.activityBar.addShortcut({
      id,
      icon: AiOutlinePlusCircle,
      name: "添加",
    });
    xbook.eventBus.on(`shortcut:${id}:clicked`, () => {
      const modal = createModalForm({
        title: "添加",
        fieldList: [
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
        ],
        defaultData: {
          platform: "gitee",
        },
        onFinish: (data) => {
          // console.log(data);
          xbook.notificationService.success("成功添加空间");
          const spaceStore = xbook.registry.get(
            "spaceStore"
          ) as DataStore<SpaceDef>;
          const id = `${data.platform}:${data.owner}:${data.repo}`;
          spaceStore.getActions().upsert({ ...data, id });
        },
      });
      modal.open();
    });
  },
});
