<script lang="ts">
  import { goto } from '$app/navigation'
  import { speakQuestion } from '$lib/tts/openai'
  import Recording from './Recording.svelte'

  export let data
  let interview = data.interview!
  let question: number | null = null
  let recording: 'on' | 'paused' | 'off' = 'off'

  // $: console.log(JSON.stringify(interview, null, 2))
  $: console.log({ question })

  function setQuestion(_question: number) {
    question = _question
    if (question != null) {
      const questionText = interview.script_questions[question].interview_questions[0].content
      speakQuestion(questionText, questionAudioEnded)
    }
  }

  function questionAudioEnded() {
    recording = 'on'
  }
</script>

<h1>{interview.name}</h1>

{#if question == null}
  <div>{interview.description}</div>
  <button class="btn btn-primary" on:click={() => setQuestion(0)}>Start Interview</button>
{:else if question < interview.script_questions.length - 1}
  <div>{interview.script_questions[question].interview_questions[0].content}</div>
  <div>
    ({question + 1}
    / {interview.script_questions.length})
  </div>
  <!-- <hr /> -->
  <Recording {recording} />
  <!-- <hr /> -->
  <button class="btn btn-primary" on:click={() => question != null && setQuestion(question + 1)}
    >Next</button
  >
{:else}
  <div>{interview.script_questions[question].interview_questions[0].content}</div>
  <!-- <hr /> -->
  <Recording {recording} />
  <!-- <hr /> -->
  <button class="btn btn-primary" on:click={() => goto('/')}>Finish</button>
{/if}
