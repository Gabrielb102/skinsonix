import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('wand', {
    list: () => ipcRenderer.invoke('list-ports'),
    openPort: () => ipcRenderer.invoke('open-port'),
    write: (data) => ipcRenderer.invoke('write', data)
})

contextBridge.exposeInMainWorld('db', {
    getTreatments: (params) => ipcRenderer.invoke('treatments-get', params),
    createTreatment: (treatment) => ipcRenderer.invoke('treatments-create', treatment),
    updateTreatment: (treatment) => ipcRenderer.invoke('treatments-update', treatment),
    deleteTreatment: (id) => ipcRenderer.invoke('treatments-delete', id)
})