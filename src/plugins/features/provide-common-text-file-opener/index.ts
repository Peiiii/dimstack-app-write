import { Tokens } from "@/constants/tokens";
import { TextFileView } from "@/plugins/features/provide-common-text-file-opener/components/text-file-view";
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
  },
});
