import React from "react";
import { css } from "styled-components/macro";


// --------------------------------------------------

export const StyledTableFixedHeader = css`
  .fixed .table {
    overflow-y: scroll;
    //overflow-y: auto;
    flex-grow: 1;
    height: 80%;
  }

  .fixed-header .thead {
    position: sticky;
    //position: -webkit-sticky; - for Safary?
    top: 0;
  }
`;

// --------------------------------------------------
