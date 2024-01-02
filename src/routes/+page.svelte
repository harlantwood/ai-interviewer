<script lang="ts">
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'

	let loadWhisper: Function
	let onProcess: Function
	let startRecording: Function
	let stopRecording: Function

	let whisperOutput: string
	let transcription: string = 'transcription...'

	onMount(async () => {
		const whisper = await import('$lib/vendor/whisper/helpers')
		loadWhisper = whisper.loadWhisper
		onProcess = whisper.onProcess
		startRecording = whisper.startRecording
		stopRecording = whisper.stopRecording

		window.Module = {
			print: handleWhisperOutput,
			printErr: handleWhisperOutput,
			setStatus: function (text) {
				handleWhisperOutput('js: ' + text)
			},
			monitorRunDependencies: function (left) {},
		}
	})

	function handleWhisperOutput(...args: string[]) {
		let text
		if (arguments.length === 1) {
			text = args[0]
		} else {
			text = args.join(' ')
		}
		console.log('[whisper] ' + text)
		const newTranscription = parseTranscription(text)
		if (newTranscription) {
			transcription += '\n' + newTranscription
		}
	}

	function parseTranscription(rawOutput: string) {
		// find all lines of rawOutput of similar format to:
		// [00:00:00.000 --> 00:00:03.000]   Some text
		// and extract the text to `transcription`:

		const regex = /\[(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\] (.*)/g
		let match
		let transcriptionText = ''
		while ((match = regex.exec(rawOutput))) {
			transcriptionText += match[3] + '\n'
		}
		transcriptionText = transcriptionText.replace(/\[[A-Z_]+\]/g, '')
		transcriptionText = transcriptionText.replace(/\s+/g, ' ')
		transcriptionText = transcriptionText.trim()
		return transcriptionText === '' ? null : transcriptionText
	}

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

<hr />

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

<hr />

<!-- (user answers, recorded and transribed) -->
<div id="input_mic">
	Microphone:
	<button id="start" on:click={() => startRecording()}>Start</button>
	<button id="stop" on:click={() => stopRecording()} disabled>Stop</button>

	<!-- progress bar to show recording progress -->
	<br /><br />
	<div id="progress" style="display: none;">
		<div id="progress-bar" style="width: 0%; height: 10px; background-color: #4CAF50;"></div>
		<div id="progress-text">0%</div>
	</div>
</div>

<audio controls id="audio" loop>
	Your browser does not support the &lt;audio&gt; tag.
	<source id="source" src="" type="audio/wav" />
</audio>

<hr />
<br />

<table>
	<tr>
		<!-- <td> -->
		<select style:display="none" id="language" name="language">
			<option selected value="en">English</option>
		</select>
		<!-- Language:  <select id="language" name="language"> <option value="en">English</option> <option value="ar">Arabic</option> <option value="hy">Armenian</option> <option value="az">Azerbaijani</option> <option value="eu">Basque</option> <option value="be">Belarusian</option> <option value="bn">Bengali</option> <option value="bg">Bulgarian</option> <option value="ca">Catalan</option> <option value="zh">Chinese</option> <option value="hr">Croatian</option> <option value="cs">Czech</option> <option value="da">Danish</option> <option value="nl">Dutch</option> <option value="en">English</option> <option value="et">Estonian</option> <option value="tl">Filipino</option> <option value="fi">Finnish</option> <option value="fr">French</option> <option value="gl">Galician</option> <option value="ka">Georgian</option> <option value="de">German</option> <option value="el">Greek</option> <option value="gu">Gujarati</option> <option value="iw">Hebrew</option> <option value="hi">Hindi</option> <option value="hu">Hungarian</option> <option value="is">Icelandic</option> <option value="id">Indonesian</option> <option value="ga">Irish</option> <option value="it">Italian</option> <option value="ja">Japanese</option> <option value="kn">Kannada</option> <option value="ko">Korean</option> <option value="la">Latin</option> <option value="lv">Latvian</option> <option value="lt">Lithuanian</option> <option value="mk">Macedonian</option> <option value="ms">Malay</option> <option value="mt">Maltese</option> <option value="no">Norwegian</option> <option value="fa">Persian</option> <option value="pl">Polish</option> <option value="pt">Portuguese</option> <option value="ro">Romanian</option> <option value="ru">Russian</option> <option value="sr">Serbian</option> <option value="sk">Slovak</option> <option value="sl">Slovenian</option> <option value="es">Spanish</option> <option value="sw">Swahili</option> <option value="sv">Swedish</option> <option value="ta">Tamil</option> <option value="te">Telugu</option> <option value="th">Thai</option> <option value="tr">Turkish</option> <option value="uk">Ukrainian</option> <option value="ur">Urdu</option> <option value="vi">Vietnamese</option> <option value="cy">Welsh</option> <option value="yi">Yiddish</option> </select> -->
		<!-- </td> -->
		<!-- Slider to select number of threads between 1 and 16 -->
		<!-- <td>
						Threads:
						<input type="range" id="threads" name="threads" min="1" max="16" value="8" onchange="changeThreads(this.value)" />
						<span id="threads-value">8</span>
				</td> -->
		<td>
			<button on:click={() => onProcess(false)}>Transcribe</button>
		</td>
		<!-- <td>
			<button on:click={() => onProcess(true)}>Translate</button>
		</td> -->
	</tr>
</table>

<br />

<!-- textarea with height filling the rest of the page -->
<textarea id="output" bind:value={whisperOutput} rows="10"></textarea>

<button on:click={() => console.log({ whisperOutput })}>show</button>
<div bind:innerText={transcription} contenteditable></div>

<!-- [ I'm done ] -->
<!-- [ Ask me another question ] -->

{#if browser}
	<script type="text/javascript" src="/public/whisper/main.js"></script>
{/if}
