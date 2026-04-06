import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserConfig() {
	return {
		url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
		anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
	};
}

export function hasSupabaseBrowserConfig() {
	const { url, anonKey } = getSupabaseBrowserConfig();

	return Boolean(url && anonKey);
}

export function getSupabaseBrowserClient() {
	if (!hasSupabaseBrowserConfig()) {
		return null;
	}

	if (!browserClient) {
		const { url, anonKey } = getSupabaseBrowserConfig();

		browserClient = createClient(url, anonKey, {
			auth: {
				persistSession: true,
				autoRefreshToken: true,
				detectSessionInUrl: false,
			},
		});
	}

	return browserClient;
}

