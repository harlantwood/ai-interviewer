<div id="model">
  Whisper models: <span id="model-whisper-status"></span><br /><br />
  <button id="fetch-whisper-tiny-en" on:click={() => loadWhisper('tiny.en')}>tiny.en (75 MB)</button
  >
  <!-- <button id="fetch-whisper-tiny" on:click={() => loadWhisper('tiny')}>tiny (75 MB)</button> -->
  <button id="fetch-whisper-base-en" on:click={() => loadWhisper('base.en')}
    >base.en (142 MB)</button
  >
  <!-- <button id="fetch-whisper-base" on:click={() => loadWhisper('base')}>base (142 MB)</button> -->
  <!-- <button id="fetch-whisper-small-en" on:click={() => loadWhisper('small.en')} >small.en (466 MB)</button > -->
  <!-- <button id="fetch-whisper-small" on:click={() => loadWhisper('small')}>small (466 MB)</button> -->
  <!-- <input type="file" id="whisper-file" name="file" onchange="loadFile(event, 'whisper.bin')" /> -->

  <hr />

  Quantized models:<small>(lower quality for a given level but faster download)</small><br /><br />
  <button id="fetch-whisper-tiny-en-q5_1" on:click={() => loadWhisper('tiny-en-q5_1')}
    >tiny.en (Q5_1, 31 MB)</button
  >
  <!-- <button id="fetch-whisper-tiny-q5_1" on:click={()=> loadWhisper('tiny-q5_1')}>tiny (Q5_1, 31 MB)</button > -->
  <button id="fetch-whisper-base-en-q5_1" on:click={() => loadWhisper('base-en-q5_1')}
    >base.en (Q5_1, 57 MB)</button
  >
  <!-- <button id="fetch-whisper-base-q5_1" on:click={() => loadWhisper('base-q5_1')} >base (Q5_1, 57 MB)</button > -->
  <button id="fetch-whisper-small-en-q5_1" on:click={() => loadWhisper('small-en-q5_1')}
    >small.en (Q5_1, 182 MB)</button
  >
  <!-- <button id="fetch-whisper-small-q5_1" on:click={() => loadWhisper('small-q5_1')} >small (Q5_1, 182 MB)</button ><br /> -->
  <!-- <button id="fetch-whisper-medium-en-q5_0" on:click={() => loadWhisper('medium-en-q5_0')}
		>medium.en (Q5_0, 515 MB)</button
	> -->
  <!-- <button id="fetch-whisper-medium-q5_0" on:click={() => loadWhisper('medium-q5_0')}
		>medium (Q5_0, 515 MB)</button
	> -->
  <!-- <button id="fetch-whisper-large-q5_0" on:click={() => loadWhisper('large-q5_0')}
		>large (Q5_0, 1030 MB)</button
	> -->
  <span id="fetch-whisper-progress"></span>
</div>
