import { Post, PostContent, PostMetadata } from '@/types/Post';
import { Dirent } from 'fs';
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
  readDirectory,
  readFile
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
type PostsCacheValue = {
  data: PostCacheValue[];
  pagination: {
    totalResults: number;
  };
};

const categoryCache: Map<string, CategoryCacheValue> = new Map();
const postCache: Map<string, PostCacheValue> = new Map();
const postsCache: Map<string, PaginatedPostsCacheValue> = new Map();

export async function getPosts(category: string, page: number): Promise<PaginatedPostsCacheValue> {

  const cacheKey = `${category}-${page}`;

  // Check if the result is already in the cache
  if (postsCache.has(cacheKey)) {
    return postsCache.get(cacheKey) as unknown as PaginatedPostsCacheValue;
  }

  const categories = category !== CATEGORY_ALL
    ? [category]
    : (await getCategories()).data;

  const blogPosts: Array<z.infer<typeof Post>> = [];

  for (let category of categories) {
    const categoryDirectory = `${POSTS_DIRECTORY}/${category}`;
    let fileNames: string[] = [];

    try {
      fileNames = await readDirectory(categoryDirectory);
    } catch (error) {
      console.error(`Error reading directory: ${categoryDirectory}`, error);
      continue;
    }

    for (let fileName of fileNames) {
      let rawContent = '';

      try {
        rawContent = await readFile(`${categoryDirectory}/${fileName}`);
      } catch (error) {
        console.error(`Error reading file: ${fileName}`, error);
        continue; // skip this file if there's an error
      }

      try {
        const { data: metadata, content } = matter(rawContent);

        blogPosts.push({
          slug: fileName.replace('.mdx', ''),
          metadata: PostMetadata.parse(metadata),
          category,
          content: PostContent.parse(content),
        });
      } catch (error) {
        console.error(`Error parsing post: ${fileName}`, error);
        continue;
      }
    }
  }

  // Sort posts by publishedOn date in descending order
  blogPosts.sort((post1, post2) =>
    post2.metadata.publishedOn.localeCompare(post1.metadata.publishedOn)
  );

  const totalResults = blogPosts.length;

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

  // Cache the result
  postsCache.set(cacheKey, result);

  return result;
}
export async function getPost(category: string, slug: string): Promise<PostCacheValue | null> {

  const cacheKey = `${category}-${slug}`;

  // Check if the post is already in the cache
  if (postCache.has(cacheKey)) {
    return postCache.get(cacheKey) as PostCacheValue;
  }

  let rawMetaAndContent = '';

  try {
    rawMetaAndContent = await readFile(`${POSTS_DIRECTORY}/${category}/${slug}.mdx`);
  } catch (error) {
    console.error(`Error reading post file: ${slug}.mdx in ${category}`, error);
    return null;
  }

  try {
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
    console.error(`Error parsing content for post: ${slug}`, error);
    return null;
  }
}
export async function getCategories(): Promise<CategoryCacheValue> {

  const cacheKey = 'categories';

  // Check if categories are already in the cache
  if (categoryCache.has(cacheKey)) {
    return categoryCache.get(cacheKey) as unknown as CategoryCacheValue;
  }

  const catoriesDirectory = path.join('.', `${POSTS_DIRECTORY}`);
  let fileLike: Dirent[];

  try {
    fileLike = await readdir(catoriesDirectory, { withFileTypes: true });
  } catch (error) {
    console.error(error);
    fileLike = [];
  }

  const directories = fileLike
    .filter(file => file.isDirectory())
    .map(file => file.name);

  const result = {
    data: directories,
    pagination: {
      totalResults: directories.length,
    },
  };
  // Cache the result
  categoryCache.set(cacheKey, result);

  return result;
}
export async function getAllPosts(): Promise<PostsCacheValue> {

  const categories = (await getCategories()).data

  const allPosts: Array<z.infer<typeof Post>> = [];

  // Loop through each category and fetch posts
  for (let category of categories) {

    const categoryDirectory = `${POSTS_DIRECTORY}/${category}`;

    let fileNames: string[] = []

    try {
      fileNames = await readDirectory(categoryDirectory);
    } catch (error) {
      console.error(error)
      continue // skip this category
    }

    for (let fileName of fileNames) {

      let rawContent: string

      try {
        rawContent = await readFile(`${categoryDirectory}/${fileName}`);
      } catch (error) {
        console.error(error)
        continue // skip this file
      }

      try {
        const { data: metadata, content } = matter(rawContent);
        allPosts.push({
          slug: fileName.replace('.mdx', ''),
          metadata: PostMetadata.parse(metadata),
          category,
          content: PostContent.parse(content),
        });
      } catch (error) {
        console.error(`error parsing rawContent: ${rawContent}`, error)
      }
    }
  }

  allPosts.sort((post1, post2) =>
    post2.metadata.publishedOn.localeCompare(post1.metadata.publishedOn)
  );

  const totalResults = allPosts.length;

  const result = {
    data: allPosts,
    pagination: {
      totalResults
    },
  };

  return result;
}
export {
  type CategoryCacheValue, type PaginatedPostsCacheValue, type PostCacheValue
};

