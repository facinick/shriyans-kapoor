'use client';

import { useRouter } from '@/lib/hooks/useRouter';
import { useSearchParams } from 'next/navigation';
import Pagination from '../Pagination';
import { DEFAULT_LINK_SETTINGS } from '../ui/Link/Link';
interface Props {
  count: number;
  page: number;
}

const HomePagePagination = ({ count, page }: Props): JSX.Element => {
  const searchParams = useSearchParams();
  const router = useRouter()

  const handlePageChange = (nextPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete('page');
    newParams.set('page', String(nextPage));

    router?.push(`?${newParams.toString()}`, DEFAULT_LINK_SETTINGS);
  };

  return (
    <>
      <Pagination
        count={count}
        siblingCount={1}
        page={page}
        onChange={handlePageChange}
      />
    </>
  );
};

export default HomePagePagination;
