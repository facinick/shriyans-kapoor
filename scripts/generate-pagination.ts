// Kept for Reference

// import { POSTS_DIRECTORY, POSTS_PER_PAGE } from '@/lib/constants';
// import { writeFile } from '@/lib/helpers/file-helper';
// import { getBlogPostListForCategory } from '@/lib/helpers/post-helper';
// import { MetadataWithSlug, PaginationResponse } from '@/types/Post';
// import { readdir } from 'fs/promises';
// import path from 'path';
// import { z } from 'zod';

// async function generatePagination(category: string) {
//   console.log(category)
//   console.log(`hihihiu`)
//   const files = await getBlogPostListForCategory({ category, orderBy: { publishedOn: 'desc' } });
//   const totalPages = Math.ceil(files.length / POSTS_PER_PAGE);
//   const paginationInfo: Record<number, z.infer<typeof PaginationResponse>> = {};
//   let currentPage: z.infer<typeof MetadataWithSlug>[] = [];
//   let paginationIndex = 1;

//   for (let i = 0; i < files.length; i++) {
//     if (currentPage.length === POSTS_PER_PAGE) {
//       paginationInfo[paginationIndex] = {
//         data: currentPage,
//         pagination: {
//           page: paginationIndex,
//           end: i >= files.length,
//           count: currentPage.length,
//           totalPages,
//           totalCount: files.length,
//         },
//       };
//       paginationIndex += 1;
//       currentPage = [];
//     }
//     currentPage.push(files[i]);
//   }

//   if (currentPage.length > 0) {
//     paginationInfo[paginationIndex] = {
//       data: currentPage,
//       pagination: {
//         page: paginationIndex,
//         end: true,
//         count: currentPage.length,
//         totalPages,
//         totalCount: files.length,
//       },
//     };
//   }

//   const jsonContent = JSON.stringify(paginationInfo, null, 2);
//   const paginationWritePath = `${POSTS_DIRECTORY}/${category}/pagination.json`;

//   await writeFile(paginationWritePath, jsonContent);
//   console.log(`Generated pagination.json for ${category}`);
// }
// // Generate pagination for all categories and global
// async function generateAllPaginations() {
//   const categories = await readdir(path.join('.', POSTS_DIRECTORY), { withFileTypes: true });
//   for (const category of categories) {
//     if (category.isDirectory())
//       await generatePagination(category.name);
//   }
//   // await generatePagination(DEFAULT_CATEGORY)
// }

// generateAllPaginations();
