export const ADMIN_LOGIN_PATH = '/admin/login';
export const ADMIN_DASHBOARD_PATH = '/admin';

export const MISSING_SUPABASE_CONFIG_MESSAGE =
	'NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY를 설정해야 합니다.';

export const FRONTIER_APPLICATION_STATUS_VALUES = ['submitted', 'awaiting_payment', 'payment_confirmed', 'approved', 'rejected'] as const;

export type FrontierApplicationStatus = (typeof FRONTIER_APPLICATION_STATUS_VALUES)[number];
