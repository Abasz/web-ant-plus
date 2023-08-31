/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#523_tab
 * Spec sheet: https://www.thisisant.com/resources/bicycle-speed-and-cadence/
 */
import { updateSpeedCadenceSensorState } from "../lib/UpdateState";
import { AntPlusScanner } from "./AntPlusScanner";
import { SpeedCadenceScanState } from "./SpeedCadenceScanState";
import { SpeedCadenceSensor } from "./SpeedCadenceSensor";
export class SpeedCadenceScanner extends AntPlusScanner {
    constructor() {
        super(...arguments);
        this.wheelCircumference = 2.199; // default 70cm wheel
        this.states = {};
    }
    deviceType() {
        return SpeedCadenceSensor.deviceType;
    }
    setWheelCircumference(wheelCircumference) {
        this.wheelCircumference = wheelCircumference;
    }
    createStateIfNew(deviceId) {
        if (!this.states[deviceId]) {
            this.states[deviceId] = new SpeedCadenceScanState(deviceId);
        }
    }
    updateRssiAndThreshold(deviceId, rssi, threshold) {
        this.states[deviceId].Rssi = rssi;
        this.states[deviceId].Threshold = threshold;
    }
    updateState(deviceId, data) {
        updateSpeedCadenceSensorState(this, this.states[deviceId], data);
    }
}
//# sourceMappingURL=SpeedCadenceScanner.js.map