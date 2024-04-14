<script context="module">
  import { createClient, LiveClient, LiveTranscriptionEvents } from '@deepgram/sdk'
  import { onMount, onDestroy } from 'svelte'
  import { writable, get } from 'svelte/store'
</script>

<script>
  // import { useQueue } from '$lib/useQueue' // Adapt the hook to a Svelte store or function
  // import Dg from './dg.svg'
  // import Recording from './recording.svg'

  let userMedia
  let microphone
  let caption
  let isListening = false
  let isLoadingKey = true
  let isLoading = true
  let isProcessing = false
  let micOpen = false

  const apiKey = writable(null)
  const connection = writable(null)

  // const { add, remove, first, size, queue } = useQueue([])

  async function toggleMicrophone() {
    if (microphone && userMedia) {
      userMedia = null
      microphone = null
      microphone.stop()
    } else {
      userMedia = await navigator.mediaDevices.getUserMedia({ audio: true })
      microphone = new MediaRecorder(userMedia)
      microphone.start(500)

      microphone.ondataavailable = (e) => {
        add(e.data)
      }

      micOpen = true
      microphone.onstop = () => (micOpen = false)
    }
  }

  onMount(async () => {
    if (!get(apiKey)) {
      console.log('getting a new api key')
      const res = await fetch('/api', { cache: 'no-store' })
      const object = await res.json()
      if (!object.key) {
        console.error('No api key returned')
        return
      }
      apiKey.set(object)
      isLoadingKey = false
    }

    if (get(apiKey) && apiKey.key) {
      console.log('connecting to deepgram')
      const deepgram = createClient(apiKey.key)
      const newConnection = deepgram.listen.live({
        model: 'nova',
        interim_results: true,
        smart_format: true,
      })

      newConnection.on(LiveTranscriptionEvents.Open, () => {
        console.log('connection established')
        isListening = true
      })

      newConnection.on(LiveTranscriptionEvents.Close, () => {
        console.log('connection closed')
        isListening = false
        apiKey.set(null)
        connection.set(null)
      })

      newConnection.on(LiveTranscriptionEvents.Transcript, (data) => {
        const words = data.channel.alternatives[0].words
        caption = words.map((word) => word.punctuated_word || word.word).join(' ')
      })

      connection.set(newConnection)
      isLoading = false
    }

    const interval = setInterval(() => {
      if (get(size) > 0 && !isProcessing) {
        isProcessing = true
        if (isListening) {
          const blob = get(first)
          get(connection)?.send(blob)
          remove()
        }

        setTimeout(() => {
          isProcessing = false
        }, 250)
      }
    }, 500)

    onDestroy(() => clearInterval(interval))
  })

  // if (isLoadingKey) {
  //   return <span>Loading temporary API key...</span>
  // }
  // if (isLoading) {
  //   return <span>Loading the app...</span>
  // }
</script>

<div class="w-full relative">
  <div class="mt-10 flex flex-col align-middle items-center">
    {#if userMedia && microphone && micOpen}
      <img src="/speak.png" alt="Speaking" width="168" height="129" />
    {:else}
      <img src="/click.png" alt="Click to speak" width="168" height="129" />
    {/if}

    <button on:click={toggleMicrophone}> Recording Icon </button>
    <div class="mt-20 p-6 text-xl text-center">
      {#if caption && micOpen}
        {caption}
      {:else}
        ** Realtime transcription by Deepgram **
      {/if}
    </div>
  </div>
  <div
    class="z-20 text-white flex shrink-0 grow-0 justify-around items-center fixed bottom-0 right-5 rounded-lg mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10 gap-5"
  >
    <span class="text-sm text-gray-400">
      {isListening ? 'Deepgram connection open!' : 'Deepgram is connecting...'}
    </span>
    DG logo
  </div>
</div>
