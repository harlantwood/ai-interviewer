# AI Interviewer

**TL;DR: AI interviews you, on whatever topics you want, creating audio archives and transcripts.**

## Motivation

To have an AI interview me, to get me to talk about topics I want to share with the world. Also to explore more AI tooling, and hopefully release something useful for others!

## Stack / Architecture

- SvelteKit
- Deploys to Cloudflare Pages (at minimum)
- Audio recording via browser
- Audio transcription via
  - browser or
  - WASM LLM in browser or
  - LLM via API, eg OpenAI
- Next question generation via:
  - WASM LLM in browser or
  - LLM via API, eg OpenAI
- Save audio files to Cloudflare R2 (at minimum)

## Features

### Stage 1

- [x] TTS (Text to Speech) via openAI in browser
- [x] Works on cloudflare pages
- [ ] record user audio via browser
- [ ] STT user audio
  - Browser Speech API??
  - Whisper WASM in browser
    - https://github.com/ggerganov/whisper.cpp/tree/master/examples/whisper.wasm
    - demo: https://whisper.ggerganov.com/
  - whisper API
- [ ] try it on cloudflare

### Stage 2

- [ ] feed convo to llm to determine next question
  - prefer: WASM llm - mistral7b or better
  - alt: gpt4[-turbo] api

### Stage 3

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
