import { HomePagePagination } from "@/components/HomePagePagination/HomePagePagination";
import { Posts } from "@/components/Posts/Posts";
import { Flex } from "@/components/ui/Flex/Flex";
import { Heading } from "@/components/ui/Typography/Heading";
import { APP_DESCRIPTION, APP_TITLE } from "@/lib/constants";
import { hedingFont } from "@/lib/helpers/font-helper";
import { getPostsForPage } from "@/lib/helpers/post-helper";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export const metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
};

async function Home({ searchParams }: PageProps) {
  const page = Number(searchParams.page || 1);

  const paginationResponse = await getPostsForPage({ page });

  return (
    <Flex direction={"column"} gap={5}>
      <Heading level={2} asChild className={hedingFont.className}>
        <h2>LATEST POSTS</h2>
      </Heading>
      <Posts posts={paginationResponse.data} />
      <HomePagePagination
        count={paginationResponse.pagination.totalPages}
        page={page}
      />
    </Flex>
  );
}

export default Home;
