type AppInfo = { clientId: string; clientSecret: string; redirectUri: string };
let appInfo: AppInfo;
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
  writeDimstack: {
    clientId:
      "e9d3ac7adbf20644f335257353e1798d709062b85b73896a4d4f762b7ee92e40",
    clientSecret:
      "c4bb089c4585b53ae68150b847a99ef3445de57c060082256c296b725df46de1",
    redirectUri: "https://write.dimstack.com?platform=gitee",
  },
  localhost5173: {
    clientId:
      "7fa2b5a6e0445f723e8bc04850293d604ca2d50b537e90ed71e344edcbdb87da",
    clientSecret:
      "45a3e2898145673b20f1198d0be5ac7600b4f3c792f5e2a0f40238ca4a984ca5",
    redirectUri: "http://localhost:5173/?platform=gitee",
  },
};

if (import.meta.env.PROD) {
  appInfo = oauthApps.writeDimstack;
} else {
  appInfo = oauthApps.localhost5173;
}
export { appInfo };
