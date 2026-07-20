import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';

export const metadata: Metadata = {
	title: 'XORing Admin',
	description: 'Static-hosted admin workspace for reviewing XORing Frontier applications',
	robots: {
		index: false,
		follow: false,
	},
};

export default function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<div className="dark min-h-screen bg-background text-foreground">
			<TooltipProvider>
				<main className="min-h-screen">{children}</main>
			</TooltipProvider>
		</div>
	);
}
