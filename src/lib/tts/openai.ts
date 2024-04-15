import {tts} from 'ai-convo'

export async function speakQuestion(question: string, onAudioEnded: () => void) {
  const response = await fetch('/api/question/audio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: question,
    }),
  })

  await tts.browser.playAudio({response, onAudioEnded})
}
