import { Theme } from "@/types/Theme";

export const APP_TITLE = "@facinick";
export const APP_DESCRIPTION =
  "Record of stuff.";
export const APP_THEMES: Theme[] = ["blue", "orange", "black"];
export const POSTS_DIRECTORY = "/posts";
export const PAGINATION_DIRECTORY = '/pagination';
export const PAGINATION_READ_PATH = `/pagination/pagination.json`;
export const PAGINATION_WRITE_PATH = `/pagination/pagination.json`;
export const POSTS_PER_PAGE = 4;
export const HOSTNAME = "localhost";
export const PORT = "3000";
export const HOST = `${HOSTNAME}:${PORT}`;
export const PROTOCOL = "http";
export const APP_SITE_URL = `${PROTOCOL}://${HOST}`;
export const SOCIALS = {
  telegram: "https://telegram.me/facinick",
  github: "https://github.com/facinick",
  gmail: "mailto:facinick@gmail.com?subject=Hello"
}
