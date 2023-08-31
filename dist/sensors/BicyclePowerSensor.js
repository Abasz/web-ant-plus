/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#521_tab
 * Spec sheet: https://www.thisisant.com/resources/bicycle-power/
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
import { updateBicyclePowerSensorState } from "../lib/UpdateState";
import { AntPlusSensor } from "./AntPlusSensor";
import { BicyclePowerSensorState } from "./BicyclePowerSensorState";
export class BicyclePowerSensor extends AntPlusSensor {
    attachSensor(channel, deviceID) {
        const _super = Object.create(null, {
            attach: { get: () => super.attach }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.attach.call(this, {
                channel,
                type: "receive",
                deviceID,
                deviceType: BicyclePowerSensor.deviceType,
                transmissionType: 0,
                timeout: 255,
                period: 8182
            });
            this.state = new BicyclePowerSensorState(deviceID);
        });
    }
    updateState(deviceId, data) {
        if (!this.state) {
            throw new Error("BicyclePowerSensor: not attached");
        }
        this.state.DeviceID = deviceId;
        updateBicyclePowerSensorState(this, this.state, data);
    }
}
BicyclePowerSensor.deviceType = 0x0b;
//# sourceMappingURL=BicyclePowerSensor.js.map