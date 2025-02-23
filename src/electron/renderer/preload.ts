import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('wand', {
    list: () => ipcRenderer.invoke('list-ports'),
    openPort: () => ipcRenderer.invoke('open-port'),
    write: (data: string) => ipcRenderer.invoke('write', data)
})

contextBridge.exposeInMainWorld('db', {
    init: () => ipcRenderer.invoke('db-init')
})