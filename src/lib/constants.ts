import { Theme } from "@/types/Theme";

export const APP_TITLE = "Shriyans Kapoor";
export const APP_DESCRIPTION = "";
export const THEMES: Theme[] = ["blue", "orange", "black"];
export const POSTS_DIRECTORY = "content";
export const PUBLIC_DIRECTORY = "/public";
export const PAGINATION_FILE = `${PUBLIC_DIRECTORY}/pagination.json`;
export const POSTS_PER_PAGE = 4;
export const HOSTNAME = "localhost";
export const PORT = "3000";
export const HOST = `${HOSTNAME}:${3000}`;
export const PROTOCOL = "http";
export const APP_SITE_URL = `${PROTOCOL}://${HOST}`;

export const CHARACTERS = {
  ellipsis: "&#8230;",
};
