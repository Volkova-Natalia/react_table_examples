import React from "react";
import { css } from "styled-components/macro";


// --------------------------------------------------

export const StyledTableExpandableRows = css`
  .tr .subRow {
    color: #404040;
    //background-color: red;
  }
`;

// --------------------------------------------------


// --------------------------------------------------

export function getTableExpandableRowsStyle(depthLevel?: number, cell_id?: string) {
  if (cell_id && cell_id !== "expander") {
    return depthLevel ? {
      paddingLeft: `${depthLevel * 8}px`,
    } : {};
  }
  return {};

}

// --------------------------------------------------


// --------------------------------------------------

export function getIAddedDeletedExpanded(row: any, expanded_rows_id: Array<any>) {
  let i_added_expanded: number | null = null;
  let i_deleted_expanded: number | null = null;
  if (row.is_expanded) {
    i_added_expanded = expanded_rows_id.indexOf(row.id);
  } else {
    i_deleted_expanded = expanded_rows_id.indexOf(row.id);
  }
  return [i_added_expanded, i_deleted_expanded];
}

export const isRequiredAddExpanded = ((i_added_expanded: number | null) => ((i_added_expanded !== null) && (i_added_expanded < 0)));
export const isRequiredDeleteExpanded = ((i_deleted_expanded: number | null) => ((i_deleted_expanded !== null) && (i_deleted_expanded >= 0)));

export const isVisibleRow = ((row: any) => ((row.depth === 0) || (row.is_parent_expanded)));

// --------------------------------------------------


// --------------------------------------------------

export function getTableExpanderCell(row: any) {
  function getForDepthOne(level: number) {
    // const symbol = "⁝";
    const symbol = row.canExpand ? "|" : "L";
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

  function setSubRows_is_parent_expanded(curr_row: any) {
    if (curr_row.subRows.length == 0) {
      return;
    }
    curr_row.subRows.map((subRow: any, i_subRow: number) => {
      subRow.is_parent_expanded = curr_row.is_parent_expanded;
      setSubRows_is_parent_expanded(subRow);
    });
  }

  function getForExpanded() {
    const s1: any = (
      // <>&#9660;</>
      <>&#9698;</>
    );
    const s2: any = (
      <>&#9654;</>
    );
    return (
      row.canExpand ? (
        <span
          {...row.getToggleRowExpandedProps({
            style: {
              // We can even use the row.depth property
              // and paddingLeft to indicate the depth
              // of the row
              // paddingLeft: `${row.depth * 2}rem`,
              paddingLeft: `${row.depth * 8}px`,
              // paddingLeft: "8px",
              // fontSize:"10px",
            },

            onClick: () => {
              row.is_expanded = row.is_expanded ? false : true;
              row.subRows.map((subRow: any, i_subRow: number) => {
                subRow.is_parent_expanded = row.is_expanded;
                setSubRows_is_parent_expanded(subRow);
              });
              row.toggleRowExpanded(row.is_detail | row.is_expanded);
            },
          })}
        >
        {/*{row.isExpanded ? "👇" : "👉"}*/}
          {/*  {row.isExpanded ? "👇🏻" : "👉🏻"}*/}
          {row.is_expanded ? "👇🏻" : "👉🏻"}
          {/*{row.isExpanded ? "↓" : "→"}*/}
          {/*{row.isExpanded ? "➘" : "➙"}*/}
          {/*{row.isExpanded ? "➘" : "➙"}*/}
          {/*{row.isExpanded ? s1 : s2}*/}
          {/*{row.isExpanded ? "-" : "+"}*/}
      </span>
      ) : null
    );
  }

  return (
    <>
      {/*{getForDepthAll()}*/}
      {getForExpanded()}
    </>
  );
}

// --------------------------------------------------
