import {printTextarea} from './helpers'

// TODO: convert audio buffer to WAV
function setAudio(audio) {
  //if (audio) {
  //    // convert to 16-bit PCM
  //    var blob = new Blob([audio], { type: 'audio/wav' });
  //    var url = URL.createObjectURL(blob);
  //    document.getElementById('source').src = url;
  //    document.getElementById('audio').hidden = false;
  //    document.getElementById('audio').loop = false;
  //    document.getElementById('audio').load();
  //} else {
  //    document.getElementById('audio').hidden = true;
  //}
}

// function changeInput(input) {
//   if (input == 'file') {
//     document.getElementById('input_file').style.display = 'block';
//     document.getElementById('input_mic').style.display = 'none';
//     document.getElementById('progress').style.display = 'none';
//   } else {
//     document.getElementById('input_file').style.display = 'none';
//     document.getElementById('input_mic').style.display = 'block';
//     document.getElementById('progress').style.display = 'block';
//   }
// }

// var Module = {
//   print: printTextarea,
//   printErr: printTextarea,
//   setStatus: function (text) {
//     printTextarea('js: ' + text);
//   },
//   monitorRunDependencies: function (left) {
//   }
// };

// // web audio context
// var context = null;

// // audio data
var audio = null;

// // the whisper instance
// var instance = null;
// var model_whisper = '';

// // helper function
// function convertTypedArray(src, type) {
//   var buffer = new ArrayBuffer(src.byteLength);
//   var baseView = new src.constructor(buffer).set(src);
//   return new type(buffer);
// }

// //
// // load model
// //

// let dbVersion = 1
// let dbName = 'whisper.ggerganov.com';
// let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB

// function storeFS(fname, buf) {
//   // write to WASM file using FS_createDataFile
//   // if the file exists, delete it
//   try {
//     Module.FS_unlink(fname);
//   } catch (e) {
//     // ignore
//   }

//   Module.FS_createDataFile("/", fname, buf, true, true);

//   //model_whisper = fname;

//   document.getElementById('model-whisper-status').innerHTML = 'loaded "' + model_whisper + '"!';

//   printTextarea('storeFS: stored model: ' + fname + ' size: ' + buf.length);

//   document.getElementById('model').innerHTML = 'Model fetched: ' + model_whisper;
// }

// function loadFile(event, fname) {
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

// function loadWhisper(model) {
//   let urls = {
//     'tiny.en': 'https://whisper.ggerganov.com/ggml-model-whisper-tiny.en.bin',
//     'tiny': 'https://whisper.ggerganov.com/ggml-model-whisper-tiny.bin',
//     'base.en': 'https://whisper.ggerganov.com/ggml-model-whisper-base.en.bin',
//     'base': 'https://whisper.ggerganov.com/ggml-model-whisper-base.bin',
//     'small.en': 'https://whisper.ggerganov.com/ggml-model-whisper-small.en.bin',
//     'small': 'https://whisper.ggerganov.com/ggml-model-whisper-small.bin',

//     'tiny-en-q5_1': 'https://whisper.ggerganov.com/ggml-model-whisper-tiny.en-q5_1.bin',
//     'tiny-q5_1': 'https://whisper.ggerganov.com/ggml-model-whisper-tiny-q5_1.bin',
//     'base-en-q5_1': 'https://whisper.ggerganov.com/ggml-model-whisper-base.en-q5_1.bin',
//     'base-q5_1': 'https://whisper.ggerganov.com/ggml-model-whisper-base-q5_1.bin',
//     'small-en-q5_1': 'https://whisper.ggerganov.com/ggml-model-whisper-small.en-q5_1.bin',
//     'small-q5_1': 'https://whisper.ggerganov.com/ggml-model-whisper-small-q5_1.bin',
//     'medium-en-q5_0': 'https://whisper.ggerganov.com/ggml-model-whisper-medium.en-q5_0.bin',
//     'medium-q5_0': 'https://whisper.ggerganov.com/ggml-model-whisper-medium-q5_0.bin',
//     'large-q5_0': 'https://whisper.ggerganov.com/ggml-model-whisper-large-q5_0.bin',
//   };

//   let sizes = {
//     'tiny.en': 75,
//     'tiny': 75,
//     'base.en': 142,
//     'base': 142,
//     'small.en': 466,
//     'small': 466,

//     'tiny-en-q5_1': 31,
//     'tiny-q5_1': 31,
//     'base-en-q5_1': 57,
//     'base-q5_1': 57,
//     'small-en-q5_1': 182,
//     'small-q5_1': 182,
//     'medium-en-q5_0': 515,
//     'medium-q5_0': 515,
//     'large-q5_0': 1030,
//   };

//   let url = urls[model];
//   let dst = 'whisper.bin';
//   let size_mb = sizes[model];

//   model_whisper = model;

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
//   document.getElementById('model-whisper-status').innerHTML = 'loading model: ' + model;

//   cbProgress = function (p) {
//     let el = document.getElementById('fetch-whisper-progress');
//     el.innerHTML = Math.round(100 * p) + '%';
//   };

//   cbCancel = function () {
//     var el;

//     el = document.getElementById('fetch-whisper-tiny-en'); if (el) el.style.display = 'inline-block';
//     el = document.getElementById('fetch-whisper-base-en'); if (el) el.style.display = 'inline-block';
//     el = document.getElementById('fetch-whisper-small-en'); if (el) el.style.display = 'inline-block';
//     el = document.getElementById('fetch-whisper-tiny'); if (el) el.style.display = 'inline-block';
//     el = document.getElementById('fetch-whisper-base'); if (el) el.style.display = 'inline-block';
//     el = document.getElementById('fetch-whisper-small'); if (el) el.style.display = 'inline-block';

//     el = document.getElementById('fetch-whisper-tiny-en-q5_1'); if (el) el.style.display = 'inline-block';
//     el = document.getElementById('fetch-whisper-tiny-q5_1'); if (el) el.style.display = 'inline-block';
//     el = document.getElementById('fetch-whisper-base-en-q5_1'); if (el) el.style.display = 'inline-block';
//     el = document.getElementById('fetch-whisper-base-q5_1'); if (el) el.style.display = 'inline-block';
//     el = document.getElementById('fetch-whisper-small-en-q5_1'); if (el) el.style.display = 'inline-block';
//     el = document.getElementById('fetch-whisper-small-q5_1'); if (el) el.style.display = 'inline-block';
//     el = document.getElementById('fetch-whisper-medium-en-q5_0'); if (el) el.style.display = 'inline-block';
//     el = document.getElementById('fetch-whisper-medium-q5_0'); if (el) el.style.display = 'inline-block';
//     el = document.getElementById('fetch-whisper-large-q5_0'); if (el) el.style.display = 'inline-block';

//     el = document.getElementById('whisper-file'); if (el) el.style.display = 'inline-block';
//     el = document.getElementById('model-whisper-status'); if (el) el.innerHTML = '';
//   };

//   loadRemote(url, dst, size_mb, cbProgress, storeFS, cbCancel, printTextarea);
// }

// //
// // audio file
// //

// const kMaxAudio_s = 30 * 60;
const kMaxRecording_s = 2 * 60;
const kSampleRate = 16000;

// window.AudioContext = window.AudioContext || window.webkitAudioContext;
// window.OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;

// function loadAudio(event) {
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

//         setAudio(audio);
//       });
//     }, function (e) {
//       printTextarea('js: error decoding audio: ' + e);
//       audio = null;
//       setAudio(audio);
//     });
//   }
//   reader.readAsArrayBuffer(file);
// }

//
// microphone
//

var mediaRecorder = null;
let doRecording = false;
var startTime = 0;

export function stopRecording() {
  doRecording = false;
}

// record up to kMaxRecording_s seconds of audio from the microphone
// check if doRecording is false every 1000 ms and stop recording if so
// update progress information
export function startRecording() {
  // if (!context) {
    const context = new AudioContext({
      sampleRate: kSampleRate,
      channelCount: 1,
      echoCancellation: false,
      autoGainControl: true,
      noiseSuppression: true,
    });
  // }

  document.getElementById('start').disabled = true;
  document.getElementById('stop').disabled = false;

  document.getElementById('progress-bar').style.width = '0%';
  document.getElementById('progress-text').innerHTML = '0%';

  doRecording = true;
  startTime = Date.now();

  var chunks = [];
  var stream = null;

  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(function (s) {
      stream = s;
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };
      mediaRecorder.onstop = function (e) {
        var blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
        chunks = [];

        document.getElementById('start').disabled = false;
        document.getElementById('stop').disabled = true;

        var reader = new FileReader();
        reader.onload = function (event) {
          var buf = new Uint8Array(reader.result);

          context.decodeAudioData(buf.buffer, function (audioBuffer) {
            var offlineContext = new OfflineAudioContext(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);
            var source = offlineContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(offlineContext.destination);
            source.start(0);

            offlineContext.startRendering().then(function (renderedBuffer) {
              audio = renderedBuffer.getChannelData(0);
              printTextarea('js: audio recorded, size: ' + audio.length);

              // truncate to first 30 seconds
              if (audio.length > kMaxRecording_s * kSampleRate) {
                audio = audio.slice(0, kMaxRecording_s * kSampleRate);
                printTextarea('js: truncated audio to first ' + kMaxRecording_s + ' seconds');
              }
              setAudio(audio);
            });
          }, function (e) {
            printTextarea('js: error decoding audio: ' + e);
            audio = null;
            setAudio(audio);
          });
        }

        reader.readAsArrayBuffer(blob);
      };
      mediaRecorder.start();
    })
    .catch(function (err) {
      printTextarea('js: error getting audio stream: ' + err);
    });

  var interval = setInterval(function () {
    if (!doRecording) {
      clearInterval(interval);
      mediaRecorder.stop();
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }

    document.getElementById('progress-bar').style.width = (100 * (Date.now() - startTime) / 1000 / kMaxRecording_s) + '%';
    document.getElementById('progress-text').innerHTML = (100 * (Date.now() - startTime) / 1000 / kMaxRecording_s).toFixed(0) + '%';
  }, 1000);

  printTextarea('js: recording ...');

  setTimeout(function () {
    if (doRecording) {
      printTextarea('js: recording stopped after ' + kMaxRecording_s + ' seconds');
      stopRecording();
    }
  }, kMaxRecording_s * 1000);
}

// //
// // transcribe
// //

// var nthreads = 8;

// export function changeThreads(value) {
//   nthreads = value;
//   document.getElementById('threads-value').innerHTML = nthreads;
// }

// export function onProcess(translate) {
//   if (!instance) {
//     instance = Module.init('whisper.bin');

//     if (instance) {
//       printTextarea("js: whisper initialized, instance: " + instance);
//       document.getElementById('model').innerHTML = 'Model loaded: ' + model_whisper;
//     }
//   }

//   if (!instance) {
//     printTextarea("js: failed to initialize whisper");
//     return;
//   }

//   if (!audio) {
//     printTextarea("js: no audio data");
//     return;
//   }

//   if (instance) {
//     printTextarea('');
//     printTextarea('js: processing - this might take a while ...');
//     printTextarea('');

//     setTimeout(function () {
//       var ret = Module.full_default(instance, audio, document.getElementById('language').value, nthreads, translate);
//       console.log('js: full_default returned: ' + ret);
//       if (ret) {
//         printTextarea("js: whisper returned: " + ret);
//       }
//     }, 100);
//   }
// }
