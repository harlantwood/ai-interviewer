<script>
	// export let data

	async function askQuestion() {
		const res = await fetch('/api/question/audio', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				text: 'what is the meaning of life?',
				threadHead: 'uuid TODO', // NOTE thread "head" allows for branching convos
			}),
		})
		const blob = await res.blob()
		const url = URL.createObjectURL(blob)
		const audio = new Audio(url)
		audio.play()
	}
</script>

<!-- [ Ask me a question ] -->
<button on:click={() => askQuestion()}>Ask me a question</button>
<!-- (ai speaks question, also printed out) -->

<!-- (user answers, recorded and transribed) -->
<div id="input_mic">
	Microphone:
	<button id="start" on:click={startRecording()}>Start</button>
	<button id="stop" on:click={stopRecording()} disabled>Stop</button>

	<!-- progress bar to show recording progress -->
	<br /><br />
	<div id="progress" style="display: none;">
		<div id="progress-bar" style="width: 0%; height: 10px; background-color: #4CAF50;"></div>
		<div id="progress-text">0%</div>
	</div>
</div>

<audio controls="controls" id="audio" loop hidden>
	Your browser does not support the &lt;audio&gt; tag.
	<source id="source" src="" type="audio/wav" />
</audio>

<!-- (transcription printed out) -->

<!-- [ I'm done ] -->
<!-- [ Ask me another question ] -->
