import React, { useState } from "react";
import styled from "styled-components/macro";
import { useTable, useBlockLayout, useExpanded } from "react-table";
import { StyledTableExpandableRows, getTableExpandableRowsStyle } from "./features/ExpandableRows";
import { StyledTableDetailRows } from "./features/DetailRows";
import { TableDetail } from "./features/DetailRows";


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

/* Detail rows */
  .table-wrapper ${StyledTableDetailRows}

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

  const [isExpandDetailRows, setIsExpandDetailRows] = useState({
    is_detail: [] = new Array<any>(),
    is_expand: [] = new Array<any>(),
  });

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
              prepareRow(row);
              const isSubRowClassName = (row.depth > 0) ? "subRow" : "";

              // if (row.depth === 0) {
              {
                let i_added_expand: number | null = null;
                let i_added_detail: number | null = null;
                let i_deleted_expand: number | null = null;
                let i_deleted_detail: number | null = null;
                if (row.is_expand) {
                  i_added_expand = isExpandDetailRows.is_expand.indexOf(row.id);
                } else {
                  i_deleted_expand = isExpandDetailRows.is_expand.indexOf(row.id);
                }
                if (row.is_detail) {
                  i_added_detail = isExpandDetailRows.is_detail.indexOf(row.id);
                } else {
                  i_deleted_detail = isExpandDetailRows.is_detail.indexOf(row.id);
                }
                console.log(i_added_expand, i_deleted_expand, i_added_detail, i_deleted_detail);
                if (((i_added_expand !== null) && (i_added_expand < 0)) ||
                  ((i_added_detail !== null) && (i_added_detail < 0)) ||
                  ((i_deleted_expand !== null) && (i_deleted_expand >= 0)) ||
                  ((i_deleted_detail !== null) && (i_deleted_detail >= 0))) {
                  setIsExpandDetailRows((prev) => {
                    let curr = Object.assign({}, prev);

                    if ((i_added_expand !== null) && (i_added_expand < 0)) {
                      curr.is_expand.push(row.id);
                    }
                    if ((i_added_detail !== null) && (i_added_detail < 0)) {
                      curr.is_detail.push(row.id);
                    }
                    if ((i_deleted_expand !== null) && (i_deleted_expand >= 0)) {
                      curr.is_expand.splice(i_deleted_expand, 1);
                    }
                    if ((i_deleted_detail !== null) && (i_deleted_detail >= 0)) {
                      curr.is_detail.splice(i_deleted_detail, 1);
                    }
                    return curr;
                  });
                }
              }

              return (
                ((row.depth === 0) || (row.is_parent_expand)) ? (
                  <div>
                    <div className="tr" {...row.getRowProps()}>
                      {row.cells.map((cell: any, i_cell: number) => {
                        return (
                          <div className={"td " + isSubRowClassName + " " + cell.column.id} {...cell.getCellProps()}
                               style={{ ...cell.getCellProps().style, ...getTableExpandableRowsStyle(row.depth, cell.column.id) }}>
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