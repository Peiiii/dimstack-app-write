// import { useMemo } from "react";

import { useCallback, useEffect, useRef, useState } from "react";
import "./index.scss";
import xbook from "xbook/index";
// const Pane = ({ children }) => {
//   return <>{children}</>;
// };
// const Resizer=({index}:{index:number})=>{
//     return <div className="resizer"/>
// }
// const SplitPane = ({
//   onResize,
//   splitter,
//   children,
// }: {
//   onResize: (values: [number | string, number | string]) => void;
//   splitter: React.ComponentType;
//   children: React.ReactNode[];
// }) => {
//   const finalChildren = useMemo(() => {
//     const result: React.ReactNode[] = [];
//     for (const child of children) {
//       result.push(child);
//       result.push(<div className="resizer" data="" />);
//     }
//   }, [children]);
//   return <></>;
// };

const SplitPane = {
  Horizontal: ({
    children,
    id,
  }: {
    children: [React.ReactNode, React.ReactNode];
    id: string;
  }) => {
    const [left, right] = children;
    const resizer = useRef<HTMLDivElement>(null);
    const resizerWrapper = useRef<HTMLDivElement>(null);
    const leftEl = useRef<HTMLDivElement>(null);
    const rightEl = useRef<HTMLDivElement>(null);
    const data = useRef({ x: 0, y: 0, leftWidth: 0 });
    const [leftWidth, setLeftWidth] = useState<string | number | undefined>(
      undefined
    );
    const [rightWidth, setRightWidth] = useState<string | number | undefined>(
      undefined
    );
    const [initilized, setInitialized] = useState(false);
    const [resizable, setResizable] = useState(true);
    const [mouseMoving, setMouseMoving] = useState(false);
    useEffect(() => {
      xbook.serviceBus.exposeAt(id, {
        toggleResizable: () => {
          setResizable((r) => !r);
        },
      });
    }, [id, setResizable]);
    const mouseMoveHandler = useCallback(
      (e) => {
        if (
          resizer.current &&
          leftEl.current &&
          rightEl.current &&
          resizerWrapper.current
        ) {
          // How far the mouse has been moved
          const dx = e.clientX - data.current.x;
          // const dy = e.clientY - data.current.y;
          const newLeftWidth =
            ((data.current.leftWidth + dx) * 100) /
            resizerWrapper.current.parentElement!.getBoundingClientRect().width;
          const newRightWidth = 100 - newLeftWidth;
          setLeftWidth(`${newLeftWidth}%`);
          setRightWidth(`${newRightWidth}%`);
          setInitialized(true);
          document.body.style.cursor = "col-resize";
          leftEl.current.style.userSelect = "none";
          leftEl.current.style.pointerEvents = "none";
          rightEl.current.style.userSelect = "none";
          rightEl.current.style.pointerEvents = "none";
        }
      },
      [resizer, resizerWrapper, leftEl, rightEl]
    );

    const mouseUpHandler = useCallback(() => {
      if (
        resizer.current &&
        leftEl.current &&
        rightEl.current &&
        resizerWrapper.current
      ) {
        resizer.current.style.removeProperty("cursor");
        document.body.style.removeProperty("cursor");

        leftEl.current.style.removeProperty("user-select");
        leftEl.current.style.removeProperty("pointer-events");

        rightEl.current.style.removeProperty("user-select");
        rightEl.current.style.removeProperty("pointer-events");

        // Remove the handlers of `mousemove` and `mouseup`
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
        setMouseMoving(false);
      }
    }, [resizer, resizerWrapper, leftEl, rightEl]);

    const mouseDownHandler = useCallback(
      (e) => {
        setMouseMoving(true);

        data.current.x = e.clientX;
        data.current.y = e.clientY;
        data.current.leftWidth = leftEl.current!.getBoundingClientRect().width;

        // Attach the listeners to `document`
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
      },
      [leftEl, setMouseMoving]
    );

    // console.log(leftWidth, rightWidth);

    return (
      <div className={`split-pane ${resizable ? "resizable" : ""}`}>
        <div
          className="left pane scroll scroll-7"
          ref={leftEl}
          style={{
            ...(resizable ? { width: leftWidth } : { width: 0 }),
          }}
        >
          <div className="left-inner-wrapper scroll scroll-8"> {left}</div>
        </div>
        <div className="resizer-wrapper" ref={resizerWrapper}>
          <div className="resizer-anchor">
            <div
              className="resizer"
              ref={resizer}
              onMouseDown={resizable ? mouseDownHandler : undefined}
            />
          </div>
        </div>

        <div
          className={`${initilized ? "right" : "right-un"} pane`}
          style={{ ...(resizable ? { width: rightWidth } : {}) }}
          ref={rightEl}
        >
          {right}
        </div>
      </div>
    );
  },
};

export default SplitPane;
