import type { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import '../globals.css';
import '../globals.scss';
import '../../styles/_typography.scss';
import '../../styles/components/_section-overrides.scss';

export default function AdminRootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className="h-full antialiased font-sans">
			<body className="min-h-full flex flex-col">
				{children}
				<Toaster position="top-center" richColors />
			</body>
		</html>
	);
}
