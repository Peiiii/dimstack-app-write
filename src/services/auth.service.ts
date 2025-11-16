import { useSubscribeObservable } from "@/hooks/use-subscribe-observable";
import { AuthInfo, IAuthProvider } from "@/services/auth.service.interface";
import { tryParseJSON } from "@/toolkit/utils/common";
import { useState } from "react";
import { createCustomReactBean } from "rx-bean";
import { Subject, distinctUntilChanged, map, skip } from "rxjs";
import xbook from "xbook/index";
import { t } from "@/i18n/utils";

export interface AuthRecord extends AuthInfo {
  id: string;
}

export class AuthService {
  private storageKey = "authInfo-v2";
  private authProviders: IAuthProvider[] = [];
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
      const getRecord = (id: string) => {
        return getAuthRecords().find((r) => r.id === id);
      };

      const useRecord = (id: string) => {
        const [record, setRecord] = useState(getRecord(id));
        useSubscribeObservable(
          () =>
            AuthRecords$.pipe(
              map((records) => records.find((r) => r.id === id)),
              distinctUntilChanged()
            ),
          (data) => {
            setRecord(data);
          }
        );
        return record;
      };
      return { load, onChange, removeRecord, addRecord, getRecord, useRecord };
    }
  );
  getAuthRecords = this.AuthRecords.getAuthRecords;
  setAuthRecords = this.AuthRecords.setAuthRecords;
  useAuthRecords = this.AuthRecords.useAuthRecords;
  authRecords$ = this.AuthRecords.AuthRecords$;
  removeAuthRecord = this.AuthRecords.removeRecord;
  onAuthRecordsChange = this.AuthRecords.onChange;
  addAuthRecord = this.AuthRecords.addRecord;
  getAuthRecord = this.AuthRecords.getRecord;
  useAuthRecord = this.AuthRecords.useRecord;

  saveAuthInfo = (authInfo: AuthInfo) => {
    this.addAuthRecord({
      ...authInfo,
      id: this.generateAuthId(authInfo),
    });
  };

  generateAuthId = (authInfo: { platform: string; username: string }) => {
    return `${authInfo.platform}-${authInfo.username}`;
  };

  getAnyAuthInfo = (
    platform: string,
    username?: string
  ): AuthInfo | undefined => {
    return this.getAuthRecords().find((r) => r.platform === platform);
  };

  getAuthInfo = (platform: string, username: string): AuthInfo | undefined => {
    return this.getAuthRecords().find(
      (r) => r.platform === platform && r.username === username
    );
  };

  authenticate = async (options: {
    platform: string;
    username?: string;
    repo?: string;
    needConfirm?: boolean;
  }) => {
    const { platform, username, repo, needConfirm } = options;
    const authProvider = this.authProviders.find(
      (p) => p.platform === platform
    );
    if (!authProvider) {
      xbook.notificationService.error(t("auth.unsupportedPlatform", { platform }));
      return;
    }
    await authProvider.authenticate({ username, repo, needConfirm });
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

  isSessionValid = (platform: string, username: string): boolean => {
    const authInfo = this.getAuthInfo(platform, username);
    return this.checkSessionValid(authInfo);
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

  tryRefreshAuthInfo = async (platform: string, username: string) => {
    const authInfo = this.getAuthInfo(platform, username);
    if (!authInfo) {
      return;
    }
    const authProvider = this.authProviders.find(
      (p) => p.platform === platform
    );
    if (!authProvider) {
      return;
    }
    if (!authProvider.refresh) {
      return;
    }
    if (!authInfo.refreshToken) {
      return;
    }
    return await authProvider.refresh({
      ...authInfo,
      refreshToken: authInfo.refreshToken,
    });
  };

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

// Export a single, shared instance for direct imports.
export const authService = new AuthService();
