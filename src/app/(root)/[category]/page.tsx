import HomePagePagination from '@/components/HomePagePagination';
import HomePagePostList from '@/components/HomePagePostList';
import { CATEGORY_ALL, DEFAULT_PAGE } from '@/lib/constants';
import { getCategories, getPosts } from '@/lib/helpers/post-helper';

export async function generateStaticParams() {
  // console.log(`DEBUG: Generating Static Params...`)
  const allCategories = await getCategories();

  const params = [...allCategories.data, CATEGORY_ALL].map((category) => ({
    category,
  }));

  // console.log(`DEBUG: Generated:`, params)

  return params;
}

interface PageProps {
  params: {
    category?: string;
  };
  searchParams: {
    page?: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const category = String(params.category || CATEGORY_ALL);

  return {
    title: category,
    description: `Posts on ${category} | @facinick`,
  };
}

async function CategoryPage({ params, searchParams }: PageProps) {
  const category = String(params?.category || CATEGORY_ALL);
  const page = Number(searchParams?.page || DEFAULT_PAGE);

  // console.time(`DEBUG: getPosts ${category} ${page}`)
  const posts = await getPosts(category, page);
  // console.timeEnd(`DEBUG: getPosts ${category} ${page}`)

  return (
    <>
      <HomePagePagination count={posts.pagination.totalPages} page={page} />

      <HomePagePostList posts={posts.data} />

      <HomePagePagination count={posts.pagination.totalPages} page={page} />
    </>
  );
}

export default CategoryPage;
