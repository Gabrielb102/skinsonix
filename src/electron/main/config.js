import {app, BrowserWindow} from 'electron';
import path from 'path';
import started from 'electron-squirrel-startup';
import DBManager from "../../db/DBManager";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
process.env.DIST = path.join(__dirname, '../../dist')

const initElectronApp = () => {
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
    if (started) {
        app.quit();
    }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
    app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    DBManager.init();
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.mjs'),
        },
    });

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:5173');
    } else {
        // In production, load the built file
        mainWindow.loadFile(path.join(process.env.DIST, '../renderer/index.html'));
    }
};

export default initElectronApp;