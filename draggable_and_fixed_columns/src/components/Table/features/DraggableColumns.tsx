import React from "react";
import { Draggable, DragUpdate, DropResult, ResponderProvided } from "react-beautiful-dnd";


// --------------------------------------------------

const getTableDraggableColumnsStyle = ({ isDragging, isDropAnimating }: any, draggableStyle: any) => ({
  ...draggableStyle,
  // some basic styles to make the th look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "rgba(160, 160, 160, 0.40)" : null,

  ...(!isDragging && { transform: "translate(0,0)" }),
  ...(isDropAnimating && { transitionDuration: "0.001s" }),

  // styles we need to apply on draggables
});

// --------------------------------------------------


// --------------------------------------------------

export function onTableDragStart(currentColOrder: any, flatHeaders: any) {
  currentColOrder.current = flatHeaders.map((o: any, i_o: number) => o.id);
}

export function onTableDragUpdate(dragUpdateObj: DragUpdate, b: ResponderProvided, currentColOrder: any, flatHeaders: any, setColumnOrder: Function) {
  const colOrder = [...currentColOrder.current];
  const sIndex = dragUpdateObj.source.index;
  const dIndex =
    dragUpdateObj.destination && dragUpdateObj.destination.index;

  if (typeof sIndex === "number" && typeof dIndex === "number") {
    const dColumn: Object = flatHeaders[dIndex];
    if (!("fixed_column" in dColumn)) {
      colOrder.splice(sIndex, 1);
      colOrder.splice(dIndex, 0, dragUpdateObj.draggableId);
      setColumnOrder(colOrder);
    }
  }
}

export function onTableDragEnd(result: DropResult, provided: ResponderProvided) {
}

// --------------------------------------------------


// --------------------------------------------------

export function TableDraggableRow(props: { column: any, i_column: number, children: any }) {
  return (
    <Draggable
      key={props.column.id}
      draggableId={props.column.id}
      index={props.i_column}
      isDragDisabled={!props.column.accessor}
    >
      {props.children}
    </Draggable>
  );
}

export function TableDraggableCell(props: { provided: any, snapshot: any, column: any, children: any }) {
    if ("fixed_column" in props.column) {
      return (
        <div
          ref={props.provided.innerRef}
        >
          {props.children}
        </div>
      );
    } else {
      return (
        <div
          {...props.provided.draggableProps}
          {...props.provided.dragHandleProps}
          ref={props.provided.innerRef}
          style={{
            ...getTableDraggableColumnsStyle(
              props.snapshot,
              props.provided.draggableProps.style,
            ),
          }}
        >
          {props.children}
        </div>
      );
    }

    return null;
  }

// --------------------------------------------------
