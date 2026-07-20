import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();
	const routes = [
		{ en: '/', cn: '/cn/', priority: 1 },
		{ en: '/terms/', cn: '/cn/terms/', priority: 0.4 },
		{ en: '/privacy/', cn: '/cn/privacy/', priority: 0.4 },
	];

	return routes.flatMap(route => {
		const languages = {
			en: `${SITE_URL}${route.en}`,
			'zh-CN': `${SITE_URL}${route.cn}`,
		};

		return [
			{
				url: languages.en,
				lastModified,
				changeFrequency: 'weekly' as const,
				priority: route.priority,
				alternates: { languages },
			},
			{
				url: languages['zh-CN'],
				lastModified,
				changeFrequency: 'weekly' as const,
				priority: route.priority,
				alternates: { languages },
			},
		];
	});
}
