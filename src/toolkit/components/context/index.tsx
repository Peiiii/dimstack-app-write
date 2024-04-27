import { SafeAny } from "@/toolkit/types";
import { FC, createContext, useContext } from "react";

const GlobalContext = createContext({});
const ContextProvider: FC<Record<string, SafeAny>> = ({
  children,
  ...rest
}) => {
  const context = useContext(GlobalContext);
  return (
    <GlobalContext.Provider value={{ ...context, ...rest }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default ContextProvider;
