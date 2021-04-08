import React from "react";
import styled from "styled-components/macro";
import { useTable, useBlockLayout, useExpanded } from "react-table";
import { StyledTableExpandableRows, getTableExpandableRowsStyle } from "./features/ExpandableRows";
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

/* Expandable rows */
  .table-wrapper ${StyledTableExpandableRows}

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
    useBlockLayout,
    useExpanded,
  );


  return (
    <>
      <div>
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
              const isSubRowClassName = (row.depth > 0) ? "subRow" : "";
              prepareRow(row);
              return (
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
              );
            })}
          </TBODY>

        </TABLE>
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