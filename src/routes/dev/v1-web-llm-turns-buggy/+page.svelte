<script lang="ts">
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  import { slide } from 'svelte/transition'

  // import WhisperLoadModel from '../components/whisper/WhisperLoadModel.svelte'

  let dev = true // dev mode shortcuts

  let chat //: ChatModule

  let loadWhisper: Function
  let transcribe: Function
  let startRecording: Function
  let stopRecording: Function

  let transcription: string = ''

  let topics = clean(`
    - the collaboration and autonomy that is the signature polarity of enlightened civilizations
    - the ability of civilizations, once they reach superintelligence, to soon after begin to create universes
    - The giant party going on around the galactic cores
    - the knitting together of galaxies through the supermassive black holes at the center of each galaxy
    - deep time vs slow time
    - the future of Earth civilization and the past and futures of the uncountable civilizations that have come before and will come after us
    `)

  let myName = 'Harlan T Wood'
  let myBackground = clean(`
    - Architect of Enlightend Structures: Trust Graph, HoloFractal, CoreNexus
    - Software Engineer
    - Meditator
    - Mystery School Initiate
    `)

  let interviewerVoice = 'nova'
  let interviewerInstructions = clean(`
    You are an AI interviewer, asking the user questions.
    Keep questions short, ${dev ? '10 WORDS AT MOST' : '1-3 sentences'}.
    You have shades of great interviewers like Lex Friedman, Terry Gross, and Walter Isaacson.
    Ask follow up questions when appropriate, but also move throught the list of topics.
    Topics need not be in order; feel free to weave in any topic that is organically coming up.
    `)

  let currentQuestion = ''
  let recording = false
  let lastAnswer: string | null = null

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
      console.log('[webllm]', report.text)
    })
    if (!dev) {
      reloadLlm()
    }
  }

  function save() {
    reloadLlm()
  }

  async function reloadLlm() {
    // const appConfig = {
    //   model_list: MODEL_LIST,
    // }
    const chatOpts = {
      // repetition_penalty: 1.01,
      conv_config: {
        system: systemPrompt(),
      },
    }

    // aspirational, not working yet:
    // await chat.reload('Mistral-7B-Instruct-v0.2-q4f16_1', chatOpts, appConfig)
    // await chat.reload('NeuralHermes-2.5-Mistral-7B-q4f16_1')
    // good:
    await chat.reload('Llama-2-7b-chat-hf-q4f32_1', chatOpts)
    // fast but crazy bad ;)
    // await chat.reload('RedPajama-INCITE-Chat-3B-v1-q4f32_1', chatOpts)
  }

  async function initWhisper() {
    const whisper = await import('$lib/vendor/whisper/helpers')
    loadWhisper = whisper.loadWhisper
    transcribe = whisper.onProcess
    startRecording = whisper.startRecording
    stopRecording = whisper.stopRecording

    // Note: global `Module` is the way we communicate with whisper's main.js - which is 1mb JS generated from whisper.cpp
    window.Module = {
      print: handleWhisperOutput,
      printErr: handleWhisperError,
      setStatus: function (text: string) {
        if (text?.trim().length > 0) {
          console.log('[whisper] [status] ' + text)
        }
      },
      monitorRunDependencies: function (_arg) {
        // console.log('[whisper] [monitorRunDependencies] ' + arg)
      },
    }

    loadWhisper('tiny.en')
  }

  function systemPrompt(): string {
    let systemPrompt = clean(
      `${interviewerInstructions}
      ----
      You are interviewing ${myName} about the following topics, listed in order of importance:
      ${topics}
      ----
      Here is the background information you have on ${myName}:
      ${myBackground}.
      `
    )
    console.log('[system prompt]', systemPrompt)
    return systemPrompt
  }

  function clean(text: string) {
    return text.replace(/^\s+/gm, '').trim()
  }

  async function beginInterview() {
    await beginQuestionTurn()
  }

  async function beginQuestionTurn() {
    console.log('in beginQuestionTurn...')
    recording = false
    const question = await getQuestion()
    await speakQuestion(question)
    // const audio = await speakQuestion(question)
  }

  async function getQuestion(): Promise<string> {
    let question
    if (dev) {
      const topicList = topics.split('\n')
      question = topicList[Math.floor(Math.random() * topicList.length)]
      currentQuestion = question
    } else {
      question = await chat.generate(lastAnswer, onChatGenerate)
    }
    console.log('question', question)
    // console.log('stats', await chat.runtimeStatsText())
    return question
  }

  async function speakQuestion(question: string): Promise<Audio> {
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
    audio.onended = function () {
      beginAnswerTurn()
    }
    await audio.play() //.catch((e) => console.error('Error playing audio:', e))
    // return audio
  }

  async function beginAnswerTurn() {
    console.log('beginAnswerTurn')
    recording = true
    transcription = ''
    startRecording(handleAnswerAudioReady)
  }

  function handleAnswerAudioReady() {
    console.log('handleAnswerAudioReady')
    transcribe()
  }

  async function handleTranscriptionComplete() {
    console.log('handleTranscriptionComplete')
    lastAnswer = transcription // TODO wait for transcription to be done
    console.log('lastAnswer', lastAnswer)
    // if (!dev) {
    await beginQuestionTurn()
    // }
  }

  async function handleAnswerComplete() {
    stopRecording()
    recording = false
  }

  function handleInterviewComplete() {
    console.log('interview complete')
    stopRecording()
    recording = false
  }

  async function onChatGenerate(_step: number, msg: string) {
    // console.log('onChatGenerate', step, msg)
    currentQuestion = msg
  }

  function handleWhisperOutput(...args: string[]) {
    for (const output of args) {
      if (output?.trim().length > 0) {
        console.log('[whisper] ' + output)
        const newTranscription = parseTranscription(output)
        if (newTranscription) {
          transcription += '\n' + newTranscription
        }
      }
    }
  }

  function handleWhisperError(...args: string[]) {
    for (const output of args) {
      if (output?.trim().length > 0) {
        console.log('[whisper] [debug] ' + output)
        if (output.startsWith('whisper_print_timings:')) {
          handleTranscriptionComplete()
        }
      }
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

<h1>AI Interviewer</h1>

<h2>Topics</h2>
Ask me about these topics:
<textarea bind:value={topics} rows={10} cols={80} />

<h2>About Me</h2>
Name:<input bind:value={myName} />
My background:
<textarea bind:value={myBackground} rows={5} cols={80} />

<h2>Interviewer</h2>
Voice:<select bind:value={interviewerVoice}>
  <option value="nova">Nova</option>
</select>

<textarea bind:value={interviewerInstructions} rows={5} cols={80} />

<button on:click={save}>Save</button>

<hr />
<button on:click={beginInterview}>Start Interview</button>

<hr />
<div>{currentQuestion}</div>

<!-- <WhisperLoadModel /> -->

<div transition:slide={{ duration: 1000 }} class:visually-hidden={!recording}>
  <hr />
  Recording...
  <button on:click={handleAnswerComplete} class="block">My answer is complete</button>
  <button on:click={handleInterviewComplete} class="block">End this interview</button>
</div>

<select style:display="none" id="language" name="language">
  <option selected value="en">English</option>
</select>

<h2>Transcription</h2>
<div>{transcription}</div>

<!-- here we load the main whisper JS - we do it inline, after setting `Module` which passes config -->
{#if browser}
  <script type="text/javascript" src="/public/whisper/main.js"></script>
{/if}
