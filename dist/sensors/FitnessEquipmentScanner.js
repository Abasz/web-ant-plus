"use strict";
/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#525_tab
 * Spec sheet: https://www.thisisant.com/resources/fitness-equipment-device/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FitnessEquipmentScanner = void 0;
const UpdateState_1 = require("../lib/UpdateState");
const AntPlusScanner_1 = require("./AntPlusScanner");
const FitnessEquipmentScanState_1 = require("./FitnessEquipmentScanState");
const FitnessEquipmentSensor_1 = require("./FitnessEquipmentSensor");
class FitnessEquipmentScanner extends AntPlusScanner_1.AntPlusScanner {
    constructor() {
        super(...arguments);
        this.states = {};
    }
    deviceType() {
        return FitnessEquipmentSensor_1.FitnessEquipmentSensor.deviceType;
    }
    createStateIfNew(deviceId) {
        if (!this.states[deviceId]) {
            this.states[deviceId] = new FitnessEquipmentScanState_1.FitnessEquipmentScanState(deviceId);
        }
    }
    updateRssiAndThreshold(deviceId, rssi, threshold) {
        this.states[deviceId].Rssi = rssi;
        this.states[deviceId].Threshold = threshold;
    }
    updateState(deviceId, data) {
        (0, UpdateState_1.updateFitnessEquipmentSensorState)(this, this.states[deviceId], data);
    }
}
exports.FitnessEquipmentScanner = FitnessEquipmentScanner;
//# sourceMappingURL=FitnessEquipmentScanner.js.map