import initElectronApp from "./electron/main/config.js";
import initTreatmentsHandlers from "./electron/main/treatment-handlers.js";
import initSerialportHandlers from "./electron/main/serialport-handlers.js";

initElectronApp();
initTreatmentsHandlers();
initSerialportHandlers()


