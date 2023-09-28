import { createPlugin } from "@/toolkit/common/plugin";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "systemjs/dist/system.min";
import "systemjs/dist/extras/amd";

declare global {
  interface Window {
    System: any;
  }
}
const importFromString = (str: string) => {
  if (URL.createObjectURL) {
    const blob = new Blob([str], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const module = import(url);
    URL.revokeObjectURL(url); // GC objectURLs
    return module;
  }

  const url = "data:text/javascript;base64," + btoa(str);
  return import(url);
};
export default createPlugin({
  async initilize(xbook) {
    window.System.set("app:react", { default: React, __useDefault: true });
    window.System.set("app:react-dom", {
      default: ReactDOM,
      __useDefault: true,
    });
    // const code = await fetch(
    //   "https://apps.eiooie.com/tiptap-editor/lib/tiptap-editor.umd.js"
    // ).then((res) => res.text());
    window.System.import(
      "https://apps.eiooie.com/tiptap-editor/lib/tiptap-editor.umd.js" as any
    )
      // console.log("code:",code)
      // importFromString(code)
      .then((module) => module.default)
      .then((plugin) => {
        console.log("plugin:", plugin);
        xbook.pluginService.use(plugin);
      });
    // import("https://apps.eiooie.com/tiptap-editor/lib/tiptap-editor.mjs" as any)
    //   .then((module) => module.default)
    //   .then((plugin) => {
    //     console.log("plugin:", plugin);
    //     xbook.pluginService.use(plugin);
    //   });
  },
});
