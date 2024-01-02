////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// Modified from JS in `helpers.js` generated from
// https://github.com/ggerganov/whisper.cpp/tree/9286d3f584240ba58bd44a1bd1e85141579c78d4/examples/whisper.wasm
// MIT License
// Copyright (c) 2023 Georgi Gerganov
//
// See also /archive/whisper-wasm/README.md in this repo
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

// export function convertTypedArray(src, type) {
//     var buffer = new ArrayBuffer(src.byteLength);
//     var baseView = new src.constructor(buffer).set(src);
//     return new type(buffer);
// }

const printTextarea = (function () {
  const element = document.getElementById('output') as HTMLTextAreaElement
  if (element) element.value = '' // clear browser cache
  return function (text: string) {
    if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ')
    console.log(text)
    if (element) {
      element.value += text + '\n'
      element.scrollTop = element.scrollHeight // focus on bottom
    }
  }
})()

// export async function clearCache() {
//     if (confirm('Are you sure you want to clear the cache?\nAll the models will be downloaded again.')) {
//         indexedDB.deleteDatabase(dbName);
//         location.reload();
//     }
// }

// fetch a remote file from remote URL using the Fetch API
export async function fetchRemote(url: string, cbProgress: Function, cbPrint: Function) {
  cbPrint('fetchRemote: downloading with fetch()...')

  const response = await fetch(url, {
    method: 'GET',
    // mode: 'no-cors',  // fetch the resource with CORS disabled
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  })

  if (!response.ok) {
    cbPrint('fetchRemote: failed to fetch ' + url)
    return
  }

  const contentLength = response.headers.get('content-length')!
  const total = parseInt(contentLength, 10)
  const reader = response.body!.getReader()

  const chunks = []
  let receivedLength = 0
  let progressLast = -1

  while (true) {
    const { done, value } = await reader.read()

    if (done) {
      break
    }

    chunks.push(value)
    receivedLength += value.length

    if (contentLength) {
      cbProgress(receivedLength / total)

      const progressCur = Math.round((receivedLength / total) * 10)
      if (progressCur != progressLast) {
        cbPrint('fetchRemote: fetching ' + 10 * progressCur + '% ...')
        progressLast = progressCur
      }
    }
  }

  let position = 0
  const chunksAll = new Uint8Array(receivedLength)

  for (const chunk of chunks) {
    chunksAll.set(chunk, position)
    position += chunk.length
  }

  return chunksAll
}

// load remote data
// - check if the data is already in the IndexedDB
// - if not, fetch it from the remote URL and store it in the IndexedDB
function loadRemote(
  url: string,
  dst: string,
  size_mb: number,
  cbProgress: Function,
  cbReady: Function,
  cbCancel: Function,
  cbPrint: Function
) {
  if (!navigator.storage || !navigator.storage.estimate) {
    cbPrint('loadRemote: navigator.storage.estimate() is not supported')
  } else {
    // query the storage quota and print it
    navigator.storage.estimate().then(function (estimate) {
      cbPrint('loadRemote: storage quota: ' + estimate.quota + ' bytes')
      cbPrint('loadRemote: storage usage: ' + estimate.usage + ' bytes')
    })
  }

  // check if the data is already in the IndexedDB
  const rq = indexedDB.open(dbName, dbVersion)

  rq.onupgradeneeded = function (event: IDBVersionChangeEvent) {
    const db = event.target!.result
    if (db.version == 1) {
      var os = db.createObjectStore('models', { autoIncrement: false })
      cbPrint('loadRemote: created IndexedDB ' + db.name + ' version ' + db.version)
    } else {
      // clear the database
      var os = event.currentTarget!.transaction.objectStore('models')
      os.clear()
      cbPrint('loadRemote: cleared IndexedDB ' + db.name + ' version ' + db.version)
    }
  }

  rq.onsuccess = function (event) {
    const db = event.target!.result
    const tx = db.transaction(['models'], 'readonly')
    const os = tx.objectStore('models')
    const rq = os.get(url)

    rq.onsuccess = function (_event: Event) {
      if (rq.result) {
        cbPrint('loadRemote: "' + url + '" is already in the IndexedDB')
        cbReady(dst, rq.result)
      } else {
        // data is not in the IndexedDB
        cbPrint('loadRemote: "' + url + '" is not in the IndexedDB')

        // // alert and ask the user to confirm
        // if (
        // 	!confirm(
        // 		'You are about to download ' +
        // 			size_mb +
        // 			' MB of data.\n' +
        // 			'The model data will be cached in the browser for future use.\n\n' +
        // 			'Press OK to continue.'
        // 	)
        // ) {
        // 	cbCancel()
        // 	return
        // }

        fetchRemote(url, cbProgress, cbPrint).then(function (data) {
          if (data) {
            // store the data in the IndexedDB
            const rq = indexedDB.open(dbName, dbVersion)
            rq.onsuccess = function (event) {
              const db = event.target!.result
              const tx = db.transaction(['models'], 'readwrite')
              const os = tx.objectStore('models')

              var rq = null
              try {
                var rq = os.put(data, url)
              } catch (e) {
                cbPrint('loadRemote: failed to store "' + url + '" in the IndexedDB: \n' + e)
                cbCancel()
                return
              }

              rq.onsuccess = function (_event: Event) {
                cbPrint('loadRemote: "' + url + '" stored in the IndexedDB')
                cbReady(dst, data)
              }

              rq.onerror = function (_event: Event) {
                cbPrint('loadRemote: failed to store "' + url + '" in the IndexedDB')
                cbCancel()
              }
            }
          }
        })
      }
    }

    rq.onerror = function (_event: Event) {
      cbPrint('loadRemote: failed to get data from the IndexedDB')
      cbCancel()
    }
  }

  rq.onerror = function (_event: Event) {
    cbPrint('loadRemote: failed to open IndexedDB')
    cbCancel()
  }

  rq.onblocked = function (_event: Event) {
    cbPrint('loadRemote: failed to open IndexedDB: blocked')
    cbCancel()
  }

  rq.onabort = function (_event: Event) {
    cbPrint('loadRemote: failed to open IndexedDB: abort')
    cbCancel()
  }
}

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// Modified from JS in `index.html` generated from
// https://github.com/ggerganov/whisper.cpp/tree/9286d3f584240ba58bd44a1bd1e85141579c78d4/examples/whisper.wasm
// MIT License
// Copyright (c) 2023 Georgi Gerganov
//
// See also /archive/whisper-wasm/README.md in this repo
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

// export function changeInput(input) {
//   if (input == 'file') {
//     document.getElementById('input_file').style.display = 'block';
//     document.getElementById('input_mic').style.display = 'none';
//     document.getElementById('progress').style.display = 'none';
//   } else {
// document.getElementById('input_file').style.display = 'none'
document.getElementById('input_mic')!.style.display = 'block'
document.getElementById('progress')!.style.display = 'block'
//   }
// }

// // web audio context
let context: AudioContext | null = null

// // audio data
let audio: Float32Array | null = null

// the whisper instance
let instance: unknown = null
let model_whisper = ''

// // helper function
// export function convertTypedArray(src, type) {
//   var buffer = new ArrayBuffer(src.byteLength);
//   var baseView = new src.constructor(buffer).set(src);
//   return new type(buffer);
// }

// //
// // load model
// //

const dbVersion = 1
const dbName = 'ai-interviewer'
// const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB

function storeFS(fname: string, buf: Uint8Array) {
  // write to WASM file using FS_createDataFile
  // if the file exists, delete it
  try {
    // @ts-expect-error
    window.Module.FS_unlink(fname)
  } catch (e) {
    // ignore
  }

  // @ts-expect-error
  window.Module.FS_createDataFile('/', fname, buf, true, true)

  //model_whisper = fname;

  document.getElementById('model-whisper-status')!.innerHTML = 'loaded "' + model_whisper + '"!'

  printTextarea('storeFS: stored model: ' + fname + ' size: ' + buf.length)

  document.getElementById('model')!.innerHTML = 'Model fetched: ' + model_whisper
}

// export function loadFile(event, fname) {
//   var file = event.target.files[0] || null;
//   if (file == null) {
//     return;
//   }

//   printTextarea("loadFile: loading model: " + file.name + ", size: " + file.size + " bytes");
//   printTextarea('loadFile: please wait ...');

//   var reader = new FileReader();
//   reader.onload = function (event) {
//     var buf = new Uint8Array(reader.result);
//     storeFS(fname, buf);
//   }
//   reader.readAsArrayBuffer(file);

//   document.getElementById('fetch-whisper-tiny-en').style.display = 'none';
//   document.getElementById('fetch-whisper-base-en').style.display = 'none';
//   document.getElementById('fetch-whisper-small-en').style.display = 'none';
//   document.getElementById('fetch-whisper-tiny').style.display = 'none';
//   document.getElementById('fetch-whisper-base').style.display = 'none';
//   document.getElementById('fetch-whisper-small').style.display = 'none';

//   document.getElementById('fetch-whisper-tiny-en-q5_1').style.display = 'none';
//   document.getElementById('fetch-whisper-tiny-q5_1').style.display = 'none';
//   document.getElementById('fetch-whisper-base-en-q5_1').style.display = 'none';
//   document.getElementById('fetch-whisper-base-q5_1').style.display = 'none';
//   document.getElementById('fetch-whisper-small-en-q5_1').style.display = 'none';
//   document.getElementById('fetch-whisper-small-q5_1').style.display = 'none';
//   document.getElementById('fetch-whisper-medium-en-q5_0').style.display = 'none';
//   document.getElementById('fetch-whisper-medium-q5_0').style.display = 'none';
//   document.getElementById('fetch-whisper-large-q5_0').style.display = 'none';

//   document.getElementById('whisper-file').style.display = 'none';
//   document.getElementById('model-whisper-status').innerHTML = 'loaded model: ' + file.name;
// }

export function loadWhisper(model: string) {
  const urls = {
    'tiny.en': `/models/whisper/ggml-model-whisper-tiny.en.bin`,
    tiny: `/models/whisper/ggml-model-whisper-tiny.bin`,
    'base.en': `/models/whisper/ggml-model-whisper-base.en.bin`,
    base: `/models/whisper/ggml-model-whisper-base.bin`,
    'small.en': `/models/whisper/ggml-model-whisper-small.en.bin`,
    small: `/models/whisper/ggml-model-whisper-small.bin`,

    'tiny-en-q5_1': `/models/whisper/ggml-model-whisper-tiny.en-q5_1.bin`,
    'tiny-q5_1': `/models/whisper/ggml-model-whisper-tiny-q5_1.bin`,
    'base-en-q5_1': `/models/whisper/ggml-model-whisper-base.en-q5_1.bin`,
    'base-q5_1': `/models/whisper/ggml-model-whisper-base-q5_1.bin`,
    'small-en-q5_1': `/models/whisper/ggml-model-whisper-small.en-q5_1.bin`,
    'small-q5_1': `/models/whisper/ggml-model-whisper-small-q5_1.bin`,
    'medium-en-q5_0': `/models/whisper/ggml-model-whisper-medium.en-q5_0.bin`,
    'medium-q5_0': `/models/whisper/ggml-model-whisper-medium-q5_0.bin`,
    'large-q5_0': `/models/whisper/ggml-model-whisper-large-q5_0.bin`,
  }

  const sizes = {
    'tiny.en': 75,
    tiny: 75,
    'base.en': 142,
    base: 142,
    'small.en': 466,
    small: 466,

    'tiny-en-q5_1': 31,
    'tiny-q5_1': 31,
    'base-en-q5_1': 57,
    'base-q5_1': 57,
    'small-en-q5_1': 182,
    'small-q5_1': 182,
    'medium-en-q5_0': 515,
    'medium-q5_0': 515,
    'large-q5_0': 1030,
  }

  const url: string = urls[model]
  const dst = 'whisper.bin'
  const size_mb: number = sizes[model]

  model_whisper = model

  document.getElementById('fetch-whisper-tiny-en')!.style.display = 'none'
  document.getElementById('fetch-whisper-base-en')!.style.display = 'none'
  // document.getElementById('fetch-whisper-small-en')!.style.display = 'none'
  // document.getElementById('fetch-whisper-tiny')!.style.display = 'none'
  // document.getElementById('fetch-whisper-base')!.style.display = 'none'
  // document.getElementById('fetch-whisper-small')!.style.display = 'none'

  document.getElementById('fetch-whisper-tiny-en-q5_1')!.style.display = 'none'
  // document.getElementById('fetch-whisper-tiny-q5_1')!.style.display = 'none';
  document.getElementById('fetch-whisper-base-en-q5_1')!.style.display = 'none'
  // document.getElementById('fetch-whisper-base-q5_1')!.style.display = 'none';
  document.getElementById('fetch-whisper-small-en-q5_1')!.style.display = 'none'
  // document.getElementById('fetch-whisper-small-q5_1')!.style.display = 'none';
  // document.getElementById('fetch-whisper-medium-en-q5_0')!.style.display = 'none';
  // document.getElementById('fetch-whisper-medium-q5_0')!.style.display = 'none';
  // document.getElementById('fetch-whisper-large-q5_0')!.style.display = 'none';

  // document.getElementById('whisper-file')!.style.display = 'none';
  document.getElementById('model-whisper-status')!.innerHTML = 'loading model: ' + model

  const cbProgress = function (p: number) {
    const el = document.getElementById('fetch-whisper-progress')!
    el.innerHTML = Math.round(100 * p) + '%'
  }

  const cbCancel = function () {
    let el

    el = document.getElementById('fetch-whisper-tiny-en')
    if (el) el.style.display = 'inline-block'
    el = document.getElementById('fetch-whisper-base-en')
    if (el) el.style.display = 'inline-block'
    el = document.getElementById('fetch-whisper-small-en')
    if (el) el.style.display = 'inline-block'
    el = document.getElementById('fetch-whisper-tiny')
    if (el) el.style.display = 'inline-block'
    el = document.getElementById('fetch-whisper-base')
    if (el) el.style.display = 'inline-block'
    el = document.getElementById('fetch-whisper-small')
    if (el) el.style.display = 'inline-block'

    el = document.getElementById('fetch-whisper-tiny-en-q5_1')
    if (el) el.style.display = 'inline-block'
    el = document.getElementById('fetch-whisper-tiny-q5_1')
    if (el) el.style.display = 'inline-block'
    el = document.getElementById('fetch-whisper-base-en-q5_1')
    if (el) el.style.display = 'inline-block'
    el = document.getElementById('fetch-whisper-base-q5_1')
    if (el) el.style.display = 'inline-block'
    el = document.getElementById('fetch-whisper-small-en-q5_1')
    if (el) el.style.display = 'inline-block'
    el = document.getElementById('fetch-whisper-small-q5_1')
    if (el) el.style.display = 'inline-block'
    el = document.getElementById('fetch-whisper-medium-en-q5_0')
    if (el) el.style.display = 'inline-block'
    el = document.getElementById('fetch-whisper-medium-q5_0')
    if (el) el.style.display = 'inline-block'
    el = document.getElementById('fetch-whisper-large-q5_0')
    if (el) el.style.display = 'inline-block'

    el = document.getElementById('whisper-file')
    if (el) el.style.display = 'inline-block'
    el = document.getElementById('model-whisper-status')
    if (el) el.innerHTML = ''
  }

  loadRemote(url, dst, size_mb, cbProgress, storeFS, cbCancel, printTextarea)
}

// //
// // audio file
// //

// const kMaxAudio_s = 30 * 60;
const kMaxRecording_s = 2 * 60
const kSampleRate = 16000

// @ts-expect-error:
window.AudioContext = window.AudioContext || window.webkitAudioContext
// @ts-expect-error:
window.OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext

// export function loadAudio(event) {
//   if (!context) {
//     context = new AudioContext({
//       sampleRate: kSampleRate,
//       channelCount: 1,
//       echoCancellation: false,
//       autoGainControl: true,
//       noiseSuppression: true,
//     });
//   }

//   var file = event.target.files[0] || null;
//   if (file == null) {
//     return;
//   }

//   printTextarea('js: loading audio: ' + file.name + ', size: ' + file.size + ' bytes');
//   printTextarea('js: please wait ...');

//   var reader = new FileReader();
//   reader.onload = function (event) {
//     var buf = new Uint8Array(reader.result);

//     context.decodeAudioData(buf.buffer, function (audioBuffer) {
//       var offlineContext = new OfflineAudioContext(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);
//       var source = offlineContext.createBufferSource();
//       source.buffer = audioBuffer;
//       source.connect(offlineContext.destination);
//       source.start(0);

//       offlineContext.startRendering().then(function (renderedBuffer) {
//         audio = renderedBuffer.getChannelData(0);
//         printTextarea('js: audio loaded, size: ' + audio.length);

//         // truncate to first 30 seconds
//         if (audio.length > kMaxAudio_s * kSampleRate) {
//           audio = audio.slice(0, kMaxAudio_s * kSampleRate);
//           printTextarea('js: truncated audio to first ' + kMaxAudio_s + ' seconds');
//         }

//       });
//     }, function (e) {
//       printTextarea('js: error decoding audio: ' + e);
//       audio = null;
//     });
//   }
//   reader.readAsArrayBuffer(file);
// }

//
// microphone
//

let mediaRecorder: MediaRecorder
let doRecording = false
let startTime = 0

export function stopRecording() {
  doRecording = false
}

// record up to kMaxRecording_s seconds of audio from the microphone
// check if doRecording is false every 1000 ms and stop recording if so
// update progress information
export function startRecording() {
  if (!context) {
    context = new AudioContext({
      sampleRate: kSampleRate,
      // rest of options do not seem to exist :(
      channelCount: 1,
      echoCancellation: false,
      autoGainControl: true,
      noiseSuppression: true,
    })
  }

  ;(document.getElementById('start') as HTMLButtonElement).disabled = true
  ;(document.getElementById('stop') as HTMLButtonElement).disabled = false

  document.getElementById('progress-bar')!.style.width = '0%'
  document.getElementById('progress-text')!.innerHTML = '0%'

  doRecording = true
  startTime = Date.now()

  let chunks: Blob[] = []
  let stream: MediaStream

  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then(function (s) {
      stream = s
      mediaRecorder = new MediaRecorder(stream)
      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data)
      }
      mediaRecorder.onstop = function (e) {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
        chunks = []
        ;(document.getElementById('start') as HTMLButtonElement).disabled = false
        ;(document.getElementById('stop') as HTMLButtonElement).disabled = true

        const reader = new FileReader()
        reader.onload = function (event) {
          const buf = new Uint8Array(reader.result)

          context!.decodeAudioData(
            buf.buffer,
            function (audioBuffer) {
              const offlineContext = new OfflineAudioContext(
                audioBuffer.numberOfChannels,
                audioBuffer.length,
                audioBuffer.sampleRate
              )
              const source = offlineContext.createBufferSource()
              source.buffer = audioBuffer
              source.connect(offlineContext.destination)
              source.start(0)

              offlineContext.startRendering().then(function (renderedBuffer) {
                audio = renderedBuffer.getChannelData(0)
                printTextarea('js: audio recorded, size: ' + audio.length)

                // truncate to first 30 seconds
                if (audio.length > kMaxRecording_s * kSampleRate) {
                  audio = audio.slice(0, kMaxRecording_s * kSampleRate)
                  printTextarea('js: truncated audio to first ' + kMaxRecording_s + ' seconds')
                }
              })
            },
            function (e) {
              printTextarea('js: error decoding audio: ' + e)
              audio = null
            }
          )
        }

        reader.readAsArrayBuffer(blob)
      }
      mediaRecorder.start()
    })
    .catch(function (err) {
      printTextarea('js: error getting audio stream: ' + err)
    })

  var interval = setInterval(function () {
    if (!doRecording) {
      clearInterval(interval)
      mediaRecorder.stop()
      stream.getTracks().forEach(function (track) {
        track.stop()
      })
    }

    document.getElementById('progress-bar')!.style.width =
      (100 * (Date.now() - startTime)) / 1000 / kMaxRecording_s + '%'
    document.getElementById('progress-text')!.innerHTML =
      ((100 * (Date.now() - startTime)) / 1000 / kMaxRecording_s).toFixed(0) + '%'
  }, 1000)

  printTextarea('js: recording ...')

  setTimeout(function () {
    if (doRecording) {
      printTextarea('js: recording stopped after ' + kMaxRecording_s + ' seconds')
      stopRecording()
    }
  }, kMaxRecording_s * 1000)
}

// //
// // transcribe
// //

const nthreads = 8

// export function changeThreads(value) {
//   nthreads = value;
//   document.getElementById('threads-value').innerHTML = nthreads;
// }

export function onProcess(translate: boolean) {
  if (!instance) {
    // @ts-expect-error:
    instance = window.Module.init('whisper.bin')

    if (instance) {
      printTextarea('js: whisper initialized, instance: ' + instance)
      document.getElementById('model')!.innerHTML = 'Model loaded: ' + model_whisper
    }
  }

  if (!instance) {
    printTextarea('js: failed to initialize whisper')
    return
  }

  if (!audio) {
    printTextarea('js: no audio data')
    return
  }

  if (instance) {
    printTextarea('')
    printTextarea('js: processing - this might take a while ...')
    printTextarea('')

    setTimeout(function () {
      const ret = window.Module.full_default(
        instance,
        audio,
        document.getElementById('language')!.value,
        nthreads,
        translate
      )
      console.log('js: full_default returned: ' + ret)
      if (ret) {
        printTextarea('js: whisper returned: ' + ret)
      }
    }, 100)
  }
}
