import { useEffect, useState } from "react";
import "./index.scss";
import { createDeferredComponentProxy } from "xbook/hooks/useDeferredComponentProxy";
import { componentService } from "./componentService";

type CosutomComponentTypes =
  | "sidebar"
  | "pageBox"
  | "statusBar"
  | "titleBar"
  | "activityBar";
export type Layout = {
  type: "row" | "column" | "element" | CosutomComponentTypes;
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
    return componentService.render(layout);
  });
};
