"use strict";
/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#2343_tab
 * Spec sheet: https://www.thisisant.com/resources/ant-device-profile-muscle-oxygen/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MuscleOxygenScanner = void 0;
const UpdateState_1 = require("../lib/UpdateState");
const AntPlusScanner_1 = require("./AntPlusScanner");
const MuscleOxygenScanState_1 = require("./MuscleOxygenScanState");
const MuscleOxygenSensor_1 = require("./MuscleOxygenSensor");
class MuscleOxygenScanner extends AntPlusScanner_1.AntPlusScanner {
    constructor() {
        super(...arguments);
        this.states = {};
    }
    deviceType() {
        return MuscleOxygenSensor_1.MuscleOxygenSensor.deviceType;
    }
    createStateIfNew(deviceId) {
        if (!this.states[deviceId]) {
            this.states[deviceId] = new MuscleOxygenScanState_1.MuscleOxygenScanState(deviceId);
        }
    }
    updateRssiAndThreshold(deviceId, rssi, threshold) {
        this.states[deviceId].Rssi = rssi;
        this.states[deviceId].Threshold = threshold;
    }
    updateState(deviceId, data) {
        (0, UpdateState_1.updateMuscleOxygenSensorState)(this, this.states[deviceId], data);
    }
}
exports.MuscleOxygenScanner = MuscleOxygenScanner;
//# sourceMappingURL=MuscleOxygenScanner.js.map