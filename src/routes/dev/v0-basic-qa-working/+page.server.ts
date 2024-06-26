export function load({ setHeaders }) {
  setHeaders({
    // Need these headers to enable SharedArrayBuffer
    // for WebAssembly and Web Workers
    // see: https://web.dev/articles/cross-origin-isolation-guide
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
  })
}
