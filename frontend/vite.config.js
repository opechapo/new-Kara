// vite.config.js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { Buffer } from 'buffer';

export default defineConfig({
  plugins: [tailwindcss()],
  define: {
    'global': 'globalThis', // Map Node's global to browser's globalThis
    'process.env': {}, // Stub process.env
    'Buffer': ['buffer', 'Buffer'], // Explicitly define Buffer
  },
  resolve: {
    alias: {
      buffer: 'buffer', // Alias buffer to the npm package
    },
  },
  optimizeDeps: {
    include: ['buffer', 'ethers'], // Pre-bundle buffer and ethers
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true, // Handle mixed ES/CommonJS
    },
  },
});