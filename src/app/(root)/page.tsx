import HomePagePagination from '@/components/HomePagePagination';
import HomePagePostList from '@/components/HomePagePostList';
import { CATEGORY_ALL, DEFAULT_PAGE } from '@/lib/constants';
import { getPosts } from '@/lib/helpers/post-helper';

export async function generateStaticParams() {
  const params = [CATEGORY_ALL].map((category) => ({
    category,
  }));

  return params;
}

export async function generateMetadata() {
  const category = String(CATEGORY_ALL);

  return {
    title: category,
    description: `Posts on ${category} | @facinick`,
  };
}

// home page is implicitly /all
async function HomePage() {
  const category = CATEGORY_ALL; // Default to "all"
  const page = DEFAULT_PAGE; // Default to page 1

  // Fetch posts for the default category and page
  const posts = await getPosts(category, page);

  return (
    <>
      <HomePagePagination count={posts.pagination.totalPages} page={page} />
      <HomePagePostList posts={posts.data} />
      <HomePagePagination count={posts.pagination.totalPages} page={page} />
    </>
  );
}

export default HomePage;
