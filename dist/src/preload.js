"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('serialport', {
    list: () => electron_1.ipcRenderer.invoke('list-ports')
});
electron_1.contextBridge.exposeInMainWorld('db', {
    init: () => electron_1.ipcRenderer.invoke('db-init')
});
//# sourceMappingURL=preload.js.map