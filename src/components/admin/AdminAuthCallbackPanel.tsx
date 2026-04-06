'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ADMIN_DASHBOARD_PATH, ADMIN_LOGIN_PATH, MISSING_SUPABASE_CONFIG_MESSAGE } from '@/lib/admin/config';
import { completeAdminSignIn, getAdminAccess, signOutAdmin } from '@/lib/admin/auth';
import { hasSupabaseBrowserConfig } from '@/lib/supabase/client';

type CallbackState =
	| { kind: 'loading'; message: string }
	| { kind: 'error'; message: string }
	| { kind: 'unauthorized'; message: string };

export default function AdminAuthCallbackPanel() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [state, setState] = useState<CallbackState>({
		kind: 'loading',
		message: 'Checking your login link...',
	});

	useEffect(() => {
		let cancelled = false;

		async function verify() {
			if (!hasSupabaseBrowserConfig()) {
				setState({
					kind: 'error',
					message: MISSING_SUPABASE_CONFIG_MESSAGE,
				});
				return;
			}

			const upstreamError = searchParams.get('error_description');

			if (upstreamError) {
				setState({
					kind: 'error',
					message: upstreamError,
				});
				return;
			}

			try {
				const client = await completeAdminSignIn(new URLSearchParams(searchParams.toString()));
				const { adminUser } = await getAdminAccess(client);

				if (!adminUser) {
					await signOutAdmin(client);

					if (!cancelled) {
						setState({
							kind: 'unauthorized',
							message: 'This email is authenticated, but it is not on the admin allowlist.',
						});
					}

					return;
				}

				router.replace(ADMIN_DASHBOARD_PATH);
			} catch (error) {
				if (!cancelled) {
					setState({
						kind: 'error',
						message: error instanceof Error ? error.message : 'Login verification failed.',
					});
				}
			}
		}

		void verify();

		return () => {
			cancelled = true;
		};
	}, [router, searchParams]);

	return (
		<div className="mx-auto flex w-full max-w-[520px] flex-col gap-6 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur">
			<div className="flex flex-col gap-3">
				<p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Admin Callback</p>
				<h1 className="text-balance text-[2.1rem] font-black leading-[0.94] tracking-[-0.05em]">
					{state.kind === 'loading' ? 'Finishing sign-in' : state.kind === 'unauthorized' ? 'Access not granted' : 'Login failed'}
				</h1>
				<p className="text-sm leading-6 text-white/68">{state.message}</p>
			</div>

			{state.kind === 'loading' ? <div className="h-2 overflow-hidden rounded-full bg-white/8"><div className="h-full w-1/2 animate-pulse rounded-full bg-white/70" /></div> : null}

			{state.kind !== 'loading' ? (
				<div className="flex flex-col gap-3">
					<Link
						href={ADMIN_LOGIN_PATH}
						className="inline-flex h-11 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-black transition-colors hover:bg-white/92">
						Return to admin login
					</Link>
					<Link href="/" className="text-sm font-medium text-white/70 underline underline-offset-4">
						Back to landing page
					</Link>
				</div>
			) : null}
		</div>
	);
}
