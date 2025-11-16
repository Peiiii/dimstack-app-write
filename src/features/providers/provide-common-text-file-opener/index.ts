import { openerService } from "@/services/opener.service";
import { TextFileView } from "@/features/providers/provide-common-text-file-opener/components/text-file-view";
import { COMMON_TEXT_FILE_EXTENSIONS, COMMON_TEXT_FILE_NAMES } from "@/features/providers/provide-common-text-file-opener/constants";
import { createPlugin } from "xbook/common/createPlugin";
import { EventKeys } from "@/constants/eventKeys";

export default createPlugin({
  addComponents(xbook) {
    return {
      "text-file-view": TextFileView,
    };
  },
  initilize(xbook) {
    openerService.register({
      // Slightly higher than other markdown editor openers (-100),
      // but lower than app-specific openers (usually 100)
      priority: -10,
      match: [
        ...COMMON_TEXT_FILE_EXTENSIONS.map((ext) => `.${ext}`),
        ...COMMON_TEXT_FILE_NAMES,
      ],
      init: (uri: string) => {
        const isMarkdown =
          uri.endsWith(".md") || uri.endsWith(".markdown") || uri.endsWith(".MD");

        // Force a single editor: always use zenmark for markdown; otherwise fall back to plain text view
        const registry = xbook.componentService.getComponents()?.componentRegistry || {};
        const hasZenmark = !!registry["zenmark-editor"];
        const viewType = isMarkdown
          ? hasZenmark
            ? "zenmark-editor"
            : "text-file-view"
          : "text-file-view";

        xbook.layoutService.pageBox.addPage({
          id: uri,
          title: uri,
          status: "loading",
          viewData: {
            type: viewType,
            props: {
              uri,
            },
          },
        });
        xbook.eventBus.emit(EventKeys.FileLoading, { uri });
      },
    });
    
    xbook.eventBus.on(EventKeys.FileLoaded, ({ uri }) => {
      xbook.layoutService.pageBox.updatePage({
        id: uri,
        status: undefined,
      });
    });
    // Hide editor switching for new users; keep a single default editor
    // xbook.componentService.register("vsc-open-preview", VscOpenPreview);
    // xbook.layoutService.pageBox.registerPageAction({
    //   id: "preview-markdown",
    //   title: "Preview Markdown",
    //   icon: "vsc-open-preview",
    //   onClick({ page }) {
    //     if (page.viewData) {
    //       const markdownEditorView = "zenmark-editor";
    //       const plainTextView = "text-file-view";
    //       const nextViewType =
    //         page.viewData.type === plainTextView
    //           ? markdownEditorView
    //           : plainTextView;
    //       xbook.layoutService.pageBox.updatePage({
    //         id: page.id,
    //         viewData: {
    //           type: nextViewType,
    //           props: page.viewData.props,
    //         },
    //       });
    //     }
    //   },
    //   when: () => {
    //     return xbook.layoutService.pageBox.currentPage$.pipe(
    //       map((page) => page?.viewData?.props?.uri?.endsWith(".md") ?? false)
    //     );
    //   },
    // });
  },
});
