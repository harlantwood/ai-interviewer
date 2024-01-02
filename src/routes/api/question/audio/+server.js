import OpenAI from "openai"
import { Buffer } from 'buffer/';

import { OPENAI_API_KEY } from '$env/static/private'

export async function POST({ request }) {
  const { text } = await request.json()

  const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  })

  const buffer = Buffer.from(await mp3.arrayBuffer())

  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
    },
  })

}
