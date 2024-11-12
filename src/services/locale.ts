'use server';

import { cookies } from 'next/headers';
import { Locale, defaultLocale } from '@/i18n/config'

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'IGCGMUSIC_USER_LOCALE';

export async function getUserLocale() {
  const userCookies = await cookies();
  return userCookies.get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  const userCookies = await cookies();
  userCookies.set(COOKIE_NAME, locale);
}