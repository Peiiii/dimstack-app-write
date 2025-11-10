import { EventKeys } from "@/constants/eventKeys";
import { openerService } from "@/services/opener.service";
import { fileSystemHelper } from "@/helpers/file-system.helper";
import { useEfffectOnce } from "@/hooks/use-efffect-once";
import { systemjsModuleService } from "@/services/systemjs-module.service";
import { SafeAny } from "@/toolkit/types";
import { useEffect, useRef, useState } from "react";
import "systemjs/dist/extras/amd";
import "systemjs/dist/system.min";
import { createPlugin } from "xbook/common/createPlugin";

declare global {
  interface Window {
    System: any;
  }
}
// const importFromString = (str: string) => {
//   if (URL.createObjectURL) {
//     const blob = new Blob([str], { type: "text/javascript" });
//     const url = URL.createObjectURL(blob);
//     const module = import(url);
//     URL.revokeObjectURL(url); // GC objectURLs
//     return module;
//   }

//   const url = "data:text/javascript;base64," + btoa(str);
//   return import(url);
// };
export const provideMilkdownEditor = createPlugin({
  async initilize(xbook) {
    systemjsModuleService.requireInitilized(() => {
      systemjsModuleService
        .load("https://apps.eiooie.com/milkdown-editor/lib/index.umd.js" as any)
        .then(({ Editor, utils }) => {
          //   xbook.pluginService.use(plugin);

          const MilkdownEditor = (props: { uri: string }) => {
            const { uri } = props;
            console.log("uri", uri);

            const ref = useRef<HTMLDivElement>(null);
            const [editor, setEditor] = useState<SafeAny>();
            const [loaded, setLoaded] = useState(false);

            useEfffectOnce(() => {
              const ed = new Editor({
                root: ref.current,
                defaultValue: "",
              });
              ed.create().then(() => {
                setEditor(ed);
              });
              return () => {
                ed.destroy();
              };
            });

            useEffect(() => {
              console.log("editor", editor, "uri", uri);

              if (editor) {
                fileSystemHelper.service.read(uri).then((content) => {
                    console.log("content", content);
                  editor?.editor?.action(utils.replaceAll(content));
                  setLoaded(true);
                });
              }
            }, [uri, editor]);

            useEffect(()=>{
              if(loaded){
                // ctrl + s || cmd + s
                ref.current?.addEventListener("keydown", (e) => {
                  if (
                    (e.ctrlKey || e.metaKey) &&
                    e.key.toLowerCase() === "s"
                  ) {
                    e.preventDefault();
                    fileSystemHelper.service
                      .write(uri, editor?.getMarkdown())
                      .then(() => {
                        xbook.eventBus.emit(EventKeys.FileSaved);
                      });
                  }
                });
              }
            },[loaded,editor])

            return <div ref={ref} />;
          };
          xbook.componentService.register("milkdown-editor", MilkdownEditor);
          xbook.componentService.register("tiptap-editor", MilkdownEditor);
          xbook.componentService.register("vditor", MilkdownEditor);
          xbook.componentService.register("markdown-editor", MilkdownEditor);
          openerService.register({
            priority: -100,
            match: [".md", ".markdown", ".MD"],
            init: (uri: string) => {
              xbook.layoutService.pageBox.addPage({
                id: uri,
                title: uri,
                viewData: {
                  type: "milkdown-editor",
                  props: {
                    uri,
                  },
                },
              });
            },
          });
          xbook.eventBus.on(EventKeys.FileSaved, () => {
            xbook.notificationService.success({
              title: "文件保存成功",
              duration: 1000,
            });
          });
        });
    });
  },
});
