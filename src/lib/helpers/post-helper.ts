import {
  Frontmatter,
  PaginationResponse,
  Post,
  PostOrderBy,
} from "@/types/Post";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { POSTS_DIRECTORY } from "../constants";
import {
  FileError,
  getErrorMessage,
  readDirectory,
  readFile,
} from "./file-helper";

const cache = new Map<number, PaginationResponse>();

const getDataFromCacheOrNull = async ({
  page,
}: {
  page: number;
}): Promise<PaginationResponse> => {
  if (cache.has(page)) {
    return cache.get(page) as PaginationResponse;
  }

  // const paginationData = await readFile(PAGINATION_READ_PATH);

  const paginationJsonPath = path.join(
    process.cwd(),
    "public",
    "pagination.json"
  );

  const paginationData = await fs.readFile(paginationJsonPath, "utf-8");

  const paginationJson = JSON.parse(paginationData) as Record<
    number,
    PaginationResponse
  >;

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

/* 
  read `/content` directory and return all the filenames from it
*/
export async function getBlogPostList({
  orderBy = { publishedOn: "desc" },
}: {
  orderBy?: PostOrderBy;
}) {
  try {
    const fileNames = await readDirectory(POSTS_DIRECTORY);
    const blogPosts: Array<Frontmatter & { slug: string }> = [];

    for (let fileName of fileNames) {
      const rawContent = await readFile(`${POSTS_DIRECTORY}/${fileName}`);

      const { data: frontmatter } = matter(rawContent) as unknown as {
        data: Frontmatter;
      };

      blogPosts.push({
        slug: fileName.replace(".mdx", ""),
        ...frontmatter,
      });
    }

    blogPosts.sort((post1, post2) => {
      const key = Object.keys(orderBy)[0] as keyof PostOrderBy;
      const direction = orderBy[key];

      if (direction === "asc") {
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
    const { data: frontmatter, content } = matter(
      rawContent as unknown as Post
    );
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
