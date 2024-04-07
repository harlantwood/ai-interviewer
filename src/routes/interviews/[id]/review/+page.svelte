<script>
  export let data
  let inputs = data.data

  $: console.log({ inputs })
</script>

<h1>Interview Review</h1>

<h2>Interviewee</h2>
<p class="interviewee">{inputs?.interview?.subject?.email}</p>

<h2>Interviewer</h2>
<p class="interviewer">{inputs?.interview?.interviewer?.name}</p>

{#each Object.entries(inputs.qa) as [questionId, qaList]}
  <div class="qa">
    <div class="question">{qaList[0].question_id.content}</div>
    {#each qaList as qa}
      <div class="answer">{qa.answer_id.content}</div>
    {/each}
  </div>
{/each}
