<script lang="ts">
  export let recording: 'on' | 'paused' | 'off'
</script>

<div class="">
  {#if recording == 'on'}
    Recording...
  {:else if recording == 'paused'}
    Recording paused
  {/if}
</div>
{#if recording == 'on'}
  <button class="btn btn-primary" on:click={() => (recording = 'paused')}>Pause</button>
{:else if recording == 'paused'}
  <button class="btn btn-primary" on:click={() => (recording = 'on')}>Resume</button>
{/if}
