<script lang="ts">
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'

  let chat //: ChatModule

  let loadWhisper: Function
  let onProcess: Function
  let startRecording: Function
  let stopRecording: Function

  let whisperOutput: string
  let transcription: string = 'transcription...'

  const interviewer = {
    voice: 'nova',
    instructions:
      'You are an AI interviewer, asking me questions. Keep questions short, 1-3 sentences. You have shades of great interviewers like Lex Friedman, Terry Gross, and Walter Isaccson.',
  }
  const interviewee = {
    name: 'Harlan T. Wood',
    background: [
      'Architect of Enlightend Structures: Trust Graph, HoloFractal, CoreNexus',
      'Software Engineer',
      'Meditator',
      'Mystery School Initiate',
    ],
  }
  const topics = [
    'the collaboration and autonomy that is the signature polarity of enlightened civilizations',
    'the ability of civilizations, once they reach superintelligence, to soon after begin to create universes',
    'The giant party going on around the galactic cores',
    'the knitting together of galaxies through the supermassive black holes at the center of each galaxy',
    'deep time vs slow time',
    'the future of Earth civilization and the past and futures of the uncountable civilizations that have come before and will come after us',
  ]

  let systemPrompt = `${interviewer.instructions}

You are interviewing ${
    interviewee.name
  } about the following topics - listed in order of importance: ${topics.join('; ')}.

Here is the background information you have on ${interviewee.name}: ${interviewee.background.join(
    '; '
  )}.`

  systemPrompt = systemPrompt.replace(/\s+/g, ' ').trim()
  console.log(systemPrompt)

  // const MODEL_LIST = [
  //   {
  //     model_url: 'https://huggingface.co/mlc-ai/Mistral-7B-Instruct-v0.2-q4f16_1-MLC/resolve/main/',
  //     local_id: 'Mistral-7B-Instruct-v0.2-q4f16_1',
  //     model_lib_url:
  //       'https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Mistral-7B-Instruct-v0.2/Mistral-7B-Instruct-v0.2-q4f16_1-sw4k_cs1k-webgpu.wasm',
  //     required_features: ['shader-f16'],
  //   },
  // ]

  onMount(initLlm)
  onMount(initWhisper)

  async function initLlm() {
    const webllm = await import('@mlc-ai/web-llm')
    // webworker (TODO: better):
    // this may help: https://stackoverflow.com/questions/67995082/how-to-create-web-worker-in-a-sveltekit-app-on-vercel
    // const chat = new webllm.ChatWorkerClient(
    //   new Worker('/public/webllm/worker.js', { type: 'module' })
    // )
    // main thread (working, but worse):
    chat = new webllm.ChatModule()

    chat.setInitProgressCallback((report: webllm.InitProgressReport) => {
      console.log('init-label', report.text)
    })
    reloadLlm()
  }

  async function reloadLlm() {
    // const appConfig = {
    //   model_list: MODEL_LIST,
    // }
    const chatOpts = {
      // repetition_penalty: 1.01,
      conv_config: {
        system: systemPrompt,
      },
    }

    console.log('reloading model...')
    // await chat.reload('Mistral-7B-Instruct-v0.2-q4f16_1', chatOpts, appConfig)
    // await chat.reload('NeuralHermes-2.5-Mistral-7B-q4f16_1')
    await chat.reload('Llama-2-7b-chat-hf-q4f32_1', chatOpts)
    // await chat.reload('RedPajama-INCITE-Chat-3B-v1-q4f32_1')
    console.log('done!')
  }

  async function initWhisper() {
    const whisper = await import('$lib/vendor/whisper/helpers')
    loadWhisper = whisper.loadWhisper
    onProcess = whisper.onProcess
    startRecording = whisper.startRecording
    stopRecording = whisper.stopRecording

    // Note: global `Module` is the way we communicate with whisper's main.js - which is 1mb JS generated from whisper.cpp
    window.Module = {
      print: handleWhisperOutput,
      printErr: handleWhisperOutput,
      setStatus: function (text: string) {
        handleWhisperOutput('js: ' + text)
      },
      monitorRunDependencies: function (_arg: unknown) {},
    }
  }

  async function askQuestion() {
    const question = await getQuestion()
    await speakQuestion(question)
  }

  async function getQuestion(): Promise<string> {
    const prompt0 = 'Ask me a question'
    console.log(prompt0)
    const reply0 = await chat.generate(prompt0) //, generateProgressCallback)
    console.log(reply0)
    console.log(await chat.runtimeStatsText())
    return reply0
  }

  async function speakQuestion(question: string) {
    const res = await fetch('/api/question/audio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: question,
        threadHead: 'uuid TODO', // NOTE thread "head" allows for branching convos
      }),
    })
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const audio = new Audio(url)
    audio.play()
  }

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
    const regex = /\[(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\](.*)/g
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
</script>

<button on:click={() => askQuestion()}>Ask me a question</button>

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
    <select style:display="none" id="language" name="language">
      <option selected value="en">English</option>
    </select>
    <td>
      <button on:click={() => onProcess(false)}>Transcribe</button>
    </td>
  </tr>
</table>

<br />

<!-- whisper output: -->
<textarea id="output" bind:value={whisperOutput} rows="10"></textarea>

<button on:click={() => console.log({ whisperOutput })}>show</button>
<div bind:innerText={transcription} contenteditable></div>

<!-- [ I'm done ] -->
<!-- [ Ask me another question ] -->

<!-- here we load the main whisper JS - we do it inline, after setting `Module` which passes config -->
{#if browser}
  <script type="text/javascript" src="/public/whisper/main.js"></script>
{/if}
