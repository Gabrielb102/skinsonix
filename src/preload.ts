import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('serialport', {
    list: () => ipcRenderer.invoke('list-ports')
})

contextBridge.exposeInMainWorld('db', {
    init: () => ipcRenderer.invoke('db-init')
})