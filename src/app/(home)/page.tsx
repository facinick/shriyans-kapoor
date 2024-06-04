import Clock from "@/components/Clock";
import HomePagePagination from "@/components/HomePagePagination";
import HomePagePostList from "@/components/HomePagePostList";
import { Flex } from "@/components/ui/Flex/Flex";
import { Separator } from "@/components/ui/Separator";
import { Heading } from "@/components/ui/Typography/Heading";
import { headingFont } from "@/lib/helpers/font-helper";
import { getNumberOfPages, getPostsForPage } from "@/lib/helpers/post-helper";
import clsx from "clsx";
import styles from "./page.module.css";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export async function generateStaticParams() {
  const totalPages = await getNumberOfPages();
  
  return Array.from({ length: totalPages }, (_, index) => ({
    page: (index + 1).toString(),
  }));
}

async function Home({ searchParams }: PageProps) {
  const page = Number(searchParams.page || 1);

  const paginationResponse = await getPostsForPage({ page });

  return (
    <Flex direction={"column"} gap={5} asChild>
      <section className={styles['main-content']}>
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
