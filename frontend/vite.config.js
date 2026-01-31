import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  test: {
    globals: true, // Allows describe, test, expect globally
    environment: "jsdom", // Simulates browser
    setupFiles: "./src/setupTests.js",
    css: true, // Handles CSS imports
  },
});
