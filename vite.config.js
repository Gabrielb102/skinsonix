import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from "@tailwindcss/vite";
import electronPlugin from "vite-plugin-electron/simple";
import pkg from "./package.json";
import { fileURLToPath } from 'url';

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
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/frontend/components', import.meta.url)),
      '@electron': fileURLToPath(new URL('./src/electron', import.meta.url)),
      '@frontend': fileURLToPath(new URL('./src/frontend', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/frontend/views', import.meta.url)),
      '@images': fileURLToPath(new URL('./src/frontend/assets/images', import.meta.url)),
    },
  },
  rollupOptions: {
    external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
  },
  server: {
    hmr: true
  }
});