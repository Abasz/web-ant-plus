/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#525_tab
 * Spec sheet: https://www.thisisant.com/resources/fitness-equipment-device/
 */
import { updateFitnessEquipmentSensorState } from "../lib/UpdateState";
import { AntPlusScanner } from "./AntPlusScanner";
import { FitnessEquipmentScanState } from "./FitnessEquipmentScanState";
import { FitnessEquipmentSensor } from "./FitnessEquipmentSensor";
export class FitnessEquipmentScanner extends AntPlusScanner {
    constructor() {
        super(...arguments);
        this.states = {};
    }
    deviceType() {
        return FitnessEquipmentSensor.deviceType;
    }
    createStateIfNew(deviceId) {
        if (!this.states[deviceId]) {
            this.states[deviceId] = new FitnessEquipmentScanState(deviceId);
        }
    }
    updateRssiAndThreshold(deviceId, rssi, threshold) {
        this.states[deviceId].Rssi = rssi;
        this.states[deviceId].Threshold = threshold;
    }
    updateState(deviceId, data) {
        updateFitnessEquipmentSensorState(this, this.states[deviceId], data);
    }
}
//# sourceMappingURL=FitnessEquipmentScanner.js.map