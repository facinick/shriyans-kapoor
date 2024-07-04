import { Theme } from "@/types/Theme";

export const APP_TITLE = "@facinick";
export const APP_TIMEZONE = "Asia/Calcutta";
export const APP_DESCRIPTION = "Record of stuff.";
export const APP_THEMES: Theme[] = ["blue", "orange", "black"];
export const POSTS_DIRECTORY = "/posts";
export const PAGINATION_DIRECTORY = "/pagination";
export const PAGINATION_READ_PATH = `/pagination/pagination.json`;
export const PAGINATION_WRITE_PATH = `/pagination/pagination.json`;
export const POSTS_PER_PAGE = 4;
// Dev
export const HOSTNAME = "localhost";
export const PORT = "3000";
export const HOST = `${HOSTNAME}:${PORT}`;
export const PROTOCOL = "http";
export const APP_SITE_URL = `${PROTOCOL}://${HOST}`;
// Prod
export const PROD_HOSTNAME = `facinick.xyz`;
export const PROD_PORT = `443`;
export const PROD_HOST = `facinick.xyz`;
export const PROD_PROTOCOL = "https";
export const PROD_APP_SITE_URL = `${PROD_PROTOCOL}://${PROD_HOST}`;
// DISQUS
export const DISQUS_SHORT_NAME = `https://https-facinick-xyz`;

export const SOCIALS = {
  telegram: "https://telegram.me/facinick",
  github: "https://github.com/facinick",
  gmail: "mailto:facinick@gmail.com?subject=Hello",
};
