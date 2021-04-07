import React from "react";
import styled from "styled-components/macro";
import { css } from "styled-components/macro";


// --------------------------------------------------

export const StyledTableResizableColumns = css`
  .resize-columns .table {
    .th, .td {
      .resizer {
        display: inline-block;
        //background: blue;
        width: 10px;
        //width: 2px;
        //width: 10%;
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
  
  .resize-columns .td, .th, .td div, .th div {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

// --------------------------------------------------


// --------------------------------------------------

export function TableColumnResizer(props: { column: any }) {
  return (
    // Use column.getResizerProps to hook up the events correctly
    <div
      className={`resizer ${
        props.column.isResizing ? "isResizing" : ""
      }`}
      {...props.column.getResizerProps()}
    />
  );
}

// --------------------------------------------------
