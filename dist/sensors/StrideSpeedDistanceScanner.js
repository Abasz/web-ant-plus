/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#528_tab
 * Spec sheet: https://www.thisisant.com/resources/stride-based-speed-and-distance-monitor/
 */
import { updateStrideSpeedDistanceSensorState } from "../lib/UpdateState";
import { AntPlusScanner } from "./AntPlusScanner";
import { StrideSpeedDistanceScanState } from "./StrideSpeedDistanceScanState";
import { StrideSpeedDistanceSensor } from "./StrideSpeedDistanceSensor";
export class StrideSpeedDistanceScanner extends AntPlusScanner {
    constructor() {
        super(...arguments);
        this.states = {};
    }
    deviceType() {
        return StrideSpeedDistanceSensor.deviceType;
    }
    createStateIfNew(deviceId) {
        if (!this.states[deviceId]) {
            this.states[deviceId] = new StrideSpeedDistanceScanState(deviceId);
        }
    }
    updateRssiAndThreshold(deviceId, rssi, threshold) {
        this.states[deviceId].Rssi = rssi;
        this.states[deviceId].Threshold = threshold;
    }
    updateState(deviceId, data) {
        updateStrideSpeedDistanceSensorState(this, this.states[deviceId], data);
    }
}
//# sourceMappingURL=StrideSpeedDistanceScanner.js.map