import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      server: {
        host: true,
        strictPort: true,
        port: 5173,
        hmr: {
          clientPort: 443,
        },
        watch: {
          usePolling: true
        }
      },
      build: {
        rollupOptions: {
          external: [
            'prismjs/components/prism-markup-templating',
            'prismjs/components/prism-javascript',
            'prismjs/components/prism-css',
            'prismjs/components/prism-html'
          ]
        },
        copyPublicDir: true
      },
      publicDir: 'public'
    };
});


