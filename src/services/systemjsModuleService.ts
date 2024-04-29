import { createSystemjsModuleLoader } from "@/toolkit/factories/systemjsModuleLoader";

const createSystemjsModuleService = () => {
  const loader = createSystemjsModuleLoader();
  return loader;
};

export const systemjsModuleService = createSystemjsModuleService();
