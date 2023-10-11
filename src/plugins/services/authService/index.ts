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
  initilize(xbook) {
    const authentications: Authentication[] = [];
    const find = ({ ...params }) => {};
    const authenticate=()=>{

    }
  },
});
