import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path/win32';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      './src': path.resolve(__dirname, './src/index.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
  server: {
    open: true,
    port: 3000,
  },
});
