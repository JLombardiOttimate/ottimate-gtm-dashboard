import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages deploys to https://<user>.github.io/<repo>/
  // Update 'ottimate-gtm-dashboard' if you name the repo differently
  base: '/ottimate-gtm-dashboard/',
})
