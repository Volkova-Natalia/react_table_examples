import React from "react";
import styled from "styled-components/macro";
import { useTable, useBlockLayout } from "react-table";
import { TableHidingColumnsSelector } from "./features/HidingColumns";
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

  .table {
    overflow: scroll;
    //overflow: auto;
    flex-grow: 1;
    //height: 80%;
  }


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
    text-align: center;  
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
  Header: string,
  is_hidden?: boolean,
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
    allColumns,

    state,
  }: any = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
  );


  return (
    <>
      <TableHidingColumnsSelector allColumns={allColumns}/>

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
        <div className="table-wrapper">
          <ReactTable columns={props.columns} data={props.data}/>
        </div>
        <div>Text after</div>
      </div>
    </StyledTable>
  );
}


export default Table;