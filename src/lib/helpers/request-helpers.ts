import { Theme } from '@/types/Theme';
import { cookies } from 'next/headers';

import { URL } from 'url';
import { ColorScheme } from '@/types/Theme';
import { headers } from 'next/headers';
import {
  APP_SITE_URL,
  HOSTNAME,
  PROD_APP_SITE_URL,
  PROD_HOST,
  PROD_HOSTNAME,
} from '../constants';

const getThemeFromRequest = (): null | Theme => {
  const cookiesList = cookies();

  if (cookiesList.has('theme')) {
    return cookiesList.get('theme')?.value as Theme;
  }

  return null;
};

const getBackLinkFromRequest = () => {
  const referer = headers().get('Referer');
  // referer is null
  if (!referer) {
    if (process.env.NODE_ENV === 'development') {
      return APP_SITE_URL;
    } else {
      return PROD_APP_SITE_URL;
    }
  }

  const url = new URL(referer);

  // referer is not on same domain
  if (url.hostname !== HOSTNAME) {
    if (process.env.NODE_ENV === 'development') {
      return APP_SITE_URL;
    } else {
      return PROD_APP_SITE_URL;
    }
  }

  return referer;
};

const getBackLinkOrNullFromRequest = (): string | null => {
  const referer = headers().get('Referer');
  // referer is null
  if (!referer) {
    return null;
  }

  const url = new URL(referer);

  // referer is not on same domain
  if (process.env.NODE_ENV === 'development') {
    if (url.hostname !== HOSTNAME) {
      return null;
    }
  } else {
    if (url.hostname !== PROD_HOSTNAME) {
      return null;
    }
  }

  return referer;
};

const getColorSchemeFromRequest = (): null | ColorScheme => {
  const headersList = headers();
  const cookiesList = cookies();

  if (cookiesList.has('color-scheme')) {
    return cookiesList.get('color-scheme')?.value as ColorScheme;
  }

  if (headersList.has('Sec-CH-Prefers-Color-Scheme')) {
    return headersList.get('Sec-CH-Prefers-Color-Scheme') as ColorScheme;
  }

  return null;
};

export {
  getBackLinkFromRequest,
  getColorSchemeFromRequest,
  getThemeFromRequest,
  getBackLinkOrNullFromRequest,
};
