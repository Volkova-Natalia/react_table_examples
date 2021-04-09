import React, { useState, useRef, MutableRefObject } from "react";
import styled from "styled-components/macro";


// --------------------------------------------------

const TableHidingColumnsSelectorStyled = styled.div`
  & {  
    position: relative;
    display: inline-block;
    float: right;
    
    :hover {
      button {
        color: white;
      }
      
      .content {
        display: block;
      }
    }
  }

  button {
    //background-color: #3498DB;
    background-color: rgba(57, 236, 236, 0);
    padding: 4px 8px 4px 8px;
    border: none;
    cursor: pointer;
    font-size: 1.5em;
  }

  .content {
    display: none;
    position: absolute;
    right: 0;
    background-color: #f1f1f1;
    //background-color: #DDD;
    padding: 8px 8px 8px 8px;
    min-width: 180px;
    box-shadow: 0px 16px 16px 0px rgba(0,0,0,0.4);
    z-index: 2;
  }
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


function toggle(column: any, i_column: number, mayHiddenColumns: Array<any>,
                checked: boolean,
                checkboxesChecked: Array<boolean>, setCheckboxesChecked: Function,
                countChecked: number, setCountChecked: Function,
                selectDeselectAllRef: MutableRefObject<any>) {
  setCheckboxesChecked((prev: Array<boolean>) => {
    let curr = prev.slice();
    curr[i_column] = checked;
    return curr;
  });
  const newCountChecked = (checked) ? (countChecked + 1) : (countChecked - 1);
  setCountChecked(newCountChecked);

  let selectDeselectAll = selectDeselectAllRef.current;
  selectDeselectAll.indeterminate = ((newCountChecked === 0) || (newCountChecked === mayHiddenColumns.length)) ? false : true;

  column.toggleHidden(!checked);
}

function toggleAll(mayHiddenColumns: Array<any>,
                   checked: boolean,
                   setCheckboxesChecked: Function, setCountChecked: Function) {
  setCheckboxesChecked(() => (
    checked ? (
      new Array<boolean>(Number(mayHiddenColumns.length)).fill(true)) : (
      new Array<boolean>(Number(mayHiddenColumns.length)).fill(false))));
  setCountChecked(() => checked ? mayHiddenColumns.length : 0);

  mayHiddenColumns.map((column: any, i_column: number) => {
    column.toggleHidden(!checked);
  });
}

// --------------------------------------------------


// --------------------------------------------------

function SelectDeselectAll(props: { selectDeselectAllRef: MutableRefObject<any>, mayHiddenColumns: Array<any>, setCheckboxesChecked: Function, setCountChecked: Function, checked: boolean }) {
  return (
    <label>
      <input type="checkbox" ref={props.selectDeselectAllRef}
             defaultChecked={true} checked={props.checked}
             onChange={(e) =>
               toggleAll(props.mayHiddenColumns,
                 e.target.checked,
                 props.setCheckboxesChecked, props.setCountChecked)
             }/>{" "}
      Select / Deselect all
    </label>
  );
}

// --------------------------------------------------


// --------------------------------------------------

export function TableHidingColumnsSelector(props: { allColumns: Array<any> }) {
  const mayHiddenColumns = getMayHiddenColumns(props.allColumns);
  const [checkboxesChecked, setCheckboxesChecked] = useState(new Array<boolean>(Number(mayHiddenColumns.length)).fill(true));
  const [countChecked, setCountChecked] = useState(Number(mayHiddenColumns.length));
  const selectDeselectAllRef = useRef(null);

  return (
    <TableHidingColumnsSelectorStyled>
      <button>
        {/*<>&#9680;</>*/}
        {/*<>&#10729;</>*/}
        {/*<>&#9881;</>*/}
        <>&#128065;</>
      </button>
      <div className="content">
        <SelectDeselectAll selectDeselectAllRef={selectDeselectAllRef}
                           mayHiddenColumns={mayHiddenColumns}
                           setCheckboxesChecked={setCheckboxesChecked}
                           setCountChecked={setCountChecked}
                           checked={(countChecked === mayHiddenColumns.length) ? true : false}/>
        {
          mayHiddenColumns.map((column: any, i_column: number) => (
            <div key={column.id} style={{ "marginLeft": "16px" }}>
              <label>
                <input type="checkbox"
                       defaultChecked={true} checked={checkboxesChecked[i_column]}
                       onChange={(e) =>
                         toggle(column, i_column, mayHiddenColumns,
                           e.target.checked,
                           checkboxesChecked, setCheckboxesChecked,
                           countChecked, setCountChecked,
                           selectDeselectAllRef)
                       }/>{" "}
                {(column.Header) ? column.Header : column.id}
              </label>
            </div>
          ))
        }
      </div>
    </TableHidingColumnsSelectorStyled>
  );
}

// --------------------------------------------------
