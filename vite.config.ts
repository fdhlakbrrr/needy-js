import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./demo', import.meta.url)),
      'needy': fileURLToPath(new URL('./needy', import.meta.url)),
    }
  }
});
