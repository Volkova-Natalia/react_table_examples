import React from "react";
import styled from "styled-components/macro";
import { useTable, useBlockLayout, useColumnOrder } from "react-table";
import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided, DragUpdate } from "react-beautiful-dnd";


const StyledTable = styled.div`
  & {
    height: 50%;
  }

  #content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }


/* A bit more styling to make it look better */

  .table-wrapper {
    background: CadetBlue;
    overflow: scroll;
    flex-grow: 1;
  }

  .table-wrapper .table {
    width: 100%;
  }

  .table-wrapper .th {
    background: #DDD;
  }

  .table-wrapper .td {
    background: CadetBlue;
  }

  .table-wrapper .td, .th {
    padding: 4px 4px 4px 4px;
    text-align: center;  
    border: 1px solid black;
    border-spacing: 0;
  }
`;


const getDraggableColumnsStyle = ({ isDragging, isDropAnimating }: any, draggableStyle: any) => ({
  ...draggableStyle,
  // some basic styles to make the th look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "rgba(160, 160, 160, 0.40)" : null,

  ...(!isDragging && { transform: "translate(0,0)" }),
  ...(isDropAnimating && { transitionDuration: "0.001s" }),

  height: "100%",

  // styles we need to apply on draggables
});


export interface ColumnInterface {
  id: string,
  Header: string,
  accessor: Function,
}

function ReactTable({ columns, data }: any) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    flatHeaders,
    setColumnOrder,

    state,
  }: any = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useColumnOrder,
  );

  const currentColOrder: any = React.useRef();

  function onDragStart() {
    currentColOrder.current = flatHeaders.map((o: any, i_o: number) => o.id);
  }

  function onDragUpdate(dragUpdateObj: DragUpdate, b: ResponderProvided) {
    const colOrder = [...currentColOrder.current];
    const sIndex = dragUpdateObj.source.index;
    const dIndex =
      dragUpdateObj.destination && dragUpdateObj.destination.index;

    if (typeof sIndex === "number" && typeof dIndex === "number") {
      colOrder.splice(sIndex, 1);
      colOrder.splice(dIndex, 0, dragUpdateObj.draggableId);
      setColumnOrder(colOrder);
    }
  }

  function onDragEnd(result: DropResult, provided: ResponderProvided) {
  }

  return (
    <>
      <div>
        <div className="table" {...getTableProps()}>

          {/* ----- Header ----- */}
          <div className="thead">
            {headerGroups.map((headerGroup: any, i_headerGroup: number) => (
              <DragDropContext
                onDragStart={onDragStart}
                onDragUpdate={onDragUpdate}
                onDragEnd={onDragEnd}
              >
                <Droppable droppableId="droppable" direction="horizontal">
                  {(droppableProvided, snapshot) => (
                    <div className="tr" {...headerGroup.getHeaderGroupProps()} ref={droppableProvided.innerRef}>
                      {headerGroup.headers.map((column: any, i_column: number) => (
                        <Draggable
                          key={column.id}
                          draggableId={column.id}
                          index={i_column}
                          isDragDisabled={!column.accessor}
                        >
                          {(provided, snapshot) => {
                            return (
                              <div className="th" {...column.getHeaderProps()}>
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  style={{
                                    ...getDraggableColumnsStyle(
                                      snapshot,
                                      provided.draggableProps.style,
                                    ),
                                  }}
                                >
                                  {column.render("Header")}
                                </div>
                              </div>  // </th>
                            );
                          }}
                        </Draggable>
                      ))}
                    </div>  // </tr>
                  )}
                </Droppable>
              </DragDropContext>
            ))}
          </div>
          {/* thead */}

          {/* ----- Body ----- */}
          <div className="tbody" {...getTableBodyProps()}>
            {rows.map((row: any, i_row: number) => {
              prepareRow(row);
              return (
                <div className="tr" {...row.getRowProps()}>
                  {row.cells.map((cell: any, i_cell: number) => {
                    return (
                      <div className="td" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </div>  // td
                    );
                  })}
                </div>  // tr
              );
            })}
          </div>
          {/* tbody */}

        </div>
        {/* table */}
      </div>
    </>
  );
}


function Table(props: { columns: Array<ColumnInterface>, data: Array<Object> }) {
  return (
    <StyledTable>
      <div id="content">
        <div>Text before</div>
        <div className="table-wrapper">
          <ReactTable columns={props.columns} data={props.data}/>
        </div>
        <div>Text after</div>
      </div>
    </StyledTable>
  );
}


export default Table;