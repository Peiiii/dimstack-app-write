export interface ISpaceService {
  refreshAuth(spaceId: string): Promise<boolean>;
  login(spaceId: string): void;
  redirectAuthPage(spaceId: string): void;
}
