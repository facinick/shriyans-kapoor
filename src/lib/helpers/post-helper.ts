import { Metadata, MetadataWithSlug, PaginationResponse, PostOrderBy } from '@/types/Post';
import matter from 'gray-matter';
import { z } from 'zod';
import {
  PAGINATION_DIRECTORY,
  POSTS_DIRECTORY
} from '../constants';
import {
  FileError,
  getErrorMessage,
  readDirectory,
  readFile,
} from './file-helper';

type IPaginationResponse = z.infer<typeof PaginationResponse>
type IMetadata = z.infer<typeof Metadata>

const cache = new Map<number, IPaginationResponse>();

const getDataFromCacheOrNull = async ({
  page,
}: {
  page: number;
}): Promise<IPaginationResponse> => {
  if (cache.has(page)) {
    return cache.get(page)!
  }

  const paginationData = await readFile(
    `${PAGINATION_DIRECTORY}/pagination.json`
  );

  const paginationJson = z.record(z.string(), PaginationResponse).parse(JSON.parse(paginationData))

  if (page in paginationJson) {
    cache.set(page, paginationJson[page]);
    return paginationJson[page];
  }

  return {
    data: [],
    pagination: {
      page,
      end: true,
      count: 0,
      totalPages: Object.keys(paginationJson).length,
      totalCount: 0,
    },
  };
};

export async function getNumberOfPages() {
  const paginationData = await readFile(
    `${PAGINATION_DIRECTORY}/pagination.json`
  );

  const paginationJson = z.record(z.string(), PaginationResponse).parse(JSON.parse(paginationData))

  return Object.keys(paginationJson).length;
}

/* 
  read `/content` directory and return all the filenames from it
*/
export async function getBlogPostList({
  orderBy = { publishedOn: 'desc' },
}: {
  orderBy?: PostOrderBy;
}) {
  try {
    const fileNames = await readDirectory(POSTS_DIRECTORY);
    const blogPosts: Array<z.infer<typeof MetadataWithSlug>> = [];

    for (let fileName of fileNames) {
      const rawContent = await readFile(`${POSTS_DIRECTORY}/${fileName}`);

      const { data: metadata } = matter(rawContent)

      blogPosts.push({
        slug: fileName.replace('.mdx', ''),
        ...Metadata.parse(metadata)
      });
    }

    blogPosts.sort((post1, post2) => {
      const key = Object.keys(orderBy)[0] as keyof PostOrderBy;
      const direction = orderBy[key];

      if (direction === 'asc') {
        return post1[key].localeCompare(post2[key]);
      } else {
        return post2[key].localeCompare(post1[key]);
      }
    });

    return blogPosts;
  } catch (error) {
    throw error as FileError;
  }
}

/* 
  read `/content/${slug}` file, parse it using gray-matter and return it's meta and content
*/
export async function loadBlogPost({ slug }: { slug: string }) {
  try {
    const rawContent = await readFile(`${POSTS_DIRECTORY}/${slug}.mdx`);
    const { data: frontmatter, content } = matter(rawContent)
    return { frontmatter, content };
  } catch (error) {
    if (error instanceof Error) {
      throw error as FileError;
    } else {
      const fileError: FileError = {
        message: getErrorMessage(error),
      };
      throw fileError;
    }
  }
}

export async function getPostsForPage({ page = 1 }: { page?: number }) {
  const data = await getDataFromCacheOrNull({ page });
  return data;
}
