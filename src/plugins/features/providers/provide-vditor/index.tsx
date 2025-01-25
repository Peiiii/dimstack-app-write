import { EventKeys } from "@/constants/eventKeys";
import { Tokens } from "@/constants/tokens";
import { fileSystemHelper } from "@/helpers/file-system.helper";
import { useEfffectOnce } from "@/hooks/use-efffect-once";
import { systemjsModuleService } from "@/services/systemjs-module.service";
import { SafeAny } from "@/toolkit/types";
import { css } from "@emotion/css";
import { nanoid } from "nanoid";
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
export const provideVditor = createPlugin({
  async initilize(xbook) {
    systemjsModuleService.requireInitilized(() => {
      systemjsModuleService
        .load("https://apps.eiooie.com/vditor-module/lib/index.umd.js" as any)
        .then(({ Vditor }) => {
          //   xbook.pluginService.use(plugin);

          const MarkdownEditor = (props: { uri: string }) => {
            const { uri } = props;
            console.log("uri", uri);

            const ref = useRef<HTMLDivElement>(null);
            const [editor, setEditor] = useState<SafeAny>();
            const [loaded, setLoaded] = useState(false);
            const idRef = useRef(nanoid());

            useEfffectOnce(() => {
              const vditor = new Vditor(idRef.current, {
                mode: "wysiwyg",
                height: "100%",
                after: () => {
                  vditor.setValue("");
                  setEditor(vditor);
                },
              });
              return () => {
                vditor.destroy();
              };
            });

            useEffect(() => {
              console.log("editor", editor, "uri", uri);

              if (editor) {
                fileSystemHelper.service.read(uri).then((content) => {
                  editor.setValue(content);
                  setLoaded(true);
                });
              }
            }, [uri, editor]);

            useEffect(() => {
              if (loaded) {
                // ctrl + s || cmd + s
                ref.current?.addEventListener("keydown", (e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
                    e.preventDefault();
                    fileSystemHelper.service
                      .write(uri, editor?.getValue())
                      .then(() => {
                        xbook.eventBus.emit(EventKeys.FileSaved);
                      });
                  }
                });
              }
            }, [loaded, editor]);

            return (
              <div
                className={css`
                  width: 100%;
                  height: 100%;
                `}
              >
                <div ref={ref} id={idRef.current} />
              </div>
            );
          };
          xbook.componentService.register("milkdown-editor", MarkdownEditor);
          xbook.componentService.register("tiptap-editor", MarkdownEditor);
          xbook.componentService.register("vditor", MarkdownEditor);
          xbook.componentService.register("markdown-editor", MarkdownEditor);
          const openerService = xbook.serviceBus.createProxy(
            Tokens.OpenerService
          );
          openerService.register({
            priority: -100,
            match: [".md", ".markdown", ".MD"],
            init: (uri: string) => {
              xbook.layoutService.pageBox.addPage({
                id: uri,
                title: uri,
                viewData: {
                  type: "vditor",
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
