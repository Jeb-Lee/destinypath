import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    watch: {
      usePolling: true
    }
  }
});