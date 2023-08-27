let appInfo: { clientId: string; clientSecret: string; redirectUri: string };
const oauthApps = {
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
};

if (import.meta.env.PROD) {
  appInfo = oauthApps.eiooie;
} else {
  appInfo = oauthApps.localhost;
}
export { appInfo };
