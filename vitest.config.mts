import { defineConfig } from 'vitest/config';

// Component tests only; pure logic stays on `node --test` (npm test).
export default defineConfig({
  resolve: {
    alias: { '@': new URL('./src', import.meta.url).pathname },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.tsx'],
  },
});
