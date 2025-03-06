var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import started from "electron-squirrel-startup";
import { fileURLToPath } from "url";
import { Sequelize, DataTypes } from "sequelize";
import { SerialPort } from "serialport";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./src/db/skinsonix.db",
  logging: false
});
const Treatment = sequelize.define("Treatment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "treatments",
  timestamps: false
});
Treatment.sync();
const TreatmentPhase = sequelize.define("TreatmentPhase", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  treatment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Treatment",
      key: "id"
    }
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    defaultValue: 20
  },
  red_start_intensity: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  blue_start_intensity: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  red_end_intensity: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  blue_end_intensity: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  start_frequency: {
    type: DataTypes.INTEGER,
    defaultValue: 660
  },
  end_frequency: {
    type: DataTypes.INTEGER,
    defaultValue: 660
  },
  phase_order: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "treatment_phases",
  timestamps: false
});
Treatment.hasMany(TreatmentPhase, {
  foreignKey: "treatment_id"
});
TreatmentPhase.belongsTo(Treatment, {
  foreignKey: "treatment_id"
});
TreatmentPhase.sync();
const initTreatmentsHandlers = () => {
  ipcMain.handle("treatments-create", async (event, { name, description, phases }) => {
    const treatment = await Treatment.create({ name, description });
    for (const phase of phases) {
      await TreatmentPhase.create({ ...phase, TreatmentId: treatment.id });
    }
    return treatment;
  });
  ipcMain.handle("treatments-get", async (event, params) => {
    var _a;
    const options = {
      include: [{
        model: TreatmentPhase
      }],
      nest: true
    };
    if (params) {
      options["where"] = params;
    }
    const treatments = await Treatment.findAll(options);
    if (params == null ? void 0 : params.id) {
      return ((_a = treatments[0]) == null ? void 0 : _a.toJSON()) ?? null;
    }
    return treatments.map((t) => t.toJSON());
  });
  ipcMain.handle("treatments-update", async (event, { id, name, description, phases }) => {
    await Treatment.update({ name, description }, { where: { id } });
    await TreatmentPhase.destroy({ where: { TreatmentId: id } });
    const existingPhases = await TreatmentPhase.findAll({ where: { TreatmentId: id } });
    const existingPhaseIds = existingPhases.map((p) => p.id);
    const newPhaseIds = phases.map((p) => p.id).filter((id2) => id2);
    for (const phase of phases) {
      if (phase.id) {
        await TreatmentPhase.update(phase, { where: { id: phase.id } });
      } else {
        await TreatmentPhase.create({ ...phase, TreatmentId: id });
      }
    }
    const phasesToDelete = existingPhaseIds.filter((id2) => !newPhaseIds.includes(id2));
    if (phasesToDelete.length) {
      await TreatmentPhase.destroy({ where: { id: phasesToDelete } });
    }
  });
  ipcMain.handle("treatments-delete", async (event, id) => {
    await TreatmentPhase.destroy({ where: { TreatmentId: id } });
    await Treatment.destroy({ where: { id } });
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
    var _a;
    if ((_a = this.wandPort) == null ? void 0 : _a.isOpen) {
      return { success: true, path: this.wandPort.path, baudRate: this.wandPort.baudRate, isOpen: this.wandPort.isOpen };
    }
    try {
      const ports = await SerialPort.list();
      const wandPort = ports.find((port) => port.path === "COM3");
      if (!wandPort) {
        throw new Error("COM3 port not found");
      }
      this.wandPort = new SerialPort({ path: wandPort.path, baudRate: 9600 });
      return new Promise((resolve, reject) => {
        this.wandPort.on("open", () => {
          resolve({
            success: true,
            path: this.wandPort.path,
            baudRate: this.wandPort.baudRate,
            isOpen: this.wandPort.isOpen
          });
        });
        this.wandPort.on("error", (err) => {
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
