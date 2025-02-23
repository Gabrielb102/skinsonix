import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import {resolve} from 'path';

// https://vitejs.dev/config
export default defineConfig({
    plugins: [vue(), tailwindcss()],
    server: {
        hmr: true
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@components': resolve(__dirname, './src/frontend/components')
        }
    }
});