import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Plugin to replace placeholder URLs in index.html with actual base URL
    {
      name: 'replace-og-urls',
      transformIndexHtml(html) {
        // Get base URL from environment variable or use default
        const baseUrl = process.env.VITE_BASE_URL || process.env.NETLIFY_URL || 'YOUR_DEPLOY_URL';
        return html.replace(/YOUR_DEPLOY_URL/g, baseUrl);
      },
    },
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Expose environment variables to the client
  // Variables prefixed with VITE_ are exposed to the client
  envPrefix: 'VITE_',
});
