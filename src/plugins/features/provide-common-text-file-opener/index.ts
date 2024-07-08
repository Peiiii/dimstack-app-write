import { Tokens } from "@/constants/tokens";
import { TextFileView } from "@/plugins/features/provide-common-text-file-opener/components/text-file-view";
import { VscOpenPreview } from "react-icons/vsc";
import { of } from "rxjs";
import { createPlugin } from "xbook/common/createPlugin";

export const COMMON_TEXT_FILE_EXTENSIONS = [
  "txt",
  "md",
  "json",
  "js",
  "ts",
  "html",
  "css",
  "scss",
  "less",
  "vue",
  "jsx",
  "tsx",
  "yaml",
  "yml",
  "toml",
  "xml",
  "csv",
  "log",
  "ini",
  "conf",
  "properties",
  "java",
  "c",
  "cpp",
  "h",
  "hpp",
  "py",
  "sh",
  "bat",
  "cmd",
  "ps1",
  "psm1",
  "sql",
  "php",
  "go",
  "rb",
  "r",
  "cs",
  "swift",
  "kt",
  "groovy",
  "scala",
  "perl",
  "lua",
  "pl",
  "m",
];
export default createPlugin({
  addComponents(xbook) {
    return {
      "text-file-view": TextFileView,
    };
  },
  initilize(xbook) {
    const openerService = xbook.serviceBus.createProxy(Tokens.OpenerService);
    openerService.register({
      priority: -100,
      match: COMMON_TEXT_FILE_EXTENSIONS.map((ext) => `.${ext}`),
      init: (uri: string) => {
        xbook.layoutService.pageBox.addPage({
          id: uri,
          title: uri,
          viewData: {
            type: "text-file-view",
            props: {
              uri,
            },
          },
        });
      },
    });
    xbook.componentService.register("vsc-open-preview", VscOpenPreview);
    xbook.layoutService.pageBox.registerPageAction({
      id: "preview-markdown",
      title: "Preview Markdown",
      icon: "vsc-open-preview",
      onClick() {
        xbook.notificationService.info("此功能暂未实现");
      },
      when: of(true),
    });
  },
});
