import { getOAuthConfigKey } from "@/core/utils/domain-config";

type AppInfo = { clientId: string; clientSecret: string; redirectUri: string };

const oauthApps: Record<string, AppInfo> = {
  GitaryApp: {
    clientId: "098834700de44fb495289d22ef1acfeb",
    clientSecret: "4c595f02948f4773a9105e34c0214fee",
    redirectUri: "https://gitary.app/?platform=gitcode",
  },
  Localhost5173: {
    clientId: "098834700de44fb495289d22ef1acfeb",
    clientSecret: "4c595f02948f4773a9105e34c0214fee",
    redirectUri: "http://localhost:5173/?platform=gitcode",
  },
};

const configKey = getOAuthConfigKey();
const appInfo = oauthApps[configKey] || oauthApps.GitaryApp;

export { appInfo };

