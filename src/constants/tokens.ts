import { ISpaceService } from "@/services/space.service.interface";
import { typedKey } from "@/toolkit/utils/typedKey";

export const Tokens = {
  SpaceService: typedKey<ISpaceService>("SpaceService"),
};
