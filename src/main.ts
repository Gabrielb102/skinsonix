import { ipcMain } from 'electron';
import { SerialPort } from "serialport";
import DBManager from "./db/DBManager";


ipcMain.handle('db-init', async () => {
    return DBManager.init();
});

ipcMain.handle('list-ports', async () => {
    // return "poop"
    return SerialPort.list();
});


