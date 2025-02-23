import {ipcMain} from 'electron';
import {SerialPort} from 'serialport';

class SerialPortManager {
    private wandPort: SerialPort | null = null;

    async listPorts() {
        return SerialPort.list();
    }

    async openPort() {
            if (!this.wandPort) {
                this.wandPort = new SerialPort({path: "COM3", baudRate: 9600});
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

    async writeWandPort(data: string) {
        if (this.wandPort) {
            this.wandPort.write(data);
            return {
                success: true,
                data: data
            };
        } else {
            console.error("Wand port not open");
            return Error("Wand port not open");
        }
    }
}

const serialPortManager = new SerialPortManager();

const initSerialportHandlers = () => {
    ipcMain.handle('list-ports', () => serialPortManager.listPorts());
    ipcMain.handle('open-port', () => serialPortManager.openPort());
    ipcMain.handle('write', (event, data) => serialPortManager.writeWandPort(data));
}

export default initSerialportHandlers;