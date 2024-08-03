import { useSubscribeObservable } from "@/hooks/use-subscribe-observable";
import { AuthInfo, IAuthProvider } from "@/services/auth.service.interface";
import { tryParseJSON } from "@/toolkit/utils/common";
import { useState } from "react";
import { createCustomReactBean } from "rx-bean";
import { Subject, skip } from "rxjs";
import xbook from "xbook/index";

export interface AuthRecord extends AuthInfo {
  id: string;
}

export class AuthService {
  // private authInfoMap: { [platform: string]: { [username: string]: AuthInfo } };
  private storageKey = "authInfo-v2";
  private authProviders: IAuthProvider[] = [];
  private authChange$ = new Subject<
    | Partial<{
        [platform: string]: {
          [username: string]: AuthInfo;
        };
      }>
    | undefined
  >();
  private authProvidersChange$ = new Subject<IAuthProvider[]>();
  private AuthRecords = createCustomReactBean(
    "AuthRecords",
    [] as AuthRecord[],
    (bean) => {
      const { AuthRecords$, setAuthRecords, getAuthRecords } = bean;
      const load = () => {
        const stored = tryParseJSON<AuthRecord[] | undefined>(
          localStorage.getItem(this.storageKey),
          undefined
        );
        if (stored) {
          setAuthRecords(stored);
        }
      };
      load();
      AuthRecords$.pipe(skip(1)).subscribe((records) => {
        localStorage.setItem(this.storageKey, JSON.stringify(records));
      });
      const onChange = (
        callback: (records: AuthRecord[]) => void
      ): (() => void) => {
        const sub = AuthRecords$.pipe(skip(1)).subscribe(callback);
        return () => sub.unsubscribe();
      };
      const removeRecord = (id: string) => {
        setAuthRecords(getAuthRecords().filter((r) => r.id !== id));
      };
      const addRecord = (record: AuthRecord) => {
        const existed = getAuthRecords().find((r) => r.id === record.id);
        if (existed) {
          setAuthRecords(
            getAuthRecords().map((r) => (r.id === record.id ? record : r))
          );
        } else {
          setAuthRecords([...getAuthRecords(), record]);
        }
      };
      return { load, onChange, removeRecord, addRecord };
    }
  );
  getAuthRecords = this.AuthRecords.getAuthRecords;
  setAuthRecords = this.AuthRecords.setAuthRecords;
  useAuthRecords = this.AuthRecords.useAuthRecords;
  authRecords$ = this.AuthRecords.AuthRecords$;
  removeAuthRecord = this.AuthRecords.removeRecord;
  onAuthRecordsChange = this.AuthRecords.onChange;
  addAuthRecord = this.AuthRecords.addRecord;

  saveAuthInfo = (authInfo: AuthInfo) => {
    this.addAuthRecord({
      ...authInfo,
      id: `${authInfo.platform}-${authInfo.username}`,
    });
  };

  getAnyAuthInfo = (
    platform: string,
    username: string
  ): AuthInfo | undefined => {
    return this.getAuthRecords().find((r) => r.platform === platform);
  };

  getAuthInfo = (platform: string, username: string): AuthInfo | undefined => {
    return this.getAuthRecords().find(
      (r) => r.platform === platform && r.username === username
    );
  };

  authenticate = async (platform: string, username?: string, repo?: string) => {
    const authProvider = this.authProviders.find(
      (p) => p.platform === platform
    );
    if (!authProvider) {
      xbook.notificationService.error("不支持的平台:" + platform);
      return;
    }
    await authProvider.authenticate(username, repo);
  };

  registerAuthProvider = (provider: IAuthProvider) => {
    this.authProviders.push(provider);
    this.authProvidersChange$.next(this.authProviders);
  };

  onAuthProvidersChange = (callback: () => void) => {
    const sub = this.authProvidersChange$.subscribe(callback);
    return () => sub.unsubscribe();
  };

  hasReadPermission = (platform: string, username: string): boolean => {
    const authInfo = this.getAnyAuthInfo(platform, username);
    return !!authInfo && this.checkSessionValid(authInfo);
  };

  private checkSessionValid(authInfo?: AuthInfo) {
    if (!authInfo || !authInfo.accessToken) {
      return false;
    } else if (!authInfo.expirationTime) {
      return true;
    } else if (!authInfo.createdAt) {
      return false;
    } else
      return (authInfo.createdAt + authInfo.expirationTime) * 1000 > Date.now();
  }

  hasWritePermission = (platform: string, username: string): boolean => {
    const authInfo = this.getAuthInfo(platform, username);
    return !!authInfo && this.checkSessionValid(authInfo);
  };

  useAuthProviders = () => {
    const [authProviders, setAuthProviders] = useState<IAuthProvider[]>(
      this.authProviders
    );

    useSubscribeObservable(
      () => this.authProvidersChange$,
      () => {
        setAuthProviders(this.authProviders);
      }
    );
    return {
      authProviders,
    };
  };
}
