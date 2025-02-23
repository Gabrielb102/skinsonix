"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const DBManager_1 = __importDefault(require("../db/DBManager"));
const db = DBManager_1.default.init();
const initTreatmentsHandlers = () => {
    electron_1.ipcMain.handle('treatments-create', async () => {
        return DBManager_1.default.init();
    });
    electron_1.ipcMain.handle('treatments-read', async () => {
        return DBManager_1.default.init();
    });
    electron_1.ipcMain.handle('treatments-update', async () => {
        return DBManager_1.default.init();
    });
    electron_1.ipcMain.handle('treatments-delete', async () => {
        return DBManager_1.default.init();
    });
};
exports.default = initTreatmentsHandlers;
//# sourceMappingURL=treatmentHandlers.js.map