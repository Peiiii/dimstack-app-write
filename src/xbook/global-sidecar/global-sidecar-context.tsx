import { createContext, useContext } from "react";

export interface GlobalSidecarContextValue {
  open: boolean;
  activePaneId?: string;
  openPane: (id: string, props?: Record<string, unknown>) => void;
  closePane: () => void;
  togglePane: (id: string) => void;
}

export const GlobalSidecarContext = createContext<
  GlobalSidecarContextValue | null
>(null);

export const useGlobalSidecar = () => {
  const ctx = useContext(GlobalSidecarContext);
  if (!ctx) {
    throw new Error(
      "useGlobalSidecar must be used within GlobalSidecarProvider"
    );
  }
  return ctx;
};
