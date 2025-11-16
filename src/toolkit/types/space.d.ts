
export type SpaceDef = {
  id: string;
  platform: string;
  owner: string;
  repo: string;
  readonly?: boolean;
  auth?: {
    access_token: string;
    refresh_token: string;

    // created_at: number;
    // expires_in: number;
    // scope: string;
    // token_type: string;
  };
};
