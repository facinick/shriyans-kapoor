import { ColorScheme } from '@/types/Theme';
import { cookies, headers } from 'next/headers';

function getColorSchemeFromRequest(): null | ColorScheme {
  const headersList = headers()
  const cookiesList = cookies()

  if(cookiesList.has('color-scheme')) {
    return cookiesList.get('color-scheme')?.value as ColorScheme
  }

  if(headersList.has('Sec-CH-Prefers-Color-Scheme')) {
    return headersList.get('Sec-CH-Prefers-Color-Scheme') as ColorScheme
  }

  return null
}

export {
  getColorSchemeFromRequest
};
