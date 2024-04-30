import { IAuthService, AuthInfo, AuthProvider } from "@/services/auth.service.interface";
import xbook from "xbook/index";

const createAuthService = (): IAuthService => {
  const authInfoMap: { [platform: string]: { [username: string]: AuthInfo } } =
    {};
  const storageKey = "authInfo";
  const authProviders: AuthProvider[] = [];

  // 从localStorage中读取存储的认证信息
  const storedAuthInfo = localStorage.getItem(storageKey);
  if (storedAuthInfo) {
    Object.assign(authInfoMap, JSON.parse(storedAuthInfo));
  }

  // 保存认证信息到localStorage
  const saveToLocalStorage = (): void => {
    localStorage.setItem(storageKey, JSON.stringify(authInfoMap));
  };

  // 保存认证信息
  const saveAuthInfo = (authInfo: AuthInfo): void => {
    const { platform, username } = authInfo;
    if (!authInfoMap[platform]) {
      authInfoMap[platform] = {};
    }
    authInfoMap[platform][username] = authInfo;
    saveToLocalStorage(); // 保存到localStorage
  };

  // 获取认证信息
  const getAuthInfo = (
    platform: string,
    username: string
  ): AuthInfo | undefined => {
    return authInfoMap[platform]?.[username];
  };

  // 执行认证流程
  const authenticate = async (
    platform: string,
    username: string
  ): Promise<void> => {
    const authProvider = authProviders.find((p) => p.platform === platform);
    if (!authProvider) {
      xbook.notificationService.error("不支持的平台:" + platform);
      return;
    }
    authProvider.authenticate(username);
  };

  // 注册认证提供者
  const registerAuthProvider = (provider: AuthProvider): void => {
    authProviders.push(provider);
  };

  return {
    saveAuthInfo,
    getAuthInfo,
    authenticate,
    registerAuthProvider,
  };
};

export const authService = createAuthService();
