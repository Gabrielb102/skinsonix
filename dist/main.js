"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./main/config"));
const treatmentHandlers_1 = __importDefault(require("./main/treatmentHandlers"));
const serialportHandlers_1 = __importDefault(require("./main/serialportHandlers"));
(0, config_1.default)();
(0, treatmentHandlers_1.default)();
(0, serialportHandlers_1.default)();
//# sourceMappingURL=main.js.map