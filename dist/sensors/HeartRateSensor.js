/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#526_tab
 * Spec sheet: https://www.thisisant.com/resources/heart-rate-monitor/
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PageState } from "../ant";
import { updateHeartRateSensorState } from "../lib/UpdateState";
import { AntPlusSensor } from "./AntPlusSensor";
import { HeartRateSensorState } from "./HeartRateSensorState";
export class HeartRateSensor extends AntPlusSensor {
    constructor() {
        super(...arguments);
        this.page = {
            oldPage: -1,
            pageState: PageState.INIT_PAGE
        };
    }
    attachSensor(channel, deviceID) {
        const _super = Object.create(null, {
            attach: { get: () => super.attach }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.attach.call(this, {
                channel,
                type: "receive",
                deviceID,
                deviceType: HeartRateSensor.deviceType,
                transmissionType: 0,
                timeout: 255,
                period: 8070
            });
            this.state = new HeartRateSensorState(deviceID);
        });
    }
    updateState(deviceId, data) {
        if (!this.state) {
            throw new Error("HeartRateSensor: not attached");
        }
        this.state.DeviceID = deviceId;
        updateHeartRateSensorState(this, this.state, data, this.page);
    }
}
HeartRateSensor.deviceType = 120;
//# sourceMappingURL=HeartRateSensor.js.map