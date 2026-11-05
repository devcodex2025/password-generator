import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Component tests only; pure logic stays on `node --test` (npm test).
export default defineConfig({
  resolve: {
    // fileURLToPath keeps Windows drive letters and decodes spaces; `.pathname`
    // produced `/E:/...` with `%20`, so `@/...` imports failed to resolve.
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
