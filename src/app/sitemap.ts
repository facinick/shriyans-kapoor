import type { MetadataRoute } from 'next';
import { getAllPosts } from '../lib/helpers/post-helper';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  return posts.data.map((post) => {
    return {
      url: `https://facinick.xyz/${post.category}/${post.slug}`,
      lastModified: post.metadata.publishedOn,
      changeFrequency: 'daily',
      priority: 0.8,
    };
  });
}
