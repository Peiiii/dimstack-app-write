import { css } from "@emotion/css";
import classNames from "classnames";
import React, { useCallback, useRef, useState } from "react";
import "./index.scss";

const SplitPaneCss = css`
  &.split-pane {
    display: flex;
    width: 100%;
    height: 100%;
    .resizer {
      height: 100%;
      z-index: 999;
      position: relative;
    }
    .resizer-anchor {
      position: absolute;
      width: 0;
      height: 100%;
    }
    .pane {
      display: flex;
      /* transition: all 0.1s ease; */
    }
    .left {
      // overflow-x: auto;
      overflow: hidden;
    }
    .left-inner-wrapper {
      display: flex;
      width: 100%;
      // overflow-x: auto;
    }
    .right-un {
      flex: 1;
    }
    .right {
      flex: 1;
    }

    &.resizable {
      .resizer-wrapper {
        .resizer-anchor {
          display: flex;
          align-items: center;
          .resizer {
            background-color: var(--splitter-color);
            cursor: ew-resize;
            width: 6px;
            flex-shrink: 0;
            flex-grow: 0;
            left: -3px;
          }
          &:hover {
            .toggle-left {
              visibility: visible;
            }
          }
          .toggle-left {
            width: 2px;
            display: flex;
            align-items: center;
            visibility: hidden;
            height: 100%;
            transition: all 0.3s ease;
            .toggle {
              margin-left: -10px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
`;
const SplitPane = {
  Horizontal: ({
    children,
    resizable = true,
    initialLeftWidth,
    initialRightWidth,
    minLeftWidth,
    maxLeftWidth,
    toggleLeftComponent,
    enableToggleLeft,
  }: {
    children: [React.ReactNode, React.ReactNode];
    resizable?: boolean;
    initialLeftWidth?: number;
    initialRightWidth?: number;
    minLeftWidth?: number;
    maxLeftWidth?: number;
    toggleLeftComponent?: React.ReactNode;
    enableToggleLeft?: boolean;
  }) => {
    const [left, right] = children;
    const resizer = useRef<HTMLDivElement>(null);
    const resizerWrapper = useRef<HTMLDivElement>(null);
    const leftEl = useRef<HTMLDivElement>(null);
    const rightEl = useRef<HTMLDivElement>(null);
    const [leftHidden, setLeftHidden] = useState(false);
    const data = useRef({
      startX: 0,
      startY: 0,
      leftWidth: initialLeftWidth || 0,
    });
    const [leftWidth, setLeftWidth] = useState<string | number | undefined>(
      initialLeftWidth
    );
    const [rightWidth, setRightWidth] = useState<string | number | undefined>(
      initialRightWidth
    );
    const [initilized, setInitialized] = useState(false);
    const [, setMouseMoving] = useState(false);

    const mouseMoveHandler = useCallback(
      (e: { clientX: number }) => {
        if (
          resizer.current &&
          leftEl.current &&
          rightEl.current &&
          resizerWrapper.current
        ) {
          // How far the mouse has been moved
          const dx = e.clientX - data.current.startX;
          // const dy = e.clientY - data.current.y;
          const parentWidth =
            resizerWrapper.current.parentElement!.getBoundingClientRect().width;
          let newLeftWidth = data.current.leftWidth + dx;
          newLeftWidth = Math.max(
            minLeftWidth === undefined ? 0 : minLeftWidth,
            Math.min(
              maxLeftWidth === undefined ? parentWidth : maxLeftWidth!,
              newLeftWidth
            )
          );
          const newLeftWidthPercent = (newLeftWidth * 100) / parentWidth;
          const newRightWidthPercent = 100 - newLeftWidth;
          setLeftWidth(`${newLeftWidthPercent}%`);
          setRightWidth(`${newRightWidthPercent}%`);
          setInitialized(true);
          document.body.style.cursor = "col-resize";
          leftEl.current.style.userSelect = "none";
          leftEl.current.style.pointerEvents = "none";
          rightEl.current.style.userSelect = "none";
          rightEl.current.style.pointerEvents = "none";
        }
      },
      [resizer, resizerWrapper, leftEl, rightEl, minLeftWidth, maxLeftWidth]
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
    }, [mouseMoveHandler]);

    const mouseDownHandler = useCallback(
      (e: { clientX: number; clientY: number }) => {
        setMouseMoving(true);

        data.current.startX = e.clientX;
        data.current.startY = e.clientY;
        data.current.leftWidth = leftEl.current!.getBoundingClientRect().width;

        // Attach the listeners to `document`
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
      },
      [mouseMoveHandler, mouseUpHandler]
    );

    return (
      <div
        className={classNames({
          resizable,
          "split-pane": true,
          [SplitPaneCss]: true,
        })}
      >
        {!leftHidden && (
          <div
            className="left pane scroll scroll-7"
            ref={leftEl}
            style={{
              ...(resizable ? { width: leftWidth } : { width: 0 }),
            }}
          >
            <div className="left-inner-wrapper scroll scroll-8"> {left}</div>
          </div>
        )}
        <div className="resizer-wrapper" ref={resizerWrapper}>
          <div className="resizer-anchor">
            <div
              className="resizer"
              ref={resizer}
              onMouseDown={resizable ? mouseDownHandler : undefined}
            />
            {enableToggleLeft && (
              <div className="toggle-left">
                <div
                  className="toggle"
                  onClick={() => {
                    setLeftHidden((i) => !i);
                  }}
                >
                  {toggleLeftComponent || leftHidden ? "➡️" : "⬅️"}
                </div>
              </div>
            )}
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
