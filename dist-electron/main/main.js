var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { app, BrowserWindow, ipcMain } from "electron";
import path, { dirname } from "path";
import started from "electron-squirrel-startup";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import { SerialPort } from "serialport";
class DBManager {
  static init() {
    const db = new sqlite3.Database("./src/db/skinsonix.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
      if (err) {
        console.log("Error opening / creating database");
        if (err.message) {
          console.error(err.message);
        }
      } else {
        console.log("Connected to the skinsonix database.");
        this.createTables(db);
        this.checkDefaultData(db, (exists) => {
          if (!exists) {
            console.log("Inserting default data");
            this.insertDefaultData(db);
          }
        });
      }
    });
    return db;
  }
  static createTables(db) {
    db.exec(`
        CREATE TABLE IF NOT EXISTS treatments
        (
            id
            INTEGER
            PRIMARY
            KEY
            AUTOINCREMENT,
            name
            TEXT
            NOT
            NULL,
            description
            TEXT
            NULL
        );

        CREATE TABLE IF NOT EXISTS treatment_phases
        (
            id
            INTEGER
            PRIMARY
            KEY
            AUTOINCREMENT,
            treatment_id
            INTEGER
            NOT
            NULL,
            area
            TEXT
            NOT
            NULL,
            duration
            INTEGER
            DEFAULT
            20,
            red_intensity
            INTEGER
            DEFAULT
            100,
            blue_intensity
            INTEGER
            DEFAULT
            100,
            volume
            INTEGER
            DEFAULT
            50,
            treatment_pattern
            TEXT
            DEFAULT
            'sine_increasing',
            phase_order
            INTEGER
            NOT
            NULL,
            FOREIGN
            KEY
        (
            treatment_id
        ) REFERENCES treatments
        (
            id
        )
            );
    `, (err) => {
      if (err) {
        console.error("Error creating tables:", err.message);
      }
    });
  }
  static insertDefaultData(db) {
    db.exec(`
        INSERT INTO treatments (id, name, description)
        VALUES (1, 'SkinSonix Facial',
                'The original SkinSonix treatment, a relaxing combination of low frequency waves and LED light exposure. A great starting point for those new to low frequency and LED treatments, and a timeless option for experienced individuals.');

        INSERT INTO treatment_phases (treatment_id, area, phase_order)
        VALUES (1, 'up_right_side', 1),
               (1, 'forehead', 2),
               (1, 'up_left_side', 3),
               (1, 'left_jaw', 4),
               (1, 'chin', 5),
               (1, 'right_jaw', 6),
               (1, 'up_lip', 7),
               (1, 'nose', 8),
               (1, 'left_neck', 9),
               (1, 'right_neck', 10);
    `, (err) => {
      if (err) {
        console.error("Error inserting default data:", err.message);
      }
    });
  }
  static checkDefaultData(db, callback) {
    db.get("SELECT * FROM treatments", (err, row) => {
      if (err) {
        console.error(err.message);
        callback(false);
      } else {
        callback(!!row);
      }
    });
  }
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
process.env.DIST = path.join(__dirname, "../../dist");
const initElectronApp = () => {
  if (started) {
    app.quit();
  }
  app.on("ready", createWindow);
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  DBManager.init();
};
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1280,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.mjs")
    }
  });
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(process.env.DIST, "../renderer/index.html"));
  }
};
DBManager.init();
const initTreatmentsHandlers = () => {
  ipcMain.handle("treatments-create", async () => {
    return DBManager.init();
  });
  ipcMain.handle("treatments-read", async () => {
    return DBManager.init();
  });
  ipcMain.handle("treatments-update", async () => {
    return DBManager.init();
  });
  ipcMain.handle("treatments-delete", async () => {
    return DBManager.init();
  });
};
class SerialPortManager {
  constructor() {
    __publicField(this, "wandPort", null);
  }
  async listPorts() {
    return SerialPort.list();
  }
  async openPort() {
    if (!this.wandPort) {
      this.wandPort = new SerialPort({ path: "COM3", baudRate: 9600 });
    }
    return await new Promise((resolve, reject) => {
      this.wandPort.on("open", () => {
        resolve({
          success: true,
          path: this.wandPort.path,
          baudRate: this.wandPort.baudRate,
          isOpen: this.wandPort.isOpen
        });
      });
      this.wandPort.on("error", (err) => {
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
        data
      };
    } else {
      console.error("Wand port not open");
      return Error("Wand port not open");
    }
  }
}
const serialPortManager = new SerialPortManager();
const initSerialportHandlers = () => {
  ipcMain.handle("list-ports", () => serialPortManager.listPorts());
  ipcMain.handle("open-port", () => serialPortManager.openPort());
  ipcMain.handle("write", (event, data) => serialPortManager.writeWandPort(data));
};
initElectronApp();
initTreatmentsHandlers();
initSerialportHandlers();
//# sourceMappingURL=main.js.map
