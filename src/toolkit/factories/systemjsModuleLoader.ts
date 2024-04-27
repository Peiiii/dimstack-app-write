import * as React from "react";
import * as ReactDOM from "react-dom";
import "systemjs/dist/system.min";
import "systemjs/dist/extras/amd";

declare global {
  interface Window {
    System: any;
  }
}

export const createSystemjsModuleLoader = () => {
  window.System.set("app:react", { default: React, __useDefault: true });
  window.System.set("app:react-dom", {
    default: ReactDOM,
    __useDefault: true,
  });
  const load = async (url: string) => {
    return await window.System.import(url).default;
  }
  return {
    load
  }
}