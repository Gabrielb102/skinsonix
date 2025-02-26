"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("wand", {
  list: () => electron.ipcRenderer.invoke("list-ports"),
  openPort: () => electron.ipcRenderer.invoke("open-port"),
  write: (data) => electron.ipcRenderer.invoke("write", data)
});
electron.contextBridge.exposeInMainWorld("db", {
  init: () => electron.ipcRenderer.invoke("db-init")
});
