<script>
  export let data
  let inputs = data.data

  $: console.log({ inputs })
</script>

<h1>Interview Review</h1>

<h2>Interviewee</h2>
<p class="interviewee">{inputs?.subject?.email}</p>

<h2>Interviewer</h2>
<p class="interviewer">{inputs?.interviewer?.name}</p>

<!-- <ul>
  {#each data.nodes as node}
    <li>{node.content} [{node.created_at}]</li>
  {/each}
</ul> -->
