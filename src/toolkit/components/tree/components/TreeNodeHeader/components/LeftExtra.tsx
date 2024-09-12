import { Box } from "@chakra-ui/react";

export const LeftExtra = ({ viewState, viewSystem }) => {
    // if (viewState.loading) {
    //   return viewSystem.render("icon-loading");
    // }
    if (viewState.expandable) {
      return viewState.expanded
        ? viewSystem.render("icon-expanded")
        : viewSystem.render("icon-collapsed");
    }
    return <Box className="invisible">{viewSystem.render("icon-collapsed")}</Box>;
  };
  