import { typedKey } from "@/toolkit/utils/typedKey";
import { PageDescriptor } from "xbook/ui/page-box/controller";

export const HookPoints = {
  PageFilter:
    typedKey<(pages: PageDescriptor[]) => PageDescriptor[]>("PageFilter"),
};


export enum CommandKeys {
  ToggleHome = "client:toggleHome",
  ToChatPage = "client:toChatPage",
}
