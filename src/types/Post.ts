import { z } from 'zod'

const Metadata = z.object({
  title: z.string(),
  abstract: z.string(),
  publishedOn: z.string(),
  author: z.string(),
  category: z.string(),
  tags: z.array(z.string())
})

const MetadataWithSlug = z.object({
  title: z.string(),
  abstract: z.string(),
  publishedOn: z.string(),
  author: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  slug: z.string()
})

const Post = z.object({
  metadata: Metadata,
  content: z.string(),
})

type OrderKey = 'publishedOn';

type OrderDirection = 'asc' | 'desc';

type PostOrderBy = {
  [key in OrderKey]?: OrderDirection;
};

const PaginationResponse = z.object({
  data: z.array(MetadataWithSlug),
  pagination: z.object({
    page: z.number(),
    end: z.boolean(),
    count: z.number(),
    totalPages: z.number(),
    totalCount: z.number(),
  })
})

export { Metadata, PaginationResponse, Post, MetadataWithSlug };
export type { PostOrderBy };

