import { SITE_URL } from '@/lib/site';

const BRAND_NAME = 'XORing';
const PRODUCT_NAME = 'XO Ring';
const DESCRIPTION =
	"XORing is a social smart ring with Social and Private modes, built-in AI agents, and Proof of Contribution features for activity-driven rewards.";

export const structuredData = [
	{
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: BRAND_NAME,
		url: SITE_URL,
		logo: `${SITE_URL}/assets/favicon/android-chrome-512x512.png`,
		description: DESCRIPTION,
	},
	{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: BRAND_NAME,
		url: SITE_URL,
		description: DESCRIPTION,
		inLanguage: 'en',
	},
	{
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: PRODUCT_NAME,
		alternateName: 'XORing Smart Ring',
		description:
			'XO Ring is a smart ring that switches between Social Mode and Private Mode, tracks biometric signals, and connects to the AIOS Network.',
		brand: {
			'@type': 'Brand',
			name: BRAND_NAME,
		},
		image: `${SITE_URL}/assets/images/common/ogimage.png`,
		offers: {
			'@type': 'Offer',
			priceCurrency: 'USD',
			price: '499',
			availability: 'https://schema.org/PreOrder',
			url: SITE_URL,
		},
	},
];
