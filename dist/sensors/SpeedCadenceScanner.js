"use strict";
/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#523_tab
 * Spec sheet: https://www.thisisant.com/resources/bicycle-speed-and-cadence/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeedCadenceScanner = void 0;
const UpdateState_1 = require("../lib/UpdateState");
const AntPlusScanner_1 = require("./AntPlusScanner");
const SpeedCadenceScanState_1 = require("./SpeedCadenceScanState");
const SpeedCadenceSensor_1 = require("./SpeedCadenceSensor");
class SpeedCadenceScanner extends AntPlusScanner_1.AntPlusScanner {
    constructor() {
        super(...arguments);
        this.wheelCircumference = 2.199; // default 70cm wheel
        this.states = {};
    }
    deviceType() {
        return SpeedCadenceSensor_1.SpeedCadenceSensor.deviceType;
    }
    setWheelCircumference(wheelCircumference) {
        this.wheelCircumference = wheelCircumference;
    }
    createStateIfNew(deviceId) {
        if (!this.states[deviceId]) {
            this.states[deviceId] = new SpeedCadenceScanState_1.SpeedCadenceScanState(deviceId);
        }
    }
    updateRssiAndThreshold(deviceId, rssi, threshold) {
        this.states[deviceId].Rssi = rssi;
        this.states[deviceId].Threshold = threshold;
    }
    updateState(deviceId, data) {
        (0, UpdateState_1.updateSpeedCadenceSensorState)(this, this.states[deviceId], data);
    }
}
exports.SpeedCadenceScanner = SpeedCadenceScanner;
//# sourceMappingURL=SpeedCadenceScanner.js.map