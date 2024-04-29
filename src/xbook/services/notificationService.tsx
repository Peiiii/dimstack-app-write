import { ChakraProvider, UseToastOptions, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom/client";
import { createDeferredProxy } from "xbook/common/deferredProxy";

type LogFunction = (message: string | Omit<UseToastOptions, "status">) => void;
const makeMessageService = () => {
  const handle = createDeferredProxy<{
    success: LogFunction;
    info: LogFunction;
    error: LogFunction;
    warning: LogFunction;
    loading: LogFunction;
  }>();
  const Helper = () => {
    const toast = useToast();
    useEffect(() => {
      const makeFunction = (type) => {
        return (message: string | Omit<UseToastOptions, "status">) => {
          typeof message === "string"
            ? toast({
                description: message,
                status: type,
                duration: 3000,
                isClosable: true,
                position: "bottom-right",
              })
            : toast({
                duration: 3000,
                isClosable: true,
                position: "bottom-right",
                ...message,
                status: type,
              });
        };
      };
      const success = makeFunction("success");
      const error = makeFunction("error");
      const info = makeFunction("info");
      const warning = makeFunction("warning");
      const loading = makeFunction("loading");
      handle.register({ success, error, warning, loading, info });
    }, [toast]);
    return <></>;
  };
  if (!document.getElementById("message-container")) {
    const dom = document.createElement("div");
    dom.id = "message-container";
    if (document.body) {
      document.body.appendChild(dom);
      ReactDOM.createRoot(dom).render(
        <ChakraProvider>
          <Helper />
        </ChakraProvider>
      );
    }
  }
  return handle;
};

export const notificationService = makeMessageService();
