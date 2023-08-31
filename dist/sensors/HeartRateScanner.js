"use strict";
/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#526_tab
 * Spec sheet: https://www.thisisant.com/resources/heart-rate-monitor/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeartRateScanner = void 0;
const ant_1 = require("../ant");
const UpdateState_1 = require("../lib/UpdateState");
const AntPlusScanner_1 = require("./AntPlusScanner");
const HeartRateScanState_1 = require("./HeartRateScanState");
const HeartRateSensor_1 = require("./HeartRateSensor");
class HeartRateScanner extends AntPlusScanner_1.AntPlusScanner {
    constructor() {
        super(...arguments);
        this.states = {};
        this.pages = {};
    }
    deviceType() {
        return HeartRateSensor_1.HeartRateSensor.deviceType;
    }
    createStateIfNew(deviceId) {
        if (!this.states[deviceId]) {
            this.states[deviceId] = new HeartRateScanState_1.HeartRateScanState(deviceId);
        }
        if (!this.pages[deviceId]) {
            this.pages[deviceId] = { oldPage: -1, pageState: ant_1.PageState.INIT_PAGE };
        }
    }
    updateRssiAndThreshold(deviceId, rssi, threshold) {
        this.states[deviceId].Rssi = rssi;
        this.states[deviceId].Threshold = threshold;
    }
    updateState(deviceId, data) {
        (0, UpdateState_1.updateHeartRateSensorState)(this, this.states[deviceId], data, this.pages[deviceId]);
    }
}
exports.HeartRateScanner = HeartRateScanner;
//# sourceMappingURL=HeartRateScanner.js.map