"use strict";
/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#521_tab
 * Spec sheet: https://www.thisisant.com/resources/bicycle-power/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BicyclePowerScanner = void 0;
const UpdateState_1 = require("../lib/UpdateState");
const AntPlusScanner_1 = require("./AntPlusScanner");
const BicyclePowerScanState_1 = require("./BicyclePowerScanState");
const BicyclePowerSensor_1 = require("./BicyclePowerSensor");
class BicyclePowerScanner extends AntPlusScanner_1.AntPlusScanner {
    constructor() {
        super(...arguments);
        this.states = {};
    }
    deviceType() {
        return BicyclePowerSensor_1.BicyclePowerSensor.deviceType;
    }
    createStateIfNew(deviceId) {
        if (!this.states[deviceId]) {
            this.states[deviceId] = new BicyclePowerScanState_1.BicyclePowerScanState(deviceId);
        }
    }
    updateRssiAndThreshold(deviceId, rssi, threshold) {
        this.states[deviceId].Rssi = rssi;
        this.states[deviceId].Threshold = threshold;
    }
    updateState(deviceId, data) {
        (0, UpdateState_1.updateBicyclePowerSensorState)(this, this.states[deviceId], data);
    }
}
exports.BicyclePowerScanner = BicyclePowerScanner;
//# sourceMappingURL=BicyclePowerScanner.js.map