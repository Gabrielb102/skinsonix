import { defineConfig } from 'vite';
import {resolve} from "path";

export default defineConfig({
    build: {
        rollupOptions: {
            external: ['serialport', 'sqlite3']
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@components': resolve(__dirname, 'src/frontend/components')
        }
    }
});