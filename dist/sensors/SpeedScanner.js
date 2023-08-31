/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#523_tab
 * Spec sheet: https://www.thisisant.com/resources/bicycle-speed/
 */
import { updateSpeedSensorState } from "../lib/UpdateState";
import { AntPlusScanner } from "./AntPlusScanner";
import { SpeedScanState } from "./SpeedScanState";
import { SpeedSensor } from "./SpeedSensor";
export class SpeedScanner extends AntPlusScanner {
    constructor() {
        super(...arguments);
        this.wheelCircumference = 2.199; // default 70cm wheel
        this.states = {};
    }
    deviceType() {
        return SpeedSensor.deviceType;
    }
    setWheelCircumference(wheelCircumference) {
        this.wheelCircumference = wheelCircumference;
    }
    createStateIfNew(deviceId) {
        if (!this.states[deviceId]) {
            this.states[deviceId] = new SpeedScanState(deviceId);
        }
    }
    updateRssiAndThreshold(deviceId, rssi, threshold) {
        this.states[deviceId].Rssi = rssi;
        this.states[deviceId].Threshold = threshold;
    }
    updateState(deviceId, data) {
        updateSpeedSensorState(this, this.states[deviceId], data);
    }
}
//# sourceMappingURL=SpeedScanner.js.map