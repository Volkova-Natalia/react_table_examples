import React from "react";
import { ColumnInterface } from "../Table";


// --------------------------------------------------

export function getTableFixedColumnStyle(column: ColumnInterface) {
  const fixed_column_left_style = {
    position: "sticky",
    left: "0",
    zIndex: "1",
  };

  const fixed_column_right_style = {
    position: "sticky",
    right: "0",
    zIndex: "1",
  };

  if ("fixed_column" in column) {
    switch (column.fixed_column) {
      case "left":
        return fixed_column_left_style;
      case "right":
        return fixed_column_right_style;
      default:
        return {};
    }
  }

  return {};
}

// --------------------------------------------------
