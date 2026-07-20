'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getLocalizedPath, LOCALE_PREFERENCE_KEY } from '@/lib/locale';

const chineseLanguageTags = ['zh-cn', 'zh-hans', 'zh-tw', 'zh-hk'];
const chinaStandardTimeZone = 'Asia/Shanghai'; // IANA identifier for China Standard Time (Beijing Time).

function prefersChinese(languages: readonly string[]) {
	return languages.some(language => {
		const normalizedLanguage = language.toLowerCase();
		return chineseLanguageTags.some(languageTag => normalizedLanguage === languageTag || normalizedLanguage.startsWith(`${languageTag}-`));
	});
}

export default function LocaleRedirect() {
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		let savedLocale: string | null = null;

		try {
			savedLocale = window.localStorage.getItem(LOCALE_PREFERENCE_KEY);
		} catch {
			// Continue with browser signals when storage is unavailable.
		}

		if (savedLocale === 'en') return;

		const browserLanguages = navigator.languages.length > 0 ? navigator.languages : [navigator.language];
		const browserPrefersChinese = prefersChinese(browserLanguages);

		let isChinaTimezone = false;
		try {
			isChinaTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone === chinaStandardTimeZone;
		} catch {
			// Language detection remains available when timezone resolution fails.
		}

		if (savedLocale === 'cn' || browserPrefersChinese || isChinaTimezone) {
			router.replace(getLocalizedPath('cn', pathname));
		}
	}, [pathname, router]);

	return null;
}
