import type { FrontierApplicationStatus } from '@/lib/admin/config';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export interface FrontierApplicationListItem {
	id: string;
	email: string;
	wallet_address: string;
	payment_token: 'usdt' | 'aios';
	status: FrontierApplicationStatus;
	submitted_at: string;
	status_changed_at: string;
	reviewed_at: string | null;
}

export async function listFrontierApplications(limit = 20) {
	const client = getSupabaseBrowserClient();

	if (!client) {
		throw new Error('Supabase browser client is not configured.');
	}

	const { data, error } = await client
		.from('frontier_applications')
		.select('id, email, wallet_address, payment_token, status, submitted_at, status_changed_at, reviewed_at')
		.order('submitted_at', { ascending: false })
		.limit(limit);

	if (error) {
		throw error;
	}

	return (data ?? []) as FrontierApplicationListItem[];
}

