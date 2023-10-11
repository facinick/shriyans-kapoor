import { PAGINATION_FILE_PATH, POSTS_PER_PAGE } from "@/lib/constants";
import { writeFile } from "@/lib/helpers/file-helper";
import { getBlogPostList } from "@/lib/helpers/post-helper";
import { PaginationResponse } from "@/types/Post";

async function generatePagination() {
  const files = await getBlogPostList({ orderBy: { publishedOn: "desc" } });

  const totalPages = Math.ceil(files.length / POSTS_PER_PAGE);

  const paginationInfo: Record<number, PaginationResponse> = {};
  let currentPage = [];

  let paginationIndex = 1;

  for (let i = 0; i < files.length; i++) {
    if (currentPage.length === POSTS_PER_PAGE) {
      paginationInfo[paginationIndex] = {
        data: currentPage,
        pagination: {
          page: paginationIndex,
          end: i > files.length,
          count: currentPage.length,
          totalPages,
          totalCount: files.length,
        },
      };
      paginationIndex += 1;
      currentPage = [];
    }
    currentPage.push(files[i]);
  }

  if (currentPage.length > 0) {
    paginationInfo[paginationIndex] = {
      data: currentPage,
      pagination: {
        page: paginationIndex,
        end: true,
        count: currentPage.length,
        totalPages,
        totalCount: files.length,
      },
    };
    paginationIndex += 1;
    currentPage = [];
  }

  const jsonContent = JSON.stringify(paginationInfo, null, 2);

  await writeFile(PAGINATION_FILE_PATH, jsonContent);
  console.log(`generated pagination.json`);
}

generatePagination();
