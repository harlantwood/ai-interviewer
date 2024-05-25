<script lang="ts">
  export let data
  let interviews = data.interviews

  $: console.log(interviews)
</script>

<h2>Interviews</h2>
{#each interviews as interview}
  <div class="interview">
    <a href={`/account/interviews/${interview.id}/do`}> {interview.name} </a>
  </div>
{/each}
