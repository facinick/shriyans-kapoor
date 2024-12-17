import { PROD_APP_SITE_URL } from '@/lib/constants';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${PROD_APP_SITE_URL}/sitemap.xml`,
  };
} 