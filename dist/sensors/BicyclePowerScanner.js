/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#521_tab
 * Spec sheet: https://www.thisisant.com/resources/bicycle-power/
 */
import { updateBicyclePowerSensorState } from "../lib/UpdateState";
import { AntPlusScanner } from "./AntPlusScanner";
import { BicyclePowerScanState } from "./BicyclePowerScanState";
import { BicyclePowerSensor } from "./BicyclePowerSensor";
export class BicyclePowerScanner extends AntPlusScanner {
    constructor() {
        super(...arguments);
        this.states = {};
    }
    deviceType() {
        return BicyclePowerSensor.deviceType;
    }
    createStateIfNew(deviceId) {
        if (!this.states[deviceId]) {
            this.states[deviceId] = new BicyclePowerScanState(deviceId);
        }
    }
    updateRssiAndThreshold(deviceId, rssi, threshold) {
        this.states[deviceId].Rssi = rssi;
        this.states[deviceId].Threshold = threshold;
    }
    updateState(deviceId, data) {
        updateBicyclePowerSensorState(this, this.states[deviceId], data);
    }
}
//# sourceMappingURL=BicyclePowerScanner.js.map