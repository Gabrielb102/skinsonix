import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('serialport', {
    list: () => ipcRenderer.invoke('list-ports')
})