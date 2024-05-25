import { tts } from 'ai-convo'
import { OPENAI_API_KEY } from '$env/static/private'

export async function POST({ request }) {
  const { text } = await request.json()
  const response = await tts.server.openai.response(text, {
    model: 'tts-1',
    voice: 'alloy',
    apiKey: OPENAI_API_KEY,
  })
  return response
}
