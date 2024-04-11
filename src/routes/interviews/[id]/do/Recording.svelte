<script lang="ts">
  export let recording: 'on' | 'paused' | 'off'
</script>

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
