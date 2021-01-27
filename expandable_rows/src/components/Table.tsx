import React from "react";
import styled from "styled-components/macro";
import { useTable, useBlockLayout, useExpanded } from "react-table";


const StyledTable = styled.div`
  & {
    height: 50%;
  }

  #content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
    
/* Expanded rows */

  .table-wrapper .tr .subRow{
    color: #404040;
    //background-color: red;
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
    text-align: left;
    border: 1px solid black;
    border-spacing: 0;
  }

  .table-wrapper .td div, .th div {  
    height: 100%;
  }
`;


export function getExpanderCell(row: any) {
  function getForDepthOne(level: number) {
    const symbol = "⁝";
    return (
      <span
        {...row.getToggleRowExpandedProps({
          style: {
            // We can even use the row.depth property
            // and paddingLeft to indicate the depth
            // of the row
            // paddingLeft: `${(level) * 2}rem`,
            // paddingLeft: `${(level) * 8}px`,
            paddingLeft: "8px",
          },
        })}
      >
        {symbol}
      </span>
    );
  }

  function getForDepthAll() {
    let components = Array();
    for (let level = 0; level < row.depth; level++) {
      components.push(getForDepthOne(level));
    }

    return (
      components
    );
  }

  function getForExpanded() {
    return (
      row.canExpand ? (
        <span
          {...row.getToggleRowExpandedProps({
            style: {
              // We can even use the row.depth property
              // and paddingLeft to indicate the depth
              // of the row
              // paddingLeft: `${row.depth * 2}rem`,
              // paddingLeft: `${row.depth * 8}px`,
              paddingLeft: "8px",
            },
          })}
        >
        {/*{row.isExpanded ? "👇" : "👉"}*/}
          {/*  {row.isExpanded ? "👇🏻" : "👉🏻"}*/}
          {row.isExpanded ? "↓" : "→"}
          {/*{row.isExpanded ? "-" : "+"}*/}
      </span>
      ) : null
    );
  }

  return (
    <>
      {getForDepthAll()}
      {getForExpanded()}
    </>
  );
}


function getExpandableRowsStyle(depthLevel?: number, cell_id?: string) {
  if (cell_id && cell_id !== "expander") {
    return depthLevel ? {
      paddingLeft: `${depthLevel * 8}px`,
    } : {};
  }
  return {};

}

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
        <div className="table" {...getTableProps()}>

          {/* ----- Header ----- */}
          <div className="thead">
            {headerGroups.map((headerGroup: any, i_headerGroup: number) => (
              <div className="tr" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any, i_column: number) => {
                  return (
                    <div className="th" {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </div>  // th
                  );
                })}
              </div>  // </tr>
            ))}
          </div>
          {/* thead */}

          {/* ----- Body ----- */}
          <div className="tbody" {...getTableBodyProps()}>
            {rows.map((row: any, i_row: number) => {
              const isSubRowClassName = (row.depth > 0) ? "subRow" : "";
              prepareRow(row);
              return (
                <div className="tr" {...row.getRowProps()}>
                  {row.cells.map((cell: any, i_cell: number) => {
                    return (
                      <div className={"td " + isSubRowClassName + " " + cell.column.id} {...cell.getCellProps()}
                           style={{ ...cell.getCellProps().style, ...getExpandableRowsStyle(row.depth, cell.column.id) }}>
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