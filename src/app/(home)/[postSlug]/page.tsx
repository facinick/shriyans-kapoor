import PostPagePostHeader from "@/components/PostPagePostHeader";
import { Flex } from "@/components/ui/Flex/Flex";
import { APP_TITLE } from "@/lib/constants";
import MDX_COMPONENTS_MAP from "@/lib/helpers/mdx-components";
import { loadBlogPost } from "@/lib/helpers/post-helper";
import { getBackLinkFromRequest } from "@/lib/helpers/request-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

interface PageProps {
  params: { postSlug: string };
}

export async function generateMetadata({ params }: PageProps) {
  let post;
  try {
    post = await loadBlogPost({ slug: params.postSlug });
  } catch (error) {
    return null;
  }

  const { title, abstract, publishedOn } = post.frontmatter;

  const metadataTitle = `${title} • ${APP_TITLE}`;

  return {
    title: metadataTitle,
    description: abstract,
    openGraph: {
      title: metadataTitle,
      description: abstract,
      type: "article",
      publishedTime: publishedOn,
    },
  };
}

async function BlogPost({ params }: PageProps) {
  let post;
  try {
    post = await loadBlogPost({ slug: params.postSlug });
  } catch (error) {
    notFound();
  }

  const { frontmatter, content } = post;

  const backLink = getBackLinkFromRequest();

  return (
    <>
      <Flex direction={"column"} gap={5} asChild>
        <article className={styles.article}>
          <PostPagePostHeader backLink={backLink}>
            {frontmatter.title}
          </PostPagePostHeader>
          {/* <div className={styles.page}> */}
          <MDXRemote components={MDX_COMPONENTS_MAP} source={content} />
          {/* </div> */}
        </article>
      </Flex>
    </>
  );
}

export default BlogPost;
