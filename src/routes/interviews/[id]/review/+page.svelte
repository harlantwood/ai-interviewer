<script lang="ts">
  export let data
  let inputs = data.data
  let interview = inputs.interview!

  $: console.log(JSON.stringify(interview, null, 2))
</script>

<h1>Interview Review</h1>

<!-- <h2>Interviewee</h2> -->
<!-- <p class="interviewee">{interview.subject?.email}</p> -->

<h2>Interviewer</h2>
<p class="interviewer">{interview.interviewer.name}</p>

{#each interview.script_questions[0].interview_questions as question}
  <div class="qa">
    <div class="question">{question.content}</div>
    {#each question.answers as answer}
      <div class="answer summary">{answer.summary}</div>
      <div class="answer transcript">{answer.transcript}</div>
    {/each}
  </div>
{/each}
