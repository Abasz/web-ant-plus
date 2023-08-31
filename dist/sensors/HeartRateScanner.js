/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#526_tab
 * Spec sheet: https://www.thisisant.com/resources/heart-rate-monitor/
 */
import { PageState } from "../ant";
import { updateHeartRateSensorState } from "../lib/UpdateState";
import { AntPlusScanner } from "./AntPlusScanner";
import { HeartRateScanState } from "./HeartRateScanState";
import { HeartRateSensor } from "./HeartRateSensor";
export class HeartRateScanner extends AntPlusScanner {
    constructor() {
        super(...arguments);
        this.states = {};
        this.pages = {};
    }
    deviceType() {
        return HeartRateSensor.deviceType;
    }
    createStateIfNew(deviceId) {
        if (!this.states[deviceId]) {
            this.states[deviceId] = new HeartRateScanState(deviceId);
        }
        if (!this.pages[deviceId]) {
            this.pages[deviceId] = { oldPage: -1, pageState: PageState.INIT_PAGE };
        }
    }
    updateRssiAndThreshold(deviceId, rssi, threshold) {
        this.states[deviceId].Rssi = rssi;
        this.states[deviceId].Threshold = threshold;
    }
    updateState(deviceId, data) {
        updateHeartRateSensorState(this, this.states[deviceId], data, this.pages[deviceId]);
    }
}
//# sourceMappingURL=HeartRateScanner.js.map