import { headers } from "next/headers";
import { URL } from "url";
import { APP_SITE_URL, HOSTNAME } from "../constants";

export const getPreviousLinkOrHome = () => {
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
