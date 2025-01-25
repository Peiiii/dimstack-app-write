import { DataStore } from "@/toolkit/factories/dataStore";
import { SpaceDef } from "@/toolkit/types/space";

interface RepoUrlResult {
  platform: string;
  owner: string;
  repo: string;
}

export interface ISpaceService {
  setSpaces(spaces: SpaceDef[]): void;
  useSpaces(): SpaceDef[];
  getSpaceStore(): DataStore<SpaceDef>;
  refreshAuth(spaceId: string): Promise<boolean>;
  login(spaceId: string): void;
  isAuthorized(spaceId: string): boolean;
  redirectAuthPage(spaceId: string): void;
  getSpace(spaceId: string): SpaceDef | undefined;
  usePermissions(spaceId: string): {
    hasReadPermission: boolean;
    hasWritePermission: boolean;
    isExpired?: boolean;
  };
  updateSpace(space: SpaceDef): void;
  addSpace(
    spaceInfo: { platform: string; owner: string; repo: string },
    options?: {
      focus?: boolean;
    }
  ): SpaceDef;
  focusSpace(spaceId: string): void;
  getFocusedSpace(): SpaceDef | undefined;
  parseRepoUrl(url: string): Partial<RepoUrlResult>;
  subscribeSpaces(callback: (spaces: SpaceDef[]) => void): void;
}
