import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'XORing',
		short_name: 'XORing',
		description: "XORing is the world's first social smart ring landing page.",
		start_url: '/',
		display: 'standalone',
		background_color: '#f5f5f7',
		theme_color: '#171717',
		icons: [
			{
				src: '/favicon.ico',
				sizes: '48x48',
				type: 'image/x-icon',
			},
		],
	};
}
