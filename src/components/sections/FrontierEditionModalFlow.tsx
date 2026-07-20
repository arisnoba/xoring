'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Copy, X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { getSupabaseBrowserClient, hasSupabaseBrowserConfig } from '@/lib/supabase/client';
import type { SiteMessages } from '@/lib/i18n';
import { getLocalizedPath, type Locale } from '@/lib/locale';
import { cn } from '@/lib/utils';

const TOKEN_OPTIONS = [
	{
		key: 'usdt',
		label: '99.9 USDT',
		amount: '99.9 USDT',
		wallet: '0x0000-REPLACE-USDT-WALLET',
	},
	{
		key: 'aios',
		label: '9999 AIOS',
		amount: '9999 AIOS',
		wallet: '0x0000-REPLACE-AIOS-WALLET',
	},
] as const;

type TokenKey = (typeof TOKEN_OPTIONS)[number]['key'];
type ModalStep = 'application' | 'complete' | null;
type FormField = 'email' | 'walletAddress' | 'agreed';
type FormErrors = Partial<Record<FormField, string>>;

const FRONTIER_MODAL_VISUAL_SRC = '/assets/images/popup/kv.png';
const FRONTIER_MODAL_BACKGROUND_SRC = '/assets/images/popup/bg.jpg';
const FRONTIER_APPLICATION_FUNCTION_NAME = 'frontier-application-submit';
const FRONTIER_TERMS_VERSION = '2026-03-12';
const FRONTIER_PRIVACY_VERSION = '2026-03-12';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EVM_WALLET_PATTERN = /^0x[a-fA-F0-9]{40}$/;

class FrontierApplicationSubmitError extends Error {
	field?: FormField;

	constructor(message: string, field?: FormField) {
		super(message);
		this.name = 'FrontierApplicationSubmitError';
		this.field = field;
	}
}

function normalizeEmail(value: string) {
	return value.trim().toLowerCase();
}

function normalizeWalletAddress(value: string) {
	return value.trim();
}

function validateEmail(value: string, copy: SiteMessages['frontier']) {
	if (!value) {
		return copy.validation.emailRequired;
	}

	if (!EMAIL_PATTERN.test(value)) {
		return copy.validation.emailInvalid;
	}

	return undefined;
}

function validateWalletAddress(value: string, copy: SiteMessages['frontier']) {
	if (!value) {
		return copy.validation.walletRequired;
	}

	if (!EVM_WALLET_PATTERN.test(value)) {
		return copy.validation.walletInvalid;
	}

	return undefined;
}

function validateApplicationForm({ email, walletAddress, agreed }: { email: string; walletAddress: string; agreed: boolean }, copy: SiteMessages['frontier']) {
	return {
		email: validateEmail(normalizeEmail(email), copy),
		walletAddress: validateWalletAddress(normalizeWalletAddress(walletAddress), copy),
		agreed: agreed ? undefined : copy.validation.agreementRequired,
	} satisfies FormErrors;
}

async function parseFunctionError(error: unknown, copy: SiteMessages['frontier'], locale: Locale) {
	const fallbackMessage = locale === 'cn' ? copy.validation.submitFailed : error instanceof Error ? error.message : copy.validation.submitFailed;

	if (typeof error === 'object' && error !== null && 'context' in error) {
		const context = (error as { context?: unknown }).context;

		if (context instanceof Response) {
			const payload = (await context.json().catch(() => null)) as {
				error?: string;
				field?: FormField;
			} | null;

			if (payload?.error) {
				return {
					message: locale === 'cn' ? (payload.field === 'email' ? copy.validation.emailInvalid : payload.field === 'walletAddress' ? copy.validation.walletInvalid : copy.validation.submitFailed) : payload.error,
					field: payload.field,
				};
			}
		}
	}

	return {
		message: fallbackMessage,
	};
}

async function submitFrontierApplication({ email, walletAddress, selectedToken, copy, locale }: { email: string; walletAddress: string; selectedToken: TokenKey; copy: SiteMessages['frontier']; locale: Locale }) {
	const client = getSupabaseBrowserClient();

	if (!client || !hasSupabaseBrowserConfig()) {
		throw new FrontierApplicationSubmitError(copy.validation.unavailable);
	}

	const { error } = await client.functions.invoke(FRONTIER_APPLICATION_FUNCTION_NAME, {
		body: {
			email: normalizeEmail(email),
			walletAddress: normalizeWalletAddress(walletAddress),
			paymentToken: selectedToken,
			termsVersion: FRONTIER_TERMS_VERSION,
			privacyVersion: FRONTIER_PRIVACY_VERSION,
		},
	});

	if (error) {
		const parsedError = await parseFunctionError(error, copy, locale);
		throw new FrontierApplicationSubmitError(parsedError.message, parsedError.field);
	}
}

function CopyField({ label, value, placeholder, copy }: { label?: string; value: string; placeholder?: string; copy: SiteMessages['frontier'] }) {
	const displayValue = value || '';

	const handleCopy = async () => {
		if (!displayValue) return;

		try {
			await navigator.clipboard.writeText(displayValue);
			toast.success(copy.copySuccess);
		} catch {
			toast.error(copy.copyFailed);
		}
	};

	return (
		<div className="flex flex-col gap-2">
			{label ? <p className="text-left text-sm font-semibold tracking-[0.01em] text-[#323232]">{label}</p> : null}
			<div className="flex items-center gap-2 rounded-[12px] bg-[#f2f2f2] px-3 py-2.5 text-center">
				<div className="min-w-0 flex-1 truncate text-sm font-medium text-[#595959]">{displayValue || <span className="text-[#9a9a9a]">{placeholder}</span>}</div>
				<Button
					type="button"
					variant="outline"
					size="icon-sm"
					onClick={handleCopy}
					disabled={!displayValue}
					className="rounded-full border-[#dedede] bg-white text-[#757575] hover:bg-white hover:text-[#111]"
					aria-label={label ? `${label} ${copy.copySuffix}` : copy.copyWallet}>
					<Copy />
				</Button>
			</div>
		</div>
	);
}

function DialogCloseButton({ onClick, copy, inverted = false }: { onClick: () => void; copy: SiteMessages['frontier']; inverted?: boolean }) {
	return (
		<Button
			type="button"
			variant="ghost"
			size="icon-sm"
			onClick={onClick}
			className={cn('absolute right-4 top-4 z-20 rounded-full', inverted ? 'bg-white/6 text-white/78 hover:bg-white/10 hover:text-white' : 'text-[#cfcfcf] hover:text-[#8a8a8a]')}
			aria-label={copy.closeModal}>
			<X />
		</Button>
	);
}

function FrontierApplicationModal({
	open,
	copy,
	locale,
	selectedToken,
	email,
	walletAddress,
	agreed,
	errors,
	submitError,
	isSubmitting,
	onOpenChange,
	onSelectToken,
	onChangeEmail,
	onChangeWalletAddress,
	onToggleAgreed,
	onSubmit,
}: {
	open: boolean;
	copy: SiteMessages['frontier'];
	locale: Locale;
	selectedToken: TokenKey;
	email: string;
	walletAddress: string;
	agreed: boolean;
	errors: FormErrors;
	submitError: string | null;
	isSubmitting: boolean;
	onOpenChange: (open: boolean) => void;
	onSelectToken: (token: TokenKey) => void;
	onChangeEmail: (value: string) => void;
	onChangeWalletAddress: (value: string) => void;
	onToggleAgreed: (checked: boolean) => void;
	onSubmit: () => void;
}) {
	const lenis = useLenis();
	const selectedTokenOption = TOKEN_OPTIONS.find(option => option.key === selectedToken) ?? TOKEN_OPTIONS[0];

	useEffect(() => {
		if (!lenis) return;
		if (open) {
			lenis.stop();
		} else {
			lenis.start();
		}
		return () => {
			lenis.start();
		};
	}, [open, lenis]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent showCloseButton={false} scrollable className="max-w-2xl gap-0 overflow-hidden rounded-[30px] border-none bg-white p-0 text-left shadow-[0_28px_100px_rgba(0,0,0,0.34)]">
				<div className="relative bg-white">
					<div className="relative overflow-hidden bg-[#0c1116] bg-cover bg-center p-4" style={{ backgroundImage: `url(${FRONTIER_MODAL_BACKGROUND_SRC})` }}>
						<div className="relative z-10 mx-auto w-full">
							<Image src={FRONTIER_MODAL_VISUAL_SRC} alt={copy.bannerAlt} width={2710} height={1280} className="h-auto w-full" unoptimized priority />
						</div>
					</div>

					<DialogCloseButton onClick={() => onOpenChange(false)} copy={copy} inverted />
				</div>

				<div className="px-5 pb-5 pt-5 text-[#111] sm:px-6 sm:pb-6 sm:pt-6">
					<form
						className="flex flex-col gap-5"
						onSubmit={event => {
							event.preventDefault();
							void onSubmit();
						}}>
						<div className="flex flex-col gap-2">
							<div className="flex flex-col gap-3">
								<p className="text-left text-base font-semibold leading-normal text-[#222]">{copy.selectToken}</p>
								<div className="inline-flex rounded-full bg-[#f0f0f0] p-1">
									{TOKEN_OPTIONS.map(option => {
										const isSelected = option.key === selectedToken;

										return (
											<button
												key={option.key}
												type="button"
												onClick={() => onSelectToken(option.key)}
												className={cn(
													'flex-1 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200',
													isSelected ? 'bg-white text-[#7916d0] shadow-[0_1px_4px_rgba(0,0,0,0.12)]' : 'text-[#8a8a8a] hover:text-[#555]'
												)}>
												{option.label}
											</button>
										);
									})}
								</div>
							</div>

							<div className="flex flex-col gap-3 rounded-[18px] border border-[#a200ff] px-4 py-4">
								<div className="flex flex-col gap-1.5">
									<p className="text-left text-sm font-semibold leading-normal text-[#222]">
										{copy.transferGuide}
									</p>
									<CopyField value={selectedTokenOption.wallet} copy={copy} />
								</div>
								<p className="text-left text-sm font-medium leading-normal text-amber-500">{copy.warning}</p>
							</div>
						</div>

						<div className="flex flex-col gap-3">
							<label className="text-left text-base font-semibold leading-normal text-[#222]" htmlFor="frontier-email">
								{copy.emailLabel}
							</label>
							<Input
								id="frontier-email"
								type="email"
								value={email}
								onChange={event => onChangeEmail(event.target.value)}
								placeholder="your@email.com"
								aria-invalid={Boolean(errors.email)}
								className={cn(
									'h-11 rounded-[12px] border-none bg-[#f2f2f2] px-3.5 text-sm text-[#222] placeholder:text-[#a8a8a8] focus-visible:ring-[rgba(162,0,255,0.12)]',
									errors.email ? 'ring-1 ring-[#ff5f5f]' : ''
								)}
							/>
							<p className={cn('text-left text-sm font-medium leading-normal', errors.email ? 'text-[#ff5f5f]' : 'text-amber-500')}>{errors.email ?? copy.emailHelper}</p>
						</div>

						<div className="flex flex-col gap-3">
							<label className="text-left text-base font-semibold leading-normal text-[#222]" htmlFor="frontier-wallet">
								{copy.walletLabel}
							</label>
							<Input
								id="frontier-wallet"
								type="text"
								value={walletAddress}
								onChange={event => onChangeWalletAddress(event.target.value)}
								placeholder="0x..."
								aria-invalid={Boolean(errors.walletAddress)}
								className={cn(
									'h-11 rounded-[12px] border-none bg-[#f2f2f2] px-3.5 text-sm text-[#222] placeholder:text-[#a8a8a8] focus-visible:ring-[rgba(162,0,255,0.12)]',
									errors.walletAddress ? 'ring-1 ring-[#ff5f5f]' : ''
								)}
							/>
							<p className={cn('text-left text-sm font-medium leading-normal', errors.walletAddress ? 'text-[#ff5f5f]' : 'text-amber-500')}>{errors.walletAddress ?? copy.walletHelper}</p>
						</div>

						<label className="flex items-start gap-3 rounded-[16px] bg-[#f7f7f7] px-4 py-4 text-left" htmlFor="frontier-agreement">
							<Checkbox
								id="frontier-agreement"
								checked={agreed}
								onCheckedChange={checked => onToggleAgreed(Boolean(checked))}
								className="mt-0.5 size-[18px] rounded-[5px] border-[#cfcfcf] data-checked:border-[#8f00ff] data-checked:bg-[#8f00ff]"
							/>
							<span className="text-sm leading-[1.6] text-[#555]">
								{copy.consent} {copy.consentPrefix}{' '}
								<Link href={getLocalizedPath(locale, '/terms')} target="_blank" rel="noreferrer" className="font-semibold text-[#222] underline underline-offset-2">
									{copy.terms}
								</Link>{' '}
								{copy.and}{' '}
								<Link href={getLocalizedPath(locale, '/privacy')} target="_blank" rel="noreferrer" className="font-semibold text-[#222] underline underline-offset-2">
									{copy.privacy}
								</Link>{' '}
								{copy.consentSuffix}
							</span>
						</label>
						{errors.agreed ? <p className="text-left text-sm font-medium leading-normal text-[#ff5f5f]">{errors.agreed}</p> : null}
						{submitError ? <p className="rounded-[14px] bg-[#fff1f1] px-4 py-3 text-left text-sm font-medium leading-normal text-[#d93025]">{submitError}</p> : null}

						<Button type="submit" disabled={isSubmitting} className="h-12 rounded-full bg-[#222] text-sm font-semibold text-white hover:bg-[#222]/92 disabled:bg-[#bcbcbc]">
							{isSubmitting ? copy.submitting : copy.confirm}
						</Button>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function FrontierCompletionModal({ open, selectedToken, copy, onOpenChange }: { open: boolean; selectedToken: TokenKey; copy: SiteMessages['frontier']; onOpenChange: (open: boolean) => void }) {
	const lenis = useLenis();

	useEffect(() => {
		if (!lenis) return;
		if (open) {
			lenis.stop();
		} else {
			lenis.start();
		}
		return () => {
			lenis.start();
		};
	}, [open, lenis]);

	const selectedTokenOption = TOKEN_OPTIONS.find(option => option.key === selectedToken) ?? TOKEN_OPTIONS[0];

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				showCloseButton={false}
				scrollable
				className="relative max-w-2xl gap-0 overflow-hidden rounded-[30px] border-none bg-white p-0 text-left shadow-[0_28px_100px_rgba(0,0,0,0.34)]">
				<DialogCloseButton onClick={() => onOpenChange(false)} copy={copy} />
				<div className="px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
					<div className="flex flex-col gap-5">
						<div className="flex flex-col gap-4 text-center">
							<DialogTitle className="mx-auto text-balance text-[2rem] font-black leading-[0.95] tracking-[-0.04em] text-[#2f2f31] sm:text-[2.35rem] pt-5 pb-3">
								{copy.completeTitle}
							</DialogTitle>
							<DialogDescription className="mx-auto text-balance text-base leading-[1.65] text-[#555]">
								<span className="block">{copy.completeIntro}</span>
								<span className="mt-8 block">
									<span className="font-bold">{copy.completeFirstComeStrong}</span>
									<br />
									{copy.completeFirstComeRest}
								</span>
								<span className="mt-8 block">{copy.completeShipping}</span>
							</DialogDescription>
						</div>

						<div className="flex flex-col gap-4 mt-5">
							<p className="mx-auto text-center text-balance text-sm font-bold leading-normal text-[#ff2d2d]">
								{copy.completeWarning[0]} <br />
								{copy.completeWarning[1]}
							</p>
							<CopyField label={`${copy.walletLabels[selectedToken]} — ${selectedTokenOption.amount}`} value={selectedTokenOption.wallet} copy={copy} />
						</div>

						<Button type="button" onClick={() => onOpenChange(false)} className="h-12 rounded-full bg-[#222] text-sm font-semibold text-white hover:bg-[#222]/92">
							{copy.confirm}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default function FrontierEditionModalFlow({ copy, locale }: { copy: SiteMessages['frontier']; locale: Locale }) {
	const [modalStep, setModalStep] = useState<ModalStep>(null);
	const [selectedToken, setSelectedToken] = useState<TokenKey>('usdt');
	const [email, setEmail] = useState('');
	const [walletAddress, setWalletAddress] = useState('');
	const [agreed, setAgreed] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({});
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const resetForm = () => {
		setSelectedToken('usdt');
		setEmail('');
		setWalletAddress('');
		setAgreed(false);
		setErrors({});
		setSubmitError(null);
		setIsSubmitting(false);
	};

	const handleEmailChange = (value: string) => {
		setEmail(value);
		setErrors(current => ({
			...current,
			email: validateEmail(normalizeEmail(value), copy),
		}));
		setSubmitError(null);
	};

	const handleWalletAddressChange = (value: string) => {
		setWalletAddress(value);
		setErrors(current => ({
			...current,
			walletAddress: validateWalletAddress(normalizeWalletAddress(value), copy),
		}));
		setSubmitError(null);
	};

	const handleAgreedChange = (checked: boolean) => {
		setAgreed(checked);
		setErrors(current => ({
			...current,
			agreed: checked ? undefined : current.agreed,
		}));
		setSubmitError(null);
	};

	const handleApplicationOpenChange = (open: boolean) => {
		setModalStep(open ? 'application' : null);
		if (!open) {
			setErrors({});
		}
		setSubmitError(null);
	};

	const handleCompletionOpenChange = (open: boolean) => {
		if (open) {
			setModalStep('complete');
			return;
		}

		resetForm();
		setModalStep(null);
	};

	const handleSubmit = async () => {
		const nextErrors = validateApplicationForm({
			email,
			walletAddress,
			agreed,
		}, copy);

		setErrors(nextErrors);
		setSubmitError(null);

		if (nextErrors.email || nextErrors.walletAddress || nextErrors.agreed) {
			return;
		}

		setIsSubmitting(true);

		try {
			await submitFrontierApplication({
				email,
				walletAddress,
				selectedToken,
				copy,
				locale,
			});
			setErrors({});
			setModalStep('complete');
		} catch (error) {
			if (error instanceof FrontierApplicationSubmitError) {
				const field = error.field;

				if (field) {
					setErrors(current => ({
						...current,
						[field]: error.message,
					}));
				} else {
					setSubmitError(error.message);
				}
				return;
			}

			setSubmitError(copy.validation.submitFailed);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<Button
				type="button"
				onClick={() => setModalStep('application')}
				className="h-[50px] min-w-[206px] cursor-pointer rounded-full border border-[rgba(36,36,36,0.25)] bg-[linear-gradient(90deg,#0f0f0f_0%,#313131_100%)] px-6 text-base font-semibold leading-none text-white shadow-[0_0_35.5px_rgba(0,0,0,0.06)] hover:bg-[linear-gradient(90deg,#0f0f0f_0%,#313131_100%)] hover:brightness-110">
				{copy.joinNow}
			</Button>

			<FrontierApplicationModal
				open={modalStep === 'application'}
				copy={copy}
				locale={locale}
				selectedToken={selectedToken}
				email={email}
				walletAddress={walletAddress}
				agreed={agreed}
				errors={errors}
				submitError={submitError}
				isSubmitting={isSubmitting}
				onOpenChange={handleApplicationOpenChange}
				onSelectToken={setSelectedToken}
				onChangeEmail={handleEmailChange}
				onChangeWalletAddress={handleWalletAddressChange}
				onToggleAgreed={handleAgreedChange}
				onSubmit={handleSubmit}
			/>

			<FrontierCompletionModal open={modalStep === 'complete'} selectedToken={selectedToken} copy={copy} onOpenChange={handleCompletionOpenChange} />
		</>
	);
}
