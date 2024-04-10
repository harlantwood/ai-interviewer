<script lang="ts">
  import { goto } from '$app/navigation'

  export let data
  let interview = data.interview!
  let question: number | null = null

  $: console.log(JSON.stringify(interview, null, 2))
  $: console.log({ question })

  function start() {
    console.log('start interview')
    question = 0
  }
</script>

<h1>{interview.name}</h1>

<!-- if question == null -->
{#if question == null}
  <div class="description">{interview.description}</div>

  <!-- <h2>Interviewee</h2> -->
  <!-- <p class="interviewee">{interview.subject?.email}</p> -->

  <h2>Interviewer</h2>
  <p class="interviewer">{interview.interviewer.name}</p>

  <button on:click={start}>Start Interview</button>
{:else if question < interview.script_questions.length - 1}
  <div class="question">{interview.script_questions[question].interview_questions[0].content}</div>
  <button on:click={() => question != null && question++}>Next</button>
{:else}
  <div class="question">{interview.script_questions[question].interview_questions[0].content}</div>
  <button on:click={() => goto('/')}>Finish</button>
{/if}
