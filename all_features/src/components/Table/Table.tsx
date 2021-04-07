/*
Requirements for Table:
1.  + fixed header
2.    fixed footer
3.  + fixed columns
4.  + horizontal scroll
5.  + vertical scroll
6.  + resizing columns
7.  + draggable columns
8.    draggable rows
9.  + hiding columns
10.   filter (search) by each column
11. + expanded row
12. + detail row
13. + selecting one record
14. + selecting several records
15. + sort by each column
16. + borders between columns
*/

import React, { useState } from "react";
import styled from "styled-components/macro";
import {
  useTable,
  useBlockLayout,
  useResizeColumns,
  useColumnOrder,
  useExpanded,
  useSortBy,
  useRowSelect,
} from "react-table";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { StyledTableFixedHeader } from "./features/FixedHeader";
import { StyledTableFixedFooter } from "./features/FixedFooter";
import { StyledTableFixedColumns, getTableFixedColumnStyle } from "./features/FixedColumns";
import { StyledTableResizableColumns } from "./features/ResizableColumns";
import { TableColumnResizer } from "./features/ResizableColumns";
import { onTableDragStart, onTableDragUpdate, onTableDragEnd } from "./features/DraggableColumns";
import { TableDraggableRow, TableDraggableCell } from "./features/DraggableColumns";
import { StyledTableExpandableRows, getTableExpandableRowsStyle } from "./features/ExpandableRows";
import { StyledTableDetailRows } from "./features/DetailRows";
import { TableDetail } from "./features/DetailRows";
import { isVisibleRow } from "./features/ExpandableRows";
import { setStateExpandedDetailRowsId } from "./features/ExpandableDetailRows";
import { TableColumnSorter } from "./features/SortByColumn";
import { sortHeaderPropGetter } from "./features/SortByColumn";
import { TableHidingColumnsSelector } from "./features/HidingColumns";


const StyledTable = styled.div`
  & {
    height: 50%;
  }

  #content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  
/* Features */

  .fixed {
    overflow: scroll;
    flex-grow: 1;
  }

/* Fixed header */
  ${StyledTableFixedHeader}

/* Fixed header */
  ${StyledTableFixedFooter}
  
/* Fixed columns */
  ${StyledTableFixedColumns}

/* Resize columns */
  ${StyledTableResizableColumns}

/* Expandable rows */
  .table-wrapper ${StyledTableExpandableRows}

/* Detail rows */
  .table-wrapper ${StyledTableDetailRows}

/* A bit more styling to make it look better */

  .table-wrapper {
    background: CadetBlue;
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
    text-align: left;  
    border-style: solid;
    border-color: black;
    border-spacing: 0;
    ${() => {
      const padding = { top: 4, right: 4, bottom: 4, left: 4 };
      const border = { top: 1, right: 1, bottom: 1, left: 1 };
      return (`
        padding: ${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;
        border-width: ${border.top}px ${border.right}px ${border.bottom}px ${border.left}px;
        min-height: ${21 + border.top + padding.top + padding.bottom + border.bottom}px;
      `);
    }}
  }

  .table-wrapper .td div, .th div {  
    height: 100%;
  }
`;


export interface ColumnInterface {
  id: string,
  Header: string | Function,
  fixed_column?: "left" | "right",
  is_sortable?: boolean,
  is_hidden?: boolean,
  Cell?: Function,
  accessor?: Function,
}

function ReactTable({ columns, data, detail }: any) {
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
    allColumns,
    selectedFlatRows, // using: selectedFlatRows.map(record => record.original)

    state,
  }: any = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns,
    useColumnOrder,
    useSortBy,
    useExpanded,
    useRowSelect,
  );

  const currentColOrder: any = React.useRef();  // For draggable columns


  // For expandable and detail rows (begin)

  const [expandedDetailRowsId, setExpandedDetailRowsId] = useState({
    expanded: [] = new Array<any>(),
    detail: [] = new Array<any>(),
  });

  // For expandable and detail rows (end)


  return (
    <>
      <div>
        <TableHidingColumnsSelector allColumns={allColumns}/>

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
                              <div className="th" {...column.getHeaderProps(sortHeaderPropGetter(column))}
                                   style={{
                                     ...column.getHeaderProps().style,
                                     ...getTableFixedColumnStyle(column),
                                   }}>
                                <TableDraggableCell provided={provided} snapshot={snapshot} column={column}>
                                  {column.render("Header")}
                                  {/* Add a sort direction indicator */}
                                  <TableColumnSorter column={column}/>
                                </TableDraggableCell>
                                <TableColumnResizer column={column}/>
                              </div>  // </th>
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
              const isSubRowClassName = (row.depth > 0) ? "subRow" : "";
              setStateExpandedDetailRowsId(row, expandedDetailRowsId, setExpandedDetailRowsId);
              return (
                isVisibleRow(row) ? (
                  <div>
                    <div className="tr" {...row.getRowProps()}>
                      {row.cells.map((cell: any, i_cell: number) => {
                        return (
                          <div className={"td " + isSubRowClassName + " " + cell.column.id} {...cell.getCellProps()}
                               style={{
                                 ...cell.getCellProps().style,
                                 ...getTableFixedColumnStyle(cell.column),
                                 ...getTableExpandableRowsStyle(row.depth, cell.column.id),
                               }}>
                            {cell.render("Cell")}
                          </div>  // td
                        );
                      })}
                    </div>
                    {/*tr*/}
                    <TableDetail row={row} detail={detail}/>
                  </div>
                ) : null
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


function Table(props: { columns: Array<ColumnInterface>, data: Array<Object>, detail: any }) {
  return (
    <StyledTable>
      <div id="content">
        {/*<div>Text before</div>*/}
        <div className="table-wrapper
                        fixed fixed-header fixed-footer
                        resize-columns">
          <ReactTable columns={props.columns} data={props.data} detail={props.detail}/>
        </div>
        {/*<div>Text after</div>*/}
      </div>
    </StyledTable>
  );
}


export default Table;
