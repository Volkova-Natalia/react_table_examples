import React, { useState } from "react";
import styled from "styled-components/macro";
import { useTable, useBlockLayout, useExpanded } from "react-table";
import { StyledTableExpandableRows, getTableExpandableRowsStyle } from "./features/ExpandableRows";
import { TableDetail } from "./features/DetailRows";
import { isVisibleRow } from "./features/ExpandableRows";
import { setStateExpandedDetailRowsId } from "./features/ExpandableDetailRows";
import { TABLE, THEAD, TBODY, TR, TD, TH } from "./Components";


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

  .table {
    overflow: scroll;
    //overflow: auto;
    flex-grow: 1;
    //height: 80%;
  }

/* Expandable rows */
  .table-wrapper ${StyledTableExpandableRows}


/* A bit more styling to make it look better */

  .table-wrapper {
    background: CadetBlue;
    border-style: solid;
    border-color: black;
    border-width: 2px;
    padding: 16px 16px 16px 16px;
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
    text-align: left;
    border: 1px solid black;
    border-spacing: 0;
  }

  .table-wrapper .td div, .th div {  
    height: 100%;
  }
`;


export interface ColumnInterface {
  id: string,
  Header: any,
  Cell?: any,
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

    state,
  }: any = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useExpanded,
  );


  // For expandable and detail rows (begin)

  const [expandedDetailRowsId, setExpandedDetailRowsId] = useState({
    expanded: [] = new Array<any>(),
    detail: [] = new Array<any>(),
  });

  // For expandable and detail rows (end)

  return (
    <>
      <TABLE {...getTableProps()}>

        {/* ----- Header ----- */}
        <THEAD>
          {headerGroups.map((headerGroup: any, i_headerGroup: number) => (
            <TR {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any, i_column: number) => {
                return (
                  <TH {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TH>
                );
              })}
            </TR>
          ))}
        </THEAD>

        {/* ----- Body ----- */}
        <TBODY {...getTableBodyProps()}>
          {rows.map((row: any, i_row: number) => {
            prepareRow(row);
            const isSubRowClassName = (row.depth > 0) ? "subRow" : "";
            setStateExpandedDetailRowsId(row, expandedDetailRowsId, setExpandedDetailRowsId);
            return (
              isVisibleRow(row) ? (
                <div>
                  <TR {...row.getRowProps()}>
                    {row.cells.map((cell: any, i_cell: number) => {
                      return (
                        <TD className={isSubRowClassName + " " + cell.column.id} {...cell.getCellProps()}
                            style={{ ...cell.getCellProps().style, ...getTableExpandableRowsStyle(row.depth, cell.column.id) }}>
                          {cell.render("Cell")}
                        </TD>
                      );
                    })}
                  </TR>
                  <TableDetail row={row} detail={detail}/>
                </div>
              ) : null
            );
          })}
        </TBODY>

      </TABLE>
    </>
  );
}


function Table(props: { columns: Array<ColumnInterface>, data: Array<Object>, detail: any }) {
  return (
    <StyledTable>
      <div id="content">
        <div>Text before</div>
        <div className="table-wrapper">
          <ReactTable columns={props.columns} data={props.data} detail={props.detail}/>
        </div>
        <div>Text after</div>
      </div>
    </StyledTable>
  );
}


export default Table;