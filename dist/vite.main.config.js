"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
exports.default = (0, vite_1.defineConfig)({
    build: {
        rollupOptions: {
            external: ['serialport', 'sqlite3']
        }
    }
});
//# sourceMappingURL=vite.main.config.js.map