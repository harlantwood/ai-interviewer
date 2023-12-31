# AI Interviewer

**TL;DR: AI interviews you, on whatever topics you want, creating audio archives and transcripts.**

## Status

Work in progress, not ready to try, developing in public, check back later 😎

## Motivations

- I want an AI Interviewer, as a way to motivate myself to talk about a variety of topics that I'd like to share with the world. 
- Experiment with AI in the browser via WASM.
- Contribute back to open source 

## Stack / Architecture

- SvelteKit
- Deploy to Cloudflare Pages (at minimum)
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
    - https://github.com/mlc-ai/web-llm/blob/main/README.md
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
