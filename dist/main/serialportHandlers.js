"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const serialport_1 = require("serialport");
class SerialPortManager {
    wandPort = null;
    async listPorts() {
        return serialport_1.SerialPort.list();
    }
    async openPort() {
        if (!this.wandPort) {
            this.wandPort = new serialport_1.SerialPort({ path: "COM3", baudRate: 9600 });
        }
        return await new Promise((resolve, reject) => {
            this.wandPort.on('open', () => {
                resolve({
                    success: true,
                    path: this.wandPort.path,
                    baudRate: this.wandPort.baudRate,
                    isOpen: this.wandPort.isOpen
                });
            });
            this.wandPort.on('error', (err) => {
                console.error(err);
                reject(Error(err.message));
            });
        });
    }
    async writeWandPort(data) {
        if (this.wandPort) {
            this.wandPort.write(data);
            return {
                success: true,
                data: data
            };
        }
        else {
            console.error("Wand port not open");
            return Error("Wand port not open");
        }
    }
}
const serialPortManager = new SerialPortManager();
const initSerialportHandlers = () => {
    electron_1.ipcMain.handle('list-ports', () => serialPortManager.listPorts());
    electron_1.ipcMain.handle('open-port', () => serialPortManager.openPort());
    electron_1.ipcMain.handle('write', (event, data) => serialPortManager.writeWandPort(data));
};
exports.default = initSerialportHandlers;
//# sourceMappingURL=serialportHandlers.js.map