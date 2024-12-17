import { z } from 'zod';

const PostMetadata = z.object({
  title: z.string(),
  abstract: z.string(),
  publishedOn: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
});

const PostContent = z.string();

const PostCategory = z.string();

const PostSlug = z.string();

const PostReadingTime = z.number();

const Post = z.object({
  metadata: PostMetadata,
  content: PostContent,
  slug: PostSlug,
  category: PostCategory,
  readingTimeInMinutes: PostReadingTime,
});

export { Post, PostContent, PostMetadata };
