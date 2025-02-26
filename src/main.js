import initElectronApp from "./electron/main/config.js";
import initTreatmentsHandlers from "./electron/main/treatmentHandlers.js";
import initSerialportHandlers from "./electron/main/serialportHandlers.js";

initElectronApp();
initTreatmentsHandlers();
initSerialportHandlers()


