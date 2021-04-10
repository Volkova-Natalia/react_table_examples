import React from "react";
import { css } from "styled-components/macro";


// --------------------------------------------------

export const StyledTableResizableColumns = css`
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
  
  .resize-columns .td, .resize-columns .th {
    overflow: hidden;
    text-overflow: ellipsis;
    
    flex-grow: 0 !important;
    :last-child {
      flex-grow: 1 !important;
     }
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
