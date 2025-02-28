import {defineConfig} from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import tailwindcss from "@tailwindcss/vite";
import electronPlugin from "vite-plugin-electron/simple";
import pkg from "./package.json";

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isBuild = process.env.NODE_ENV === 'production' || process.env.VSCODE_DEBUG;

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    electronPlugin({
      main: {
        entry: 'src/main.js',
        onstart({startup}) {
          if (process.env.VSCODE_DEBUG) {
            console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App')
          } else {
            startup()
          }
        },
        vite: {
          build: {
            sourcemap: true,
            minify: isBuild,
            outDir: 'dist-electron/main',
            rollupOptions: {
              output: {
                format: 'es'
              },
              external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
            },
          },
        },
      },
      preload: {
        input: 'src/electron/renderer/preload.js',
        vite: {
          build: {
            minify: isBuild,
            outDir: 'dist-electron/preload',
            rollupOptions: {
              output: {
                format: 'cjs'
              },
              external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
            },
          },
        },
      },
      renderer: {
        input: 'index.html',
        vite: {
          build: {
            rollupOptions: {
              input: "index.html",
              output: {
                format: 'es'
              },
            },
            outDir: 'dist-electron/renderer',
          },
        },
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/frontend/components'),
      '@electron': path.resolve(__dirname, 'src/electron'),
      '@frontend': path.resolve(__dirname, 'src/frontend'),
      '@views': path.resolve(__dirname, 'src/frontend/views'),
      '@images': path.resolve(__dirname, 'src/frontend/assets/images'),
    },
  },
  server: {
    hmr: true
  }
});