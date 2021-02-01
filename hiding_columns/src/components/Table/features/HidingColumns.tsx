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

// --------------------------------------------------


// --------------------------------------------------

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: any, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef: any = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  },
);

// --------------------------------------------------


// --------------------------------------------------

export function TableHidingColumnsSelector(props: { allColumns: any, getToggleHideAllColumnsProps: Function }) {
  return (
    <TableHidingColumnsSelectorStyled>
      <div>
        <IndeterminateCheckbox {...props.getToggleHideAllColumnsProps()} />
        Toggle All
      </div>
      {
        props.allColumns.map((column: any, i_column: number) => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
              {(column.Header) ? column.Header : column.id}
            </label>
          </div>
        ))
      }
    </TableHidingColumnsSelectorStyled>
  );
}

// --------------------------------------------------
