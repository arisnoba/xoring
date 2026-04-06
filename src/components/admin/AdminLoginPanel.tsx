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
					toast.error('인증은 되었지만 관리자 허용 목록에 없는 계정입니다.');
					return;
				}

				setPassword('');
				toast.success('로그인되었습니다.');
				router.replace(ADMIN_DASHBOARD_PATH);
			} catch (error) {
				const message = error instanceof Error ? error.message : '로그인에 실패했습니다.';
				toast.error(message);
			}
		});
	};

	return (
		<div className="mx-auto flex w-full max-w-[520px] flex-col gap-6 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur">
			<div className="flex flex-col gap-3">
				<p className="text-xs font-semibold tracking-[0.24em] text-white/45">관리자 접근</p>
				<h1 className="text-balance text-[2.2rem] font-black leading-[0.92] tracking-[-0.05em] text-white">관리자 계정으로 로그인</h1>
				<p className="text-sm leading-6 text-white/68">이 경로는 정적 사이트 안에 유지됩니다. 인증은 Supabase Auth가 처리하고, 데이터 접근은 RLS 뒤에 남겨둡니다.</p>
			</div>

			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<div className="flex flex-col gap-2">
					<label className="text-sm font-medium text-white/84" htmlFor="admin-email">
						관리자 이메일
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
						비밀번호
					</label>
					<Input
						id="admin-password"
						type="password"
						value={password}
						onChange={event => setPassword(event.target.value)}
						placeholder="비밀번호를 입력하세요"
						required
						className="h-11 rounded-[14px] border border-white/10 bg-white/5 px-3.5 text-white placeholder:text-white/28"
					/>
				</div>

				<Button type="submit" disabled={isPending || !email.trim() || !password} className="h-11 rounded-full bg-white text-sm font-semibold text-black hover:bg-white/92">
					{isPending ? '로그인 중...' : '로그인'}
				</Button>
			</form>

			{!hasSupabaseBrowserConfig() ? (
				<div className="rounded-[16px] border border-amber-300/20 bg-amber-200/10 px-4 py-3 text-sm leading-6 text-amber-50">
					<p className="font-semibold">Supabase 설정이 없습니다.</p>
					<p>관리자 경로를 사용하기 전에 `NEXT_PUBLIC_SUPABASE_URL`과 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`를 추가하세요.</p>
				</div>
			) : null}

			<div className="flex flex-col gap-2 border-t border-white/10 pt-4 text-sm text-white/52">
				<p>관리자 권한은 공개 env 허용 목록이 아니라 Supabase의 `admin_users` 테이블에서 결정됩니다.</p>
				<Link href="/" className="font-medium text-white/72 underline underline-offset-4">
					랜딩 페이지로 돌아가기
				</Link>
			</div>
		</div>
	);
}
