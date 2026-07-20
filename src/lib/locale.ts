export const locales = ['en', 'cn'] as const;

export type Locale = (typeof locales)[number];

export const LOCALE_PREFERENCE_KEY = 'xoring:locale';

export const localeConfig = {
	en: {
		path: '/',
		languageTag: 'en',
		openGraphLocale: 'en_US',
	},
	cn: {
		path: '/cn/',
		languageTag: 'zh-CN',
		openGraphLocale: 'zh_CN',
	},
} as const;

export function getLocalizedPath(locale: Locale, path = '/') {
	const pathWithLeadingSlash = path.startsWith('/') ? path : `/${path}`;
	const normalizedPath = pathWithLeadingSlash === '/' ? '' : pathWithLeadingSlash.replace(/\/$/, '');
	return locale === 'cn' ? (normalizedPath ? `/cn${normalizedPath}/` : '/cn/') : normalizedPath ? `${normalizedPath}/` : '/';
}
