import React, { useState } from "react";
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

// const AllOnStyled = styled.button`
//
// `;
//
// const AllOffStyled = styled.button`
//
// `;

// --------------------------------------------------

function getMayHiddenColumns(allColumns: Array<any>) {
  let columns = new Array<any>();
  allColumns.map((column: any, i_column: number) => {
    if (column.is_hidden) {
      columns.push(column);
    }
  });
  return columns;
}

// --------------------------------------------------

// let checkboxes = Array.from(document.getElementsByName("table_visible_column_checkbox"));
// let select_deselect: any = document.getElementById("table_visible_column_select_deselect_all_checkboxes");

// --------------------------------------------------

function toggle(on_off: "on" | "off", mayHiddenColumns: Array<any>, setStateCountChecked: Function) {
  let checkboxes = Array.from(document.getElementsByName("table_visible_column_checkbox"));

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

  setStateCountChecked(() => (on_off === "on") ? mayHiddenColumns.length : 0);

  let hidden = (on_off === "off") ? true : false;
  mayHiddenColumns.map((column: any, i_column: number) => {
    column.toggleHidden(hidden);
  });

}

// function AllOn(props: { allColumns: any }) {
//   return (
//     <AllOnStyled id="AllOn" onClick={() => toggle("on", props.allColumns)}>
//       ON all
//     </AllOnStyled>
//   );
// }
//
// function AllOff(props: { allColumns: any }) {
//   return (
//     <AllOnStyled id="AllOff" onClick={() => toggle("off", props.allColumns)}>
//       OFF all
//     </AllOnStyled>
//   );
// }

function SelectDeselectAll(props: { mayHiddenColumns: Array<any>, setStateCountChecked: Function }) {
  return (
    <label>
      <input type="checkbox" id="table_visible_column_select_deselect_all_checkboxes" defaultChecked={true}
             onChange={(e) =>
               toggle(e.target.checked ? "on" : "off", props.mayHiddenColumns, props.setStateCountChecked)
             }/>{" "}
      {/*/>{" "}*/}
      Select / Deselect all
    </label>
  );
}

// --------------------------------------------------


// --------------------------------------------------

export function TableHidingColumnsSelector(props: { allColumns: Array<any> }) {
  const mayHiddenColumns = getMayHiddenColumns(props.allColumns);
  const [countChecked, setCountChecked] = useState(Number(mayHiddenColumns.length));
  return (
    <TableHidingColumnsSelectorStyled>
      {/*<div>*/}
      {/*  <AllOn allColumns={props.allColumns}/>*/}
      {/*  <AllOff allColumns={props.allColumns}/>*/}
      {/*</div>*/}

      <SelectDeselectAll mayHiddenColumns={mayHiddenColumns} setStateCountChecked={setCountChecked}/>

      {
        mayHiddenColumns.map((column: any, i_column: number) => (
          <div key={column.id} style={{ "marginLeft": "16px" }}>
            <label>
              {/*<input type="checkbox" name="table_visible_column_checkbox" {...column.getToggleHiddenProps()}*/}
              <input type="checkbox" name="table_visible_column_checkbox" defaultChecked={true}
                     onChange={(e) => {
                       const newCountChecked = (e.target.checked) ? (countChecked + 1) : (countChecked - 1);
                       setCountChecked(newCountChecked);
                       let select_deselect: any = document.getElementById("table_visible_column_select_deselect_all_checkboxes");
                       if (newCountChecked === 0) {
                         // select_deselect.removeAttribute("checked");
                         select_deselect.checked = false;
                         select_deselect.indeterminate = false;
                       } else if (newCountChecked === mayHiddenColumns.length) {
                         select_deselect.checked = true;
                         select_deselect.indeterminate = false;
                       } else {
                         select_deselect.checked = false;
                         select_deselect.indeterminate = true;
                       }
                       // select_deselect.indeterminate = true;
                       // select_deselect.checked = false;
                       // select_deselect.setAttribute("indeterminate");
                       column.toggleHidden(!e.target.checked);
                     }}/>{" "}
              {(column.Header) ? column.Header : column.id}
            </label>
          </div>
        ))
      }
    </TableHidingColumnsSelectorStyled>
  );
}

// --------------------------------------------------
