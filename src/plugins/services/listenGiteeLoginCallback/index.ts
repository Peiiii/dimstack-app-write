import { createPlugin } from "@/toolkit/common/plugin";
import history from "xbook/common/history";

export const listenGiteeLoginCallback = createPlugin({
  initilize() {
    const code = history.location.query["code"];
    if (code) {
      const newQuery = { ...history.location.query };
      delete newQuery["code"];
      history.push(
        history.createHref({
          pathname: history.location.pathname,
          query: newQuery,
        }),
        true
      );
    }
  },
});
