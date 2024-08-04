import { IBaseTreeService } from "@/toolkit/components/tree/tree.service";
import { typedKey } from "@/toolkit/utils/typedKey";

export const BaseServicePoints = {
  TreeService: typedKey<IBaseTreeService>("treeService"),
};
