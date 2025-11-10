import { spaceService } from "@/services/space.service";
import { Action } from "@/toolkit/types";
import { AiOutlineShareAlt } from "react-icons/ai";
import { createPlugin } from "xbook/common/createPlugin";

const getUrlParams = (search: string) => {
  const params = new URLSearchParams(search);
  return Object.fromEntries(params.entries());
};

const removeUrlParams = (url: string, params: string[]) => {
  const urlObj = new URL(url);
  params.forEach((param) => {
    urlObj.searchParams.delete(param);
  });
  return urlObj.toString();
};

export default createPlugin({
  initilize(xbook) {
    const params = getUrlParams(window.location.search);
    const openRepo = params["openRepo"];
    // Use singleton spaceService
    if (openRepo) {
      const result = spaceService.parseRepoUrl(openRepo);
      if (result.platform && result.owner && result.repo) {
        const space = spaceService.addSpace(result);
        const url = removeUrlParams(window.location.href, ["openRepo"]);
        window.history.replaceState(null, "", url);
        setTimeout(() => {
          spaceService.focusSpace(space.id);
        }, 400);
      }
    }

    const action: Action = {
      id: "shareRepoUrl",
      icon: <AiOutlineShareAlt />,
      title: "分享",
      events: ["Click"],
    };
    xbook.eventBus.on(
      `${action.id}::Click`,
      ({
        context: {
          space: { platform, owner, repo },
        },
      }: {
        context: { space: { platform: string; owner: string; repo: string } };
      }) => {
        const url = `${window.location.href}?openRepo=https://${platform}.com/${owner}/${repo}`;
        navigator.clipboard.writeText(url);
        xbook.notificationService.success("已复制链接到剪贴板");
      }
    );
    xbook.registry.set("space.actions", [
      ...(xbook.registry.get("space.actions") || []),
      action,
    ]);
  },
});
