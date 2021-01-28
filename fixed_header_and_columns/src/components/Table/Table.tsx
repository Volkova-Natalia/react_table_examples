import React from "react";
import styled from "styled-components/macro";
import { useTable, useBlockLayout } from "react-table";


const StyledTable = styled.div`
  & {
    height: 50%;
  }

  #content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }


/* Fixed header */

  .fixed {
    overflow-y: scroll;
    flex-grow: 1;
  }

  .fixed-header .thead {
    position: sticky;
    //position: -webkit-sticky; - for Safary?
    top: 0;
    z-index: 1;
  }
  
  .fixed .tbody {
    position: relative;
    z-index: 0;
  }

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
    padding: 4px 4px 4px 4px;
    text-align: center;  
    border: 1px solid black;
    border-spacing: 0;
  }

  .table-wrapper .td div, .th div {  
    height: 100%;
  }
`;


function getFixedColumnStyle(column: ColumnInterface) {
  const fixed_column_left_style = {
    position: "sticky",
    left: "0",
    zIndex: "1",
  };

  const fixed_column_right_style = {
    position: "sticky",
    right: "0",
    zIndex: "1",
  };

  if ("fixed_column" in column) {
    switch (column.fixed_column) {
      case "left":
        return fixed_column_left_style;
      case "right":
        return fixed_column_right_style;
      default:
        return {};
    }
  }

  return {};
}


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
      <div>
        <div className="table" {...getTableProps()}>

          {/* ----- Header ----- */}
          <div className="thead">
            {headerGroups.map((headerGroup: any, i_headerGroup: number) => (
              <div className="tr" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any, i_column: number) => {
                  return (
                    <div className="th" {...column.getHeaderProps()}
                         style={{ ...column.getHeaderProps().style, ...getFixedColumnStyle(column) }}>
                      {column.render("Header")}
                    </div>  // </th>
                  );
                })}
              </div>  // </tr>
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
                           style={{ ...cell.getCellProps().style, ...getFixedColumnStyle(cell.column) }}>
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
        <div className="table-wrapper
                       fixed fixed-header">
          <ReactTable columns={props.columns} data={props.data}/>
        </div>
        <div>Text after</div>
      </div>
    </StyledTable>
  );
}


export default Table;