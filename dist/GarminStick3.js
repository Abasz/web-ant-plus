"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GarminStick3 = void 0;
const USBDriver_1 = require("./USBDriver");
class GarminStick3 extends USBDriver_1.USBDriver {
    constructor() {
        super(0x0fcf, 0x1009);
    }
}
exports.GarminStick3 = GarminStick3;
//# sourceMappingURL=GarminStick3.js.map