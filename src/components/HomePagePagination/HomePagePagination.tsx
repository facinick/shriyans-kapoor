"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "../Pagination/Pagination";
import { Flex } from "../ui/Flex/Flex";
interface Props {
  count: number;
  page: number;
}

export const HomePagePagination = ({ count, page }: Props): JSX.Element => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageChange = (nextPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete("page");
    newParams.set("page", String(nextPage));

    router.push(`?${newParams.toString()}`);
  };

  return (
    <>
      <Flex justify={"center"} align={"center"}>
        <Pagination
          count={count}
          siblingCount={1}
          page={page}
          onChange={handlePageChange}
        />
      </Flex>
    </>
  );
};
