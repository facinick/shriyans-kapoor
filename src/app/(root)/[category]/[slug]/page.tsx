import PostPagePostFooter from '@/components/PostPagePostFooter';
import PostPagePostHeader from '@/components/PostPagePostHeader';
import { Flex } from '@/components/ui/Flex/Flex';
import { Separator } from '@/components/ui/Separator';
import MDX_COMPONENTS_MAP from '@/lib/helpers/mdx-components';
import { getAllPosts, getPost, PostCacheValue } from '@/lib/helpers/post-helper';
import { getBackLinkOrNullFromRequest } from '@/lib/helpers/request-helpers';
import clsx from 'clsx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import React from 'react';
import styles from './page.module.css';

export async function generateStaticParams() {
  try {
    const allPosts = await getAllPosts()
    // Flatten the array of posts and return parameters
    const params = allPosts!.data.flat().map(post => ({
      slug: post.slug,
      category: post.category,
    }));

    return params;
  } catch (error) {
    return []
  }
}

interface PageProps {
  params: {
    slug: string,
    category: string
  };
}

/*
  note 1: wrapping in react cache here works, moving react cache to another level down the call doesnt. why.
  note 2: make sure you don't pass object as params or you'll send new ref every time and cause caching to fail
  */
const getPostCached = React.cache(async (category: string, slug: string) => {
  return await getPost({ slug, category });
})

export async function generateMetadata({ params }: PageProps) {
  const post = await getPostCached(params.category, params.slug,)

  if (!post) return null;

  const { title, abstract } = post.metadata;
  return {
    title: title,
    description: abstract,
  }
}

async function PostPage({ params }: PageProps) {

  let post: PostCacheValue | undefined

  try {
    post = await getPostCached(params.category, params.slug,)
  } catch (error) {
    // todo: server error handle page
    notFound()
  }

  if (!post) {
    // maybe some error occured, couldn't read post? read but couldn't process?
    notFound()
  }

  const { metadata, content } = post;
  const backLinkOrNull = getBackLinkOrNullFromRequest();
  // const shouldLoadDisqusComments = env.NODE_ENV === 'production';
  // const pageUrl = `${PROD_APP_SITE_URL}/${params.slug}`;
  // const pageIdentifier = params.slug;
  return (
    <>
      <Flex direction={'column'} gap={5} asChild>
        <article className={clsx(styles.article, styles.content)}>
          <PostPagePostHeader backLinkOrNull={backLinkOrNull}>
            {metadata.title}
          </PostPagePostHeader>
          <Separator />
          {/* <div className={styles.page}> */}
          <MDXRemote components={MDX_COMPONENTS_MAP} source={content} />
          {/* </div> */}
          <PostPagePostFooter
            author={metadata.author}
            publishedOn={metadata.publishedOn}
          />
          {/* {shouldLoadDisqusComments && <Disqus url={pageUrl} identifier={pageIdentifier} />} */}
        </article>
      </Flex>
    </>
  );
}

export default PostPage;
