import React from "react";


// --------------------------------------------------

export function TableColumnSorter(props: { column: any }) {
  return (
    <span>
      {props.column.isSorted
        ? props.column.isSortedDesc
          ? " 🔽"
          : " 🔼"
        : ""}
    </span>
  );
}

// --------------------------------------------------
