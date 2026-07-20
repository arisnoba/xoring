import type { Metadata, Viewport } from 'next';
import 'lenis/dist/lenis.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import { Toaster } from '@/components/ui/sonner';
import { getMessages } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';
import '../globals.css';
import '../globals.scss';
import '../../styles/_typography.scss';
import '../../styles/components/_section-overrides.scss';

const messages = getMessages('cn');

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: messages.metadata.title,
	description: messages.metadata.description,
	applicationName: 'XORing',
	keywords: [...messages.metadata.keywords],
	alternates: {
		canonical: '/cn/',
		languages: {
			en: '/',
			'zh-CN': '/cn/',
			'x-default': '/',
		},
	},
	openGraph: {
		title: messages.metadata.title,
		description: messages.metadata.description,
		url: '/cn/',
		siteName: 'XORing',
		locale: 'zh_CN',
		alternateLocale: ['en_US'],
		type: 'website',
		images: [
			{
				url: '/assets/images/common/ogimage.png',
				width: 1200,
				height: 630,
				alt: messages.metadata.ogImageAlt,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: messages.metadata.title,
		description: messages.metadata.description,
		images: ['/assets/images/common/ogimage.png'],
	},
	robots: {
		index: true,
		follow: true,
	},
	icons: {
		icon: [
			{ url: '/assets/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/assets/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/assets/favicon/favicon.ico' },
		],
		apple: [{ url: '/assets/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
	},
	manifest: '/assets/favicon/site.webmanifest',
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover',
};

export default function ChineseRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="zh-CN" className="h-full antialiased font-sans">
			<head>
				<link rel="preload" href="/assets/video/hero-ring.mp4" as="video" type="video/mp4" />
				<link rel="preload" href="/assets/video/hero-ring-loop.mp4" as="video" type="video/mp4" />
			</head>
			<body className="min-h-full flex flex-col">
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:fixed focus:left-[calc(var(--safe-area-left)+1rem)] focus:top-[calc(var(--safe-area-top)+1rem)] focus:z-100 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-lg">
					{messages.common.skipToContent}
				</a>
				<SmoothScrollProvider>{children}</SmoothScrollProvider>
				<Toaster position="top-center" richColors />
			</body>
		</html>
	);
}
