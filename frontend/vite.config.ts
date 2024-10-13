import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://res.cloudinary.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
