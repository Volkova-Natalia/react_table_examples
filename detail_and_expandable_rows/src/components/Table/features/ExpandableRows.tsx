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

export const isVisibleRow = ((row: any) => ((row.depth === 0) || (row.is_parent_expand)));

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

  function setSubRows_is_parent_expand(curr_row: any) {
    if (curr_row.subRows.length == 0) {
      return;
    }
    curr_row.subRows.map((subRow: any, i_subRow: number) => {
      subRow.is_parent_expand = curr_row.is_parent_expand;
      setSubRows_is_parent_expand(subRow);
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
              row.is_expand = row.is_expand ? false : true;
              row.subRows.map((subRow: any, i_subRow: number) => {
                subRow.is_parent_expand = row.is_expand;
                setSubRows_is_parent_expand(subRow);
              });
              row.toggleRowExpanded(row.is_detail | row.is_expand);
            },
          })}
        >
        {/*{row.isExpanded ? "👇" : "👉"}*/}
          {/*  {row.isExpanded ? "👇🏻" : "👉🏻"}*/}
          {row.is_expand ? "👇🏻" : "👉🏻"}
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
