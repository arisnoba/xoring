import { Suspense } from 'react';
import AdminAuthCallbackPanel from '@/components/admin/AdminAuthCallbackPanel';

export default function AdminAuthCallbackPage() {
	return (
		<Suspense
			fallback={
				<div className="mx-auto flex w-full max-w-[520px] flex-col gap-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur">
					<p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Admin Callback</p>
					<h1 className="text-[2.1rem] font-black leading-[0.94] tracking-[-0.05em]">Finishing sign-in</h1>
					<div className="h-2 overflow-hidden rounded-full bg-white/8">
						<div className="h-full w-1/2 animate-pulse rounded-full bg-white/70" />
					</div>
				</div>
			}>
			<AdminAuthCallbackPanel />
		</Suspense>
	);
}

