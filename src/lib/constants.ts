import { Theme } from "@/types/Theme";

export const APP_TITLE = "Shriyans Kapoor";
export const APP_DESCRIPTION =
  "Notes on Frontend, Backend and miscellaneous coding stuff";
export const APP_THEMES: Theme[] = ["blue", "orange", "black"];
export const POSTS_DIRECTORY = "/content";
export const PAGINATION_READ_PATH = `/pagination/pagination.json`;
export const PAGINATION_WRITE_PATH = `/pagination/pagination.json`;
export const POSTS_PER_PAGE = 4;
export const HOSTNAME = "localhost";
export const PORT = "3000";
export const HOST = `${HOSTNAME}:${PORT}`;
export const PROTOCOL = "http";
export const APP_SITE_URL = `${PROTOCOL}://${HOST}`;
