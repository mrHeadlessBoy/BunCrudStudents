import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),tailwindcss()
  ],
/*     server: {
    proxy: {
      '/api': {
        target: 'https://buncrudstudents.onrender.com',
        changeOrigin: true,
        // optional if your backend is not at same path
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }, */
})
