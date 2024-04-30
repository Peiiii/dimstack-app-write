export interface ISpaceService {
  refreshAuth(spaceId: string): Promise<boolean>;
  login(spaceId: string): void;
  isAuthorized(spaceId: string): boolean;
  redirectAuthPage(spaceId: string): void;
}
