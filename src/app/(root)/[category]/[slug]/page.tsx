import JsonLd from '@/components/JsonLd/JsonLd';
import PostPagePostFooter from '@/components/PostPagePostFooter';
import PostPagePostHeader from '@/components/PostPagePostHeader';
import { Flex } from '@/components/ui/Flex/Flex';
import { Separator } from '@/components/ui/Separator';
import { PROD_APP_SITE_URL } from '@/lib/constants';
import MDX_COMPONENTS_MAP from '@/lib/helpers/mdx-components';
import { getAllPosts, getPost } from '@/lib/helpers/post-helper';
import { getBackLinkOrNullFromRequest } from '@/lib/helpers/request-helpers';
import clsx from 'clsx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import React from 'react';
import remarkGfm from 'remark-gfm';
import styles from './page.module.css';

export async function generateStaticParams() {
  // console.log(`DEBUG: Generating Static Params...`)
  const allPosts = await getAllPosts();

  const params = allPosts.data.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));

  // console.log(`DEBUG: Generated:`, params)

  return params;
}

interface PageProps {
  params: {
    slug: string;
    category: string;
  };
}

/*
  note 1: wrapping in react cache here works, moving react cache to another level down the call doesnt. why.
  note 2: make sure you don't pass object as params or you'll send new ref every time and cause caching to fail
  */
const getPostCached = React.cache(async (category: string, slug: string) => {
  return await getPost(category, slug);
});

// because extremely slow rn, what to do?
export async function generateMetadata({ params }: PageProps) {
  const post = await getPostCached(params.category, params.slug);
  if (!post) return null;

  const { title, abstract, publishedOn, author, tags } = post.metadata;
  const url = `${PROD_APP_SITE_URL}/${params.category}/${params.slug}`;

  return {
    title,
    description: abstract,
    openGraph: {
      title,
      description: abstract,
      type: 'article',
      publishedTime: publishedOn,
      authors: [author],
      tags,
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: abstract,
    },
  };
}

async function PostPage({ params }: PageProps) {
  // console.time(`DEBUG: getPost ${params.category}/${params.slug}`)
  const post = await getPostCached(params.category, params.slug);
  // console.timeEnd(`DEBUG: getPost ${params.category}/${params.slug}`)

  if (!post) {
    // maybe some error occured, couldn't read post? read but couldn't process?
    notFound();
  }

  const { metadata, content } = post;
  const backLinkOrNull = getBackLinkOrNullFromRequest();
  // const shouldLoadDisqusComments = env.NODE_ENV === 'production';
  // const pageUrl = `${PROD_APP_SITE_URL}/${params.slug}`;
  // const pageIdentifier = params.slug;
  return (
    <>
      <JsonLd post={post} />
      <Flex direction={'column'} gap={5} asChild>
        <article className={clsx(styles.article, styles.content)}>
          <PostPagePostHeader backLinkOrNull={backLinkOrNull}>
            {metadata.title}
          </PostPagePostHeader>
          <Separator />
          {/* <div className={styles.page}> */}
          <MDXRemote
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
            components={MDX_COMPONENTS_MAP}
            source={content}
          />
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
