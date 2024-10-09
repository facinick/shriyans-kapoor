// Kept for Reference

// import { APP_DESCRIPTION, APP_TITLE } from "@/lib/constants";
// import { getBlogPostListForCategory } from "@/lib/helpers/post-helper";

// async function generateRss() {
//   const blogPosts = await getBlogPostListForCategory({ orderBy: { publishedOn: "desc" } });

//   const feed = new RSS({
//     title: APP_TITLE,
//     description: APP_DESCRIPTION,
//     feed_url: FEED_URL,
//     site_url: SITE_URL,
//   });

//   blogPosts.forEach((post) => {
//     feed.item({
//       title: post.title,
//       description: post.abstract,
//       date: post.publishedOn,
//       url: getPostFullUrl(post.slug),
//       guid: post.slug,
//     });
//   });

//   const xml = feed.xml({ indent: true });

//   await saveRss(xml);
// }

// generateRss();
