import type { RequestHandler } from '@sveltejs/kit'

export const GET = (async ({ fetch, url, params }) => {
  const response = await fetch(new URL(`/__public/${params.path}`, url.origin))
  const headers = new Headers(response.headers)
  headers.append('Cross-Origin-Opener-Policy', 'same-origin')
  headers.append('Cross-Origin-Embedder-Policy', 'require-corp')
  return new Response(response.body, { headers })
}) satisfies RequestHandler
