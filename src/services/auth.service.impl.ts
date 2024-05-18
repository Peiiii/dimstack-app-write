import {
  AuthInfo,
  IAuthProvider,
  IAuthService,
} from "@/services/auth.service.interface";
import { Subject } from "rxjs";
import xbook from "xbook/index";

export const createAuthService = (): IAuthService => {
  const authInfoMap: { [platform: string]: { [username: string]: AuthInfo } } =
    {};
  const storageKey = "authInfo";
  const authProviders: IAuthProvider[] = [];

  // 从localStorage中读取存储的认证信息
  const storedAuthInfo = localStorage.getItem(storageKey);
  if (storedAuthInfo) {
    Object.assign(authInfoMap, JSON.parse(storedAuthInfo));
  }

  // 保存认证信息到localStorage
  const saveToLocalStorage = (): void => {
    localStorage.setItem(storageKey, JSON.stringify(authInfoMap));
  };

  const authChange$ = new Subject();
  const onAuthChange = (callback: () => void) => {
    return authChange$.subscribe(callback);
  };

  // 保存认证信息
  const saveAuthInfo = (authInfo: AuthInfo): void => {
    const { platform, username } = authInfo;
    if (!authInfoMap[platform]) {
      authInfoMap[platform] = {};
    }
    authInfoMap[platform][username] = authInfo;
    saveToLocalStorage(); // 保存到localStorage
    authChange$.next(authInfoMap);
  };

  // 获取认证信息
  const getAnyAuthInfo = (
    platform: string,
    username: string
  ): AuthInfo | undefined => {
    // return authInfoMap[platform]?.[username];
    return (
      authInfoMap[platform]?.[username] ||
      Object.values(authInfoMap[platform] || {})[0]
    );
  };

  // 获取认证信息
  const getAuthInfo = (
    platform: string,
    username: string
  ): AuthInfo | undefined => {
    // return authInfoMap[platform]?.[username];
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
  const registerAuthProvider = (provider: IAuthProvider): void => {
    authProviders.push(provider);
  };

  const hasReadPermission = (platform: string, username: string): boolean => {
    const authInfo = getAnyAuthInfo(platform, username);
    return (
      !!authInfo &&
      authInfo.createdAt !== undefined &&
      authInfo.expirationTime !== undefined &&
      (authInfo.createdAt + authInfo.expirationTime) * 1000 > Date.now()
    );
  };

  const hasWritePermission = (platform: string, username: string): boolean => {
    const authInfo = getAuthInfo(platform, username);
    return (
      !!authInfo &&
      authInfo.createdAt !== undefined &&
      authInfo.expirationTime !== undefined &&
      (authInfo.createdAt + authInfo.expirationTime) * 1000 > Date.now()
    );
  };


  return {
    saveAuthInfo,
    getAuthInfo,
    getAnyAuthInfo,
    hasWritePermission,
    authenticate,
    registerAuthProvider,
    hasReadPermission,
    onAuthChange,
  };
};

export const authService = createAuthService();
