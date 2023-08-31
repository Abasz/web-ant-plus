/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#523_tab
 * Spec sheet: https://www.thisisant.com/resources/bicycle-speed-and-cadence/
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
import { updateSpeedCadenceSensorState } from "../lib/UpdateState";
import { AntPlusSensor } from "./AntPlusSensor";
import { SpeedCadenceSensorState } from "./SpeedCadenceSensorState";
export class SpeedCadenceSensor extends AntPlusSensor {
    constructor() {
        super(...arguments);
        this.wheelCircumference = 2.199; // default 70cm wheel
    }
    setWheelCircumference(wheelCircumference) {
        this.wheelCircumference = wheelCircumference;
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
                deviceType: SpeedCadenceSensor.deviceType,
                transmissionType: 0,
                timeout: 255,
                period: 8086
            });
            this.state = new SpeedCadenceSensorState(deviceID);
        });
    }
    updateState(deviceId, data) {
        if (!this.state) {
            throw new Error("SpeedCadenceSensor: not attached");
        }
        this.state.DeviceID = deviceId;
        updateSpeedCadenceSensorState(this, this.state, data);
    }
}
SpeedCadenceSensor.deviceType = 0x79;
//# sourceMappingURL=SpeedCadenceSensor.js.map