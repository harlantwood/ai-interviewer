<script>
  import Microphone from './Microphone.svelte'
</script>

<main class="flex min-h-screen flex-col items-center justify-between p-24">
  <div class="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
    <p
      class="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
    >
      Browser transcription using <code class="font-mono font-bold">@deepgram/sdk</code>
    </p>
    <div
      class="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"
    >
      <a
        class="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        By
        <img src="/deepgram.svg" alt="Deepgram Logo" width="124" height="24" />
      </a>
    </div>
  </div>

  <div
    class="relative flex w-screen max-w-screen-lg place-items-center before:pointer-events-none after:pointer-events-none before:absolute before:right-0 after:right-1/4 before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]"
  >
    <Microphone />
  </div>

  <div class="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
    <!-- Example Link 1 -->
    <a
      href="https://github.com/deepgram/deepgram-node-sdk"
      class="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 class="mb-3 text-2xl font-semibold">
        Docs
        <span
          class="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
          >-&gt;</span
        >
      </h2>
      <p class="m-0 max-w-[30ch] text-sm opacity-50">
        Find in-depth information about the Deepgram JavaScript SDK.
      </p>
    </a>
    <!-- Similar structure for other links -->
  </div>
</main>
