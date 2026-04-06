'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BadgeCheckIcon, CreditCardIcon, InboxIcon, LogOutIcon, MailIcon, SearchIcon, ShieldCheckIcon, XCircleIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

type StatusFilter = 'all' | FrontierApplicationStatus;

const STATUS_LABELS: Record<FrontierApplicationStatus, string> = {
	submitted: '접수됨',
	awaiting_payment: '결제 대기',
	payment_confirmed: '결제 확인',
	approved: '승인 완료',
	rejected: '반려됨',
};

function formatDate(value: string | null) {
	if (!value) {
		return '—';
	}

	return new Intl.DateTimeFormat('ko-KR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	}).format(new Date(value));
}

function formatStatusLabel(status: FrontierApplicationStatus) {
	return STATUS_LABELS[status];
}

function getStatusBadgeVariant(status: FrontierApplicationStatus) {
	switch (status) {
		case 'approved':
			return 'default';
		case 'payment_confirmed':
			return 'secondary';
		case 'rejected':
			return 'destructive';
		default:
			return 'outline';
	}
}

function getStatusIcon(status: StatusFilter) {
	switch (status) {
		case 'approved':
			return BadgeCheckIcon;
		case 'awaiting_payment':
		case 'payment_confirmed':
			return CreditCardIcon;
		case 'rejected':
			return XCircleIcon;
		case 'submitted':
			return MailIcon;
		default:
			return InboxIcon;
	}
}

function StatusBadge({ status }: { status: FrontierApplicationStatus }) {
	return (
		<Badge variant={getStatusBadgeVariant(status)} className="uppercase">
			{formatStatusLabel(status)}
		</Badge>
	);
}

function DashboardLoadingState() {
	return (
		<div className="mx-auto flex min-h-screen w-full max-w-[1520px] items-center px-4 py-6 sm:px-6">
			<Card className="w-full border-border/60 bg-card/85 backdrop-blur">
				<CardHeader className="gap-3">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-10 w-64" />
					<Skeleton className="h-4 w-full max-w-xl" />
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="grid gap-3 lg:grid-cols-3">
						<Skeleton className="h-28 w-full rounded-xl" />
						<Skeleton className="h-28 w-full rounded-xl" />
						<Skeleton className="h-28 w-full rounded-xl" />
					</div>
					<Skeleton className="h-16 w-full rounded-xl" />
					<Skeleton className="h-[420px] w-full rounded-xl" />
				</CardContent>
			</Card>
		</div>
	);
}

function DashboardMessageState({ title, message, ctaLabel }: { title: string; message: string; ctaLabel: string }) {
	return (
		<div className="mx-auto flex min-h-screen w-full max-w-[760px] items-center px-4 py-6 sm:px-6">
			<Card className="w-full border-border/60 bg-card/90 backdrop-blur">
				<CardHeader className="gap-3">
					<Badge variant="outline" className="w-fit uppercase">
						관리자 대시보드
					</Badge>
					<CardTitle className="text-3xl font-semibold tracking-tight">{title}</CardTitle>
					<CardDescription className="max-w-2xl text-sm leading-6">{message}</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-wrap items-center gap-3">
					<Link
						href={ADMIN_LOGIN_PATH}
						className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
						{ctaLabel}
					</Link>
					<Badge variant="outline" className="uppercase">
						정적 경로, RLS 보호
					</Badge>
				</CardContent>
			</Card>
		</div>
	);
}

export default function AdminDashboardPanel() {
	const router = useRouter();
	const [state, setState] = useState<DashboardState>({ kind: 'loading' });
	const [query, setQuery] = useState('');
	const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');
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
				toast.success('로그아웃되었습니다.');
				router.replace(ADMIN_LOGIN_PATH);
			} catch (error) {
				const message = error instanceof Error ? error.message : '로그아웃에 실패했습니다.';
				toast.error(message);
			}
		});
	};

	if (state.kind === 'loading') {
		return <DashboardLoadingState />;
	}

	if (state.kind === 'config-error' || state.kind === 'error') {
		return <DashboardMessageState title="대시보드를 불러올 수 없습니다" message={state.message} ctaLabel="관리자 로그인으로 이동" />;
	}

	if (state.kind === 'unauthenticated' || state.kind === 'unauthorized') {
		return (
			<DashboardMessageState
				title={state.kind === 'unauthenticated' ? '로그인이 필요합니다' : '관리자 허용 목록이 필요합니다'}
				message={
					state.kind === 'unauthenticated'
						? '이 경로는 정적으로 배포되지만, 신청 데이터는 여전히 Supabase Auth와 RLS 뒤에서 보호됩니다.'
						: `${state.email ?? '이 계정'}은 로그인되었지만 admin_users에 활성 행이 없습니다.`
				}
				ctaLabel={state.kind === 'unauthenticated' ? '로그인 계속하기' : '관리자 로그인으로 이동'}
			/>
		);
	}

	const total = state.applications.length;
	const normalizedQuery = query.trim().toLowerCase();
	const statusCounts = FRONTIER_APPLICATION_STATUS_VALUES.map(status => ({
		status,
		count: state.applications.filter(application => application.status === status).length,
	}));
	const visibleApplications = state.applications.filter(application => {
		const matchesStatus = selectedStatus === 'all' || application.status === selectedStatus;
		const matchesQuery =
			normalizedQuery.length === 0 ||
			application.email.toLowerCase().includes(normalizedQuery) ||
			application.wallet_address.toLowerCase().includes(normalizedQuery) ||
			application.payment_token.toLowerCase().includes(normalizedQuery) ||
			application.id.toLowerCase().includes(normalizedQuery);

		return matchesStatus && matchesQuery;
	});
	const awaitingActionCount = state.applications.filter(application => ['submitted', 'awaiting_payment', 'payment_confirmed'].includes(application.status)).length;
	const approvedCount = state.applications.filter(application => application.status === 'approved').length;
	const latestSubmission = state.applications[0]?.submitted_at ?? null;

	return (
		<SidebarProvider defaultOpen>
			<div className="flex min-h-screen w-full">
				<Sidebar variant="sidebar" collapsible="icon">
					<SidebarHeader className="border-b border-sidebar-border/70">
						<div className="flex items-start gap-3 rounded-xl border border-sidebar-border/70 bg-sidebar-accent/50 p-3">
							<div className="flex size-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<ShieldCheckIcon />
							</div>
							<div className="grid min-w-0 gap-1 group-data-[collapsible=icon]:hidden">
								<p className="text-sm font-semibold text-sidebar-foreground">XORing 운영</p>
							</div>
						</div>
					</SidebarHeader>

					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>목록</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton type="button" isActive tooltip="신청 목록">
											<InboxIcon />
											<span>신청 목록</span>
										</SidebarMenuButton>
										<SidebarMenuBadge>{total}</SidebarMenuBadge>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>

						<SidebarSeparator />

						<SidebarGroup>
							<SidebarGroupLabel>상태 보기</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton type="button" isActive={selectedStatus === 'all'} onClick={() => setSelectedStatus('all')} tooltip="전체 신청">
											<InboxIcon />
											<span>전체 신청</span>
										</SidebarMenuButton>
										<SidebarMenuBadge>{total}</SidebarMenuBadge>
									</SidebarMenuItem>
									{statusCounts.map(item => {
										const Icon = getStatusIcon(item.status);

										return (
											<SidebarMenuItem key={item.status}>
												<SidebarMenuButton type="button" isActive={selectedStatus === item.status} onClick={() => setSelectedStatus(item.status)} tooltip={formatStatusLabel(item.status)}>
													<Icon />
													<span>{formatStatusLabel(item.status)}</span>
												</SidebarMenuButton>
												<SidebarMenuBadge>{item.count}</SidebarMenuBadge>
											</SidebarMenuItem>
										);
									})}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>

					<SidebarFooter className="border-t border-sidebar-border/70">
						<div className="rounded-xl border border-sidebar-border/70 bg-sidebar-accent/50 p-3 group-data-[collapsible=icon]:hidden">
							<p className="truncate text-sm font-medium text-sidebar-foreground">{state.email}</p>
							<p className="mt-1 text-xs text-sidebar-foreground/70">읽기 전용 경로, RLS 보호</p>
						</div>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton type="button" onClick={handleSignOut} tooltip="로그아웃">
									<LogOutIcon />
									<span>{isPending ? '로그아웃 중...' : '로그아웃'}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarFooter>
					<SidebarRail />
				</Sidebar>

				<SidebarInset className="min-w-0 bg-transparent">
					<div className="mx-auto flex min-h-screen w-full max-w-[1520px] flex-col">
						<header className="sticky top-0 z-20 border-b border-border/60 bg-background/82 backdrop-blur">
							<div className="flex items-center gap-3 px-4 py-3 sm:px-5">
								<SidebarTrigger />
								<Separator orientation="vertical" className="hidden h-5 sm:block" />
								<div className="grid min-w-0 gap-1">
									<p className="text-[11px] font-medium tracking-[0.24em] text-muted-foreground">관리자 신청 목록</p>
									<h1 className="text-lg font-semibold tracking-tight">읽기 워크벤치</h1>
								</div>
								<div className="ml-auto flex items-center gap-2">
									<Badge variant="outline" className="hidden sm:inline-flex">
										{visibleApplications.length}개 표시 중
									</Badge>
									<Badge variant="outline">읽기 전용</Badge>
								</div>
							</div>
						</header>

						<div className="flex flex-1 flex-col gap-4 px-4 py-4 sm:px-5 lg:gap-6 lg:py-5">
							<section className="grid gap-3 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]">
								<Card size="sm" className="border-border/60 bg-card/88 shadow-sm backdrop-blur">
									<CardHeader className="gap-2">
										<CardDescription>현재 표시 중인 신청</CardDescription>
										<CardTitle className="text-3xl font-semibold tracking-tight">{visibleApplications.length}</CardTitle>
									</CardHeader>
									<CardContent className="pt-0 text-sm text-muted-foreground">
										필터 적용 후 전체 {total}건 중 {visibleApplications.length}건을 보여줍니다.
									</CardContent>
								</Card>
								<Card size="sm" className="border-border/60 bg-card/88 shadow-sm backdrop-blur">
									<CardHeader className="gap-2">
										<CardDescription>다음 확인 필요</CardDescription>
										<CardTitle className="text-3xl font-semibold tracking-tight">{awaitingActionCount}</CardTitle>
									</CardHeader>
									<CardContent className="pt-0 text-sm text-muted-foreground">접수됨, 결제 대기, 결제 확인 상태를 합산합니다.</CardContent>
								</Card>
								<Card size="sm" className="border-border/60 bg-card/88 shadow-sm backdrop-blur">
									<CardHeader className="gap-2">
										<CardDescription>가장 최근 신청</CardDescription>
										<CardTitle className="text-lg font-semibold tracking-tight">{formatDate(latestSubmission)}</CardTitle>
									</CardHeader>
									<CardContent className="pt-0 text-sm text-muted-foreground">승인 완료 {approvedCount}건</CardContent>
								</Card>
							</section>

							<Card className="border-border/60 bg-card/88 shadow-sm backdrop-blur">
								<CardHeader className="gap-2">
									<CardTitle>필터</CardTitle>
									<CardDescription>이메일, 지갑 주소, 토큰, 신청 id로 검색할 수 있습니다. 상태 바로가기는 사이드바와 동기화됩니다.</CardDescription>
								</CardHeader>
								<CardContent className="flex flex-col gap-4">
									<div className="relative">
										<SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
										<Input value={query} onChange={event => setQuery(event.target.value)} placeholder="이메일, 지갑 주소, 토큰, 신청 id 검색" className="h-10 bg-background pl-9" />
									</div>
									<div className="flex flex-wrap gap-2">
										<Button type="button" variant={selectedStatus === 'all' ? 'secondary' : 'ghost'} size="sm" onClick={() => setSelectedStatus('all')}>
											<InboxIcon data-icon="inline-start" />
											전체
										</Button>
										{statusCounts.map(item => (
											<Button key={item.status} type="button" variant={selectedStatus === item.status ? 'secondary' : 'ghost'} size="sm" onClick={() => setSelectedStatus(item.status)}>
												{formatStatusLabel(item.status)}
												<span className="text-muted-foreground">{item.count}</span>
											</Button>
										))}
									</div>
								</CardContent>
							</Card>

							<Card className="border-border/60 bg-card/92 shadow-sm backdrop-blur">
								<CardHeader className="gap-2">
									<CardTitle>최근 신청 목록</CardTitle>
									<CardDescription>신청 시각, 이메일, 상태를 먼저 읽도록 구성했습니다. 보조 필드는 보이되 목록 밀도를 해치지 않는 선에서 유지합니다.</CardDescription>
								</CardHeader>
								<CardContent className="px-0 sm:px-4">
									{visibleApplications.length === 0 ? (
										<div className="px-4 pb-4 sm:px-0 sm:pb-0">
											<Card size="sm" className="border-dashed border-border/70 bg-muted/30">
												<CardHeader className="gap-2">
													<CardTitle>일치하는 항목이 없습니다</CardTitle>
													<CardDescription>검색어를 지우거나 현재 상태 필터를 바꿔 보세요.</CardDescription>
												</CardHeader>
											</Card>
										</div>
									) : (
										<>
											<div className="hidden md:block">
												<Table>
													<TableHeader>
														<TableRow>
															<TableHead className="pl-4 sm:pl-2">신청 시각</TableHead>
															<TableHead>신청자</TableHead>
															<TableHead>상태</TableHead>
															<TableHead className="hidden lg:table-cell">토큰</TableHead>
															<TableHead className="hidden xl:table-cell">지갑</TableHead>
															<TableHead className="hidden 2xl:table-cell">검토 시각</TableHead>
														</TableRow>
													</TableHeader>
													<TableBody>
														{visibleApplications.map(application => (
															<TableRow key={application.id}>
																<TableCell className="pl-4 align-top sm:pl-2">
																	<div className="grid gap-1">
																		<p className="font-medium leading-5">{formatDate(application.submitted_at)}</p>
																		<p className="text-xs text-muted-foreground">상태 변경 {formatDate(application.status_changed_at)}</p>
																	</div>
																</TableCell>
																<TableCell className="align-top">
																	<div className="grid gap-1">
																		<p className="font-medium leading-5 text-foreground">{application.email}</p>
																		<p className="truncate text-xs text-muted-foreground">{application.id}</p>
																	</div>
																</TableCell>
																<TableCell className="align-top">
																	<StatusBadge status={application.status} />
																</TableCell>
																<TableCell className="hidden align-top lg:table-cell">
																	<Badge variant="outline" className="uppercase">
																		{application.payment_token}
																	</Badge>
																</TableCell>
																<TableCell className="hidden align-top xl:table-cell">
																	<p className="max-w-[220px] truncate font-mono text-xs text-muted-foreground">{application.wallet_address}</p>
																</TableCell>
																<TableCell className="hidden align-top 2xl:table-cell">
																	<p className="text-muted-foreground">{formatDate(application.reviewed_at)}</p>
																</TableCell>
															</TableRow>
														))}
													</TableBody>
												</Table>
											</div>

											<div className="grid gap-3 px-4 pb-4 md:hidden">
												{visibleApplications.map(application => (
													<Card key={application.id} size="sm" className="border-border/70 bg-background/60 shadow-none">
														<CardHeader className="gap-2">
															<div className="flex items-start justify-between gap-3">
																<div className="grid gap-1">
																	<CardDescription>신청 시각</CardDescription>
																	<CardTitle className="text-base font-semibold">{formatDate(application.submitted_at)}</CardTitle>
																</div>
																<StatusBadge status={application.status} />
															</div>
														</CardHeader>
														<CardContent className="flex flex-col gap-3">
															<div className="grid gap-1">
																<p className="text-xs tracking-[0.18em] text-muted-foreground">신청자</p>
																<p className="text-sm font-medium text-foreground">{application.email}</p>
																<p className="truncate text-xs text-muted-foreground">{application.id}</p>
															</div>
															<div className="grid gap-3 sm:grid-cols-2">
																<div className="grid gap-1">
																	<p className="text-xs tracking-[0.18em] text-muted-foreground">토큰</p>
																	<p className="text-sm uppercase text-foreground">{application.payment_token}</p>
																</div>
																<div className="grid gap-1">
																	<p className="text-xs tracking-[0.18em] text-muted-foreground">검토 시각</p>
																	<p className="text-sm text-foreground">{formatDate(application.reviewed_at)}</p>
																</div>
															</div>
															<div className="grid gap-1">
																<p className="text-xs tracking-[0.18em] text-muted-foreground">지갑</p>
																<p className="truncate font-mono text-xs text-muted-foreground">{application.wallet_address}</p>
															</div>
														</CardContent>
													</Card>
												))}
											</div>
										</>
									)}
								</CardContent>
							</Card>
						</div>
					</div>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}
