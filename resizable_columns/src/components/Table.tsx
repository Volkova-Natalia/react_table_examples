import React from "react";
import styled from "styled-components/macro";
import { useTable, useBlockLayout, useResizeColumns } from "react-table";


const StyledTable = styled.div`
  & {
    height: 50%;
  }

  #content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }


/* Resize columns */
 
  .resize-columns .table {
    .th, .td {
      .resizer {
        display: inline-block;
        width: 10px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        //${"" /* prevents from scrolling while dragging on touch devices */}
        touch-action: none;

        //&.isResizing {
        //  background: red;
        //}
      }
    }
  }
  
  .resize-columns .td, .th {
    overflow: hidden;
    text-overflow: ellipsis;
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
    useBlockLayout,
    useResizeColumns,
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
                      {/*Use column.getResizerProps to hook up the events correctly*/}
                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${
                          column.isResizing ? "isResizing" : ""
                        }`}
                      />
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