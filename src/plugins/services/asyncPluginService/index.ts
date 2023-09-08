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

export default createPlugin({
  initilize(xbook) {
    window.System.set("app:react", { default: React, __useDefault: true });
    window.System.set("app:react-dom", {
      default: ReactDOM,
      __useDefault: true,
    });
    window.System.import(
      "https://apps.eiooie.com/tiptap-editor/lib/tiptap-editor.umd.js" as any
    )
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
