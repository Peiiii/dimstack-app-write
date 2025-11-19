import { getOAuthConfigKey } from '@/core/utils/domain-config';

type AppInfo = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  appId?: number;
  privateKey?: string;
};

const oauthApps: Record<string, AppInfo> = {
  localhost: {
    clientId:
      "be57567173ecb4139e99e54a216e3e728f1c355d3f8a4568bb417bc94c7e1194",
    clientSecret:
      "5dbc1127b37fb2849a425d3e47d856df1f5efa6fa9be5c9793224ecc15d2b376",
    redirectUri: "http://localhost:3000/gitee_login/index.html",
  },
  eiooie: {
    clientId:
      "4f4b30de2e5102ee76c1a30a98193fb5e090b4600831c030f313e0ec530e68f9",
    clientSecret:
      "5700145980a135586925608a325dba18c7b2459ef75203a9ff0768737ae83252",
    redirectUri: "https://apps.eiooie.com/gitee_login/index.html",
  },
  WriteDimstackCom: {
    clientId: "Ov23lifrUzI6VGkwpGWd",
    clientSecret: "91701fd46c951ef707084f6142e5a11ddb55f744",
    redirectUri: "https://write.dimstack.com/?platform=github",
  },
  GitaryApp: {
    clientId: "Ov23li7gtCm6evUeqZ4d",
    clientSecret: "c1b0b88727cb4f4c279d9bc6b82552f8ba760155",
    redirectUri: "https://gitary.app/?platform=github",
  },
  Localhost5173: {
    clientId: "Ov23li1cdcxP0rM2KVLq",
    clientSecret: "34f80b513b96b5371682c6131e160eb41fc3e70f",
    redirectUri: "http://localhost:5173/?platform=github",
  },
};

const configKey = getOAuthConfigKey();
const appInfo = oauthApps[configKey] || oauthApps.WriteDimstackCom;

export { appInfo };
