'use client';

import { PROD_APP_SITE_URL } from '@/lib/constants';
import { Post } from '@/types/Post';
import { z } from 'zod';

interface Props {
  post: z.infer<typeof Post>;
}

export default function JsonLd({ post }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.metadata.title,
    description: post.metadata.abstract,
    author: {
      '@type': 'Person',
      name: post.metadata.author,
    },
    datePublished: post.metadata.publishedOn,
    keywords: post.metadata.tags.join(', '),
    url: `${PROD_APP_SITE_URL}/${post.category}/${post.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
} 