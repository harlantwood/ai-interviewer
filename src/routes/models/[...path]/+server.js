import { get } from '$lib/proxy/models'

export async function GET(opts) {
	return get(opts)
}
