import React from "react";
import { css } from "styled-components/macro";


// --------------------------------------------------

export const StyledTableDetailRows = css`
  .detailedRow {
    width: 100%;
    padding: 4px 4px 4px 4px;
    text-align: center;
    border: 1px solid black;
    border-spacing: 0;
  }
`;

// --------------------------------------------------


// --------------------------------------------------

export function getIAddedDeletedDetail(row: any, detail_rows_id: Array<any>) {
  let i_added_detail: number | null = null;
  let i_deleted_detail: number | null = null;
  if (row.is_detail) {
    i_added_detail = detail_rows_id.indexOf(row.id);
  } else {
    i_deleted_detail = detail_rows_id.indexOf(row.id);
  }
  return [i_added_detail, i_deleted_detail];
}

export const isRequiredAddDetail = ((i_added_detail: number | null) => ((i_added_detail !== null) && (i_added_detail < 0)));
export const isRequiredDeleteDetail = ((i_deleted_detail: number | null) => ((i_deleted_detail !== null) && (i_deleted_detail >= 0)));

// --------------------------------------------------


// --------------------------------------------------

export function getTableDetailerCell(row: any) {
  return (
    // Use Cell to render an expander for each row.
    // We can use the getToggleRowExpandedProps prop-getter
    // to build the expander.
    <div
      {...row.getToggleRowExpandedProps({
        style: {},

        onClick: () => {
          row.is_detail = row.is_detail ? false : true;
          row.subRows.map((subRow: any, i_subRow: number) => {
            subRow.is_parent_detail = row.is_detail;
          });
          row.toggleRowExpanded(row.is_detail | row.is_expanded);
        },
      })}
    >
      {row.is_detail ? "-" : "+"}
    </div>
  );
}

// --------------------------------------------------


// --------------------------------------------------

export function TableDetail(props: { row: any, detail: any }) {
  return (
    props.row.is_detail ? (
      <div className="tr" {...props.row.getRowProps()}>
        {/*
            Inside it, call our renderRowSubComponent function. In reality,
            you could pass whatever you want as props to
            a component like this, including the entire
            table instance. But for this example, we'll just
            pass the row
        */}
        <div className="detailedRow">
          {props.detail(props.row)}
        </div>
      </div>  // tr
    ) : null
  );
}

// --------------------------------------------------
