import { OpenerService } from "@/plugins/services/openerService";
import { IAuthService } from "@/services/auth.service.interface";
import { ISpaceService } from "@/services/space.service.interface";
import { typedKey } from "@/toolkit/utils/typedKey";

export const Tokens = {
  SpaceService: typedKey<ISpaceService>("spaceService"),
  AuthService: typedKey<IAuthService>("authService"),
  OpenerService: typedKey<OpenerService>("openerService"),
};
