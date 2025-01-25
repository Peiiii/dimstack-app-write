// import { IAuthService } from "@/services/auth.service.interface";
import { AuthService } from "@/services/auth.service";
import { FolderTreeService } from "@/services/folder-tree.service";
import { OpenerService } from "@/services/opener.service";
import { SpaceService } from "@/services/space.service";
import { typedKey } from "@/toolkit/utils/typedKey";

export const Tokens = {
  SpaceService: typedKey<SpaceService>("spaceService"),
  AuthService: typedKey<AuthService>("authService"),
  OpenerService: typedKey<OpenerService>("openerService"),
  FolderTreeService: typedKey<FolderTreeService>("folderTreeService"),
};
