/* eslint-disable @typescript-eslint/no-explicit-any */
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
  let initialized = false;
  const init = () => {
    const script = document.createElement("script");
    script.type = "systemjs-importmap";
    script.innerHTML = `{
    "imports": {
      "react": "app:react",
      "react-dom": "app:react-dom"
    }
  }`;
    document.head.appendChild(script);
    window.System.set("app:react", { default: React, __useDefault: true });
    window.System.set("app:react-dom", {
      default: ReactDOM,
      __useDefault: true,
    });
    initialized = true;
  };
  const load = async (url: string) => {
    return (await window.System.import(url)).default;
  };
  const isInitialized = () => initialized;

  const requireInitilized = (callback: () => void) => {
    if (!initialized) {
      init();
    }
    callback();
  };
  return {
    init,
    load,
    isInitialized,
    requireInitilized,
  };
};
