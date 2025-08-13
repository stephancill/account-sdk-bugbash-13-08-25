import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    alias: {
      ':core': path.resolve(__dirname, 'src/core'),
      ':store': path.resolve(__dirname, 'src/store'),
      ':sign': path.resolve(__dirname, 'src/sign'),
      ':util': path.resolve(__dirname, 'src/util'),
      ':ui': path.resolve(__dirname, 'src/ui'),
      ':interface': path.resolve(__dirname, 'src/interface'),
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
});
