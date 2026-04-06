import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { MISSING_SUPABASE_CONFIG_MESSAGE } from '@/lib/admin/config';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export interface AdminUserRecord {
	email: string;
	full_name: string | null;
	is_active: boolean;
}

function requireSupabaseClient() {
	const client = getSupabaseBrowserClient();

	if (!client) {
		throw new Error(MISSING_SUPABASE_CONFIG_MESSAGE);
	}

	return client;
}

export async function signInAdminWithPassword(email: string, password: string) {
	const client = requireSupabaseClient();

	const { error } = await client.auth.signInWithPassword({
		email,
		password,
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
