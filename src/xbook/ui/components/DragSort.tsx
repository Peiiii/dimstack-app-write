import type { Identifier, XYCoord } from "dnd-core";
import type { FC } from "react";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
const ItemTypes = {
  Activity: "activity",
};

const defaultStyle = {
  // border: "1px dashed gray",
  // padding: "0.5rem 1rem",
  // marginBottom: ".5rem",
  // backgroundColor: "white",
  // cursor: "move",
};
export const moveItem = (data, idx1, idx2) => {
  if (idx1 === idx2) return data;
  const before = data.slice(0, Math.min(idx1, idx2));
  const after = data.slice(Math.max(idx1, idx2) + 1);
  const middle = data.slice(Math.min(idx1, idx2) + 1, Math.max(idx1, idx2));
  const source = data[idx1];
  const target = data[idx2];

  if (idx1 < idx2) {
    return [...before, ...middle, target, source, ...after];
  } else {
    return [...before, source, target, ...middle, ...after];
  }
};
export interface DragItemProps {
  id: any;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  // moveItem: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const DragSortItem: FC<DragItemProps> = ({
  id,
  index,
  moveItem,
  children,
  style,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.Activity,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
   
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.Activity,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  return (
    <div
      className={`draggable ${className || ""} ${isDragging ? "is-dragging" : ""}`}
      ref={ref}
      style={{ ...defaultStyle, ...style }}
      data-handler-id={handlerId}
    >
      {children}
    </div>
  );
};
