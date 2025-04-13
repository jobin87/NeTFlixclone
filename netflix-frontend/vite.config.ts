import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, existsSync } from 'fs';

const PORT = 8000;

export default defineConfig({
  resolve: {
    alias: {
      src: '/src',
    },
  },
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle: () => {
        const from = resolve(__dirname, '_redirects');
        const to = resolve(__dirname, 'dist/_redirects');
        if (existsSync(from)) {
          copyFileSync(from, to);
        }
      },
    },
  ],
  server: { port: PORT, host: true },
  preview: { port: PORT, host: true },
});
