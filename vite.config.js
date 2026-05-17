import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDocs = process.env.BUILD_TARGET === 'docs'

  return {
    root: 'src',
    base: isDocs ? '/showcase-app/docs/' : '/showcase-app/',
    publicDir: '../public',
    plugins: [react()],
    build: {
      outDir: isDocs ? '../docs' : '../dist',
      emptyOutDir: true,
    },
  }
})
