import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 5173,
      host: '127.0.0.1',
    },
    plugins: [
      react(),
      // Generate Gzip compressed .gz files alongside assets
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 10240,
      }),
      // Generate Brotli compressed .br files for better compression at CDN level
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 10240,
      }),
      // PWA & Service Worker
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: { enabled: false }, // don't spam SW in dev
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
          maximumFileSizeToCacheInBytes: 5000000 // 5MB limit for caching assets
        },
        manifest: {
          name: 'Cost of Success // Glitch',
          short_name: 'CoS // Glitch',
          description: 'A gamified learning experience on management accounting and budgeting.',
          theme_color: '#0F0F12',
          background_color: '#0F0F12',
          display: 'standalone',
          icons: [
            {
              src: '192x192.png', // Fallback icons
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      // Use terser for more aggressive minification: drops console.logs, dead code
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'],
        },
      },
      // Split vendor dependencies for better long-term caching
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Vendor: React core (smallest, most stable)
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'vendor-react';
            }
            // Vendor: Framer Motion (large animation library)
            if (id.includes('node_modules/framer-motion')) {
              return 'vendor-motion';
            }
            // Vendor: Lucide icons — bundle separately for tree-shake isolation
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-icons';
            }
            // Keep constants.ts in its own chunk since it's large (40KB)
            if (id.includes('constants.ts')) {
              return 'app-constants';
            }
          },
        },
      },
    },
  };
});
