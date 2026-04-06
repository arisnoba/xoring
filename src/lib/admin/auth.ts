import type { EmailOtpType, Session, SupabaseClient } from '@supabase/supabase-js';
import { ADMIN_AUTH_CALLBACK_PATH, MISSING_SUPABASE_CONFIG_MESSAGE } from '@/lib/admin/config';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export interface AdminUserRecord {
	email: string;
	full_name: string | null;
	is_active: boolean;
}

const EMAIL_OTP_TYPES: EmailOtpType[] = ['signup', 'magiclink', 'recovery', 'invite', 'email', 'email_change'];

function requireSupabaseClient() {
	const client = getSupabaseBrowserClient();

	if (!client) {
		throw new Error(MISSING_SUPABASE_CONFIG_MESSAGE);
	}

	return client;
}

export function getAdminMagicLinkRedirectUrl() {
	if (typeof window === 'undefined') {
		return ADMIN_AUTH_CALLBACK_PATH;
	}

	return new URL(ADMIN_AUTH_CALLBACK_PATH, window.location.origin).toString();
}

export async function requestAdminMagicLink(email: string) {
	const client = requireSupabaseClient();

	const { error } = await client.auth.signInWithOtp({
		email,
		options: {
			emailRedirectTo: getAdminMagicLinkRedirectUrl(),
		},
	});

	if (error) {
		throw error;
	}
}

export async function completeAdminSignIn(searchParams: URLSearchParams) {
	const client = requireSupabaseClient();
	const tokenHash = searchParams.get('token_hash');
	const type = searchParams.get('type');

	if (!tokenHash || !type || !EMAIL_OTP_TYPES.includes(type as EmailOtpType)) {
		throw new Error('The login link is invalid or expired.');
	}

	const { error } = await client.auth.verifyOtp({
		token_hash: tokenHash,
		type: type as EmailOtpType,
	});

	if (error) {
		throw error;
	}

	return client;
}

export async function getAdminSession(client?: SupabaseClient) {
	const supabase = client ?? requireSupabaseClient();
	const { data, error } = await supabase.auth.getSession();

	if (error) {
		throw error;
	}

	return data.session;
}

export async function getAdminAccess(client?: SupabaseClient) {
	const supabase = client ?? requireSupabaseClient();
	const session = await getAdminSession(supabase);

	if (!session) {
		return {
			session: null as Session | null,
			adminUser: null as AdminUserRecord | null,
		};
	}

	const { data, error } = await supabase.from('admin_users').select('email, full_name, is_active').maybeSingle();

	if (error) {
		throw error;
	}

	if (!data?.is_active) {
		return {
			session,
			adminUser: null as AdminUserRecord | null,
		};
	}

	return {
		session,
		adminUser: data as AdminUserRecord,
	};
}

export async function signOutAdmin(client?: SupabaseClient) {
	const supabase = client ?? requireSupabaseClient();
	const { error } = await supabase.auth.signOut();

	if (error) {
		throw error;
	}
}
