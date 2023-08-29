import { SafeAny } from "@/toolkit/common/types";

export type SpaceDef = {
  id: string;
  platform: string;
  owner: string;
  repo: string;
  auth: {
    access_token: string;
    created_at: number;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
  };
};
