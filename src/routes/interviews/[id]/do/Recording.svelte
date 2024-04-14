<script lang="ts">
  export let recordingState: RecordingState
  export let setRecordingState: (state: RecordingState) => void
</script>

<div class="">
  {#if recordingState === 'recording'}
    Recording...
  {:else if recordingState === 'paused'}
    Recording paused
  {/if}
</div>
{#if recordingState === 'recording'}
  <button class="btn btn-outline px-16" on:click={() => setRecordingState('paused')}>Pause</button>
{:else if recordingState === 'paused'}
  <button class="btn btn-outline px-16" on:click={() => setRecordingState('recording')}
    >Resume</button
  >
{/if}
