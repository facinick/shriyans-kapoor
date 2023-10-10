"use client";

import { CHARACTERS } from "@/lib/helpers/string-helper";
import { usePagination } from "@/lib/hooks/usePagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import VisuallyHidden from "../VisuallyHidden";
import { Button } from "../ui/Button";
import { Flex } from "../ui/Flex";

interface Props {
  count: number;
  siblingCount: number;
  page: number;
  onChange: (nextPage: number) => void;
}

const Pagination = ({
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
    <Flex asChild>
      {/* Left navigation arrow */}
      <nav>
        <Flex asChild justify={"center"} align={"center"} gap={2}>
          <ul>
            <li key={"previous"}>
              <Button
                title="Previous Page"
                variant={"secondary"}
                disabled={page <= 1}
                onClick={onPrevious}
              >
                <ChevronLeft />
                <VisuallyHidden>Goto Previous Page</VisuallyHidden>
              </Button>
            </li>

            {paginationRange.map((pageNumber) => {
              if (
                pageNumber === "left-ellipsis" ||
                pageNumber === "right-ellipsis"
              ) {
                return (
                  <li key={pageNumber}>
                    <Button disabled variant={"ghost"} asChild>
                      <span>{CHARACTERS.ellipsis}</span>
                    </Button>
                  </li>
                );
              }

              return (
                <li key={pageNumber}>
                  <Button
                    title={`Page ${pageNumber}`}
                    key={pageNumber}
                    disabled={page == pageNumber}
                    onClick={() => onPageChange(Number(pageNumber))}
                    variant={page == pageNumber ? "default" : "secondary"}
                  >
                    {pageNumber}
                    <VisuallyHidden>{`Goto Page ${pageNumber}`}</VisuallyHidden>
                  </Button>
                </li>
              );
            })}

            {/*  Right Navigation arrow */}
            <li key={"next"}>
              <Button
                title="Next Page"
                variant={"secondary"}
                disabled={page >= count}
                onClick={onNext}
              >
                <ChevronRight />
                <VisuallyHidden>Goo Next Page</VisuallyHidden>
              </Button>
            </li>
          </ul>
        </Flex>
      </nav>
    </Flex>
  );
};

export default Pagination;
