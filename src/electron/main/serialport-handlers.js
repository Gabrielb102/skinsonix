import {ipcMain} from 'electron';
import {SerialPort} from 'serialport';

class SerialPortManager {
    wandPort = null;

    async listPorts() {
        return SerialPort.list();
    }

    async openPort() { if (this.wandPort?.isOpen) { return { success: true, path: this.wandPort.path, baudRate: this.wandPort.baudRate, isOpen: this.wandPort.isOpen }; }
        try {
            const ports = await SerialPort.list();
            // const wandPort = ports.find(port => port.path === "COM3"); // for Windows
            const wandPort = ports.find(port => port.path === "/dev/tty.usbmodem00071748741"); // for Mac

            if (!wandPort) {
                throw new Error("COM3 port not found");
            }

            this.wandPort = new SerialPort({ path: wandPort.path, baudRate: 9600 });

            return new Promise((resolve, reject) => {
                this.wandPort.on('open', () => {
                    resolve({
                        success: true,
                        path: this.wandPort.path,
                        baudRate: this.wandPort.baudRate,
                        isOpen: this.wandPort.isOpen
                    });
                });

                this.wandPort.on('error', (err) => {
                    reject(Error({
                        success: false,
                        error: {
                            message: err.message,
                            code: err.code,
                            stack: err.stack
                        }
                    }));
                });
            });
        } catch (err) {
            throw Error({
                success: false,
                error: {
                    message: err.message,
                    code: err.code,
                    stack: err.stack
                }
            });
        }
    }

    async writeWandPort(data) {
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