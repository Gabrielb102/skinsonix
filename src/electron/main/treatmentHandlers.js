import {ipcMain} from 'electron';
import DBManager from "../../db/DBManager";

const db = DBManager.init();

const initTreatmentsHandlers = () => {
    ipcMain.handle('treatments-create', async () => {
        return DBManager.init();
    });
    ipcMain.handle('treatments-read', async () => {
        return DBManager.init();
    });
    ipcMain.handle('treatments-update', async () => {
        return DBManager.init();
    });
    ipcMain.handle('treatments-delete', async () => {
        return DBManager.init();
    });
}

export default initTreatmentsHandlers;
