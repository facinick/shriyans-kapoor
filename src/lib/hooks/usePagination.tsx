import { useMemo } from "react";
import { range } from "../utils";

interface Props {
  // total number of pages
  count: number;
  // number of pages to show on the left and right of current page
  siblingCount?: number;
  // Controlled Props
  // current page
  page: number;
}

export const usePagination = ({
  count,
  siblingCount = 1,
  page,
}: Props): (string | number)[] => {
  const paginationRange = useMemo(() => {
    const totalPaginationRowItems =
      1 + // first page
      1 + // ... or first page + 1
      siblingCount + // left Siblings
      1 + // current page
      siblingCount + // right Siblings
      1 + //  ... or last page - 1
      1; // last page

    /*
    If count (total number of pages) is same or less
    than min number of items in pagination, then
    we are showing all of them, a we dont need dots 
  */

    if (count <= totalPaginationRowItems) {
      return range(1, count);
    }

    /*
    If count (total number of pages) is more
    than min number of items in pagination, then
    we are showing all of them, with atleast one set of dots
  */

    const leftMostSiblingPage = page - siblingCount;
    const rightMostSiblingPage = page + siblingCount;

    const showLeftEllipsis = leftMostSiblingPage > 1 + 1 + 1;
    const showRightEllipsis = rightMostSiblingPage < count - 1 - 1;

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!showLeftEllipsis && showRightEllipsis) {
      const leftRangeItems = 1 + 1 + siblingCount + 1 + siblingCount;
      let leftRange = range(1, leftRangeItems);
      return [...leftRange, "right-ellipsis", count];
    }
    /*
    	Case 3: left dots to show, but no rights dots to be shown
    */
    if (showLeftEllipsis && !showRightEllipsis) {
      const rightRangeItems = 1 + 1 + siblingCount + 1 + siblingCount;
      let rightRange = range(count - rightRangeItems + 1, count);
      return [1, "left-ellipsis", ...rightRange];
    }
    /*
    	Case 4: left dots to show, rights dots to show
    */
    if (showLeftEllipsis && showRightEllipsis) {
      let middleRange = range(leftMostSiblingPage, rightMostSiblingPage);
      return [1, "left-ellipsis", ...middleRange, "right-ellipsis", count];
    }

    /*
    	non existant Case (only for typecript)
    */
    return [];
  }, [count, siblingCount, page]);

  return paginationRange;
};
