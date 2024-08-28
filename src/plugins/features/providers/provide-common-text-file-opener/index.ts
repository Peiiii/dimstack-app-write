import { Tokens } from "@/constants/tokens";
import { TextFileView } from "@/plugins/features/providers/provide-common-text-file-opener/components/text-file-view";
import { COMMON_TEXT_FILE_EXTENSIONS } from "@/plugins/features/providers/provide-common-text-file-opener/constants";
import { VscOpenPreview } from "react-icons/vsc";
import { map } from "rxjs";
import { createPlugin } from "xbook/common/createPlugin";

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
      onClick({ page }) {
        if (page.viewData) {
          // const markdownEditorView = "tiptap-editor";
          const markdownEditorView = "milkdown-editor";
          const plainTextView = "text-file-view";
          const nextViewType =
            page.viewData.type === plainTextView
              ? markdownEditorView
              : plainTextView;
          xbook.layoutService.pageBox.updatePage({
            id: page.id,
            viewData: {
              type: nextViewType,
              props: page.viewData.props,
            },
          });
        }
      },
      when: () => {
        return xbook.layoutService.pageBox.currentPage$.pipe(
          map((page) => page?.viewData?.props?.uri?.endsWith(".md") ?? false)
        );
      },
    });
  },
});
