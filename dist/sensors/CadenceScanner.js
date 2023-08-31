/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#523_tab
 * Spec sheet: https://www.thisisant.com/resources/bicycle-speed-and-cadence/
 */
import { updateCadenceSensorState } from "../lib/UpdateState";
import { AntPlusScanner } from "./AntPlusScanner";
import { CadenceScanState } from "./CadenceScanState";
import { CadenceSensor } from "./CadenceSensor";
export class CadenceScanner extends AntPlusScanner {
    constructor() {
        super(...arguments);
        this.wheelCircumference = 2.199; // default 70cm wheel
        this.states = {};
    }
    deviceType() {
        return CadenceSensor.deviceType;
    }
    setWheelCircumference(wheelCircumference) {
        this.wheelCircumference = wheelCircumference;
    }
    createStateIfNew(deviceId) {
        if (!this.states[deviceId]) {
            this.states[deviceId] = new CadenceScanState(deviceId);
        }
    }
    updateRssiAndThreshold(deviceId, rssi, threshold) {
        this.states[deviceId].Rssi = rssi;
        this.states[deviceId].Threshold = threshold;
    }
    updateState(deviceId, data) {
        updateCadenceSensorState(this, this.states[deviceId], data);
    }
}
//# sourceMappingURL=CadenceScanner.js.map