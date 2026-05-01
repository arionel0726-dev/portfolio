import en from '@/locales/en.json'
import ru from '@/locales/ru.json'
import type { Locale } from '@/types'

const dictionaries = { en, ru }

export function getDictionary(locale: Locale) {
	return dictionaries[locale] ?? dictionaries.en
}

export const defaultLocale: Locale = 'en'
export const locales: Locale[] = ['en', 'ru']
