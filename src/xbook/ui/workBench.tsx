import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { device } from "xbook/common/device";
import { createDeferredComponentProxy } from "xbook/hooks/useDeferredComponentProxy";
import { componentService, PresetComponents } from "./componentService";
import "./styles/globals.scss";

type CosutomComponentTypes =
  | "sidebar"
  | "pageBox"
  | "statusBar"
  | "titleBar"
  | "activityBar";
export type Layout = {
  type:
    | "row"
    | "column"
    | "element"
    | "SplitPane.Horizontal"
    | PresetComponents
    | CosutomComponentTypes;
  props?: Record<string, unknown>;
  children?: Layout[];
};

// const DefualtLayout = {
//   type: "column",
//   props: {
//     h: "100%",
//   },
//   children: [
//     {
//       type: "row",
//       props: {
//         flexShrink: 0,
//       },
//       children: [
//         {
//           type: "titleBar",
//         },
//       ],
//     },
//     {
//       type: "row",
//       props: {
//         flexGrow: 1,
//       },
//       children: [
//         {
//           type: "row",
//           props: {
//             flexShrink: 0,
//           },
//           children: [
//             {
//               type: "activityBar",
//             },
//           ],
//         },
//         {
//           type: "row",

//           children: [
//             {
//               type: "sidebar",
//             },
//             {
//               type: "pageBox",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       type: "row",
//       props: {
//         flexShrink: 0,
//       },
//       children: [
//         {
//           type: "statusBar",
//         },
//       ],
//     },
//   ],
// };
export const createWorkbench = () => {
  return createDeferredComponentProxy<{
    setLayout: (layout: Layout | ((Layout) => Layout)) => void;
  }>(({ proxy }) => {
    const [layout, setLayout] = useState<Layout>({
      type: "row",
      props: {
        text: "Hi",
      },
    });
    useEffect(() => {
      proxy.register({
        setLayout,
      });
    }, [proxy, setLayout]);
    return (
      <DndProvider backend={device.isMobile() ? TouchBackend : HTML5Backend}>
        <Flex
          className={`workbench ${device.isMobile() ? "mobile" : "pc"}`}
          w="100%"
          h="100%"
          overflow={"hidden"}
        >
          {componentService.render(layout)}
          {/* <ComboboxDemo /> */}
        </Flex>
      </DndProvider>
    );
  });
};
