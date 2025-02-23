"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('wand', {
    list: () => electron_1.ipcRenderer.invoke('list-ports'),
    openPort: () => electron_1.ipcRenderer.invoke('open-port'),
    write: (data) => electron_1.ipcRenderer.invoke('write', data)
});
electron_1.contextBridge.exposeInMainWorld('db', {
    init: () => electron_1.ipcRenderer.invoke('db-init')
});
//# sourceMappingURL=preload.js.map