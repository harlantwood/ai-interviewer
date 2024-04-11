<script lang="ts">
  import { goto } from '$app/navigation'
  import { speakQuestion } from '$lib/tts/openai'

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
  <div class="description">{interview.description}</div>
  <button on:click={() => setQuestion(0)}>Start Interview</button>
{:else if question < interview.script_questions.length - 1}
  <div class="question">{interview.script_questions[question].interview_questions[0].content}</div>
  <hr />
  <div class="recording">
    {#if recording == 'on'}
      Recording...
    {:else if recording == 'paused'}
      Recording paused
    {/if}
  </div>
  {#if recording == 'on'}
    <button on:click={() => (recording = 'paused')}>Pause</button>
  {:else if recording == 'paused'}
    <button on:click={() => (recording = 'on')}>Resume</button>
  {/if}
  <hr />
  <button on:click={() => setQuestion(question + 1)}>Next</button>
{:else}
  <div class="question">{interview.script_questions[question].interview_questions[0].content}</div>
  <button on:click={() => goto('/')}>Finish</button>
{/if}
