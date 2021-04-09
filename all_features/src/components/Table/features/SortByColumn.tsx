import React from "react";


// --------------------------------------------------

export const sortHeaderPropGetter = ((column: any) => (
    column.is_sortable ? column.getSortByToggleProps() : undefined)
);

// --------------------------------------------------


// --------------------------------------------------

export function TableColumnSorter(props: { column: any }) {
  return (
    props.column.is_sortable ? (
      <span>
        {props.column.isSorted
          ? props.column.isSortedDesc
            // ? " 🔽"
            ? <> &#9660;</>
            // : " 🔼"
            : <> &#9650;</>
          // : ""}
          : <> &#11137;</>}
      </span>
    ) : null
  );
}

// --------------------------------------------------
