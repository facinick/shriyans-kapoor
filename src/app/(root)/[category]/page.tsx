import HomePagePagination from '@/components/HomePagePagination';
import HomePagePostList from '@/components/HomePagePostList';
import { CATEGORY_ALL, DEFAULT_PAGE } from '@/lib/constants';
import { getCategories, getPosts } from '@/lib/helpers/post-helper';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  try {
    const allCategories = await getCategories()
    // Flatten the array of categories and return parameters
    const params = allCategories!.data.flat().map(category => ({
      category,
    }));

    return [...params, { category: CATEGORY_ALL }];
  } catch (error) {
    return []
  }
}

interface PageProps {
  params: {
    category?: string;
  },
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

  let posts: Awaited<ReturnType<typeof getPosts>>;

  try {
    posts = await getPosts({ page, category });
    if (!posts) {
      // return serverError()
      return notFound();
    }

    // if(posts.data.length === 0) {
    // return // no posts
    // }
  } catch (error) {
    // return serverError()
    return notFound();
  }

  return (
    <>
      <HomePagePagination
        count={posts.pagination.totalPages}
        page={page}
      />

      <HomePagePostList posts={posts.data} />

      <HomePagePagination
        count={posts.pagination.totalPages}
        page={page}
      />
    </>
  );
}

export default CategoryPage;
