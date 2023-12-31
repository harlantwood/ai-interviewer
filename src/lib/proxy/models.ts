//@ts-expect-error:
import type { PageServerLoad } from '$types'

import { PUBLIC_MODEL_BASE_URL } from '$env/static/public'

export const HEADER_DENY_LIST = [
	'connection', // keep-alive for sveletekit
	'host',
	'origin',
]

export async function get(opts: PageServerLoad) {
	// opts:
	// Standard:
	// - https://kit.svelte.dev/docs/types#public-types-requestevent
	// cookies
	// locals
	// params,
	// request,
	// route,
	// url: { search },
	// From CF Adapter:
	// - https://kit.svelte.dev/docs/adapters#platform-specific-context
	// - https://kit.svelte.dev/docs/adapter-cloudflare
	// platform,

	// use fetch from sveltekit, see https://kit.svelte.dev/docs/load#making-fetch-requests
	const [url, options] = await getReqArgs(opts)
	return opts.fetch(url, options)
}

export async function getReqArgs(opts: PageServerLoad) {
	const {
		params: { path },
		request,
	} = opts

	const headers = buildRequestHeaders(request)
	const url = `${PUBLIC_MODEL_BASE_URL}/${path}`
	return [
		url,
		{
			method: 'GET',
			headers,
		},
	]
}

function buildRequestHeaders(request: Request) {
	const headers = {} as Record<string, string>

	for (const [key, value] of request.headers) {
		if (!HEADER_DENY_LIST.includes(key)) {
			headers[key] = value
		}
	}
	const appUrl = new URL(PUBLIC_MODEL_BASE_URL)
	headers['host'] = appUrl.host
	if (appUrl.protocol === 'https:') {
		headers['host'] += ':443'
	}

	headers['X_FORWARDED_HOST'] = PUBLIC_MODEL_BASE_URL
	headers['X_BROWSER_BASE_URL'] = getBaseUrl(request.url)

	return headers
}

// returns the base url of a url, e.g.
// https://example.com/foo/bar => https://example.com
function getBaseUrl(url: string) {
	const parsedUrl = new URL(url)
	parsedUrl.pathname = ''
	return parsedUrl.toString().replace(/\/$/, '')
}
