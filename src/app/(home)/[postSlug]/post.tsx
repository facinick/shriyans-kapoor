import { APP_TITLE } from "@/lib/constants";
import MDX_COMPONENTS_MAP from "@/lib/helpers/mdx-components";
import { loadBlogPost } from "@/lib/helpers/post-helper";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from "next/navigation";
import styles from './page.module.css';

interface PageProps {
  params: {postSlug: string}
}

export async function generateMetadata({ params }: PageProps) {
  let post;
  try {
    post = await loadBlogPost(params.postSlug);
  } catch(error) {
    return null
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
    post = await loadBlogPost(params.postSlug);
  } catch(error) {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <article className={styles.wrapper}>
      {/* <PostHeader
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      /> */}
      <div className={styles.page}>
        <MDXRemote components={MDX_COMPONENTS_MAP} source={content} />
      </div>
    </article>
  );
}

export default BlogPost;