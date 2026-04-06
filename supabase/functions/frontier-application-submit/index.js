import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Content-Type': 'application/json',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const evmWalletPattern = /^0x[a-fA-F0-9]{40}$/
const paymentTokens = new Set(['usdt', 'aios'])

function json(status, body) {
	return new Response(JSON.stringify(body), {
		status,
		headers: corsHeaders,
	})
}

function normalizeEmail(value) {
	return value.trim().toLowerCase()
}

function normalizeWalletAddress(value) {
	return value.trim()
}

function validatePayload(payload) {
	const email = typeof payload.email === 'string' ? normalizeEmail(payload.email) : ''
	const walletAddress = typeof payload.walletAddress === 'string' ? normalizeWalletAddress(payload.walletAddress) : ''
	const paymentToken = typeof payload.paymentToken === 'string' ? payload.paymentToken.toLowerCase() : ''
	const termsVersion = typeof payload.termsVersion === 'string' ? payload.termsVersion.trim() : ''
	const privacyVersion = typeof payload.privacyVersion === 'string' ? payload.privacyVersion.trim() : ''

	if (!email) {
		return { error: 'Email is required.', field: 'email' }
	}

	if (!emailPattern.test(email)) {
		return { error: 'Please enter a valid email address.', field: 'email' }
	}

	if (!walletAddress) {
		return { error: 'Wallet address is required.', field: 'walletAddress' }
	}

	if (!evmWalletPattern.test(walletAddress)) {
		return {
			error: 'Please enter a valid EVM wallet address starting with 0x.',
			field: 'walletAddress',
		}
	}

	if (!paymentTokens.has(paymentToken)) {
		return {
			error: 'Please select a valid payment token.',
			field: 'paymentToken',
		}
	}

	if (!termsVersion || !privacyVersion) {
		return {
			error: 'Terms and privacy version information is missing.',
		}
	}

	return {
		email,
		walletAddress,
		paymentToken,
		termsVersion,
		privacyVersion,
	}
}

function resolveInsertError(error) {
	if (error.code === '23505') {
		const detail = `${error.message ?? ''} ${error.details ?? ''}`.toLowerCase()

		if (detail.includes('email')) {
			return {
				status: 409,
				body: {
					error: 'This email address has already been submitted.',
					field: 'email',
				},
			}
		}

		if (detail.includes('wallet_address') || detail.includes('wallet')) {
			return {
				status: 409,
				body: {
					error: 'This wallet address has already been submitted.',
					field: 'walletAddress',
				},
			}
		}

		return {
			status: 409,
			body: {
				error: 'An application with the same email or wallet address already exists.',
			},
		}
	}

	return {
		status: 500,
		body: {
			error: 'Failed to save the application.',
		},
	}
}

Deno.serve(async request => {
	if (request.method === 'OPTIONS') {
		return new Response('ok', { headers: corsHeaders })
	}

	if (request.method !== 'POST') {
		return json(405, { error: 'Method not allowed.' })
	}

	const payload = await request.json().catch(() => null)

	if (!payload) {
		return json(400, { error: 'Invalid request body.' })
	}

	const validated = validatePayload(payload)

	if ('error' in validated) {
		return json(400, validated)
	}

	const supabaseUrl = Deno.env.get('SUPABASE_URL')
	const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

	if (!supabaseUrl || !serviceRoleKey) {
		return json(500, { error: 'Supabase service configuration is missing.' })
	}

	const supabase = createClient(supabaseUrl, serviceRoleKey, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	})

	const { data, error } = await supabase
		.from('frontier_applications')
		.insert({
			email: validated.email,
			wallet_address: validated.walletAddress,
			payment_token: validated.paymentToken,
			terms_version: validated.termsVersion,
			privacy_version: validated.privacyVersion,
			source: 'landing_page',
		})
		.select('id')
		.single()

	if (error) {
		const resolved = resolveInsertError(error)
		return json(resolved.status, resolved.body)
	}

	return json(200, {
		id: data.id,
		status: 'submitted',
	})
})
