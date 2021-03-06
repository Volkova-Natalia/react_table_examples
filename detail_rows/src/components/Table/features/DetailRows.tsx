import React from "react";
import styled from "styled-components/macro";
import { TR } from "../Components";


// --------------------------------------------------

const StyledTableDetailRows = styled.div`
  & {
    width: 100%;
    padding: 4px 4px 4px 4px;
    text-align: center;
    border: 1px solid black;
    border-spacing: 0;
  }
`;

// --------------------------------------------------


// --------------------------------------------------

export function getTableDetailerCell(row: any) {
  return (
    <>
      {/*Use Cell to render an expander for each row.*/}
      {/*We can use the getToggleRowExpandedProps prop-getter*/}
      {/*to build the expander.*/}
      <span {...row.getToggleRowExpandedProps()}>
        {/*{row.isExpanded ? "👇🏻" : "👉🏻"}*/}
        {row.isExpanded ? "-" : "+"}
      </span>
    </>
  );
}

// --------------------------------------------------


// --------------------------------------------------

export function TableDetail(props: { row: any, detail: any }) {
  return (
    props.row.isExpanded ? (
      <TR {...props.row.getRowProps()}>
        {/*
            Inside it, call our renderRowSubComponent function. In reality,
            you could pass whatever you want as props to
            a component like this, including the entire
            table instance. But for this example, we'll just
            pass the row
        */}
        <StyledTableDetailRows>
          {props.detail(props.row)}
        </StyledTableDetailRows>
      </TR>
    ) : null
  );
}

// --------------------------------------------------
