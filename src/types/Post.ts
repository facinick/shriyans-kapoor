interface Frontmatter {
  title: string;
  abstract: string;
  publishedOn: string;
  author: string;
  category: string;
}

type Post = {
  data: Frontmatter;
  content: string;
};

type OrderKey = 'publishedOn';

type OrderDirection = 'asc' | 'desc';

type PostOrderBy = {
  [key in OrderKey]?: OrderDirection;
};

type PaginationResponse = {
  data: Array<Frontmatter & { slug: string }>;
  pagination: {
    page: number;
    end: boolean;
    count: number;
    totalPages: number;
    totalCount: number;
  };
};

export type { Frontmatter, PaginationResponse, Post, PostOrderBy };
