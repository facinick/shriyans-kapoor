import { Theme } from "@/types/Theme";
import { cookies } from "next/headers";

import { ColorScheme } from "@/types/Theme";
import { headers } from "next/headers";
import { URL } from "url";
import { APP_SITE_URL, HOSTNAME } from "../constants";

const getThemeFromRequest = (): null | Theme => {
  const cookiesList = cookies();

  if (cookiesList.has("theme")) {
    return cookiesList.get("theme")?.value as Theme;
  }

  return null;
};

const getBackLinkFromRequest = () => {
  const referer = headers().get("Referer");
  // referer is null
  if (!referer) {
    return APP_SITE_URL;
  }

  const url = new URL(referer);

  // referer is not on same domain
  if (url.hostname !== HOSTNAME) {
    return APP_SITE_URL;
  }

  return referer;
};

const getColorSchemeFromRequest = (): null | ColorScheme => {
  const headersList = headers();
  const cookiesList = cookies();

  if (cookiesList.has("color-scheme")) {
    return cookiesList.get("color-scheme")?.value as ColorScheme;
  }

  if (headersList.has("Sec-CH-Prefers-Color-Scheme")) {
    return headersList.get("Sec-CH-Prefers-Color-Scheme") as ColorScheme;
  }

  return null;
};

export {
  getBackLinkFromRequest,
  getColorSchemeFromRequest,
  getThemeFromRequest,
};
