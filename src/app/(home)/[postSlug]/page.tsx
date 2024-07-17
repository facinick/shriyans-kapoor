import PostPagePostHeader from '@/components/PostPagePostHeader';
import { Flex } from '@/components/ui/Flex/Flex';
import { Separator } from '@/components/ui/Separator';
import { APP_TITLE, PROD_APP_SITE_URL } from '@/lib/constants';
import MDX_COMPONENTS_MAP from '@/lib/helpers/mdx-components';
import { getBlogPostList, loadBlogPost } from '@/lib/helpers/post-helper';
import { getBackLinkOrNullFromRequest } from '@/lib/helpers/request-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import PostPagePostFooter from '@/components/PostPagePostFooter';
import clsx from 'clsx';
import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

interface PageProps {
  params: { postSlug: string };
}

export async function generateStaticParams() {
  const posts = await getBlogPostList({});
  return posts.map((post) => ({ postSlug: post.slug }));
}

/*
  wrapping in react cache here works, moving react cache to another level down the call doesnt. why.
*/
const getPostData = React.cache(async (slug: string) => {
  try {
    return await loadBlogPost({ slug });
  } catch (error) {
    return null
  }
})

export async function generateMetadata({ params }: PageProps) {
  const post = await getPostData(params.postSlug);
  if (!post) return null;

  const { title, abstract } = post.frontmatter;
  return {
    title: title,
    description: abstract,
  }
}

async function BlogPost({ params }: PageProps) {
  const post = await getPostData(params.postSlug);
  if (!post) {
    notFound()
  }

  const { frontmatter, content } = post;
  const backLinkOrNull = getBackLinkOrNullFromRequest();
  // const shouldLoadDisqusComments = env.NODE_ENV === 'production';
  // const pageUrl = `${PROD_APP_SITE_URL}/${params.postSlug}`;
  // const pageIdentifier = params.postSlug;
  return (
    <>
      <Flex direction={'column'} gap={5} asChild>
        <article className={clsx(styles.article, styles.content)}>
          <PostPagePostHeader backLinkOrNull={backLinkOrNull}>
            {frontmatter.title}
          </PostPagePostHeader>
          <Separator />
          {/* <div className={styles.page}> */}
          <MDXRemote components={MDX_COMPONENTS_MAP} source={content} />
          {/* </div> */}
          <PostPagePostFooter
            author={frontmatter.author}
            publishedOn={frontmatter.publishedOn}
          />
          {/* {shouldLoadDisqusComments && <Disqus url={pageUrl} identifier={pageIdentifier} />} */}
        </article>
      </Flex>
    </>
  );
}

export default BlogPost;
