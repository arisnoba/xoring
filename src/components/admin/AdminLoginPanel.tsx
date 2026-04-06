'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ADMIN_DASHBOARD_PATH, MISSING_SUPABASE_CONFIG_MESSAGE } from '@/lib/admin/config';
import { getAdminAccess, signInAdminWithPassword, signOutAdmin } from '@/lib/admin/auth';
import { hasSupabaseBrowserConfig } from '@/lib/supabase/client';

export default function AdminLoginPanel() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		let cancelled = false;

		if (!hasSupabaseBrowserConfig()) {
			return;
		}

		void getAdminAccess()
			.then(({ adminUser }) => {
				if (!cancelled && adminUser) {
					router.replace(ADMIN_DASHBOARD_PATH);
				}
			})
			.catch(() => {
				// Ignore silent auth bootstrap failures on the login screen.
			});

		return () => {
			cancelled = true;
		};
	}, [router]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		startTransition(async () => {
			if (!hasSupabaseBrowserConfig()) {
				toast.error(MISSING_SUPABASE_CONFIG_MESSAGE);
				return;
			}

			try {
				const client = await signInAdminWithPassword(email.trim(), password);
				const { adminUser } = await getAdminAccess(client);

				if (!adminUser) {
					await signOutAdmin(client);
					toast.error('This email is authenticated, but it is not on the admin allowlist.');
					return;
				}

				setPassword('');
				toast.success('Signed in successfully.');
				router.replace(ADMIN_DASHBOARD_PATH);
			} catch (error) {
				const message = error instanceof Error ? error.message : 'Failed to sign in.';
				toast.error(message);
			}
		});
	};

	return (
		<div className="mx-auto flex w-full max-w-[520px] flex-col gap-6 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur">
			<div className="flex flex-col gap-3">
				<p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Admin Access</p>
				<h1 className="text-balance text-[2.2rem] font-black leading-[0.92] tracking-[-0.05em] text-white">Sign in with your admin account</h1>
				<p className="text-sm leading-6 text-white/68">This route stays in the static site. Supabase Auth handles email and password authentication, and database access stays behind RLS.</p>
			</div>

			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium text-white/84" htmlFor="admin-email">
						Admin email
					</label>
					<Input
						id="admin-email"
						type="email"
						value={email}
						onChange={event => setEmail(event.target.value)}
						placeholder="you@xoring.io"
						required
						className="h-11 rounded-[14px] border border-white/10 bg-white/5 px-3.5 text-white placeholder:text-white/28"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium text-white/84" htmlFor="admin-password">
						Password
					</label>
					<Input
						id="admin-password"
						type="password"
						value={password}
						onChange={event => setPassword(event.target.value)}
						placeholder="Enter your password"
						required
						className="h-11 rounded-[14px] border border-white/10 bg-white/5 px-3.5 text-white placeholder:text-white/28"
					/>
				</div>

				<Button type="submit" disabled={isPending || !email.trim() || !password} className="h-11 rounded-full bg-white text-sm font-semibold text-black hover:bg-white/92">
					{isPending ? 'Signing in...' : 'Sign in'}
				</Button>
			</form>

			{!hasSupabaseBrowserConfig() ? (
				<div className="rounded-[16px] border border-amber-300/20 bg-amber-200/10 px-4 py-3 text-sm leading-6 text-amber-50">
					<p className="font-semibold">Supabase config is missing.</p>
					<p>Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` before using the admin route.</p>
				</div>
			) : null}

			<div className="flex flex-col gap-2 border-t border-white/10 pt-4 text-sm text-white/52">
				<p>Admin permission is decided by the `admin_users` table in Supabase, not by a public env allowlist.</p>
				<Link href="/" className="font-medium text-white/72 underline underline-offset-4">
					Back to landing page
				</Link>
			</div>
		</div>
	);
}
