import Clock from "@/components/Clock";
import HomePagePagination from "@/components/HomePagePagination";
import HomePagePostList from "@/components/HomePagePostList";
import { Flex } from "@/components/ui/Flex/Flex";
import { Separator } from "@/components/ui/Separator";
import { Heading } from "@/components/ui/Typography/Heading";
import { APP_DESCRIPTION, APP_TITLE } from "@/lib/constants";
import { headingFont } from "@/lib/helpers/font-helper";
import { getPostsForPage } from "@/lib/helpers/post-helper";
import clsx from "clsx";
import styles from "./page.module.css";
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
    <Flex direction={"column"} gap={5} asChild>
      <section>
        <Heading
          level={2}
          asChild
          className={clsx(headingFont.className, styles.heading)}
        >
          <h2>
            RECENT
            <Clock />
          </h2>
        </Heading>

        <Separator />

        <HomePagePostList posts={paginationResponse.data} />

        <HomePagePagination
          count={paginationResponse.pagination.totalPages}
          page={page}
        />
      </section>
    </Flex>
  );
}

export default Home;
