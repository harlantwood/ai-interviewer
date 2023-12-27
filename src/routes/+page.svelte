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
<!-- (transcription printed out) -->

<!-- [ I'm done ] -->
<!-- [ Ask me another question ] -->
