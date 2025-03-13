import { app, BrowserWindow } from 'electron';
import electronUpdater from 'electron-updater';
const { autoUpdater } = electronUpdater;
import path from 'path';
import started from 'electron-squirrel-startup';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Points to the build output folder, e.g. "dist".
const DIST_PATH = path.join(__dirname, '../../dist');
// If your final "index.html" is directly inside the dist folder, just do this:
const INDEX_HTML = path.join(DIST_PATH, 'index.html');

const isDev = (process.env.NODE_ENV === 'development');

const initElectronApp = () => {
    // Handle creating/removing shortcuts on Windows when installing/uninstalling.
    if (started) {
        app.quit();
    }

    app.on('ready', createWindow);

    // Quit when all windows are closed, except on macOS
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
};

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1920,
        height: 1280,
        kiosk: true,
        frame: false,
        webPreferences: {
            // Points to your preload script.
            preload: path.join(__dirname, '../preload/preload.mjs'),
            // Optional best-practice security settings:
            // nodeIntegration: false,
            // contextIsolation: true,
        },
    });

    if (isDev) {
        // Load your dev server (Vite) in development
        mainWindow.loadURL('http://localhost:5173');
        // Optionally open DevTools
        // mainWindow.webContents.openDevTools();
    } else {
        // Use loadFile in production to load the local HTML from the build
        mainWindow.loadFile(INDEX_HTML);
    }

    // ----- Auto-Updater Logic -----
    autoUpdater.on('checking-for-update', () => {
        console.log('AutoUpdater: Checking for updates...');
        mainWindow.webContents.send('update-status', 'checking-for-update');
    });

    autoUpdater.on('update-available', (info) => {
        console.log('AutoUpdater: Update available.', info);
        mainWindow.webContents.send('update-status', 'update-available', info);
    });

    autoUpdater.on('update-not-available', (info) => {
        console.log('AutoUpdater: No update available.', info);
        mainWindow.webContents.send('update-status', 'update-not-available', info);
    });

    autoUpdater.on('error', (err) => {
        console.error('AutoUpdater Error:', err);
        mainWindow.webContents.send('update-status', 'error', err.message);
    });

    autoUpdater.on('download-progress', (progressObj) => {
        const logMessage = `Download speed: ${progressObj.bytesPerSecond}, Downloaded ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`;
        console.log(logMessage);
        mainWindow.webContents.send('update-status', 'download-progress', progressObj);
    });

    autoUpdater.on('update-downloaded', (info) => {
        console.log('AutoUpdater: Update downloaded. It will be installed on quit.', info);
        mainWindow.webContents.send('update-status', 'update-downloaded', info);
    });

    // 2. Check for updates in production once the window is ready.
    if (!isDev) {
        mainWindow.once('ready-to-show', () => {
            autoUpdater.checkForUpdatesAndNotify();
        });
    }
};

export default initElectronApp;
