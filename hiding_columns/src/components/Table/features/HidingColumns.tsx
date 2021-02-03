import React from "react";
import styled from "styled-components/macro";


// --------------------------------------------------

const TableHidingColumnsSelectorStyled = styled.div`
  background-color: rgba(57, 236, 236, 0.20);
  border-style: solid;
  border-color: black;
  width: 100%;
  border-width: 2px 2px 2px 2px;
  margin: 16px 8px 24px 8px;
  padding: 16px 16px 16px 16px;
`;

const AllOnStyled = styled.button`

`;

const AllOffStyled = styled.button`

`;

// --------------------------------------------------


// --------------------------------------------------

function toggle(on_off: "on" | "off", allColumns: any) {
  let checkboxes = Array.from(document.getElementsByName("table_hiding_column_checkbox"));

  let checked = (on_off === "on") ? true : false;
  checkboxes.map((checkbox: any, i_checkbox: number) => {

    checkbox.checked = checked;
    // if (on_off === "on") {
    //   checkbox.setAttribute("checked", "checked");
    // }
    // else {
    //   checkbox.removeAttribute("checked");
    // }
  });


  let hidden = (on_off === "off") ? true : false;
  allColumns.map((column: any, i_column: number) => {
    if (column.is_hidden) {
      column.toggleHidden(hidden);
    }
  });

}

function AllOn(props: { allColumns: any }) {
  return (
    <AllOnStyled id="AllOn" onClick={() => toggle("on", props.allColumns)}>
      ON all
    </AllOnStyled>
  );
}

function AllOff(props: { allColumns: any }) {
  return (
    <AllOnStyled id="AllOff" onClick={() => toggle("off", props.allColumns)}>
      OFF all
    </AllOnStyled>
  );
}

// --------------------------------------------------


// --------------------------------------------------

export function TableHidingColumnsSelector(props: { allColumns: any }) {
  return (
    <TableHidingColumnsSelectorStyled>
      <div>
        <AllOn allColumns={props.allColumns}/>
        <AllOff allColumns={props.allColumns}/>
      </div>
      {
        props.allColumns.map((column: any, i_column: number) => (
          column.is_hidden ? (
            <div key={column.id}>
              <label>
                <input type="checkbox" name="table_hiding_column_checkbox" {...column.getToggleHiddenProps()}/>{" "}
                {(column.Header) ? column.Header : column.id}
              </label>
            </div>
          ) : null
        ))
      }
    </TableHidingColumnsSelectorStyled>
  );
}

// --------------------------------------------------
