import React from "react";
import styled from "styled-components/macro";
import { useTable, useBlockLayout, useColumnOrder } from "react-table";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { onTableDragStart, onTableDragUpdate, onTableDragEnd } from "./features/DraggableColumns";
import { TableDraggableRow, TableDraggableCell } from "./features/DraggableColumns";
import { getTableFixedColumnStyle } from "./features/FixedColumns";


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

  .table-wrapper .td div, .th div {  
    height: 100%;
  }
`;


export interface ColumnInterface {
  id: string,
  Header: string,
  fixed_column?: "left" | "right";
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


  return (
    <>
      <div>
        <div className="table" {...getTableProps()}>

          {/* ----- Header ----- */}
          <div className="thead">
            {headerGroups.map((headerGroup: any, i_headerGroup: number) => (
              <DragDropContext
                onDragStart={() => onTableDragStart(currentColOrder, flatHeaders)}
                onDragUpdate={(initial, provided) => onTableDragUpdate(initial, provided, currentColOrder, flatHeaders, setColumnOrder)}
                onDragEnd={onTableDragEnd}
              >
                <Droppable droppableId="droppable" direction="horizontal">
                  {(droppableProvided, snapshot) => (
                    <div className="tr" {...headerGroup.getHeaderGroupProps()} ref={droppableProvided.innerRef}>
                      {headerGroup.headers.map((column: any, i_column: number) => (
                        <TableDraggableRow column={column} i_column={i_column}>
                          {(provided: any, snapshot: any) => {
                            return (
                              <div className="th" {...column.getHeaderProps()}
                                   style={{ ...column.getHeaderProps().style, ...getTableFixedColumnStyle(column) }}>
                                <TableDraggableCell provided={provided} snapshot={snapshot} column={column}>
                                  {column.render("Header")}
                                </TableDraggableCell>
                              </div> // </th>
                            );
                          }}
                        </TableDraggableRow>
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
                      <div className="td" {...cell.getCellProps()}
                           style={{ ...cell.getCellProps().style, ...getTableFixedColumnStyle(cell.column) }}>
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