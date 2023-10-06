import { Theme } from '@/types/Theme';
import { cookies } from 'next/headers';

function getThemeFromRequest(): null | Theme {
  const cookiesList = cookies()

  if(cookiesList.has('theme')) {
    return cookiesList.get('theme')?.value as Theme
  }

  return null
}

export {
  getThemeFromRequest
};
