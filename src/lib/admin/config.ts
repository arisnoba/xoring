export const ADMIN_LOGIN_PATH = '/admin/login';
export const ADMIN_DASHBOARD_PATH = '/admin';
export const ADMIN_AUTH_CALLBACK_PATH = '/admin/auth/callback';

export const MISSING_SUPABASE_CONFIG_MESSAGE = 'NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be configured.';

export const FRONTIER_APPLICATION_STATUS_VALUES = ['submitted', 'awaiting_payment', 'payment_confirmed', 'approved', 'rejected'] as const;

export type FrontierApplicationStatus = (typeof FRONTIER_APPLICATION_STATUS_VALUES)[number];

