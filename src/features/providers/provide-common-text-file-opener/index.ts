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
      id: "text-file-view",
      label: "Monaco Editor",
      icon: "AiOutlineCodeEditor",
      showInTreeMenu: true,
      // Lower than markdown editor openers so .md defaults to Zenmark,
      // but still higher than many generic fallbacks.
      priority: -20,
      match: [
        ...COMMON_TEXT_FILE_EXTENSIONS.map((ext) => `.${ext}`),
        ...COMMON_TEXT_FILE_NAMES,
      ],
      init: (uri: string) => {
        const pageId = `text-file-view:${uri}`;
        xbook.layoutService.pageBox.addPage({
          id: pageId,
          title: uri,
          status: "loading",
          viewData: {
            type: "text-file-view",
            props: {
              uri,
            },
          },
        });
        xbook.eventBus.emit(EventKeys.FileLoading, { uri });
      },
    });

    const updatePagesStatusByUri = (
      uri: string,
      status: "deleted" | "loading" | "unsaved" | undefined
    ) => {
      const pageList = xbook.layoutService.pageBox.getPageList?.() || [];
      pageList
        .filter((page) => (page.viewData as any)?.props?.uri === uri)
        .forEach((page) => {
          xbook.layoutService.pageBox.updatePage({
            id: page.id,
            status,
          });
        });
    };

    xbook.eventBus.on(EventKeys.FileLoaded, ({ uri }) => {
      updatePagesStatusByUri(uri, undefined);
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
