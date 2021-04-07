import React from "react";
import { getIAddedDeletedExpanded, isRequiredAddExpanded, isRequiredDeleteExpanded } from "./ExpandableRows";
import { getIAddedDeletedDetail, isRequiredAddDetail, isRequiredDeleteDetail } from "./DetailRows";


// --------------------------------------------------

interface expandedDetailRowsIdInterface {
  expanded: Array<any>,
  detail: Array<any>
}

export function setStateExpandedDetailRowsId(row: any, expandedDetailRowsId: expandedDetailRowsIdInterface, setExpandedDetailRowsId: Function) {
  const [i_added_expanded, i_deleted_expanded] = getIAddedDeletedExpanded(row, expandedDetailRowsId.expanded);
  const [i_added_detail, i_deleted_detail] = getIAddedDeletedDetail(row, expandedDetailRowsId.detail);

  if (
    (isRequiredAddExpanded(i_added_expanded)) ||
    (isRequiredDeleteExpanded(i_deleted_expanded)) ||
    (isRequiredAddDetail(i_added_detail)) ||
    (isRequiredDeleteDetail(i_deleted_detail))
  ) {
    setExpandedDetailRowsId((prev: expandedDetailRowsIdInterface) => {
      let curr = Object.assign({}, prev);

      if (isRequiredAddExpanded(i_added_expanded)) {
        curr.expanded.push(row.id);
      }
      if (isRequiredAddDetail(i_added_detail)) {
        curr.detail.push(row.id);
      }
      if (isRequiredDeleteExpanded(i_deleted_expanded)) {
        curr.expanded.splice(Number(i_deleted_expanded), 1);
      }
      if (isRequiredDeleteDetail(i_deleted_detail)) {
        curr.detail.splice(Number(i_deleted_detail), 1);
      }
      return curr;
    });
  }
}

// --------------------------------------------------
