import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  build: {
    // Exclude react-native from being processed by Vite
    rollupOptions: {
      external: /^react-native/,
    },
  },
});
