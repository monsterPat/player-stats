import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

//console.log(topLevelAwait(wasm()))
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_API_KEY' : JSON.stringify(process.env.VITE_PI_KEY),
    'process.env.VITE_AUTH_DOMAIN' : JSON.stringify(process.env.VITE_AUTH_DOMAIN),
    'process.env.VITE_PROJECT_ID' : JSON.stringify(process.env.VITE_PROJECT_ID),
    'process.env.VITE_STORAGE_BUCKET' : JSON.stringify(process.env.VITE_STORAGE_BUCKET),
    'process.env.VITE_MESSAGING_SENDER_ID' : JSON.stringify(process.env.VITE_MESSAGING_SENDER_ID),
    'process.env.VITE_APP_ID' : JSON.stringify(process.env.VITE_APP_ID)
    }, // This line is crucial
    build: { chunkSizeWarningLimit: 1600, },
})
