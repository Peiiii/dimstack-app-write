import {
  AuthInfo,
  IAuthProvider,
  IAuthService,
} from "@/services/auth.service.interface";
import { Subject } from "rxjs";
import xbook from "xbook/index";

export class AuthServiceImpl implements IAuthService {
  private authInfoMap: { [platform: string]: { [username: string]: AuthInfo } };
  private storageKey = "authInfo";
  private authProviders: IAuthProvider[];
  private authChange$ = new Subject<
    | Partial<{
        [platform: string]: {
          [username: string]: AuthInfo;
        };
      }>
    | undefined
  >();

  constructor() {
    this.authInfoMap = {};
    this.authProviders = [];

    // 从localStorage中读取存储的认证信息
    this.loadFromLocalStorage();

    // 保存认证信息到localStorage
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);

    // 保存认证信息
    this.saveAuthInfo = this.saveAuthInfo.bind(this);

    // 获取认证信息
    this.getAuthInfo = this.getAuthInfo.bind(this);
    this.getAnyAuthInfo = this.getAnyAuthInfo.bind(this);

    // 执行认证流程
    this.authenticate = this.authenticate.bind(this);

    // 注册认证提供者
    this.registerAuthProvider = this.registerAuthProvider.bind(this);

    // 检查权限
    this.hasReadPermission = this.hasReadPermission.bind(this);
    this.hasWritePermission = this.hasWritePermission.bind(this);

    // 订阅认证信息变化
    this.onAuthChange = this.onAuthChange.bind(this);
  }

  private loadFromLocalStorage() {
    const storedAuthInfo = localStorage.getItem(this.storageKey);
    if (storedAuthInfo) {
      Object.assign(this.authInfoMap, JSON.parse(storedAuthInfo));
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.authInfoMap));
  }

  saveAuthInfo(authInfo: AuthInfo) {
    const { platform, username } = authInfo;
    if (!this.authInfoMap[platform]) {
      this.authInfoMap[platform] = {};
    }
    this.authInfoMap[platform][username] = authInfo;
    this.saveToLocalStorage();
    this.authChange$.next(this.authInfoMap);
  }

  getAnyAuthInfo(platform: string, username: string): AuthInfo | undefined {
    return (
      this.authInfoMap[platform]?.[username] ||
      Object.values(this.authInfoMap[platform] || {})[0]
    );
  }

  getAuthInfo(platform: string, username: string): AuthInfo | undefined {
    return this.authInfoMap[platform]?.[username];
  }

  async authenticate(platform: string, username: string) {
    const authProvider = this.authProviders.find(
      (p) => p.platform === platform
    );
    if (!authProvider) {
      xbook.notificationService.error("不支持的平台:" + platform);
      return;
    }
    await authProvider.authenticate(username);
  }

  registerAuthProvider(provider: IAuthProvider) {
    this.authProviders.push(provider);
  }

  hasReadPermission(platform: string, username: string): boolean {
    const authInfo = this.getAnyAuthInfo(platform, username);
    return (
      !!authInfo &&
      authInfo.createdAt !== undefined &&
      authInfo.expirationTime !== undefined &&
      (authInfo.createdAt + authInfo.expirationTime) * 1000 > Date.now()
    );
  }

  hasWritePermission(platform: string, username: string): boolean {
    const authInfo = this.getAuthInfo(platform, username);
    return (
      !!authInfo &&
      authInfo.createdAt !== undefined &&
      authInfo.expirationTime !== undefined &&
      (authInfo.createdAt + authInfo.expirationTime) * 1000 > Date.now()
    );
  }

  onAuthChange(callback: () => void) {
    return this.authChange$.subscribe(callback);
  }
}
