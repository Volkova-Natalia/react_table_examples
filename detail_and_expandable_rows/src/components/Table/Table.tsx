import React, { useState } from "react";
import styled from "styled-components/macro";
import { useTable, useBlockLayout, useExpanded } from "react-table";
import { StyledTableExpandableRows, getTableExpandableRowsStyle } from "./features/ExpandableRows";
import { StyledTableDetailRows } from "./features/DetailRows";
import { TableDetail } from "./features/DetailRows";
import { getIAddedDeletedExpanded, isRequiredAddExpanded, isRequiredDeleteExpanded } from "./features/ExpandableRows";
import { getIAddedDeletedDetail, isRequiredAddDetail, isRequiredDeleteDetail } from "./features/DetailRows";
import { isVisibleRow } from "./features/ExpandableRows";


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


  // For expandable and detail rows (begin)

  const [expandedDetailRowsId, setExpandedDetailRowsId] = useState({
    expanded: [] = new Array<any>(),
    detail: [] = new Array<any>(),
  });

  function setStateExpandedDetailRowsId(row: any) {
    const [i_added_expanded, i_deleted_expanded] = getIAddedDeletedExpanded(row, expandedDetailRowsId.expanded);
    const [i_added_detail, i_deleted_detail] = getIAddedDeletedDetail(row, expandedDetailRowsId.detail);

    if (
      (isRequiredAddExpanded(i_added_expanded)) ||
      (isRequiredDeleteExpanded(i_deleted_expanded)) ||
      (isRequiredAddDetail(i_added_detail)) ||
      (isRequiredDeleteDetail(i_deleted_detail))
    ) {
      setExpandedDetailRowsId((prev) => {
        let curr = Object.assign({}, prev);

        if (isRequiredAddExpanded(i_added_expanded)) {
          curr.expanded.push(row.id);
        }
        if (isRequiredAddDetail(i_added_detail)) {
          curr.detail.push(row.id);
        }
        if (isRequiredDeleteExpanded(i_deleted_expanded)) {
          curr.expanded.splice(Number(i_deleted_expanded), 1);
        }
        if (isRequiredDeleteDetail(i_deleted_detail)) {
          curr.detail.splice(Number(i_deleted_detail), 1);
        }
        return curr;
      });
    }
  }

  // For expandable and detail rows (end)

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
              setStateExpandedDetailRowsId(row);
              return (
                isVisibleRow(row) ? (
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