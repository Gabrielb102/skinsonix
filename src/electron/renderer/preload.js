import { contextBridge, ipcRenderer } from 'electron';

// Startup / Updater Notifications
contextBridge.exposeInMainWorld('mainProcessMessages', {
    onUpdateStatus: (callback) => {
        ipcRenderer.on('update-status', (event, status, data) => callback(status, data));
    }
});

// Serialport / Wand API
contextBridge.exposeInMainWorld('wand', {
    list: () => ipcRenderer.invoke('list-ports'),
    openPort: () => ipcRenderer.invoke('open-port'),
    write: (data) => ipcRenderer.invoke('write', data)
})

// DB API
contextBridge.exposeInMainWorld('db', {
    getTreatments: (params) => ipcRenderer.invoke('treatments-get', params),
    createTreatment: (treatment) => ipcRenderer.invoke('treatments-create', treatment),
    updateTreatment: (treatment) => ipcRenderer.invoke('treatments-update', treatment),
    deleteTreatment: (id) => ipcRenderer.invoke('treatments-delete', id)
})