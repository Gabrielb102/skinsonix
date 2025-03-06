"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("wand", {
  list: () => electron.ipcRenderer.invoke("list-ports"),
  openPort: () => electron.ipcRenderer.invoke("open-port"),
  write: (data) => electron.ipcRenderer.invoke("write", data)
});
electron.contextBridge.exposeInMainWorld("db", {
  getTreatments: (params) => electron.ipcRenderer.invoke("treatments-get", params),
  createTreatment: (treatment) => electron.ipcRenderer.invoke("treatments-create", treatment),
  updateTreatment: (treatment) => electron.ipcRenderer.invoke("treatments-update", treatment),
  deleteTreatment: (id) => electron.ipcRenderer.invoke("treatments-delete", id)
});
