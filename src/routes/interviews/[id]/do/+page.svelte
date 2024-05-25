<script lang="ts">
  import { goto } from '$app/navigation'
  import { speakQuestion } from '$lib/tts/openai'
  import { stt } from 'ai-convo'
  import Recording from './Recording.svelte'
  import { PUBLIC_DEEPGRAM_API_KEY } from '$env/static/public'

  export let data
  let interview = data.interview!
  let question: number | null = null
  let recordingState: RecordingState = 'inactive'
  let transcriptChunks: string[] = []

  // $: console.log(JSON.stringify(interview, null, 2))
  // $: console.log({ question })

  function setQuestion(_question: number) {
    question = _question
    if (question != null) {
      const questionText = interview.script_questions[question].interview_questions[0].content
      speakQuestion(questionText, questionAudioEnded)
    }
  }

  function questionAudioEnded() {
    setRecordingState('recording')
  }

  function setRecordingState(state: RecordingState) {
    if (state === 'recording') {
      stt.browser.deepgram.transcribe({
        apiKey: PUBLIC_DEEPGRAM_API_KEY,
        onConnect: () => {
          console.log('Connected')
        },
        onChunk: (chunk: string) => {
          transcriptChunks.push(chunk)
        },
        onEnd: () => {
          console.log('Transcript ended')
        },
        onWarn: (message: string) => {
          console.warn('[deepgram][warning] ' + message)
        },
        onError: (error: unknown) => {
          console.error({ error })
        },
      })
    } else if (state === 'paused') {
      // TODO Pause recording
    } else if (state === 'inactive') {
      // TODO  Stop recording
    }
    recordingState = state
  }
</script>

<h1>{interview.name}</h1>

{#if question == null}
  <div>{interview.description}</div>
  <button class="btn btn-primary px-16" on:click={() => setQuestion(0)}>Start Interview</button>
{:else if question < interview.script_questions.length - 1}
  <div>{interview.script_questions[question].interview_questions[0].content}</div>
  <div>
    ({question + 1}
    / {interview.script_questions.length})
  </div>
  <br />
  <Recording {recordingState} {setRecordingState} />
  <br />
  <button class="btn btn-primary px-16" on:click={() => question && setQuestion(question + 1)}
    >Next</button
  >
{:else}
  <div>{interview.script_questions[question].interview_questions[0].content}</div>
  <br />
  <Recording {recordingState} {setRecordingState} />
  <br />
  <button class="btn btn-primary px-16" on:click={() => goto('/')}>Finish</button>
{/if}
