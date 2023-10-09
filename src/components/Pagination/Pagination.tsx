"use client";
import { usePagination } from "@/lib/hooks/usePagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import { Button } from "../ui/Button/Button";
interface Props {
  children?: React.ReactNode;
  count: number;
  siblingCount: number;
  page: number;
  onChange: (nextPage: number) => void;
}

export const Pagination = ({
  count,
  siblingCount,
  page,
  onChange,
}: Props): JSX.Element | null => {
  const paginationRange = usePagination({
    count,
    page,
    siblingCount,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (page === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onChange(Number(page) + 1);
  };

  const onPrevious = () => {
    onChange(Number(page) - 1);
  };

  const onPageChange = (nextPage: number) => {
    onChange(Number(nextPage));
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {/* Left navigation arrow */}
      <Button
        data-key={"previou"}
        key={"previou"}
        variant={"secondary"}
        disabled={page == 1}
        onClick={onPrevious}
      >
        <ChevronLeft />
        <VisuallyHidden>Goto Previous Page</VisuallyHidden>
      </Button>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === "left-ellipsis" || pageNumber === "right-ellipsis") {
          return (
            <Button
              data-key={pageNumber}
              disabled
              variant={"ghost"}
              key={pageNumber}
              asChild
            >
              <span>&#8230;</span>
            </Button>
          );
        }

        return (
          <Button
            data-key={pageNumber}
            key={pageNumber}
            disabled={page == pageNumber}
            onClick={() => onPageChange(Number(pageNumber))}
            variant={page == pageNumber ? "default" : "secondary"}
          >
            {pageNumber}
            <VisuallyHidden>{`Goto Page ${pageNumber}`}</VisuallyHidden>
          </Button>
        );
      })}
      {/*  Right Navigation arrow */}
      <Button
        data-key={"next"}
        key={"next"}
        variant={"secondary"}
        disabled={page == count}
        onClick={onNext}
      >
        <ChevronRight />
        <VisuallyHidden>Goo Next Page</VisuallyHidden>
      </Button>
    </div>
  );
};
