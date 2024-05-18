import { SpaceDef } from "@/toolkit/types/space";

export interface ISpaceService {
  refreshAuth(spaceId: string): Promise<boolean>;
  login(spaceId: string): void;
  isAuthorized(spaceId: string): boolean;
  redirectAuthPage(spaceId: string): void;
  getSpace(spaceId: string): SpaceDef | undefined;
  usePermissions(spaceId: string): {
    hasReadPermission: boolean;
    hasWritePermission: boolean;
    isExpired?:boolean;
  };
  updateSpace(space: SpaceDef): void;
  addSpace(
    spaceInfo: { platform: string; owner: string; repo: string },
    options?: {
      focus?: boolean;
    }
  ): SpaceDef;
  focusSpace(spaceId: string): void;
  parseRepoUrl(url: string): { platform: string; owner: string; repo: string };
  subscribeSpaces(callback: (spaces: SpaceDef[]) => void): void;
}
