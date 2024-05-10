import { SpaceDef } from "@/toolkit/types/space";

export interface ISpaceService {
  refreshAuth(spaceId: string): Promise<boolean>;
  login(spaceId: string): void;
  isAuthorized(spaceId: string): boolean;
  redirectAuthPage(spaceId: string): void;
  getSpace(spaceId: string): SpaceDef | undefined;
  useIsAuthorized(spaceId: string): boolean;
  updateSpace(space: SpaceDef): void;
}
