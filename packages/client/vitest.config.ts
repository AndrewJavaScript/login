import { defineConfig } from 'vitest/config';
import vuePlugin from '@vitejs/plugin-vue';

export default defineConfig({
  test: {
    silent: false,
    globals: true,
    environment: 'jsdom',
    pool: 'vmThreads',
  },
  plugins: [vuePlugin()],
});
