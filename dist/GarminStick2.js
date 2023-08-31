"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GarminStick2 = void 0;
const USBDriver_1 = require("./USBDriver");
class GarminStick2 extends USBDriver_1.USBDriver {
    constructor() {
        super(0x0fcf, 0x1008);
    }
}
exports.GarminStick2 = GarminStick2;
//# sourceMappingURL=GarminStick2.js.map