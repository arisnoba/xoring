'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRightIcon, BadgeCheckIcon, CreditCardIcon, InboxIcon, LogOutIcon, MailIcon, PenLineIcon, SearchIcon, ShieldCheckIcon, XCircleIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ADMIN_LOGIN_PATH, FRONTIER_APPLICATION_STATUS_VALUES, MISSING_SUPABASE_CONFIG_MESSAGE, type FrontierApplicationStatus } from '@/lib/admin/config';
import { getAdminAccess, signOutAdmin } from '@/lib/admin/auth';
import { listFrontierApplications, type FrontierApplicationListItem, updateFrontierApplicationStatus } from '@/lib/admin/frontier-applications';
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
type TokenFilter = 'all' | FrontierApplicationListItem['payment_token'];

const STATUS_LABELS: Record<FrontierApplicationStatus, string> = {
	submitted: 'Submitted',
	awaiting_payment: 'Awaiting Payment',
	payment_confirmed: 'Payment Confirmed',
	approved: 'Approved',
	rejected: 'Rejected',
};

function formatDate(value: string | null) {
	if (!value) {
		return '—';
	}

	return new Intl.DateTimeFormat('en-US', {
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
		<Badge variant={getStatusBadgeVariant(status)} className="uppercase text-sm p-2">
			{formatStatusLabel(status)}
		</Badge>
	);
}

function DashboardLoadingState() {
	return (
		<div className="mx-auto flex min-h-screen w-full max-w-[1520px] items-center justify-center px-4 py-6 sm:px-6">
			<div className="flex flex-col items-center gap-4 text-center">
				<div className="size-10 animate-spin rounded-full border-2 border-white/14 border-t-white/80" />
				<div className="grid gap-1">
					<p className="text-sm font-medium text-white/86">Loading admin workspace</p>
					<p className="text-xs text-white/48">Checking application data and access status.</p>
				</div>
			</div>
		</div>
	);
}

function DashboardMessageState({ title, message, ctaLabel }: { title: string; message: string; ctaLabel: string }) {
	return (
		<div className="mx-auto flex min-h-screen w-full max-w-[760px] items-center px-4 py-6 sm:px-6">
			<Card className="w-full border-border/60 bg-card/90 backdrop-blur">
				<CardHeader className="gap-3">
					<Badge variant="outline" className="w-fit uppercase">
						Admin Dashboard
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
						Static Route, RLS Protected
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
	const [selectedToken, setSelectedToken] = useState<TokenFilter>('all');
	const [isPending, startTransition] = useTransition();
	const [isUpdatingStatus, startStatusTransition] = useTransition();
	const [activeApplication, setActiveApplication] = useState<FrontierApplicationListItem | null>(null);

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

	useEffect(() => {
		if (state.kind === 'unauthenticated') {
			router.replace(ADMIN_LOGIN_PATH);
		}
	}, [router, state.kind]);

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

	const handleStatusUpdate = (nextStatus: FrontierApplicationStatus) => {
		if (!activeApplication) {
			return;
		}

		startStatusTransition(async () => {
			try {
				const updated = await updateFrontierApplicationStatus(activeApplication.id, nextStatus);

				setState(current => {
					if (current.kind !== 'ready') {
						return current;
					}

					return {
						...current,
						applications: current.applications.map(application => (application.id === updated.id ? updated : application)),
					};
				});

				setActiveApplication(updated);
				toast.success(`Status changed to ${formatStatusLabel(nextStatus)}.`);
			} catch (error) {
				const message = error instanceof Error ? error.message : 'Failed to update status.';
				toast.error(message);
			}
		});
	};

	if (state.kind === 'loading') {
		return <DashboardLoadingState />;
	}

	if (state.kind === 'config-error' || state.kind === 'error') {
		return <DashboardMessageState title="Unable to load the dashboard" message={state.message} ctaLabel="Go to admin sign-in" />;
	}

	if (state.kind === 'unauthenticated') {
		return <DashboardLoadingState />;
	}

	if (state.kind === 'unauthorized') {
		return (
			<DashboardMessageState
				title="Admin allowlist required"
				message={`${state.email ?? 'This account'} is signed in, but no active row was found in admin_users.`}
				ctaLabel="Go to admin sign-in"
			/>
		);
	}

	const total = state.applications.length;
	const normalizedQuery = query.trim().toLowerCase();
	const statusCounts = FRONTIER_APPLICATION_STATUS_VALUES.map(status => ({
		status,
		count: state.applications.filter(application => application.status === status).length,
	}));
	const tokenCounts = (['usdt', 'aios'] as const).map(token => ({
		token,
		count: state.applications.filter(application => application.payment_token === token).length,
	}));
	const visibleApplications = state.applications.filter(application => {
		const matchesStatus = selectedStatus === 'all' || application.status === selectedStatus;
		const matchesToken = selectedToken === 'all' || application.payment_token === selectedToken;
		const matchesQuery =
			normalizedQuery.length === 0 ||
			application.email.toLowerCase().includes(normalizedQuery) ||
			application.wallet_address.toLowerCase().includes(normalizedQuery) ||
			application.payment_token.toLowerCase().includes(normalizedQuery) ||
			application.id.toLowerCase().includes(normalizedQuery);

		return matchesStatus && matchesToken && matchesQuery;
	});
	const awaitingActionCount = state.applications.filter(application => ['submitted', 'awaiting_payment', 'payment_confirmed'].includes(application.status)).length;
	const approvedCount = state.applications.filter(application => application.status === 'approved').length;
	const latestSubmission = state.applications[0]?.submitted_at ?? null;

	return (
		<SidebarProvider defaultOpen>
			<div className="flex min-h-screen w-full">
				<Sidebar variant="sidebar" collapsible="icon">
					<SidebarHeader className="border-b border-sidebar-border/70">
						<div className="flex items-center gap-3">
							<div className="flex size-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<ShieldCheckIcon />
							</div>
							<div className="grid min-w-0 gap-1 group-data-[collapsible=icon]:hidden">
								<p className="text-sm font-semibold text-sidebar-foreground">XORing Admin</p>
							</div>
						</div>
					</SidebarHeader>

					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>Browse</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton type="button" isActive tooltip="Application list">
											<InboxIcon />
											<span>Application List</span>
										</SidebarMenuButton>
										<SidebarMenuBadge>{total}</SidebarMenuBadge>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>

						<SidebarSeparator />

						<SidebarGroup>
							<SidebarGroupLabel>Status</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton type="button" isActive={selectedStatus === 'all'} onClick={() => setSelectedStatus('all')} tooltip="All applications">
											<InboxIcon />
											<span>All Applications</span>
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
						</div>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton render={<Link href="/" />} tooltip="Go to landing page">
									<ArrowUpRightIcon />
									<span>Landing Page</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton type="button" onClick={handleSignOut} tooltip="Sign out">
									<LogOutIcon />
									<span>{isPending ? 'Signing out...' : 'Sign Out'}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarFooter>
					<SidebarRail />
				</Sidebar>

				<SidebarInset className="min-w-0 bg-transparent">
					<div className="mx-auto flex min-h-screen w-full flex-col">
						<header className="sticky top-0 z-20 border-b border-border/60 bg-background/82 backdrop-blur">
							<div className="flex items-center gap-5 px-4 py-3 sm:px-5">
								<SidebarTrigger />
								<Separator orientation="vertical" className="hidden h-8 sm:block" />
								<h1 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">Frontier Application Overview</h1>
								<div className="ml-auto flex items-center gap-2">
									<Badge variant="outline" className="hidden sm:inline-flex">
										Showing {visibleApplications.length}
									</Badge>
									<Badge variant="outline">Read Only</Badge>
								</div>
							</div>
						</header>

						<div className="flex flex-1 flex-col gap-4 px-4 py-4 sm:px-5 lg:gap-6 lg:py-5">
							<section className="grid gap-3 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]">
								<Card size="sm" className="border-border/60 bg-card/88 shadow-sm backdrop-blur">
									<CardHeader className="gap-2">
										<CardDescription>Visible applications</CardDescription>
										<CardTitle className="text-3xl! font-semibold! tracking-tight">{visibleApplications.length}</CardTitle>
									</CardHeader>
									<CardContent className="pt-0 text-sm text-muted-foreground">
										Showing {visibleApplications.length} of {total} applications after filters are applied.
									</CardContent>
								</Card>
								<Card size="sm" className="border-border/60 bg-card/88 shadow-sm backdrop-blur">
									<CardHeader className="gap-2">
										<CardDescription>Needs review</CardDescription>
										<CardTitle className="text-3xl! font-semibold! tracking-tight">{awaitingActionCount}</CardTitle>
									</CardHeader>
									<CardContent className="pt-0 text-sm text-muted-foreground">Includes Submitted, Awaiting Payment, and Payment Confirmed.</CardContent>
								</Card>
								<Card size="sm" className="border-border/60 bg-card/88 shadow-sm backdrop-blur">
									<CardHeader className="gap-2">
										<CardDescription>Latest submission</CardDescription>
										<CardTitle className="text-lg! font-semibold! tracking-tight">{formatDate(latestSubmission)}</CardTitle>
									</CardHeader>
									<CardContent className="pt-0 text-sm text-muted-foreground">{approvedCount} approved</CardContent>
								</Card>
							</section>

							<Card className="border-border/60 bg-card/88 shadow-sm backdrop-blur">
								<CardHeader className="gap-2">
									<CardTitle>Filters</CardTitle>
									<CardDescription>Search by email, wallet address, token, or application ID. Combine status and token filters to narrow the list quickly.</CardDescription>
								</CardHeader>
								<CardContent className="flex flex-col gap-4">
									<div className="relative">
										<SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
										<Input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search email, wallet, token, or application ID" className="h-10 bg-background pl-9" />
									</div>
									<div className="flex flex-wrap gap-2">
										<Button type="button" variant={selectedStatus === 'all' ? 'secondary' : 'ghost'} size="sm" onClick={() => setSelectedStatus('all')}>
											<InboxIcon data-icon="inline-start" />
											All
										</Button>
										{statusCounts.map(item => (
											<Button key={item.status} type="button" variant={selectedStatus === item.status ? 'secondary' : 'ghost'} size="sm" onClick={() => setSelectedStatus(item.status)}>
												{formatStatusLabel(item.status)}
												<span className="text-muted-foreground">{item.count}</span>
											</Button>
										))}
									</div>
									<div className="flex flex-wrap gap-2">
										<Button type="button" variant={selectedToken === 'all' ? 'secondary' : 'ghost'} size="sm" onClick={() => setSelectedToken('all')}>
											All Tokens
										</Button>
										{tokenCounts.map(item => (
											<Button key={item.token} type="button" variant={selectedToken === item.token ? 'secondary' : 'ghost'} size="sm" onClick={() => setSelectedToken(item.token)}>
												{item.token.toUpperCase()}
												<span className="text-muted-foreground">{item.count}</span>
											</Button>
										))}
									</div>
								</CardContent>
							</Card>

							<Card className="border-border/60 bg-card/92 shadow-sm backdrop-blur">
								<CardHeader className="gap-2">
									<CardTitle>Recent applications</CardTitle>
									<CardDescription>Prioritizes submission date, email, and status, while keeping supporting fields visible without reducing scan density.</CardDescription>
								</CardHeader>
								<CardContent className="px-0 sm:px-4">
									{visibleApplications.length === 0 ? (
										<div className="px-4 pb-4 sm:px-0 sm:pb-0">
											<Card size="sm" className="border-dashed border-border/70 bg-muted/30">
												<CardHeader className="gap-2">
													<CardTitle>No matching applications</CardTitle>
													<CardDescription>Clear the search or change the current filters.</CardDescription>
												</CardHeader>
											</Card>
										</div>
									) : (
										<>
											<div className="hidden md:block">
												<Table>
													<TableHeader>
														<TableRow>
															<TableHead className="pl-4 sm:pl-2">Submitted</TableHead>
															<TableHead>Applicant</TableHead>
															<TableHead>Status</TableHead>
															<TableHead className="hidden lg:table-cell">Token</TableHead>
															<TableHead className="hidden xl:table-cell">Wallet</TableHead>
															<TableHead className="hidden 2xl:table-cell">Reviewed</TableHead>
															<TableHead className="pr-4 text-right sm:pr-2">Actions</TableHead>
														</TableRow>
													</TableHeader>
													<TableBody>
														{visibleApplications.map(application => (
															<TableRow key={application.id}>
																<TableCell className="pl-4 align-top sm:pl-2">
																	<div className="grid gap-1">
																		<p className="font-medium leading-5">{formatDate(application.submitted_at)}</p>
																		<p className="text-xs text-muted-foreground">Status changed {formatDate(application.status_changed_at)}</p>
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
																	<p className="truncate font-mono text-xs text-muted-foreground">{application.wallet_address}</p>
																</TableCell>
																<TableCell className="hidden align-top 2xl:table-cell">
																	<p className="text-muted-foreground">{formatDate(application.reviewed_at)}</p>
																</TableCell>
																<TableCell className="pr-4 align-top text-right sm:pr-2">
																	<Button type="button" variant="ghost" size="sm" onClick={() => setActiveApplication(application)}>
																		<PenLineIcon data-icon="inline-start" />
																		Change Status
																	</Button>
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
																	<CardDescription>Submitted</CardDescription>
																	<CardTitle className="text-base font-semibold">{formatDate(application.submitted_at)}</CardTitle>
																</div>
																<StatusBadge status={application.status} />
															</div>
														</CardHeader>
														<CardContent className="flex flex-col gap-3">
															<div className="grid gap-1">
																<p className="text-xs tracking-[0.18em] text-muted-foreground">APPLICANT</p>
																<p className="text-sm font-medium text-foreground">{application.email}</p>
																<p className="truncate text-xs text-muted-foreground">{application.id}</p>
															</div>
															<div className="grid gap-3 sm:grid-cols-2">
																<div className="grid gap-1">
																	<p className="text-xs tracking-[0.18em] text-muted-foreground">TOKEN</p>
																	<p className="text-sm uppercase text-foreground">{application.payment_token}</p>
																</div>
																<div className="grid gap-1">
																	<p className="text-xs tracking-[0.18em] text-muted-foreground">REVIEWED</p>
																	<p className="text-sm text-foreground">{formatDate(application.reviewed_at)}</p>
																</div>
															</div>
															<div className="grid gap-1">
																<p className="text-xs tracking-[0.18em] text-muted-foreground">WALLET</p>
																<p className="truncate font-mono text-xs text-muted-foreground">{application.wallet_address}</p>
															</div>
															<Button type="button" variant="outline" size="sm" onClick={() => setActiveApplication(application)}>
																<PenLineIcon data-icon="inline-start" />
																Change Status
															</Button>
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

			<Dialog
				open={Boolean(activeApplication)}
				onOpenChange={open => {
					if (!open && !isUpdatingStatus) {
						setActiveApplication(null);
					}
				}}>
				<DialogContent className="dark max-w-[calc(100%-2rem)] border-white/10 bg-[#1a1a1a] text-white sm:max-w-lg">
					<DialogHeader>
						<DialogTitle className="text-white">Change Status</DialogTitle>
						<DialogDescription className="text-white/50">
							{activeApplication ? `Update the current status for ${activeApplication.email}.` : 'Update the status for the selected application.'}
						</DialogDescription>
					</DialogHeader>

					{activeApplication ? (
						<div className="flex flex-col gap-4">
							<div className="rounded-xl border border-white/10 bg-white/5 p-4">
								<div className="grid gap-2">
									<p className="text-sm font-medium text-white">{activeApplication.email}</p>
									<div className="flex flex-wrap items-center gap-2 text-xs text-white/50">
										<span>Current status</span>
										<StatusBadge status={activeApplication.status} />
										<span>Last changed {formatDate(activeApplication.status_changed_at)}</span>
									</div>
								</div>
							</div>

							<div className="grid gap-2 sm:grid-cols-2">
								{FRONTIER_APPLICATION_STATUS_VALUES.map(status => (
									<Button
										key={status}
										type="button"
										variant={activeApplication.status === status ? 'secondary' : 'outline'}
										className="justify-start border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white disabled:opacity-40"
										disabled={isUpdatingStatus || activeApplication.status === status}
										onClick={() => handleStatusUpdate(status)}>
										{formatStatusLabel(status)}
									</Button>
								))}
							</div>
						</div>
					) : null}

					<DialogFooter className="items-center justify-between sm:flex-row sm:justify-between">
						<p className="text-xs text-white/40">Changing to Approved or Rejected automatically records the review time.</p>
						<Button
							type="button"
							variant="outline"
							onClick={() => setActiveApplication(null)}
							disabled={isUpdatingStatus}
							className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
							Close
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</SidebarProvider>
	);
}
