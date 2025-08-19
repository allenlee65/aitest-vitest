import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: './api/setup.ts',
    include: ['api/**/*.spec.ts'],
    testTimeout: 20000,
  },
});
