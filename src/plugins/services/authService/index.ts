import { createPlugin } from "@/toolkit/common/plugin";

type Authentication = {
  platform: string;
  username: string;
  auth: Record<string, any>;
};
interface Authenticator {
  getAuthResult();
}

export default createPlugin({
  initilize() {
    const authentications: Authentication[] = [];
    const find = () => {};
    const authenticate = () => {};
    return { authentications, find, authenticate };
  },
});
