import {ipcMain} from 'electron';
import {SerialPort} from "serialport";

const initSerialportHandlers = () => {
    ipcMain.handle('list-ports', async () => {
        // return "poop"
        return SerialPort.list();
    });
}

export default initSerialportHandlers;
