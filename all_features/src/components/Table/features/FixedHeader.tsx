import React from "react";
import { css } from "styled-components/macro";


// --------------------------------------------------

export const StyledTableFixedHeader = css`
  .fixed-header .thead {
    position: sticky;
    //position: -webkit-sticky; - for Safary?
    top: 0;
    z-index: 1;
  }
`;

// --------------------------------------------------
