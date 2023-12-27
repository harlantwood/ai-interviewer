stage 1

- [x] TTS from openAI via browser
- [x] try it on cloudflare
- [ ] record user audio via browser
- [ ] STT user audio
  - Browser Speech API??
  - Whisper WASM in browser
    - https://github.com/ggerganov/whisper.cpp/tree/master/examples/whisper.wasm
    - demo: https://whisper.ggerganov.com/
  - whisper API
- [ ] try it on cloudflare

stage 2

- [ ] feed convo to llm to determine next question
  - prefer: WASM llm - mistral7b or better
  - alt: gpt4[-turbo] api

stage 3

- [ ] save audio (ai and human) to cf r2
- [ ] stitch together chunks in player to play back interview
- [ ] download full interview as mp3

sketch

```
[ Ask me a question ]
(ai speaks question, also printed out)

(user answers, recorded and transribed)
(transcription printed out)

[ I'm done ]
[ Ask me another question ]
```
