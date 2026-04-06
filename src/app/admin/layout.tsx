import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
	title: 'XORing Admin',
	description: 'Static-hosted admin access for XORing Frontier applications.',
	robots: {
		index: false,
		follow: false,
	},
};

export default function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<main className="min-h-screen bg-[#090909] px-4 py-10 sm:px-6">
			<div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[1280px] items-start justify-center">
				{children}
			</div>
		</main>
	);
}

