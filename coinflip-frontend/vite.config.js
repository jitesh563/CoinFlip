import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'],  // Ensure Vite recognizes .js and .jsx files
    alias: {
      'buffer': 'buffer/'
    }
  },
  optimizeDeps: {
    include: ['buffer']
  },
  build: {
    // generate .vite/manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: './src/main.jsx',
    },
  },
});