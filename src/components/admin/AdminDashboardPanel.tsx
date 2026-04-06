'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ADMIN_LOGIN_PATH, FRONTIER_APPLICATION_STATUS_VALUES, MISSING_SUPABASE_CONFIG_MESSAGE, type FrontierApplicationStatus } from '@/lib/admin/config';
import { getAdminAccess, signOutAdmin } from '@/lib/admin/auth';
import { listFrontierApplications, type FrontierApplicationListItem } from '@/lib/admin/frontier-applications';
import { hasSupabaseBrowserConfig } from '@/lib/supabase/client';

type DashboardState =
	| { kind: 'loading' }
	| { kind: 'config-error'; message: string }
	| { kind: 'unauthenticated' }
	| { kind: 'unauthorized'; email: string | null }
	| {
			kind: 'ready';
			email: string;
			applications: FrontierApplicationListItem[];
	  }
	| { kind: 'error'; message: string };

function formatDate(value: string | null) {
	if (!value) {
		return '—';
	}

	return new Intl.DateTimeFormat('ko-KR', {
		dateStyle: 'medium',
		timeStyle: 'short',
	}).format(new Date(value));
}

function getStatusTone(status: FrontierApplicationStatus) {
	switch (status) {
		case 'approved':
			return 'bg-emerald-400/14 text-emerald-100';
		case 'rejected':
			return 'bg-rose-400/14 text-rose-100';
		case 'payment_confirmed':
			return 'bg-sky-400/14 text-sky-100';
		case 'awaiting_payment':
			return 'bg-amber-300/14 text-amber-100';
		default:
			return 'bg-white/10 text-white/78';
	}
}

export default function AdminDashboardPanel() {
	const router = useRouter();
	const [state, setState] = useState<DashboardState>({ kind: 'loading' });
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		let cancelled = false;

		async function load() {
			if (!hasSupabaseBrowserConfig()) {
				setState({
					kind: 'config-error',
					message: MISSING_SUPABASE_CONFIG_MESSAGE,
				});
				return;
			}

			try {
				const { session, adminUser } = await getAdminAccess();

				if (!session) {
					setState({ kind: 'unauthenticated' });
					return;
				}

				if (!adminUser) {
					setState({
						kind: 'unauthorized',
						email: session.user.email ?? null,
					});
					return;
				}

				const applications = await listFrontierApplications();

				if (!cancelled) {
					setState({
						kind: 'ready',
						email: adminUser.email,
						applications,
					});
				}
			} catch (error) {
				if (!cancelled) {
					setState({
						kind: 'error',
						message: error instanceof Error ? error.message : 'Failed to load the admin dashboard.',
					});
				}
			}
		}

		void load();

		return () => {
			cancelled = true;
		};
	}, []);

	const handleSignOut = () => {
		startTransition(async () => {
			try {
				await signOutAdmin();
				toast.success('Signed out.');
				router.replace(ADMIN_LOGIN_PATH);
			} catch (error) {
				const message = error instanceof Error ? error.message : 'Failed to sign out.';
				toast.error(message);
			}
		});
	};

	if (state.kind === 'loading') {
		return (
			<div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur">
				<p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Admin Dashboard</p>
				<h1 className="text-[2.2rem] font-black leading-[0.92] tracking-[-0.05em]">Loading applications</h1>
				<div className="h-2 overflow-hidden rounded-full bg-white/8">
					<div className="h-full w-1/2 animate-pulse rounded-full bg-white/70" />
				</div>
			</div>
		);
	}

	if (state.kind === 'config-error' || state.kind === 'error') {
		return (
			<div className="mx-auto flex w-full max-w-[640px] flex-col gap-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur">
				<p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Admin Dashboard</p>
				<h1 className="text-[2.1rem] font-black leading-[0.94] tracking-[-0.05em]">Dashboard unavailable</h1>
				<p className="text-sm leading-6 text-white/68">{state.message}</p>
				<Link href={ADMIN_LOGIN_PATH} className="text-sm font-medium text-white/72 underline underline-offset-4">
					Go to admin login
				</Link>
			</div>
		);
	}

	if (state.kind === 'unauthenticated' || state.kind === 'unauthorized') {
		return (
			<div className="mx-auto flex w-full max-w-[640px] flex-col gap-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur">
				<p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Admin Dashboard</p>
				<h1 className="text-[2.1rem] font-black leading-[0.94] tracking-[-0.05em]">
					{state.kind === 'unauthenticated' ? 'Sign in required' : 'Admin allowlist required'}
				</h1>
				<p className="text-sm leading-6 text-white/68">
					{state.kind === 'unauthenticated'
						? 'This route is statically hosted, but application data is still protected by Supabase Auth and RLS.'
						: `${state.email ?? 'This account'} is signed in but does not have an active row in admin_users.`}
				</p>
				<Link
					href={ADMIN_LOGIN_PATH}
					className="inline-flex h-11 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-black transition-colors hover:bg-white/92">
					Open admin login
				</Link>
			</div>
		);
	}

	const total = state.applications.length;
	const statusCounts = FRONTIER_APPLICATION_STATUS_VALUES.map(status => ({
		status,
		count: state.applications.filter(application => application.status === status).length,
	}));

	return (
		<div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6">
			<section className="flex flex-col gap-5 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur">
				<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div className="flex flex-col gap-3">
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Admin Dashboard</p>
						<h1 className="text-balance text-[2.4rem] font-black leading-[0.9] tracking-[-0.06em] text-white">Frontier applications, behind static-hosting-safe auth</h1>
						<p className="max-w-2xl text-sm leading-6 text-white/68">This is the minimal static admin shell: Supabase Auth on the client, `admin_users` allowlist for access, and RLS-protected direct reads from `frontier_applications`.</p>
					</div>
					<div className="flex flex-wrap items-center gap-3">
						<div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/72">{state.email}</div>
						<Button type="button" variant="outline" onClick={handleSignOut} disabled={isPending} className="h-10 rounded-full border-white/15 bg-transparent px-4 text-white hover:bg-white/10 hover:text-white">
							{isPending ? 'Signing out...' : 'Sign out'}
						</Button>
					</div>
				</div>

				<div className="grid gap-3 md:grid-cols-3">
					<div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Recent rows</p>
						<p className="mt-3 text-3xl font-black tracking-[-0.05em] text-white">{total}</p>
						<p className="mt-2 text-sm text-white/56">Latest 20 rows by `submitted_at desc`.</p>
					</div>
					<div className="rounded-[20px] border border-white/10 bg-black/20 p-4 md:col-span-2">
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Status snapshot</p>
						<div className="mt-3 flex flex-wrap gap-2">
							{statusCounts.map(item => (
								<div key={item.status} className={`rounded-full px-3 py-2 text-sm font-medium ${getStatusTone(item.status)}`}>
									{item.status}: {item.count}
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur">
				<div className="border-b border-white/10 px-6 py-4">
					<h2 className="text-lg font-semibold text-white">Latest applications</h2>
					<p className="mt-1 text-sm text-white/56">Phase 5 keeps this read-only. Search, detail, and mutation UI can layer on later without changing the hosting model.</p>
				</div>

				{state.applications.length === 0 ? (
					<div className="px-6 py-10 text-sm text-white/60">No application rows are visible yet. Confirm that your admin account is allowlisted and that the table contains records.</div>
				) : (
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-white/10 text-left text-sm">
							<thead className="bg-black/10 text-white/45">
								<tr>
									<th className="px-6 py-3 font-medium">Email</th>
									<th className="px-6 py-3 font-medium">Wallet</th>
									<th className="px-6 py-3 font-medium">Token</th>
									<th className="px-6 py-3 font-medium">Status</th>
									<th className="px-6 py-3 font-medium">Submitted</th>
									<th className="px-6 py-3 font-medium">Reviewed</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-white/10">
								{state.applications.map(application => (
									<tr key={application.id} className="align-top text-white/78">
										<td className="px-6 py-4">
											<div className="font-medium text-white">{application.email}</div>
											<div className="mt-1 text-xs text-white/40">{application.id}</div>
										</td>
										<td className="px-6 py-4 font-mono text-xs text-white/62">{application.wallet_address}</td>
										<td className="px-6 py-4 uppercase text-white/72">{application.payment_token}</td>
										<td className="px-6 py-4">
											<span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusTone(application.status)}`}>{application.status}</span>
										</td>
										<td className="px-6 py-4 text-white/62">{formatDate(application.submitted_at)}</td>
										<td className="px-6 py-4 text-white/62">{formatDate(application.reviewed_at)}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</section>
		</div>
	);
}
