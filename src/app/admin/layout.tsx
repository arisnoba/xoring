import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';

export const metadata: Metadata = {
	title: 'XORing 관리자',
	description: 'XORing Frontier 신청 내역을 확인하는 정적 호스팅 관리자 화면',
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
