import { Post, PostContent, PostMetadata } from '@/types/Post';
import { readdir } from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import { z } from 'zod';
import {
  CATEGORY_ALL,
  POSTS_DIRECTORY,
  POSTS_PER_PAGE
} from '../constants';
import {
  FileError,
  getErrorMessage,
  readDirectory,
  readFile,
} from './file-helper';

// server side caching
type CategoryCacheValue = {
  data: string[];
  pagination: {
    totalResults: number;
  };
};
type PostCacheValue = {
  slug: string;
  metadata: z.infer<typeof PostMetadata>;
  content: z.infer<typeof PostContent>;
  category: string;
};
type PaginatedPostsCacheValue = {
  data: PostCacheValue[];
  pagination: {
    currentPage: number;
    totalResults: number;
    pageSize: number;
    totalPages: number;
  };
};
// Create the caches with the appropriate types
const categoryCache: Map<string, CategoryCacheValue> = new Map();
const postCache: Map<string, PostCacheValue> = new Map();
const postsCache: Map<string, PaginatedPostsCacheValue> = new Map();

export async function getPosts({
  page,
  category = CATEGORY_ALL,
}: {
  page: number;
  category?: string;
}) {
  const cacheKey = `${category}-${page}`;

  if (postsCache.has(cacheKey)) {
    return postsCache.get(cacheKey) as unknown as PaginatedPostsCacheValue
  }

  try {
    const categories = category !== CATEGORY_ALL
      ? [category]
      : (await getCategories())!.data;

    const blogPosts: Array<z.infer<typeof Post>> = [];

    for (let category of categories) {
      const categoryDirectory = `${POSTS_DIRECTORY}/${category}`;
      const fileNames = await readDirectory(categoryDirectory);

      for (let fileName of fileNames) {
        const rawContent = await readFile(`${categoryDirectory}/${fileName}`);
        const { data: metadata, content } = matter(rawContent);

        blogPosts.push({
          slug: fileName.replace('.mdx', ''),
          metadata: PostMetadata.parse(metadata),
          category,
          content: PostContent.parse(content),
        });
      }
    }

    // Sort posts by publishedOn date in descending order
    blogPosts.sort((post1, post2) =>
      post2.metadata.publishedOn.localeCompare(post1.metadata.publishedOn)
    );

    const totalResults = blogPosts.length;

    // if (!page) {
    //   const result = {
    //     data: blogPosts,
    //     pagination: {
    //       totalResults,
    //     },
    //   };

    //   // Cache the result without pagination
    //   postsCache.set(cacheKey, result);

    //   return result;
    // }

    // Calculate pagination only if a page is provided
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;

    const paginatedPosts = blogPosts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(totalResults / POSTS_PER_PAGE);

    const result = {
      data: paginatedPosts,
      pagination: {
        currentPage: page,
        totalResults,
        pageSize: POSTS_PER_PAGE,
        totalPages,
      },
    };

    // Cache the paginated result
    postsCache.set(cacheKey, result);

    return result;
  } catch (error) {
    handleIOError(error);
  }
}
export async function getPost({ category, slug }: { slug: string; category: string }) {
  const cacheKey = `${category}-${slug}`;

  if (postCache.has(cacheKey)) {
    return postCache.get(cacheKey) as unknown as PostCacheValue
  }

  try {
    const rawMetaAndContent = await readFile(`${POSTS_DIRECTORY}/${category}/${slug}.mdx`);
    const { data: metadata, content } = matter(rawMetaAndContent);

    const post = {
      slug,
      metadata: PostMetadata.parse(metadata),
      content: PostContent.parse(content),
      category,
    };

    // Cache the post
    postCache.set(cacheKey, post);

    return post;
  } catch (error) {
    handleIOError(error);
  }
}
function handleIOError(error: unknown) {
  if (error instanceof Error) {
    throw error as FileError;
  } else {
    const fileError: FileError = {
      message: getErrorMessage(error),
    };
    throw fileError;
  }
}

// build time helpers
export async function getCategories() {
  if (categoryCache.has('categories')) {
    return categoryCache.get('categories') as unknown as CategoryCacheValue
  }

  const catoriesDirectory = path.join('.', `${POSTS_DIRECTORY}`);
  try {
    const fileLike = await readdir(catoriesDirectory, { withFileTypes: true });
    const directories = fileLike.filter(file => file.isDirectory()).map(file => file.name);

    const result: CategoryCacheValue = {
      data: directories,
      pagination: {
        totalResults: directories.length
      }
    };

    // Cache categories
    categoryCache.set('categories', result);

    return result;
  } catch (error) {
    handleIOError(error);
  }
}

export async function getAllPosts(): Promise<{
  data: Array<z.infer<typeof Post>>;
  totalResults: number;
} | undefined> {

  try {
    // Fetch all categories
    const categories = (await getCategories())!.data;

    const allPosts: Array<z.infer<typeof Post>> = [];

    // Loop through each category and fetch posts
    for (let category of categories) {
      const categoryDirectory = `${POSTS_DIRECTORY}/${category}`;
      const fileNames = await readDirectory(categoryDirectory);

      for (let fileName of fileNames) {
        const rawContent = await readFile(`${categoryDirectory}/${fileName}`);
        const { data: metadata, content } = matter(rawContent);

        allPosts.push({
          slug: fileName.replace('.mdx', ''),
          metadata: PostMetadata.parse(metadata),
          category,
          content: PostContent.parse(content),
        });
      }
    }

    // Sort posts by publishedOn date in descending order
    allPosts.sort((post1, post2) =>
      post2.metadata.publishedOn.localeCompare(post1.metadata.publishedOn)
    );

    const totalResults = allPosts.length;

    const result = {
      data: allPosts,
      totalResults,
    };

    return result;
  } catch (error) {
    handleIOError(error);
  }
}

export {
  type CategoryCacheValue, type PaginatedPostsCacheValue, type PostCacheValue
};

