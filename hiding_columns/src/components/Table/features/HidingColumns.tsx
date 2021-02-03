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


function toggle(column: any, mayHiddenColumns: Array<any>, checked: boolean, countChecked: number, setStateCountChecked: Function) {
  const newCountChecked = (checked) ? (countChecked + 1) : (countChecked - 1);
  setStateCountChecked(newCountChecked);

  let select_deselect: any = document.getElementById("table_visible_column_select_deselect_all_checkboxes");
  if (newCountChecked === 0) {
    select_deselect.checked = false;
    select_deselect.indeterminate = false;
  } else if (newCountChecked === mayHiddenColumns.length) {
    select_deselect.checked = true;
    select_deselect.indeterminate = false;
  } else {
    select_deselect.checked = false;
    select_deselect.indeterminate = true;
  }

  column.toggleHidden(!checked);
}

function toggleAll(checked: boolean, mayHiddenColumns: Array<any>, setStateCountChecked: Function) {
  let checkboxes = Array.from(document.getElementsByName("table_visible_column_checkbox"));
  checkboxes.map((checkbox: any, i_checkbox: number) => {
    checkbox.checked = checked;
  });

  setStateCountChecked(() => checked ? mayHiddenColumns.length : 0);

  mayHiddenColumns.map((column: any, i_column: number) => {
    column.toggleHidden(!checked);
  });
}

// --------------------------------------------------


// --------------------------------------------------

function SelectDeselectAll(props: { mayHiddenColumns: Array<any>, setStateCountChecked: Function }) {
  return (
    <label>
      <input type="checkbox" id="table_visible_column_select_deselect_all_checkboxes" defaultChecked={true}
             onChange={(e) =>
               toggleAll(e.target.checked, props.mayHiddenColumns, props.setStateCountChecked)
             }/>{" "}
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
      <SelectDeselectAll mayHiddenColumns={mayHiddenColumns} setStateCountChecked={setCountChecked}/>
      {
        mayHiddenColumns.map((column: any, i_column: number) => (
          <div key={column.id} style={{ "marginLeft": "16px" }}>
            <label>
              <input type="checkbox" name="table_visible_column_checkbox" defaultChecked={true}
                     onChange={(e) =>
                       toggle(column, mayHiddenColumns, e.target.checked, countChecked, setCountChecked)
                     }/>{" "}
              {(column.Header) ? column.Header : column.id}
            </label>
          </div>
        ))
      }
    </TableHidingColumnsSelectorStyled>
  );
}

// --------------------------------------------------
