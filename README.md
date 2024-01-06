# AI Interviewer

**TL;DR: AI interviews you, on whatever topics you want, creating audio archives and transcripts.**

## Status

Work in progress, not ready to try, developing in public, check back later 😎

## Motivations

- I want an AI Interviewer, as a way to motivate myself to talk about a variety of topics that I'd like to share with the world.
- Experiment with AI in the browser via WASM.
- Contribute back to open source

## Stack / Architecture

- SvelteKit - fullstack TS front + backend
- Deploy to Cloudflare Pages (at minimum)
- Audio recording via browser
- Audio transcription via
  - WASM LLM in browser or
  - LLM via API, eg OpenAI
- Next question generation via:
  - WASM LLM in browser or
  - LLM via API, eg OpenAI
- Save audio files to Cloudflare R2 (at minimum)

## Features

### Stage 1 - Text to Speech (AI) + Speech to Text (User)

- [x] TTS (Text to Speech) via openAI in browser
- [x] Works on cloudflare pages
- [x] record user audio via browser
- [x] STT user audio
  - [x] Whisper WASM in browser
    - https://github.com/ggerganov/whisper.cpp/tree/master/examples/whisper.wasm
    - demo: https://whisper.ggerganov.com/
  - whisper API
  - [Browser Speech API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#browser_compatibility)?
    - on chrome is sent to google servers
    - behind flag on Firefox

### Stage 2 - LLM Question Generation

- [x] set up topics etc in system prompt
- [x] LLM asks initial question
- [ ] feed whole convo to llm to determine next question
  - prefer: WASM llm - mistral7b or better
    - https://github.com/mlc-ai/web-llm
  - alt: gpt4[-turbo] api

### Stage 3 - Audio Archives & Playback

- [ ] save audio (ai and human) to cf r2
- [ ] stitch together chunks in player to play back interview
- [ ] download full interview as mp3
