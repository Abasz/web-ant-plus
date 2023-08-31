/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#2343_tab
 * Spec sheet: https://www.thisisant.com/resources/ant-device-profile-muscle-oxygen/
 */
import { updateMuscleOxygenSensorState } from "../lib/UpdateState";
import { AntPlusScanner } from "./AntPlusScanner";
import { MuscleOxygenScanState } from "./MuscleOxygenScanState";
import { MuscleOxygenSensor } from "./MuscleOxygenSensor";
export class MuscleOxygenScanner extends AntPlusScanner {
    constructor() {
        super(...arguments);
        this.states = {};
    }
    deviceType() {
        return MuscleOxygenSensor.deviceType;
    }
    createStateIfNew(deviceId) {
        if (!this.states[deviceId]) {
            this.states[deviceId] = new MuscleOxygenScanState(deviceId);
        }
    }
    updateRssiAndThreshold(deviceId, rssi, threshold) {
        this.states[deviceId].Rssi = rssi;
        this.states[deviceId].Threshold = threshold;
    }
    updateState(deviceId, data) {
        updateMuscleOxygenSensorState(this, this.states[deviceId], data);
    }
}
//# sourceMappingURL=MuscleOxygenScanner.js.map