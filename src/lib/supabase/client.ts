import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserConfig() {
	return {
		url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
		publishableKey:
			process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
			'',
	};
}

export function hasSupabaseBrowserConfig() {
	const { url, publishableKey } = getSupabaseBrowserConfig();

	return Boolean(url && publishableKey);
}

export function getSupabaseBrowserClient() {
	if (!hasSupabaseBrowserConfig()) {
		return null;
	}

	if (!browserClient) {
		const { url, publishableKey } = getSupabaseBrowserConfig();

		browserClient = createClient(url, publishableKey, {
			auth: {
				persistSession: true,
				autoRefreshToken: true,
				detectSessionInUrl: false,
			},
		});
	}

	return browserClient;
}
