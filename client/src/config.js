const BASE_URL = import.meta.env.MODE === 'development'
  ? 'http://localhost:5000'
  : 'https://your-railway-url.app'

const YJS_URL = import.meta.env.MODE === 'development'
  ? 'ws://localhost:1234'
  : 'wss://your-railway-url.app'

export { BASE_URL, YJS_URL }