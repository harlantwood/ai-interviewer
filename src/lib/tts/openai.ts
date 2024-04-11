export async function speakQuestion(question: string, onAudioEnded: () => void) {
  // Promise<Audio>
  const res = await fetch('/api/question/audio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: question,
      threadHead: 'uuid TODO', // NOTE thread "head" allows for branching convos
    }),
  })
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const audio = new Audio(url)
  audio.onended = onAudioEnded

  try {
    await audio.play()
  } catch (e) {
    console.error('Error playing audio:', e)
  }
}
