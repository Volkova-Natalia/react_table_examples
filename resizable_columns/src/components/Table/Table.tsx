import React from "react";
import styled from "styled-components/macro";
import { useTable, useFlexLayout, useResizeColumns } from "react-table";
import { StyledTableResizableColumns } from "./features/ResizableColumns";
import { TableColumnResizer } from "./features/ResizableColumns";
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

/* Resize columns */
  ${StyledTableResizableColumns}


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

    state,
  }: any = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFlexLayout,
    useResizeColumns,
  );

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
                    <TableColumnResizer column={column}/>
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
            return (
              <TR {...row.getRowProps()}>
                {row.cells.map((cell: any, i_cell: number) => {
                  return (
                    <TD {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TD>
                  );
                })}
              </TR>
            );
          })}
        </TBODY>

      </TABLE>
    </>
  );
}


function Table(props: { columns: Array<ColumnInterface>, data: Array<Object> }) {
  return (
    <StyledTable>
      <div id="content">
        <div>Text before</div>
        <div className="table-wrapper
                        resize-columns">
          <ReactTable columns={props.columns} data={props.data}/>
        </div>
        <div>Text after</div>
      </div>
    </StyledTable>
  );
}


export default Table;