"use strict";
/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#528_tab
 * Spec sheet: https://www.thisisant.com/resources/stride-based-speed-and-distance-monitor/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrideSpeedDistanceScanner = void 0;
const UpdateState_1 = require("../lib/UpdateState");
const AntPlusScanner_1 = require("./AntPlusScanner");
const StrideSpeedDistanceScanState_1 = require("./StrideSpeedDistanceScanState");
const StrideSpeedDistanceSensor_1 = require("./StrideSpeedDistanceSensor");
class StrideSpeedDistanceScanner extends AntPlusScanner_1.AntPlusScanner {
    constructor() {
        super(...arguments);
        this.states = {};
    }
    deviceType() {
        return StrideSpeedDistanceSensor_1.StrideSpeedDistanceSensor.deviceType;
    }
    createStateIfNew(deviceId) {
        if (!this.states[deviceId]) {
            this.states[deviceId] = new StrideSpeedDistanceScanState_1.StrideSpeedDistanceScanState(deviceId);
        }
    }
    updateRssiAndThreshold(deviceId, rssi, threshold) {
        this.states[deviceId].Rssi = rssi;
        this.states[deviceId].Threshold = threshold;
    }
    updateState(deviceId, data) {
        (0, UpdateState_1.updateStrideSpeedDistanceSensorState)(this, this.states[deviceId], data);
    }
}
exports.StrideSpeedDistanceScanner = StrideSpeedDistanceScanner;
//# sourceMappingURL=StrideSpeedDistanceScanner.js.map