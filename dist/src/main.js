"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./main/config"));
(0, config_1.default)();
const electron_1 = require("electron");
const serialport_1 = require("serialport");
const DBManager_1 = __importDefault(require("./db/DBManager"));
electron_1.ipcMain.handle('db-init', async () => {
    return DBManager_1.default.init();
});
electron_1.ipcMain.handle('list-ports', async () => {
    // return "poop"
    return serialport_1.SerialPort.list();
});
//# sourceMappingURL=main.js.map